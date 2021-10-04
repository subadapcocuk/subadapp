import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../helpers/styles";
import Album from "../components/album";
import { useAppContext } from "../services/context";

export const Home = ({ navigation }) => {
  const { albums } = useAppContext();
  const openUrl = (url) => {
    navigation.navigate("Page", { url });
  };

  return (
    <SafeAreaView style={styles.albumsView}>
      <ScrollView horizontal pagingEnabled>
        {albums &&
          albums.map((album, index) => (
            <Album key={`subadap_album_${index}`} {...{ album, openUrl }} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
