import React, { useEffect, useRef, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import TrackPlayer, { Capability, AppKilledPlaybackBehavior, useProgress, usePlaybackState, State } from "react-native-track-player";
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
  const { playlist, setPlaylist, loop, songs } = useAppContext();
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef();
  const progress = useProgress();
  const state = usePlaybackState();

  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.JumpForward,
        Capability.JumpBackward,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
    });
  };

  const setupNotifications = () => {
    registerForPushNotificationsAsync();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }

  useEffect(() => {
    setupPlayer();
  }, [])

  useEffect(() => {
    setupNotifications();
  }, []);

  useEffect(() => {
    playSong();
  }, [playlist?.current]);

  /*useEffect(() => {
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
  };*/

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
    try {
      if (state === State.Ready) {
        TrackPlayer.seekTo(positionMillis);
      }
    } catch (e) {
      error(`onSeek ${e}`);
    }
  };

  const onPlay = () => {
    //TODO state.ended?
    if (state === State.Ready) {
      if (state === State.Playing) {
        TrackPlayer.pause();
      } else {
        TrackPlayer.play();
      }
    } else {
      if (loop === LoopType.RandomList) {
        randomTrack();
      } else {
        playSong();
      }
    }
  };

  const playSong = () => {
    //unload previous song
    TrackPlayer
      .reset()
      .then(() => {
        if (playlist?.current) {
          // first download the song
          saveSong(playlist.current.url).then((filePath) => {
            TrackPlayer.add([
              {
                url: filePath
              }
            ]).then(() => TrackPlayer.play()).catch((e) => error(`add and play ${e}`))
          }).catch((e) => error(`saveSong ${e}`))
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
        isPlaying={state === State.Playing}
        onSeek={onSeek}
        trackLength={progress.duration ? progress.duration : 1}
        currentPosition={progress.position ? progress.position : 0}
      />
      <PlayerControls
        isPlaying={playlist?.current && state === State.Playing}
        onForward={nextTrack}
        onBackward={previousTrack}
        onPlay={onPlay}
      />
    </View>
  );
};

export default Player;
