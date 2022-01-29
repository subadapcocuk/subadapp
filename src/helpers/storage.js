import AsyncStorage from "@react-native-async-storage/async-storage";
import { confirm } from "./";

const SUBADAP_PLAYLISTS = "SUBADAP::PLAYLISTS";

export const savePlaylist = async (name, playlist) => {
  const playlists = await getPlaylists();
  const save = () =>
    AsyncStorage.setItem(
      SUBADAP_PLAYLISTS,
      JSON.stringify({ ...playlists, [name]: playlist })
    );
  if (playlists[name]) {
    confirm(
      `${name} listesi zaten var`,
      `Mevcut listeyi, ${name} listesinin üzerine kaydetmek istediğinizden emin misiniz?`,
      save
    );
  } else {
    save();
  }
};

export const deletePlaylist = async (name) => {
  const playlists = await getPlaylists();
  delete playlists[name];
  AsyncStorage.setItem(SUBADAP_PLAYLISTS, JSON.stringify(playlists));
};

export const getPlaylists = async () => {
  const value = await AsyncStorage.getItem(SUBADAP_PLAYLISTS);
  if (value) {
    return JSON.parse(value);
  }
  return {};
};
