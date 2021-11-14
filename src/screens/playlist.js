import React, { useCallback, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, View } from "react-native";
import Toast from "react-native-root-toast";
import Player from "../components/player";
import { SongItem, SongDetail } from "../components/song";
import { getSongs } from "../api/data";
import { AnimatedTabView, Tabs, TabViewItem } from "../components/tabs";

export const Playlist = ({ navigation }) => {
  const [playlist, setPlaylist] = useState([]);
  const [order, setOrder] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);

  const songs = getSongs();

  const openUrl = (url) => {
    navigation.navigate("Page", { url });
  };

  const toggleSong = ({ name, no }) => {
    if (playlist.find((n) => n === no)) {
      setPlaylist(playlist.filter((o) => o !== no));
      Toast.show(`${name} listeden kaldırıldı`);
    } else {
      setPlaylist([...playlist, no]);
      Toast.show(`${name} listeye eklendi`);
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

  const renderSong = ({ item }) => (
    <SongItem
      song={item}
      selected={playlist.find((no) => no === item.no) !== undefined}
      onLeftOpen={() => toggleSong(item)}
    />
  );

  const songKeyExtractor = useCallback((item) => item.no, []);

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
    setCurrentIndex(currentIndex + 1 < playlist.length ? currentIndex + 1 : 0);
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
          <FlatList
            keyExtractor={songKeyExtractor}
            data={sortSongs()}
            renderItem={renderSong}
          />
        </TabViewItem>
        <TabViewItem selected={tabIndex === 1}>
          <ScrollView>
            <SongDetail {...{ song, openUrl }} />
            {playlist.map((no, index) => {
              const item = songs.filter((s) => no === s.no)[0];
              return (
                <SongItem
                  key={`playlist_detail_${index}`}
                  song={item}
                  selected={no === song.no}
                  onRightOpen={() => toggleSong(item)}
                  onPress={() => setCurrentIndex(index)}
                />
              );
            })}
          </ScrollView>
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
