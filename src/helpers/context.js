import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = React.createContext();

const SUBADAP_PLAYLIST = "SUBADAP::PLAYLIST";
const SONGS = "https://ansiklopedi.subadapcocuk.org/subadapp.json";

export const ContextProvider = ({ children }) => {
  const [loop, setLoop] = useState(0);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [highlights, setHighlights] = useState([]);
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
        setSongs(data["songs"]);
        setAlbums(data["albums"]);
        setHighlights(data["highlights"]);
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
      value={{ albums, songs, highlights, playlist, setPlaylist, loop, setLoop }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
