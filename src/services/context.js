import React, { useState } from "react";
import albums from "../../data/albums.json";
import songs from "../../data/songs.json";
export const AppContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);

  const addSong = (song) => {
    setPlaylist([...playlist, song]);
  };

  const removeSong = (song) => {
    setPlaylist(
      playlist.filter((o) => o.albumNo !== song.albumNo && o.no !== song.no)
    );
  };

  const getSongs = (albumNo) => {
    return songs.filter((s) => s.albumNo === albumNo);
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        albums,
        playlist,
        addSong,
        removeSong,
        getSongs,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
