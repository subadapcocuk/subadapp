import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Toolbar from "./components/toolbar";
import { styles } from "./components/styles";
import Player from "./components/player";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function App() {
  const [url, setUrl] = useState();

  const openUrl = (url) => {
    setUrl(url);
  };

  return (
    <SafeAreaView style={styles.albumsView}>
      {url && (
        <WebView
          style={styles.webview}
          source={{ uri: url }}
          //onNavigationStateChange={(navState) => console.log(navState)}
          startInLoadingState
          scalesPageToFit
          javaScriptEnabled
        />
      )}
      {!url && <Player />}
      <Toolbar openUrl={openUrl} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
