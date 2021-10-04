import React from "react";
import { Image, TouchableOpacity, Text } from "react-native";
import { styles } from "../helpers/styles";

const Song = ({ song, openUrl }) => {
  return (
    <TouchableOpacity
      style={styles.songStyle}
      onPress={() => openUrl(song.page)}
    >
      <Image style={styles.songImage} source={{ uri: song.image }} />
      <Text>
        {song.no} - {song.name}
      </Text>
    </TouchableOpacity>
  );
};

export default Song;
