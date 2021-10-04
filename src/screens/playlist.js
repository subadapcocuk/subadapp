import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../helpers/styles";
import Player from "../components/player";

export const Playlist = () => {
  return (
    <SafeAreaView style={styles.albumsView}>
      <Player />
    </SafeAreaView>
  );
};

export default Playlist;
