import React, { useEffect, useRef, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function saveSong(uri) {
  const fileName = uri.substring(uri.lastIndexOf('/') + 1);
  const fileFolder = `${FileSystem.cacheDirectory}subadapp/`
  const folderInfo = await FileSystem.getInfoAsync(fileFolder);
  if (!folderInfo.exists) {
    // create cache folder if it doesn't exists
    await FileSystem.makeDirectoryAsync(fileFolder)
  }
  const fileUri = `${fileFolder}${fileName}`
  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  if (!fileInfo.exists) {
    // Download if file doesn't exist
    await FileSystem.downloadAsync(uri, fileUri);
    return fileUri;
  } else {
    return fileUri;
  }
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
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playThroughEarpieceAndroid: false
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
          saveSong(playlist.current.url).then((filePath) => {
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
          }).catch((e) => error(`saveSong ${e}`))
        }
      })
      .catch((e) => error(`unloadAsync ${e}`));
  };

  return (
    <SafeAreaView
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
    </SafeAreaView>
  );
};

export default Player;
