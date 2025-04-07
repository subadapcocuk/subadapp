import React, { useEffect, useState } from "react";
import { Platform, ScrollView, Text, View, TextInput } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import { IconPress, TextInputIcon } from "../components/buttons";
import Playlists from "../components/playlists";


function tabScreenOptions(label) {
  return {
    tabBarLabel: label,
    tabBarLabelPosition: "beside-icon",
    tabBarLabelStyle: {
      fontSize: normalize(22)
    },
    tabBarIconStyle: { display: "none" }
  }
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

  const toggleSong = ({ name, no }) => {
    if (playlist.list.find((n) => n === no)) {
      setPlaylist({
        ...playlist,
        list: [...playlist.list.filter((o) => o !== no)],
      });
      show(`${name} listeden kaldırıldı`);
    } else {
      setPlaylist({ ...playlist, list: [...playlist.list, no] });
      show(`${name} listeye eklendi`);
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

  const sortSongs = () => {
    return songs
      .filter((s) => s.name.toLowerCase().includes(filter.toLowerCase()))
      .sort(ORDER_TYPES[order].sorter);
  };

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

  const Songs = () => <>
    <View style={styles.centerView}>
      <TextInputIcon
        placeholder={"şarkı ara"}
        onChangeText={setFilter}
        value={filter}
        style={{ width: "60%" }}
        fontSize={normalize(24)}
      />
      <IconPress
        {...ORDER_TYPES[order]}
        onPress={() => setOrder(order < 3 ? order + 1 : 0)}
      />
    </View>
    <ScrollView style={styles.scrollView} persistentScrollbar>
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
      <IconPress
        icon={"folder-open"}
        onPress={() => setOpenDialogVisible(true)}
        title="aç"
      />
      <IconPress
        icon={"save"}
        onPress={() => setSaveDialogVisible(true)}
        title="kaydet"
      />
      <IconPress
        icon={"trash"}
        onPress={clearPlaylist}
        title="temizle"
      />
    </View>
    <IconPress
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
          <IconPress
            icon={"save"}
            title="Kaydet"
            onPress={handleSavePlaylist}
          />
          <IconPress
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
