import React, { useState } from "react";
import { ScrollView } from "react-native";
import Toast from "react-native-root-toast";
import { getSongs } from "../api/data";
import { randomInt } from "../helpers/";
import Player from "../components/player";
import { SongDetail, SongItem } from "../components/song";
import { AnimatedTabView, Tabs, TabViewItem } from "../components/tabs";
import { faSort, faTrash } from "@fortawesome/free-solid-svg-icons";
import { IconPress } from "../components/buttons";

export const Playlist = ({ navigation }) => {
  const [playlist, setPlaylist] = useState({
    list: [],
    current: null,
    index: -1,
  });
  const [order, setOrder] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);

  const songs = getSongs();

  const toggleSong = ({ name, no }) => {
    if (playlist.list.find((n) => n === no)) {
      setPlaylist({
        ...playlist,
        list: [...playlist.list.filter((o) => o !== no)],
      });
      Toast.show(`${name} listeden kaldırıldı`);
    } else {
      setPlaylist({ ...playlist, list: [...playlist.list, no] });
      Toast.show(`${name} listeye eklendi`);
    }
  };

  const clearPlaylist = () => {
    setPlaylist({
      list: [],
      current: null,
      index: -1,
    });
    Toast.show("Çalma listesi temizlendi");
  };

  const ORDER = ["alfabetik", "ters alfabetik", "yeni albümden eski albüme", "eski albümden yeni albüme"];
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

  const randomTrack = () => {
    if (playlist.list.length > 0) {
      const index = randomInt(playlist.list.length);
      setPlaylist({
        ...playlist,
        index: index,
        current: songs.filter((s) => s.no === playlist.list[index])[0],
      });
    } else {
      setPlaylist({
        current: songs[randomInt(songs.length)],
        index: -1,
      });
    }
  };

  const previousTrack = () => {
    const index =
      playlist.index > 0 ? playlist.index - 1 : playlist.list.length - 1;
    const current = songs.filter((s) => s.no === playlist.list[index])[0];
    setPlaylist({ ...playlist, ...{ index, current } });
  };

  const nextTrack = () => {
    const index =
      playlist.index + 1 < playlist.list.length ? playlist.index + 1 : 0;
    const current = songs.filter((s) => s.no === playlist.list[index])[0];
    setPlaylist({ ...playlist, ...{ index, current } });
  };

  const clearAndPlay = (song) => {
    setPlaylist({ list: [song.no], current: song, index: 0 });
    Toast.show(`Çalma listesi temizlendi ve ${song.name} şarkısı eklendi`);
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
          <>
            <IconPress
              icon={faSort}
              onPress={() => setOrder(order < 3 ? order + 1 : 0)}
              text={`Sırayı Değiştir (şu an ${ORDER[order]})`}
              size={24}
            />
            <ScrollView>
              {sortSongs().map((item) => (
                <SongItem
                  key={`playlist_song_${item.no}`}
                  song={item}
                  selected={
                    playlist.list.find((no) => no === item.no) !== undefined
                  }
                  onLeftOpen={() => toggleSong(item)}
                  onPress={() => clearAndPlay(item)}
                />
              ))}
            </ScrollView>
          </>
        </TabViewItem>
        <TabViewItem selected={tabIndex === 1}>
          <ScrollView>
            <SongDetail
              song={playlist.current}
              openUrl={(url) => {
                navigation.navigate("Page", { url });
              }}
            />
            {playlist.current && (
              <IconPress
                icon={faTrash}
                size={24}
                onPress={clearPlaylist}
                text="Listeyi temizle"
              />
            )}
            {playlist.list.map((no, index) => {
              const item = songs.filter((s) => no === s.no)[0];
              return (
                <SongItem
                  key={`playlist_detail_${no}`}
                  song={item}
                  selected={no === playlist?.current?.no}
                  onRightOpen={() => toggleSong(item)}
                  onPress={() =>
                    setPlaylist({ ...playlist, current: item, index: index })
                  }
                />
              );
            })}
          </ScrollView>
        </TabViewItem>
      </AnimatedTabView>
      <Player
        song={playlist?.current}
        {...{ nextTrack, previousTrack, randomTrack }}
      />
    </>
  );
};

export default Playlist;
