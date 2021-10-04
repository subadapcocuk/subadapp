import React, { useEffect, useState } from "react";
import { Alert, View, Text, Image, FlatList } from "react-native";
import { Audio } from "expo-av";
import {
  faPause,
  faPlay,
  faReply,
  faStop,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import * as Progress from "react-native-progress";
import { styles, GRAY, songStyle, songText, PURPLE } from "../helpers/styles";
import { IconPress } from "./buttons";
import { getAlbums, getSongs } from "../api/data";
import { Swipeable } from "react-native-gesture-handler";

const Player = () => {
  // https://github.com/expo/playlist-example/blob/master/App.js
  const [status, setStatus] = useState({});
  const [currentSong, setCurrentSong] = useState(-1);
  const [playlist, setPlaylist] = useState([]);

  const player = React.useRef(new Audio.Sound());

  const onPlaybackStatusUpdate = (status) => {
    setStatus(status);
    if (status.didJustFinish) {
      playSong();
    }
  };

  player.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

  const songs = getSongs();
  const albums = getAlbums();

  const addSong = (song) => {
    setPlaylist([...playlist, song]);
  };

  const removeSong = (song) => {
    setPlaylist(playlist.filter((o) => o !== song));
  };

  const clearPlaylist = () => {
    setPlaylist([]);
  };

  const getAlbumTitle = (no) => {
    try {
      const album = albums.filter((a) => a.no === no)[0];
      return `${album.name} - ${album.releaseYear}`;
    } catch (e) {
      console.error(e);
      return "";
    }
  };

  const getSongTitle = (song) => {
    return `${song.name} (${getAlbumTitle(song.albumNo)})`;
  };

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

  const playPause = async () => {
    const result = await player.current.getStatusAsync();
    if (result.isLoaded) {
      if (result.isPlaying) {
        player.current.pauseAsync();
      } else {
        player.current.playAsync();
      }
    } else {
      playSong();
    }
  };

  const toggleLoop = () => {
    player.current.setIsLoopingAsync(!status.isLooping);
  };

  const stopPlayer = () => {
    player.current.stopAsync();
  };

  useEffect(() => {
    console.log("currentSong", currentSong);
    console.log("current playlist", playlist);
  }, [currentSong, playlist]);

  const playSong = async () => {
    try {
      //unload previous song
      await player.current.unloadAsync();
      const nextSong = currentSong < playlist.length ? currentSong + 1 : 0;
      const song = songs[playlist[nextSong]];
      setCurrentSong(nextSong);
      if (song) {
        await player.current.loadAsync(
          { uri: song.url },
          {
            shouldPlay: true,
            rate: status.rate,
            shouldCorrectPitch: status.shouldCorrectPitch,
            volume: status.volume,
            isMuted: status.muted,
            isLooping: status.loopingType,
          }
        );
      } else {
        Alert.alert("Çalma listesi boş", "Lütfen listeye şarkı ekleyin!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Song = ({ song, selected = false }) => {
    return (
      <View style={songStyle(selected)}>
        <Image style={styles.playlistImage} source={{ uri: song.image }} />
        <Text style={songText(selected)}>{getSongTitle(song)}</Text>
      </View>
    );
  };

  const renderSong = ({ item, index }) => {
    return (
      <Swipeable
        renderLeftActions={() => <Song song={item} selected />}
        onSwipeableLeftOpen={() => addSong(index)}
        onSwipeableClose={() => removeSong(index)}
      >
        <Song song={item} />
      </Swipeable>
    );
  };

  const PlayerButtons = () => (
    <View style={styles.playlistButtons}>
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
        icon={faReply}
        color={status.isLooping ? PURPLE : GRAY}
        onPress={() => toggleLoop()}
      />
      <IconPress
        icon={faTrash}
        color={PURPLE}
        onPress={() => clearPlaylist()}
      />
    </View>
  );

  return (
    <>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.name}
        renderItem={renderSong}
      />
      <View style={styles.bottomView}>
        {currentSong > -1 && (
          <Text style={{ fontSize: 18, color: PURPLE }}>
            {getSongTitle(songs[playlist[currentSong]])}
          </Text>
        )}
        {status && (
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
    </>
  );
};

export default Player;
