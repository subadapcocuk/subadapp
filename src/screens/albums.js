import React from "react";
import { ScrollView } from "react-native";
import Album from "../components/album";
import { useAppContext } from "../helpers";

//TODO Deprecated, remove if not needed anymore
export const Albums = ({ navigation }) => {
  const { albums } = useAppContext();

  const openUrl = (url) => {
    navigation.navigate("Page", { url });
  };

  return (
    <ScrollView horizontal pagingEnabled>
      {albums.map((album, index) => (
        <Album key={`subadap_album_${index}`} {...{ album, openUrl }} />
      ))}
    </ScrollView>
  );
};

export default Albums;
