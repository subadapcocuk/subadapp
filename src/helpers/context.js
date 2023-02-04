import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = React.createContext();

const SUBADAP_PLAYLIST = "SUBADAP::PLAYLIST";
const SONGS = "https://ansiklopedi.subadapcocuk.org/songs.json";

export const ContextProvider = ({ children }) => {
  const [loop, setLoop] = useState(0);
  const [songs, setSongs] = useState([]);
  const [lastAlbumNo, setLastAlbumNo] = useState(1);
  const [playlist, setPlaylist] = useState({
    list: [],
    current: null,
    index: -1,
  });

  useEffect(() => {
    AsyncStorage.getItem(SUBADAP_PLAYLIST)
      .then((value) => {
        if (value) {
          setPlaylist(JSON.parse(value));
        }
      })
      .catch((e) => console.error(`Error reading data: ${e}`));
  }, []);

  useEffect(() => {
    fetch(SONGS, {
      headers: {
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
        setLastAlbumNo(
          data.reduce((d, c) => (d.albumNo > c.albumNo ? d : c)).albumNo
        );
      })
      .catch((e) => console.error(`Error loading songs: ${e}`));
  }, []);

  useEffect(() => {
    if (playlist) {
      AsyncStorage.setItem(SUBADAP_PLAYLIST, JSON.stringify(playlist)).catch(
        (e) => console.error(`Error saving playlist: ${e}`)
      );
    }
  }, [playlist]);

  return (
    <AppContext.Provider
      value={{ songs, lastAlbumNo, playlist, setPlaylist, loop, setLoop }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
