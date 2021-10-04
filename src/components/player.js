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
  const [status, setStatus] = useState({});
  const [player, setPlayer] = useState();
  const [currentSong, setCurrentSong] = useState(-1);
  const [playlist, setPlaylist] = useState([]);

  const songs = getSongs();
  const albums = getAlbums();

  const addSong = (song) => {
    console.log("add song");
    setPlaylist([...playlist, song]);
  };

  const removeSong = (song) => {
    console.log("remove song");
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
    player && player.setIsLoopingAsync(!status.isLooping);
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

  useEffect(() => {
    console.log("currentSong", currentSong);
    console.log("current playlist", playlist);
  }, [currentSong]);

  const playSong = async () => {
    try {
      //unload previous song
      player && (await player.unloadAsync());
      const nextSong = currentSong < playlist.length ? currentSong + 1 : 0;
      const song = songs[playlist[nextSong]];
      setCurrentSong(nextSong);
      if (song) {
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
        {status?.positionMillis > 0 && (
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
