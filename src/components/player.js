import React, { useEffect, useState } from "react";
import { Platform, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Audio from "expo-audio";
import * as Device from "expo-device";
import { File, Directory, Paths } from "expo-file-system";
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
  const fileFolder = new Directory(Paths.cache, "subadapp");
  if (!fileFolder.exists) {
    // create cache folder if it doesn't exists
    fileFolder.create()
  }
  const file = new File(fileFolder, fileName);
  if (!file.exists) {
    await File.downloadFileAsync(uri, file);
  }
  return file.uri;
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

const player = Audio.createAudioPlayer(null);

const Player = () => {
  const [status, setStatus] = useState({});
  const { playlist, setPlaylist, songs, albums } = useAppContext();
  const [loop, setLoop] = useState(0);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecording: false,
      shouldPlayInBackground: true,
      interruptionMode: "doNotMix",
      playsInSilentMode: true,
      shouldDuckAndroid: true,
      shouldRouteThroughEarpiece: false,
    }).catch(() => { });

    registerForPushNotificationsAsync();

    const notificationListener =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });


    return () => {
      notificationListener.remove();
    };
  }, []);

  useEffect(() => {
    return () => {
      try {
        if (player) {
          if (player.pause) player.pause();
          if (player.remove) player.remove();
          player = null;
        }
      } catch (e) { }
    };
  }, [player]);

  useEffect(() => {
    playSong();
  }, [playlist?.current]);

  useEffect(() => {
    if (!player) return;

    try {
      player.loop = loop === LoopType.RepeatSong;
    } catch (e) {
      console.log(`set loop ${e}`);
    }

    const listener = player.addListener(
      "playbackStatusUpdate",
      (s) => onPlaybackStatusUpdate(s)
    );
    return () => {
      try {
        if (listener && listener.remove) listener.remove();
      } catch (e) { }
    };
  }, [player, loop]);

  const onPlaybackStatusUpdate = (status) => {
    // Normalize expo-audio status to the shape used by the component
    if (!status) return;
    const normalized = {
      isLoaded: !!status.isLoaded,
      isPlaying: !!status.playing,
      positionMillis: typeof status.currentTime === 'number' ? Math.round(status.currentTime * 1000) : 0,
      durationMillis: typeof status.duration === 'number' ? Math.round(status.duration * 1000) : 0,
      rate: status.playbackRate || 1,
      shouldCorrectPitch: status.shouldCorrectPitch,
      volume: status.volume,
      muted: !!status.mute,
      isLooping: !!status.loop,
      didJustFinish: !!status.didJustFinish,
    };
    setStatus(normalized);
    if (normalized.didJustFinish && !normalized.isLooping) nextTrack();
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

  const onSeek = async (positionMillis) => {
    try {
      if (!player) return;
      await player.seekTo(positionMillis / 1000);
      // optimistically update UI
      setStatus((s) => ({ ...s, positionMillis }));
    } catch (e) {
      error(`onSeek ${e}`);
    }
  };

  const onPlay = () => {
    try {
      if (!player) return;
      if (status.isLoaded) {
        if (status.isPlaying) player.pause();
        else player.play();
      } else {
        if (loop === LoopType.RandomList) randomTrack();
        else playSong();
      }
    } catch (e) {
      error(`onPlay ${e}`);
    }
  };

  const playSong = async () => {
    try {
      if (!player) return;
      if (!playlist?.current) return;
      const filePath = await saveSong(playlist.current.url);
      try {
        // pause any current playback before replacing
        try {
          if (player.playing) player.pause();
        } catch (e) { }

        player.replace(filePath);
        player.loop = loop === LoopType.RepeatSong;
        player.play();

        const metadata = {
          title: playlist.current.name || "Bilinmeyen Şarkı",
          artist: "Şubadap Müzik Grubu",
          albumTitle: albums[playlist.current.albumNo - 1].name,
          artworkUrl: playlist.current.image,
        }

        try {
          player.setActiveForLockScreen(true, metadata, {
            showPlayPause: true,
            showSeekBackward: true,
            showSeekForward: true,
          });
        } catch (e) {
          console.log(`setActiveForLockScreen ${e}`);
        }
      } catch (e) {
        error(`replace/play ${e}`);
      }
    } catch (e) {
      error(`playSong ${e}`);
    }
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
        loop={loop}
        onLoop={() => setLoop(loop < 2 ? loop + 1 : 0)}
      />
    </SafeAreaView>
  );
};

export default Player;
