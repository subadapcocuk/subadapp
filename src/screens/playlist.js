import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-root-toast";
import {
  faFilter,
  faFolderOpen,
  faRandom,
  faReplyAll,
  faSave,
  faSortAlphaDown,
  faSortAlphaUp,
  faSortDown,
  faSortUp,
  faTrash,
  faUndoAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Picker } from "@react-native-picker/picker";
import {
  confirm,
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

export const Playlist = ({ navigation }) => {
  const [order, setOrder] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [filter, setFilter] = useState("");
  const [saveDialogVisible, setSaveDialogVisible] = useState(false);
  const [openDialogVisible, setOpenDialogVisible] = useState(false);
  const { playlist, setPlaylist, loop, setLoop, songs } = useAppContext();

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
    Toast.show("Liste temizlendi");
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
        return filtered.sort((a, b) => turkishCompare(a.name, b.name));
      case 1:
        return filtered.sort((a, b) => -turkishCompare(a.name, b.name));
      case 2:
        return filtered.sort((a, b) => a.albumNo < b.albumNo);
    }
    return filtered;
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
    confirm(
      "Liste temizleme uyarısı",
      "Liste temizlenecek bu şarkı listeye eklenerek çalınacak, devam etmek istediğinizden emin misiniz?",
      () => {
        setPlaylist({ list: [song.no], current: song, index: 0 });
        Toast.show(`Liste temizlendi ve ${song.name} şarkısı eklendi`);
      }
    );
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
            <View style={styles.centerView}>
              <TextInputIcon
                icon={faFilter}
                placeholder={"şarkı ara"}
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
            {playlist?.name && (
              <Text>Şu an açık olan liste: {playlist.name}</Text>
            )}
            <View style={styles.centerView}>
              <IconPress
                icon={faFolderOpen}
                size={20}
                onPress={() => setOpenDialogVisible(true)}
                text="liste aç"
              />
              <IconPress
                icon={faSave}
                size={20}
                onPress={() => setSaveDialogVisible(true)}
                text="liste kaydet"
              />
              <IconPress
                icon={faTrash}
                size={20}
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
                />
              ))}
            </Picker>
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
      <Playlists open={handleOpenPlaylist} visible={openDialogVisible} />
      {saveDialogVisible && (
        <PromptDialog
          description="Lütfen listenin adını giriniz"
          initialValue={playlist?.name}
          save={handleSavePlaylist}
        />
      )}
    </>
  );
};

export default Playlist;
