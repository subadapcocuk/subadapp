import React from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import { styles, songStyle } from "../helpers/styles";;

const Song = ({ song, playSong, selected, openUrl }) => {
  return (
    <View style={styles.songView}>
      <TouchableOpacity
        style={songStyle(selected)}
        onPress={() => playSong(song)}
      >
        <Image style={styles.songImage} source={{ uri: song.image }} />
      </TouchableOpacity>
      <Text
        style={styles.textLink}
        onPress={() => openUrl(song.page)}
      >
        {song.no} - {song.name}
      </Text>
    </View>
  );
};

export default Song;
