import React, { useEffect, useRef, useState } from "react";
import { Platform, ScrollView, Text, View, TextInput, FlatList } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  styles,
  turkishCompare,
  useAppContext,
  savePlaylist,
  normalize,
  show,
  error,
  ModalDialog,
} from "../helpers";
import { SongDetail, SongItem } from "../components/song";
import { IconButton, TextButton } from "../components/buttons";
import Playlists from "../components/playlists";


function tabScreenOptions(label) {
  return {
    tabBarLabel: label,
    tabBarLabelStyle: {
      fontSize: normalize(22)
    },
    tabBarIconStyle: { display: "none" }
  }
}

function ListHeader({ setFilter, title, setOrder }) {
  const [text, setText] = useState("")

  return <View style={styles.centerView}>
    <TextInput
      style={[styles.textInput, { width: "60%" }]}
      placeholder="şarkı ara"
      onChangeText={setText}
      value={text}
      fontSize={normalize(20)}
      onSubmitEditing={() => setFilter(text)}
    />
    <TextButton title={title} onPress={() => setOrder(order < 3 ? order + 1 : 0)} />
  </View>
}

const Tab = createBottomTabNavigator();

export const PlaylistScreen = ({ navigation, route }) => {
  const [order, setOrder] = useState(2);
  const [tabIndex, setTabIndex] = useState(0);
  const [filter, setFilter] = useState("");
  const [playlistName, setPlaylistName] = useState("");
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

  const toggleSong = ({ no }) => {
    if (playlist.list.find((n) => n === no)) {
      setPlaylist({
        ...playlist,
        list: [...playlist.list.filter((o) => o !== no)],
      });
    } else {
      setPlaylist({ ...playlist, list: [...playlist.list, no] });
    }
  };

  const clearPlaylist = () => {
    setPlaylist({
      list: [],
      current: null,
      index: -1,
    });
  };

  const closeSaveDialog = () => {
    setSaveDialogVisible(false);
  }

  const handleSavePlaylist = () => {
    if (playlistName) {
      savePlaylist(playlistName, playlist.list).then(() =>
        show(`${playlistName} listesi kaydedildi`)
      );
    }
    closeSaveDialog();
  };

  const openPlaylist = (name, playlist) => {
    if (playlist) {
      setPlaylist({
        name: name,
        list: playlist,
        current: null,
        index: -1,
      });
      show(`${name} listesi açıldı`);
    }
    setOpenDialogVisible(false);
  };

  const ORDER_TYPES = [
    {
      title: "A ➜ Z",
      sorter: (a, b) => turkishCompare(a.name, b.name),
    },
    {
      title: "Z ➜ A",
      sorter: (a, b) => -turkishCompare(a.name, b.name),
    },
    {
      title: "yeni ➜ eski",
      sorter: (a, b) => b.albumNo - a.albumNo,
    },
    {
      title: "eski ➜ yeni",
      sorter: (a, b) => a.albumNo - b.albumNo,
    },
  ];

  const LOOP_TYPES = [
    {
      icon: "shuffle",
      title: "liste rastgele çalınıyor",
    },
    {
      icon: "reply-all",
      title: "liste sırayla çalınıyor",
    },
    {
      icon: "undo-alt",
      title: "aynı şarkı çalınıyor",
    },
  ];

  const clearAndPlay = (song) => {
    setPlaylist({ list: [song.no], current: song, index: 0 });
    show(`Liste temizlendi ve ${song.name} şarkısı eklendi`);
  };

  const filterSongs = () => {
    return songs
      .filter((s) => s.name.toLowerCase().includes(filter.toLowerCase()))
      .sort(ORDER_TYPES[order].sorter);
  }

  const Songs = () =>
    <FlatList
      data={filterSongs()}
      renderItem={({ item }) => <SongItem
        song={item}
        selected={
          playlist.list.find((no) => no === item.no) !== undefined
        }
        highlight={highlights.includes(item.no)}
        onSwipe={() => toggleSong(item)}
        onPress={() => clearAndPlay(item)}
      />}
      keyExtractor={item => item.no}
      ListHeaderComponent={<ListHeader filter={filter} setFilter={setFilter} title={ORDER_TYPES[order].title} setOrder={setOrder} />}
    />

  const Playlist = () => <ScrollView style={styles.scrollView} persistentScrollbar>
    {playlist?.current && (
      <SongDetail
        song={playlist.current}
        openURL={(url) => {
          if (Platform.OS === "ios") {
            try {
              Linking.openURL(url);
            } catch (e) {
              error(`${url} açılamıyor: ${e}`);
            }
          } else {
            navigation.navigate("Page", { url });
          }
        }}
      />
    )}
    {playlist?.name && (
      <Text>Şu an açık olan liste: {playlist.name}</Text>
    )}
    <View style={styles.centerView}>
      <IconButton
        icon={"folder-open"}
        onPress={() => setOpenDialogVisible(true)}
        title="aç"
      />
      <IconButton
        icon={"save"}
        onPress={() => setSaveDialogVisible(true)}
        title="kaydet"
      />
      <IconButton
        icon={"trash"}
        onPress={clearPlaylist}
        title="temizle"
      />
    </View>
    <IconButton
      {...LOOP_TYPES[loop]}
      onPress={() => setLoop(loop < 2 ? loop + 1 : 0)}
    />
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

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="şarkılar" component={Songs} options={tabScreenOptions("Şarkılar")} />
        <Tab.Screen name="çalma listesi" component={Playlist} options={tabScreenOptions("Çalma Listesi")} />
      </Tab.Navigator>
      <Playlists open={openPlaylist} visible={openDialogVisible} />
      <ModalDialog onDismiss={closeSaveDialog} visible={saveDialogVisible}>
        <TextInput placeholder="Listenin adını giriniz:" value={playlistName} style={styles.textInput}
          onChangeText={(value) => setPlaylistName(value)} />
        <View style={styles.itemStyle}>
          <IconButton
            icon={"save"}
            title="Kaydet"
            onPress={handleSavePlaylist}
          />
          <IconButton
            icon={"window-close"}
            title="İptal"
            onPress={closeSaveDialog}
          />
        </View>
      </ModalDialog>
    </>
  );
};

export default PlaylistScreen;
