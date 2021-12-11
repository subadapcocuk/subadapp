import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = React.createContext();

const SUBADAP_PLAYLIST = "SUBADAP::PLAYLIST";

export const ContextProvider = ({ children }) => {
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
    if (playlist) {
      AsyncStorage.setItem(SUBADAP_PLAYLIST, JSON.stringify(playlist));
    }
  }, [playlist]);

  return (
    <AppContext.Provider value={{ playlist, setPlaylist }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
