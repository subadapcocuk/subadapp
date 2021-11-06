import React, { useState } from "react";
import { FlatList, View } from "react-native";
import Player from "../components/player";
import { SongItem, SongDetail } from "../components/song";
import { deviceWidth } from "../helpers/styles";
import { getSongs } from "../api/data";
import { AnimatedTabView, Tabs, TabViewItem } from "../components/tabs";

export const Playlist = ({ navigation }) => {
  const [playlist, setPlaylist] = useState([]);
  const [order, setOrder] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);

  const songs = getSongs();

  const addSong = (no) => {
    setPlaylist([...playlist, no]);
  };

  const removeSong = (no) => {
    setPlaylist(playlist.filter((o) => o !== no));
  };

  const openUrl = (url) => {
    navigation.navigate("Page", { url });
  };

  const toggleSong = (no) => {
    if (playlist.find((n) => n === no)) {
      removeSong(no);
    } else {
      addSong(no);
    }
  };

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

  const song = songs.filter((s) => s.no === playlist[currentIndex])[0];

  const PlaylistDetail = () => (
    <View style={{ width: deviceWidth }}>
      <SongDetail {...{ song, openUrl }} />
      <FlatList
        keyExtractor={(item) => item}
        data={playlist}
        renderItem={({ item, index }) => (
          <SongItem
            song={songs.filter((s) => item === s.no)[0]}
            selected={item === song.no}
            toggle={toggleSong}
            play={() => setCurrentIndex(index)}
          />
        )}
      />
    </View>
  );

  const Songlist = () => (
    <FlatList
      keyExtractor={(item) => item.no}
      style={{ width: deviceWidth }}
      data={sortSongs()}
      renderItem={({ item }) => (
        <SongItem
          song={item}
          selected={playlist.find((no) => no === item.no) !== undefined}
          toggle={toggleSong}
        />
      )}
    />
  );

  const clearPlaylist = () => {
    setPlaylist([]);
  };

  const sortPlaylist = () => {
    setOrder(order < 3 ? order + 1 : 0);
  };

  const previousTrack = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : playlist.length - 1);
  };

  const nextTrack = () => {
    setCurrentIndex(currentIndex < playlist.length - 1 ? currentIndex + 1 : 0);
  };

  return (
    <>
      <Tabs
        value={tabIndex}
        onChange={setTabIndex}
        titles={["Şarkılar", "Çalma Listesi"]}
      />
      <AnimatedTabView value={tabIndex} onChange={setTabIndex}>
        <TabViewItem selected={tabIndex === 0}>
          <Songlist />
        </TabViewItem>
        <TabViewItem selected={tabIndex === 1}>
          <PlaylistDetail />
        </TabViewItem>
      </AnimatedTabView>
      <Player
        {...{
          song,
          clearPlaylist,
          sortPlaylist,
          previousTrack,
          nextTrack,
        }}
      />
    </>
  );
};

export default Playlist;
