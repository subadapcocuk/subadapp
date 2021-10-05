import React, { useEffect, useState } from "react";
import { Alert, View, Text, TouchableOpacity, ScrollView } from "react-native";
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
import { styles, GRAY, PURPLE, deviceWidth } from "../helpers/styles";
import { IconPress } from "./buttons";
import { getSongs, getSongTitle } from "../api/data";
import { SongItem, SongDetail } from "./song";

const Player = ({ openUrl }) => {
  // https://github.com/expo/playlist-example/blob/master/App.js
  const [status, setStatus] = useState({});
  const [playlist, setPlaylist] = useState([]);
  const [order, setOrder] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const player = React.useRef(new Audio.Sound());

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setStatus(status);
    }
    if (status.didJustFinish) {
      playSong();
    }
  };

  const songs = getSongs();

  const addSong = (no) => {
    setPlaylist([...playlist, no]);
  };

  const removeSong = (no) => {
    setPlaylist(playlist.filter((o) => o !== no));
  };

  const toggleSong = (no) => {
    if (playlist.find((n) => n === no)) {
      removeSong(no);
    } else {
      addSong(no);
    }
  };

  const clearPlaylist = () => {
    setPlaylist([]);
  };

  const sortPlaylist = () => {
    setOrder(order < 3 ? order + 1 : 0);
  };

  const previousTrack = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : playlist.length - 1);
    playSong();
  };

  const nextTrack = () => {
    setCurrentIndex(currentIndex < playlist.length - 1 ? currentIndex + 1 : 0);
    playSong();
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
    console.log("currentIndex", currentIndex);
    console.log("current playlist", playlist);
  }, [currentIndex, playlist]);

  const playSong = async () => {
    try {
      //unload previous song
      await player.current.unloadAsync();
      const song = songs[playlist[currentIndex]];
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
            progressUpdateIntervalMillis: 1000,
          }
        );
        player.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        setCurrentIndex(
          currentIndex < playlist.length - 1 ? currentIndex + 1 : 0
        );
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

  const sortSongs = () => {
    switch (order) {
      case 0:
        return songs.slice().sort((a, b) => a.name > b.name);
      case 1:
        return songs.slice().sort((a, b) => a.name < b.name);
      case 2:
        return songs.slice().sort((a, b) => a.albumNo < b.albumNo);
      default:
        return songs;
    }
  };

  const song = songs.find((s) => s.no === playlist[currentIndex]);

  return (
    <>
      <ScrollView horizontal pagingEnabled>
        <ScrollView style={{ width: deviceWidth }}>
          {sortSongs().map((s) => {
            const inPlaylist = playlist.find((no) => no === s.no) !== undefined;
            return (
              <TouchableOpacity
                key={`subadap_sarki_${s.no}_${s.name}`}
                onPress={() => toggleSong(s.no)}
              >
                <SongItem song={s} selected={inPlaylist} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <SongDetail {...{ song, openUrl }} />
      </ScrollView>
      <View style={styles.bottomView}>
        {song && (
          <Text style={{ fontSize: 18, color: PURPLE }}>
            {getSongTitle(song)}
          </Text>
        )}
        {/*status.positionMillis > 0 && (
          <Progress.Bar
            style={{ width: "100%" }}
            color={PURPLE}
            width={null}
            height={32}
            progress={status.positionMillis / status.durationMillis}
          />
        )*/}
        <PlayerButtons />
      </View>
    </>
  );
};

export default Player;
