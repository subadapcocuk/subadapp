import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../helpers/styles";
import Player from "../components/player";

export const Home = ({ navigation }) => {
  const openUrl = (url) => {
    navigation.navigate("Page", { url });
  };

  return (
    <SafeAreaView style={styles.albumsView}>
      <Player {...{ openUrl }} />
    </SafeAreaView>
  );
};

export default Home;
