import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import Toast from "react-native-root-toast";
import { styles, LoopType, randomInt, useAppContext } from "../helpers";
import PlayerControls from "./controls";
import SeekBar from "./seekbar";

const Player = () => {
  const [status, setStatus] = useState({});
  const [player, setPlayer] = useState(new Audio.Sound());
  const { playlist, setPlaylist, loop, songs } = useAppContext();

  const randomTrack = () => {
    if (playlist.list.length > 0) {
      const index = randomInt(playlist.list.length, playlist.index);
      setPlaylist({
        ...playlist,
        current: songs.filter((s) => s.no === playlist.list[index])[0],
        index: index,
      });
    } else {
      setPlaylist({
        ...playlist,
        current: songs[randomInt(songs.length)],
        index: -1,
      });
    }
  };

  const previousTrack = () => {
    if (loop === LoopType.RandomList) {
      randomTrack();
    } else if (loop === LoopType.FollowList) {
      const index =
        playlist.index > 0 ? playlist.index - 1 : playlist.list.length - 1;
      const current = songs.filter((s) => s.no === playlist.list[index])[0];
      setPlaylist({ ...playlist, ...{ index, current } });
    }
  };

  const nextTrack = () => {
    if (loop === LoopType.RandomList) {
      randomTrack();
    } else if (loop === LoopType.FollowList) {
      const index =
        playlist.index + 1 < playlist.list.length ? playlist.index + 1 : 0;
      const current = songs.filter((s) => s.no === playlist.list[index])[0];
      setPlaylist({ ...playlist, ...{ index, current } });
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
    playSong();
  }, [playlist?.current]);

  useEffect(() => {
    try {
      player
        .setIsLoopingAsync(loop === LoopType.RepeatSong)
        .then()
        .catch((e) => {
          console.debug(e);
        });
      player.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    } catch(e) {
      console.warning(e)
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

  const onSeek = async (positionMillis) => {
    const result = await player.getStatusAsync();
    result.isLoaded && player.setPositionAsync(positionMillis);
  };

  const onPlay = async () => {
    const result = await player.getStatusAsync();
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
  };

  const playSong = async () => {
    try {
      //unload previous song
      await player.unloadAsync();
      if (playlist?.current) {
        await player.loadAsync(
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
        );
        player.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      }
    } catch (e) {
      Toast.show(`Bir hata oluştu: ${e}`);
      console.error(e);
    }
  };

  return (
    <View style={styles.bottomView} accessibilityLabel={"çalma bilgi çubuğu ve oynatma düğmeleri"}>
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
