import { useEffect, useState, useMemo } from "react";
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View, TextInput } from "react-native";
import * as Linking from "expo-linking";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import {
  styles,
  turkishCompare,
  useAppContext,
  savePlaylist,
  normalize,
  show,
  ModalDialog,
} from "../helpers";
import { SongDetail, SongItem } from "../components/song";
import { TextButton, DrawerMenuButton } from "../components/buttons";
import Playlists from "../components/playlists";

function tabScreenOptions(label) {
  return {
    tabBarLabel: label,
    tabBarLabelStyle: {
      fontSize: normalize(22),
      textAlign: "center",
      alignSelf: "center",
    },
    tabBarIconStyle: { display: "none" },
    tabBarItemStyle: { alignItems: "center", justifyContent: "center" },
    headerShown: false,
    paddingTop: Constants.statusBarHeight,
  };
}

const FilterInput = ({ onSubmit }) => {
  const [text, setText] = useState("");
  return (
    <TextInput
      style={[styles.textInput, { width: "60%" }]}
      placeholder="şarkı ara"
      onChangeText={setText}
      value={text}
      fontSize={normalize(20)}
      onSubmitEditing={() => onSubmit(text)}
    />
  );
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

const Tab = createBottomTabNavigator();

export const PlaylistScreen = ({ route }) => {
  const [order, setOrder] = useState(2);
  const [tabIndex, setTabIndex] = useState(0);
  const [filter, setFilter] = useState("");
  const [playlistName, setPlaylistName] = useState("");
  const [saveDialogVisible, setSaveDialogVisible] = useState(false);
  const [openDialogVisible, setOpenDialogVisible] = useState(false);
  const { playlist, setPlaylist, songs, highlights } = useAppContext();

  const navigation = useNavigation();

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
  };

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

  const clearAndPlay = (song) => {
    setPlaylist({ list: [song.no], current: song, index: 0 });
    show(`Liste temizlendi ve ${song.name} şarkısı eklendi`);
  };

  const filteredSongs = useMemo(() => {
    if (!songs) return [];
    return songs
      .filter((s) => s.name.toLowerCase().includes(filter.toLowerCase()))
      .sort(ORDER_TYPES[order].sorter);
  }, [songs, filter, order]);

  const renderSongsScreen = () => (
    <>
      <View style={styles.centerView}>
        <FilterInput onSubmit={setFilter} />
        <TextButton
          title={ORDER_TYPES[order].title}
          onPress={() => setOrder(order < 3 ? order + 1 : 0)}
        />
      </View>
      <ScrollView style={styles.scrollView} persistentScrollbar>
        {filteredSongs.map((item) => (
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
  );

  const renderPlaylistScreen = () => (
    <ScrollView style={styles.scrollView} persistentScrollbar>
      {playlist?.current && (
        <SongDetail
          song={playlist.current}
          openURL={(url) => {
            Linking.openURL(url);
          }}
        />
      )}
      {playlist?.name && (
        <Text>Şu an açık olan liste: {playlist.name}</Text>
      )}
      <View style={styles.centerView}>
        <TextButton
          onPress={() => setOpenDialogVisible(true)}
          title="aç"
        />
        <TextButton
          onPress={() => setSaveDialogVisible(true)}
          title="kaydet"
        />
        <TextButton
          onPress={clearPlaylist}
          title="temizle"
        />
      </View>
      {playlist?.list.map((no, index) => {
        const item = songs?.find((s) => no === s.no);
        if (!item) return null;
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
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <Tab.Navigator>
        <Tab.Screen name="şarkılar" options={tabScreenOptions("Şarkılar")}>
          {renderSongsScreen}
        </Tab.Screen>
        <Tab.Screen name="çalma listesi" options={tabScreenOptions("Çalma Listesi")}>
          {renderPlaylistScreen}
        </Tab.Screen>
      </Tab.Navigator>
      <DrawerMenuButton navigation={navigation} />
      <Playlists open={openPlaylist} visible={openDialogVisible} />
      <ModalDialog onDismiss={closeSaveDialog} visible={saveDialogVisible}>
        <TextInput
          placeholder="Listenin adını giriniz:"
          value={playlistName}
          style={styles.textInput}
          onChangeText={(value) => setPlaylistName(value)}
        />
        <View style={styles.centerView}>
          <TextButton title="Kaydet" onPress={handleSavePlaylist} />
          <TextButton title="İptal" onPress={closeSaveDialog} />
        </View>
      </ModalDialog>
    </SafeAreaView>
  );
};

export default PlaylistScreen;
