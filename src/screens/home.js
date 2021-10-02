import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { PURPLE, styles } from "../helpers/styles";
import Player from "../components/player";

const ActivityIndicatorElement = () => {
  return (
    <View style={styles.activityIndicatorStyle}>
      <ActivityIndicator color={PURPLE} size="large" />
    </View>
  );
};

export const Home = ({ navigation, route }) => {
  const [visible, setVisible] = useState(false);

  const url = route?.params?.url;

  const openUrl = (url) => {
    navigation.navigate("Home", { url });
  };

  return (
    <SafeAreaView style={styles.albumsView}>
      {url && (
        <WebView
          style={styles.webview}
          source={{ uri: route.params.url }}
          //onNavigationStateChange={(navState) => console.log(navState)}
          //startInLoadingState={true}
          scalesPageToFit={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onLoadStart={() => setVisible(true)}
          onLoadEnd={() => setVisible(false)}
        />
      )}
      {!url && <Player {...{ openUrl }} />}
      {visible ? <ActivityIndicatorElement /> : null}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Home;
