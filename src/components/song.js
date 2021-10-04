import React from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import { styles } from "../helpers/styles";
import { useAppContext } from "../services/context";

const Song = ({ song, openUrl }) => {
  const { addSong } = useAppContext();

  return (
    <View style={styles.songView}>
      <TouchableOpacity style={styles.songStyle} onPress={() => addSong(song)}>
        <Image style={styles.songImage} source={{ uri: song.image }} />
      </TouchableOpacity>
      <Text style={styles.textLink} onPress={() => openUrl(song.page)}>
        {song.no} - {song.name}
      </Text>
    </View>
  );
};

export default Song;
