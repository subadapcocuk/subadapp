import React from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import { styles, songStyle } from "../helpers/styles";
import { useAppContext } from "../services/context";

const Song = ({ song, openUrl }) => {
  const { addSong, playlist } = useAppContext();

  const selected =
    playlist.findIndex((o) => o.albumNo === song.albumNo && o.no === song.no) >
    -1;

  return (
    <View style={styles.songView}>
      <TouchableOpacity
        style={songStyle(selected)}
        onPress={() => addSong(song)}
      >
        <Image style={styles.songImage} source={{ uri: song.image }} />
      </TouchableOpacity>
      <Text style={styles.textLink} onPress={() => openUrl(song.page)}>
        {song.no} - {song.name}
      </Text>
    </View>
  );
};

export default Song;
