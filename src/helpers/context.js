import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = React.createContext();

const SUBADAP_PLAYLIST = "SUBADAP::PLAYLIST";
const ALBUMS = "https://ansiklopedi.subadapcocuk.org/albums.json";
const SONGS = "https://ansiklopedi.subadapcocuk.org/songs.json";

export const ContextProvider = ({ children }) => {
  const [loop, setLoop] = useState(0);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [playlist, setPlaylist] = useState({
    list: [],
    current: null,
    index: -1,
  });

  useEffect(() => {
    AsyncStorage.getItem(SUBADAP_PLAYLIST).then((value) => {
      if (value) {
        console.log(`Reading playlist from storage: ${value}`);
        setPlaylist(JSON.parse(value));
      }
    });
  }, []);

  useEffect(() => {
    fetch(ALBUMS)
      .then((response) => response.json())
      .then((data) => setAlbums(data));
  }, []);

  useEffect(() => {
    fetch(SONGS)
      .then((response) => response.json())
      .then((data) => setSongs(data));
  }, []);

  useEffect(() => {
    if (playlist) {
      AsyncStorage.setItem(SUBADAP_PLAYLIST, JSON.stringify(playlist));
    }
  }, [playlist]);

  return (
    <AppContext.Provider
      value={{ albums, songs, playlist, setPlaylist, loop, setLoop }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
