import React, { useState } from "react";
import { Alert, ScrollView, View, Text } from "react-native";
import { Audio } from "expo-av";
import {
  faPause,
  faPlay,
  faReply,
  faStop,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Album from "./album";
import { styles, BLUE, GRAY } from "../helpers/styles";
import { IconPress } from "./buttons";
import { useAppContext } from "../services/context";

const Player = ({ openUrl }) => {
  const { albums, getNextSong, clearPlaylist } = useAppContext();
  const [status, setStatus] = useState({});
  const [player, setPlayer] = useState();
  const [currentSong, setCurrentSong] = useState();

  const getAlbumName = (albumNo) => {
    try {
      return albums.filter((a) => a.no === albumNo)[0].name;
    } catch (e) {
      console.error(e);
      return "";
    }
  };

  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    playThroughEarpieceAndroid: false,
  });

  const playPause = () => {
    if (player != null) {
      if (status.isPlaying) {
        player.pauseAsync();
      } else {
        player.playAsync();
      }
    } else {
      playSong();
    }
  };

  const toggleLoop = () => {
    if (player != null) {
      player.setIsLoopingAsync(!status.isLooping);
    }
  };

  const stopPlayer = () => {
    player && player.stopAsync();
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setStatus(status);
    }
    if (status.didJustFinish && !status.isLooping) {
      playSong();
      setStatus(status);
    }
  };

  const playSong = async () => {
    try {
      //stop previous song
      player && (await player.unloadAsync());
      const song = getNextSong();
      if (song) {
        // start the new one
        const { sound } = await Audio.Sound.createAsync(
          { uri: song.url },
          {
            shouldPlay: true,
            rate: status.rate,
            shouldCorrectPitch: status.shouldCorrectPitch,
            volume: status.volume,
            isMuted: status.muted,
            isLooping: status.loopingType,
          },
          onPlaybackStatusUpdate
        );
        setPlayer(sound);
        setCurrentSong(`${song.name} (${getAlbumName(song.albumNo)})`);
      } else {
        Alert.alert("Çalma listesi boş", "Lütfen listeye şarkı ekleyin!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ScrollView horizontal pagingEnabled>
        {albums &&
          albums.map((album, index) => (
            <Album key={`subadap_album_${index}`} {...{ album, openUrl }} />
          ))}
      </ScrollView>
      {currentSong && (
        <View style={styles.centerView}>
          <Text>{currentSong}</Text>
        </View>
      )}
      <View style={styles.centerView}>
        <IconPress
          icon={status.isPlaying ? faPause : faPlay}
          color={BLUE}
          onPress={() => playPause()}
        />
        <IconPress
          icon={faStop}
          color={status.isPlaying ? BLUE : GRAY}
          onPress={() => stopPlayer()}
        />
        <IconPress
          icon={faReply}
          color={status.isLooping ? BLUE : GRAY}
          onPress={() => toggleLoop()}
        />
        <IconPress
          icon={faTrash}
          color={BLUE}
          onPress={() => clearPlaylist()}
        />
      </View>
    </>
  );
};

export default Player;
