import AsyncStorage from "@react-native-async-storage/async-storage";
import albums from "../../data/albums.json";
import songs from "../../data/songs.json";

const SUBADAP_PLAYLISTS = "SUBADAP::PLAYLISTS";

export const getAlbums = () => {
  return albums;
};

export const getSongs = (albumNo = null) => {
  return albumNo ? songs.filter((s) => s.albumNo === albumNo) : songs;
};

export const getAlbumTitle = (no) => {
  try {
    const album = albums.filter((a) => a.no === no)[0];
    return `${album.name} - ${album.releaseYear}`;
  } catch (e) {
    console.error(e);
    return "";
  }
};

export const getSongTitle = (song) => {
  return `${song.name} (${getAlbumTitle(song.albumNo)})`;
};

export const savePlaylist = async (name, playlist) => {
  const playlists = await getPlaylists();
  AsyncStorage.setItem(
    SUBADAP_PLAYLISTS,
    JSON.stringify({ ...playlists, [name]: playlist })
  );
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
