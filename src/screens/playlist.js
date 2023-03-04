import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-root-toast";
import {
  faFolderOpen,
  faRandom,
  faReplyAll,
  faSave,
  faSortAlphaDown,
  faSortAlphaDownAlt,
  faSortDown,
  faSortUp,
  faTrash,
  faUndoAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Picker } from "@react-native-picker/picker";
import {
  styles,
  turkishCompare,
  useAppContext,
  savePlaylist,
} from "../helpers";
import { SongDetail, SongItem } from "../components/song";
import { AnimatedTabView, Tabs, TabViewItem } from "../components/tabs";
import { IconPress, TextInputIcon } from "../components/buttons";
import PromptDialog from "../components/prompt";
import Playlists from "../components/playlists";

export const Playlist = ({ navigation, route }) => {
  const [order, setOrder] = useState(2);
  const [tabIndex, setTabIndex] = useState(0);
  const [filter, setFilter] = useState("");
  const [saveDialogVisible, setSaveDialogVisible] = useState(false);
  const [openDialogVisible, setOpenDialogVisible] = useState(false);
  const { playlist, setPlaylist, loop, setLoop, songs, highlights } =
    useAppContext();

  useEffect(() => {
    if (tabIndex !== route.params?.tabIndex)
      setTabIndex(route.params?.tabIndex);
    if (!tabIndex) setTabIndex(0);
    if (route.params?.song) {
      const toPlay = songs.filter((s) => s.no == route.params.song);
      if (toPlay.length > 0) {
        clearAndPlay(toPlay[0]);
      }
    }
  }, [route.params]);

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
  };

  const handleSavePlaylist = (playlistName) => {
    if (playlistName) {
      savePlaylist(playlistName, playlist.list);
      Toast.show(`${playlistName} listesi kaydedildi`);
    }
    setSaveDialogVisible(false);
  };

  const handleOpenPlaylist = (name, playlist) => {
    if (playlist) {
      setPlaylist({
        name: name,
        list: playlist,
        current: null,
        index: -1,
      });
      Toast.show(`${name} listesi açıldı`);
    }
    setOpenDialogVisible(false);
  };

  const ORDER_TYPES = [
    {
      icon: faSortAlphaDown,
      text: "A ➜ Z",
      sorter: (a, b) => turkishCompare(a.name, b.name),
    },
    {
      icon: faSortAlphaDownAlt,
      text: "Z ➜ A",
      sorter: (a, b) => -turkishCompare(a.name, b.name),
    },
    {
      icon: faSortDown,
      text: "yeni ➜ eski",
      sorter: (a, b) => b.albumNo - a.albumNo,
    },
    {
      icon: faSortUp,
      text: "eski ➜ yeni",
      sorter: (a, b) => a.albumNo - b.albumNo,
    },
  ];

  const sortSongs = () => {
    return songs
      .filter((s) => s.name.toLowerCase().includes(filter.toLowerCase()))
      .sort(ORDER_TYPES[order].sorter);
  };

  const LOOP_TYPES = [
    {
      icon: faRandom,
      text: "listeyi rastgele çal",
    },
    {
      icon: faReplyAll,
      text: "listeyi sırayla çal",
    },
    {
      icon: faUndoAlt,
      text: "aynı şarkıyı çal",
    },
  ];

  const clearAndPlay = (song) => {
    setPlaylist({ list: [song.no], current: song, index: 0 });
    Toast.show(`Liste temizlendi ve ${song.name} şarkısı eklendi`);
  };

  return (
    <>
      <Tabs
        value={tabIndex}
        onChange={setTabIndex}
        titles={["Şarkılar", "Çalma Listesi"]}
      />
      <AnimatedTabView value={tabIndex} onChange={setTabIndex}>
        <TabViewItem
          selected={tabIndex === 0}
          accessibilityLabel={"Tüm Şarkıların Listesi"}
        >
          <>
            <View style={styles.centerView}>
              <TextInputIcon
                placeholder={"şarkı ara"}
                onChangeText={setFilter}
                value={filter}
                style={{ width: "60%" }}
                fontSize={20}
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
                  highlight={highlights.includes(item.no)}
                  onSwipe={() => toggleSong(item)}
                  onPress={() => clearAndPlay(item)}
                />
              ))}
            </ScrollView>
          </>
        </TabViewItem>
        <TabViewItem
          selected={tabIndex === 1}
          accessibilityLabel={"Oynatma Listesi"}
        >
          <ScrollView persistentScrollbar>
            {playlist?.current && (
              <SongDetail
                song={playlist.current}
                openUrl={(url) => {
                  navigation.navigate("Page", { url });
                }}
              />
            )}
            {playlist?.name && (
              <Text>Şu an açık olan liste: {playlist.name}</Text>
            )}
            <View style={styles.centerView}>
              <IconPress
                icon={faFolderOpen}
                onPress={() => setOpenDialogVisible(true)}
                text="aç"
              />
              <IconPress
                icon={faSave}
                onPress={() => setSaveDialogVisible(true)}
                text="kaydet"
              />
              <IconPress
                icon={faTrash}
                onPress={clearPlaylist}
                text="temizle"
              />
            </View>
            <Picker
              style={{ margin: "auto" }}
              selectedValue={loop}
              onValueChange={(value) => {
                setLoop(value);
              }}
            >
              {LOOP_TYPES.map((item, index) => (
                <Picker.Item
                  key={`LoopType_${item.text}_${index}`}
                  label={item.text}
                  value={index}
                  style={{ fontSize: 20 }}
                />
              ))}
            </Picker>
            {playlist?.list.map((no, index) => {
              const item = songs.filter((s) => no === s.no)[0];
              return (
                <SongItem
                  key={`playlist_detail_${no}`}
                  song={item}
                  playing={no === playlist?.current?.no}
                  onSwipe={() => toggleSong(item)}
                  onPress={() =>
                    setPlaylist({ ...playlist, current: item, index: index })
                  }
                />
              );
            })}
          </ScrollView>
        </TabViewItem>
      </AnimatedTabView>
      <Playlists open={handleOpenPlaylist} visible={openDialogVisible} />
      {saveDialogVisible && (
        <PromptDialog
          description="Listenin adını giriniz"
          initialValue={playlist?.name}
          save={handleSavePlaylist}
        />
      )}
    </>
  );
};

export default Playlist;
