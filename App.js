import { StatusBar } from "expo-status-bar";
import React from "react";
import Toolbar from "./components/toolbar";
import { styles } from "./components/styles";
import Player from "./components/player";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={styles.albumsView}>
      <Player />
      <Toolbar />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
