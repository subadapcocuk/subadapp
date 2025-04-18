import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { error } from "./dialog";

export const AppContext = React.createContext();

const SUBADAP_PLAYLIST = "SUBADAP::PLAYLIST";
const SONGS = "https://ansiklopedi.subadapcocuk.org/subadapp.json";

export const ContextProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
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
          setPlaylist({ ...JSON.parse(value), current: null });
        }
      })
      .catch((e) => error(`Veri okunamadı: ${e}`));
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
        setHighlights(data["highlights"]);
      })
      .catch((e) => error(`Şarkılar okunamadı: ${e}`));
  }, []);

  useEffect(() => {
    if (playlist) {
      AsyncStorage.setItem(SUBADAP_PLAYLIST, JSON.stringify(playlist)).catch(
        (e) => error(`Error saving playlist: ${e}`)
      );
    }
  }, [playlist]);

  return (
    <AppContext.Provider
      value={{
        songs,
        highlights,
        playlist,
        setPlaylist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
