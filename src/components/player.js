import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Audio } from "expo-av";
import {
  faPause,
  faPlay,
  faReply,
  faSort,
  faStepBackward,
  faStepForward,
  faStop,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { styles, BLUE, GRAY } from "../helpers/styles";
import { IconPress } from "./buttons";
import SeekBar from "./seekbar";

const Player = ({
  song,
  clearPlaylist,
  sortPlaylist,
  previousTrack,
  nextTrack,
}) => {
  // https://github.com/expo/playlist-example/blob/master/App.js
  const [status, setStatus] = useState({});
  const [player, setPlayer] = useState(new Audio.Sound());

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playThroughEarpieceAndroid: false,
    }),
      [];
  });

  useEffect(() => {
    playSong();
  }, [song]);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setStatus(status);
    }
    if (status.didJustFinish && !status.isLooping) {
      nextTrack();
    }
  };

  const playPause = async () => {
    const result = await player.getStatusAsync();
    if (result.isLoaded) {
      if (result.isPlaying) {
        player.pauseAsync();
      } else {
        player.playAsync();
      }
    } else {
      playSong();
    }
  };

  const toggleLoop = () => {
    player.setIsLoopingAsync(!status.isLooping);
  };

  const stopPlayer = () => {
    player.stopAsync();
  };

  const playSong = async () => {
    try {
      //unload previous song
      await player.unloadAsync();
      if (song) {
        await player.loadAsync(
          { uri: song.url },
          {
            shouldPlay: true,
            rate: status.rate,
            shouldCorrectPitch: status.shouldCorrectPitch,
            volume: status.volume,
            isMuted: status.muted,
            isLooping: status.isLooping,
            progressUpdateIntervalMillis: 1000,
          }
        );
        player.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSeek = () => {
    console.log("onSeek");
  };

  const PlayerButtons = () => (
    <View style={styles.playlistButtons}>
      <IconPress icon={faStepBackward} onPress={() => previousTrack()} />
      <IconPress
        icon={status.isPlaying ? faPause : faPlay}
        onPress={() => playPause()}
      />
      <IconPress
        icon={faStop}
        color={status.isPlaying ? BLUE : GRAY}
        onPress={() => stopPlayer()}
      />
      <IconPress icon={faStepForward} onPress={() => nextTrack()} />
      <IconPress
        icon={faReply}
        color={status.isLooping ? BLUE : GRAY}
        onPress={() => toggleLoop()}
      />
      <IconPress icon={faSort} onPress={() => sortPlaylist()} />
      <IconPress icon={faTrash} onPress={() => clearPlaylist()} />
    </View>
  );

  return (
    <View style={styles.bottomView}>
      {song && (
        <Text style={styles.text}>{song.name}</Text>
      )}
      {status.positionMillis > 0 && (
        <SeekBar
          onSeek={onSeek}
          trackLength={status.durationMillis}
          onSlidingStart={() => console.log("sliding started")}
          currentPosition={status.positionMillis}
        />
      )}
      <PlayerButtons />
    </View>
  );
};

export default Player;
