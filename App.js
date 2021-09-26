import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toolbar from "./components/toolbar";
import { PURPLE, styles } from "./components/styles";
import Player from "./components/player";
import { WebView } from "react-native-webview";

const ActivityIndicatorElement = () => {
  return (
    <View style={styles.activityIndicatorStyle}>
      <ActivityIndicator color={PURPLE} size="large" />
    </View>
  );
};

export default function App() {
  const [url, setUrl] = useState();
  const [visible, setVisible] = useState(false);

  const openUrl = (url) => {
    if (url) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    setUrl(url);
  };

  return (
    <SafeAreaView style={styles.albumsView}>
      {url && (
        <WebView
          style={styles.webview}
          source={{ uri: url }}
          //onNavigationStateChange={(navState) => console.log(navState)}
          //startInLoadingState={true}
          scalesPageToFit={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onLoadEnd={() => setVisible(false)}
        />
      )}
      {!url && <Player {...{ openUrl }} />}
      {visible ? <ActivityIndicatorElement /> : null}
      <Toolbar {...{ openUrl }} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
