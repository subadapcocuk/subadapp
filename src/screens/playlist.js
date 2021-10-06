import React from "react";
import Player from "../components/player";

export const Playlist = ({ navigation }) => {
  const openUrl = (url) => {
    navigation.navigate("Page", { url });
  };

  return <Player {...{ openUrl }} />;
};

export default Playlist;
