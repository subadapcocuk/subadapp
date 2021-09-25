import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import Toolbar from "./components/toolbar";
import { styles } from "./components/styles";
import Player from "./components/player";

export default function App() {
  return (
    <View style={styles.albumsView}>
      <Player />
      <Toolbar />
      <StatusBar style="auto" />
    </View>
  );
}
