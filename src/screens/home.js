import React from "react";
import { ScrollView } from "react-native";
import { getAlbums } from "../api/data";
import Album from "../components/album";

export const Home = ({ navigation }) => {
  const openUrl = (url) => {
    navigation.navigate("Page", { url });
  };

  return (
    <ScrollView horizontal pagingEnabled>
      {getAlbums().map((album, index) => (
        <Album key={`subadap_album_${index}`} {...{ album, openUrl }} />
      ))}
    </ScrollView>
  );
};

export default Home;
