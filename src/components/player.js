import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { styles, LoopType, randomInt, useAppContext, error, show } from "../helpers";
import PlayerControls from "./controls";
import SeekBar from "./seekbar";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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
    error(`Bir hata oluştur: ${e}`);
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

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, []);

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
      }
      playSong();
    } catch (e) {
      error(`${e}`);
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
      error(`${e}`);
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
      error(`${e}`);
    }
  };

  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      // reduce sound of other apps
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
    }),
      [];
  });

  useEffect(() => {
    try {
      player
        .setIsLoopingAsync(loop === LoopType.RepeatSong)
        .then()
        .catch((e) => {
          error(`${e}`);
        });
      player.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    } catch (e) {
      error(`${e}`);
    }
  }, [loop]);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setStatus(status);
    }
    if (status.didJustFinish && !status.isLooping) {
      nextTrack();
    }
  };

  const onSeek = (positionMillis) => {
    player
      .getStatusAsync()
      .then(
        (result) => result.isLoaded && player.setPositionAsync(positionMillis)
      )
      .catch((e) => error(`${e}`));
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
      .catch((e) => error(`${e}`));
  };

  const playSong = () => {
    //unload previous song
    player
      .unloadAsync()
      .then(() => {
        if (playlist?.current) {
          player
            .loadAsync(
              { uri: playlist.current.url },
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
            .catch((e) => error(`${e}`));
        }
      })
      .catch((e) => error(`${e}`));
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
