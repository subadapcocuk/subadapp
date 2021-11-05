import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
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
import * as Progress from "react-native-progress";
import { styles, GRAY, PURPLE } from "../helpers/styles";
import { IconPress } from "./buttons";

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
      } else {
        Alert.alert("Çalma listesi boş", "Lütfen listeye şarkı ekleyin!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const PlayerButtons = () => (
    <View style={styles.playlistButtons}>
      <IconPress
        icon={faStepBackward}
        color={PURPLE}
        onPress={() => previousTrack()}
      />
      <IconPress
        icon={status.isPlaying ? faPause : faPlay}
        color={PURPLE}
        onPress={() => playPause()}
      />
      <IconPress
        icon={faStop}
        color={status.isPlaying ? PURPLE : GRAY}
        onPress={() => stopPlayer()}
      />
      <IconPress
        icon={faStepForward}
        color={PURPLE}
        onPress={() => nextTrack()}
      />
      <IconPress
        icon={faReply}
        color={status.isLooping ? PURPLE : GRAY}
        onPress={() => toggleLoop()}
      />
      <IconPress icon={faSort} color={PURPLE} onPress={() => sortPlaylist()} />
      <IconPress
        icon={faTrash}
        color={PURPLE}
        onPress={() => clearPlaylist()}
      />
    </View>
  );

  return (
    <View style={styles.bottomView}>
      {song && <Text style={{ fontSize: 18, color: PURPLE }}>{song.name}</Text>}
      {status.positionMillis > 0 && (
        <Progress.Bar
          style={{ width: "100%" }}
          color={PURPLE}
          width={null}
          height={32}
          progress={status.positionMillis / status.durationMillis}
        />
      )}
      <PlayerButtons />
    </View>
  );
};

export default Player;
