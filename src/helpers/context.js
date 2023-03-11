import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

export const AppContext = React.createContext();

const SUBADAP_PLAYLIST = "SUBADAP::PLAYLIST";
const SONGS = "https://ansiklopedi.subadapcocuk.org/subadapp.json";

export const ContextProvider = ({ children }) => {
  const [loop, setLoop] = useState(0);
  const [songs, setSongs] = useState([]);
  //const [albums, setAlbums] = useState([]);
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
      .catch((e) => Toast.error(`Veri okunamadı: ${e}`));
  }, []);

  useEffect(() => {
    fetch(SONGS, {
      headers: {
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .catch((e) => Toast.error(`Bir hata oluştu: ${e}`))
      .then((data) => {
        setSongs(data["songs"]);
        //setAlbums(data["albums"]);
        setHighlights(data["highlights"]);
      })
      .catch((e) => Toast.error(`Şarkılar okunamadı: ${e}`));
  }, []);

  useEffect(() => {
    if (playlist) {
      AsyncStorage.setItem(SUBADAP_PLAYLIST, JSON.stringify(playlist)).catch(
        (e) => Toast.error(`Error saving playlist: ${e}`)
      );
    }
  }, [playlist]);

  return (
    <AppContext.Provider
      value={{
        //albums,
        songs,
        highlights,
        playlist,
        setPlaylist,
        loop,
        setLoop,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
