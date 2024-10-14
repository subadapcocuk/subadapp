import React, { useEffect, useRef, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import * as Device from "expo-device";
import * as FileSystem from "expo-file-system";
import * as Notifications from "expo-notifications";
import {
  styles,
  LoopType,
  randomInt,
  useAppContext,
  error,
  show,
} from "../helpers";
import PlayerControls from "./controls";
import SeekBar from "./seekbar";

const DOCUMENT_FOLDER = `${FileSystem.documentDirectory}`;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const saveRecording = async (uri) => {
  // Get just the name and extension of the recording file created from the URI path.
  const fileName = uri.match(/\/Library\/Caches\/AV\/([^\/]+)$/)[1];
  const fileUri = `${DOCUMENT_FOLDER}/subadapp/${fileName}`
  const fileInfo = await FileSystem.getInfoAsync(fileUri);

  // Check if file already exists, if not download it
  if (!fileInfo.exists) {
    // Download the file that were in the URI to the file path.
    console.log(`Download ${uri} to ${fileUri}`);
    await FileSystem.downloadAsync({ uri: uri, fileUri: filePath });
  }
  console.log(`Returning ${fileUri}`);
  return fileUri;
}

async function registerForPushNotificationsAsync() {
  try {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        error("Failed to get push token for push notification!");
        return;
      }
    } else {
      show("Push notification needs physical device");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  } catch (e) {
    error(`registerForPushNotificationsAsync: ${e}`);
  }
}

const Player = () => {
  const [status, setStatus] = useState({});
  const [player, setPlayer] = useState(new Audio.Sound());
  const { playlist, setPlaylist, loop, songs } = useAppContext();
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      // reduce sound of other apps
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
    });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, []);

  useEffect(() => {
    playSong();
  }, [playlist?.current]);

  useEffect(() => {
    player
      .setStatusAsync({ isLooping: loop === LoopType.RepeatSong })
      .then()
      .catch((e) => {
        error(`setIsLoopingAsync ${e}`);
      });
    player.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
  }, [loop]);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setStatus(status);
    }
    if (status.didJustFinish && !status.isLooping) {
      nextTrack();
    }
  };

  const randomTrack = () => {
    try {
      if (playlist.list.length > 1) {
        const index = randomInt(playlist.list.length, playlist.index);
        setPlaylist({
          ...playlist,
          current: songs.filter((s) => s.no === playlist.list[index])[0],
          index: index,
        });
      } else if (playlist.list.length == 0) {
        setPlaylist({
          ...playlist,
          current: songs[randomInt(songs.length)],
          index: -1,
        });
      } else {
        playSong();
      }
    } catch (e) {
      error(`randomTrack ${e}`);
    }
  };

  const previousTrack = () => {
    try {
      if (loop === LoopType.RandomList) {
        randomTrack();
      } else if (loop === LoopType.FollowList) {
        const index =
          playlist.index > 0 ? playlist.index - 1 : playlist.list.length - 1;
        const current = songs.filter((s) => s.no === playlist.list[index])[0];
        setPlaylist({ ...playlist, ...{ index, current } });
      }
    } catch (e) {
      error(`previousTrack ${e}`);
    }
  };

  const nextTrack = () => {
    try {
      if (loop === LoopType.RandomList) {
        randomTrack();
      } else if (loop === LoopType.FollowList) {
        const index =
          playlist.index + 1 < playlist.list.length ? playlist.index + 1 : 0;
        const current = songs.filter((s) => s.no === playlist.list[index])[0];
        setPlaylist({ ...playlist, ...{ index, current } });
      }
    } catch (e) {
      error(`nextTrack ${e}`);
    }
  };

  const onSeek = (positionMillis) => {
    player
      .getStatusAsync()
      .then(
        (result) => result.isLoaded && player.setPositionAsync(positionMillis)
      )
      .catch((e) => error(`onSeek ${e}`));
  };

  const onPlay = () => {
    player
      .getStatusAsync()
      .then((result) => {
        if (result.isLoaded) {
          if (result.isPlaying) {
            player.pauseAsync();
          } else {
            player.playAsync();
          }
        } else {
          if (loop === LoopType.RandomList) {
            randomTrack();
          } else {
            playSong();
          }
        }
      })
      .catch((e) => error(`onPlay ${e}`));
  };

  const playSong = () => {
    //unload previous song
    player
      .unloadAsync()
      .then(() => {
        if (playlist?.current) {
          // first download the song
          saveRecording(playlist.current.url).then((filePath) => {
            player
              .loadAsync(
                { uri: filePath },
                {
                  shouldPlay: true,
                  rate: status.rate,
                  shouldCorrectPitch: status.shouldCorrectPitch,
                  volume: status.volume,
                  isMuted: status.muted,
                  isLooping: loop === LoopType.RepeatSong,
                  progressUpdateIntervalMillis: 1000,
                }
              )
              .then(() =>
                player.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
              )
              .catch((e) => error(`loadAsync ${e}`));
          }).catch((e) => error(`saveRecording ${e}`))
        }
      })
      .catch((e) => error(`unloadAsync ${e}`));
  };

  return (
    <View
      style={styles.bottomView}
      accessibilityLabel={"çalma bilgi çubuğu ve oynatma düğmeleri"}
    >
      {notification && (
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => setNotification(null)}
        >
          <Text>{notification.request.content.title}</Text>
          <Text>{notification.request.content.body}</Text>
        </TouchableOpacity>
      )}
      <SeekBar
        isPlaying={status.isLoaded}
        onSeek={onSeek}
        trackLength={status.positionMillis ? status.durationMillis : 1}
        currentPosition={status.positionMillis ? status.positionMillis : 0}
      />
      <PlayerControls
        isPlaying={playlist?.current && status.isPlaying}
        onForward={nextTrack}
        onBackward={previousTrack}
        onPlay={onPlay}
      />
    </View>
  );
};

export default Player;
