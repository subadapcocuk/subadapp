import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Audio } from "expo-av";
import { faPause, faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { getAlbums } from "../api/data";
import Album from "./album";
import { styles, BLUE, GRAY } from "./styles";
import { IconPress } from "./buttons";

const Player = () => {
  //TODO: Kapsamlı playlist: https://github.com/expo/playlist-example/blob/master/App.js
  const [status, setStatus] = useState({});
  const [player, setPlayer] = useState();

  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    playThroughEarpieceAndroid: false,
  });

  const onPlayPausePressed = () => {
    if (player != null) {
      if (status.isPlaying) {
        player.pauseAsync();
      } else {
        player.playAsync();
      }
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setStatus(status);
    }
    if (status.didJustFinish && !status.isLooping) {
      //unload previous song
      player && player.unloadAsync();
      setStatus(status);
    }
  };

  const playSong = async (url) => {
    try {
      //stop previous song
      player && (await player.unloadAsync());
      // start the new one
      const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        {
          shouldPlay: true,
          rate: status.rate,
          shouldCorrectPitch: status.shouldCorrectPitch,
          volume: status.volume,
          isMuted: status.muted,
          //isLooping: status.loopingType === LOOPING_TYPE_ONE
        },
        onPlaybackStatusUpdate
      );
      setPlayer(sound);
    } catch (error) {
      console.error(error);
    }
  };

  const onStopPressed = () => {
    player && player.stopAsync();
  };

  const albums = getAlbums();

  return (
    <>
      <ScrollView horizontal pagingEnabled>
        {albums &&
          albums.map((album, index) => (
            <Album
              key={`subadap_album_${index}`}
              {...album}
              playSong={playSong}
              stopSong={onStopPressed}
            />
          ))}
      </ScrollView>
      <View style={styles.centerView}>
        {/*<IconPress icon={faRedo} onPress={() => toggleRepeat()} />*/}
        <IconPress
          icon={status.isPlaying ? faPause : faPlay}
          color={BLUE}
          onPress={() => onPlayPausePressed()}
        />
        <IconPress
          icon={faStop}
          color={status.isPlaying ? BLUE : GRAY}
          onPress={() => onStopPressed()}
        />
      </View>
    </>
  );
};

export default Player;
