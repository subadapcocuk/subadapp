import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import Toast from "react-native-root-toast";
import { getSongs } from "../api/data";
import { randomInt, styles, LoopType } from "../helpers/";
import Player from "../components/player";
import { SongDetail, SongItem } from "../components/song";
import { AnimatedTabView, Tabs, TabViewItem } from "../components/tabs";
import {
  faFilter,
  faRandom,
  faReplyAll,
  faSortAlphaDown,
  faSortAlphaUp,
  faSortDown,
  faSortUp,
  faTrash,
  faUndoAlt,
} from "@fortawesome/free-solid-svg-icons";
import { IconPress, TextInputIcon } from "../components/buttons";

export const Playlist = ({ navigation }) => {
  const [playlist, setPlaylist] = useState({
    list: [],
    current: null,
    index: -1,
  });
  const [order, setOrder] = useState(0);
  const [loop, setLoop] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [filter, setFilter] = useState("");

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

  const ORDER_TYPES = [
    {
      icon: faSortAlphaDown,
      text: "A'dan Z'ye",
    },
    {
      icon: faSortAlphaUp,
      text: "Z'den A'ya",
    },
    {
      icon: faSortDown,
      text: "yeniden eskiye",
    },
    {
      icon: faSortUp,
      text: "eskiden yeniye",
    },
  ];

  const sortSongs = () => {
    const filtered = songs.filter((s) =>
      s.name.toLowerCase().includes(filter.toLowerCase())
    );
    switch (order) {
      case 0:
        return filtered.sort((a, b) => a.name > b.name);
      case 1:
        return filtered.sort((a, b) => a.name < b.name);
      case 2:
        return filtered.sort((a, b) => a.albumNo < b.albumNo);
      default:
        return filtered;
    }
  };

  const LOOP_TYPES = [
    {
      icon: faRandom,
      text: "liste rastgele çalınıyor",
    },
    {
      icon: faReplyAll,
      text: "liste sırayla çalınıyor",
    },
    {
      icon: faUndoAlt,
      text: "şarkı tekrarlanıyor",
    },
  ];

  const randomTrack = () => {
    if (playlist.list.length > 0) {
      const index = randomInt(playlist.list.length);
      setPlaylist({
        ...playlist,
        current: songs.filter((s) => s.no === playlist.list[index])[0],
        index: index,
      });
    } else {
      setPlaylist({
        ...playlist,
        current: songs[randomInt(songs.length)],
        index: -1,
      });
    }
  };

  const previousTrack = () => {
    if (loop === LoopType.RandomList) {
      randomTrack();
    } else if (loop === LoopType.FollowList) {
      const index =
        playlist.index > 0 ? playlist.index - 1 : playlist.list.length - 1;
      const current = songs.filter((s) => s.no === playlist.list[index])[0];
      setPlaylist({ ...playlist, ...{ index, current } });
    }
  };

  const nextTrack = () => {
    if (loop === LoopType.RandomList) {
      randomTrack();
    } else if (loop === LoopType.FollowList) {
      const index =
        playlist.index + 1 < playlist.list.length ? playlist.index + 1 : 0;
      const current = songs.filter((s) => s.no === playlist.list[index])[0];
      setPlaylist({ ...playlist, ...{ index, current } });
    }
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
            <View style={styles.button}>
              <TextInputIcon
                icon={faFilter}
                placeholder={"listeyi süzün"}
                onChangeText={setFilter}
                value={filter}
                style={{ width: "65%" }}
              />
              <IconPress
                {...ORDER_TYPES[order]}
                onPress={() => setOrder(order < 3 ? order + 1 : 0)}
              />
            </View>
            <ScrollView persistentScrollbar>
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
          <ScrollView persistentScrollbar>
            {playlist?.current && (
              <SongDetail
                song={playlist.current}
                openUrl={(url) => {
                  navigation.navigate("Page", { url });
                }}
              />
            )}
            {playlist.list.length > 0 && (
              <View style={styles.button}>
                <IconPress
                  {...LOOP_TYPES[loop]}
                  onPress={() => setLoop(loop < 2 ? loop + 1 : 0)}
                  style={{ width: "50%" }}
                />
                <IconPress
                  icon={faTrash}
                  size={24}
                  onPress={clearPlaylist}
                  text="listeyi temizle"
                />
              </View>
            )}
            {playlist?.list.map((no, index) => {
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
        loopType={loop}
        {...{ nextTrack, previousTrack, randomTrack }}
      />
    </>
  );
};

export default Playlist;
