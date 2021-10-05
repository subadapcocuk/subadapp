import React from "react";
import { Image, ScrollView, TouchableOpacity, Text, View } from "react-native";
import { getSongTitle } from "../api/data";
import { styles, songStyle, songText, deviceWidth } from "../helpers/styles";

export const Song = ({ song, openUrl }) => {
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

export const SongItem = ({ song, selected = false }) => {
  return (
    <View style={songStyle(selected)}>
      <Image style={styles.playlistImage} source={{ uri: song.image }} />
      <Text style={songText(selected)}>{getSongTitle(song)}</Text>
    </View>
  );
};

export const SongDetail = ({ song, openUrl }) => {
  return (
    <ScrollView style={{ width: deviceWidth }}>
      {song ? (
        <TouchableOpacity
          style={styles.songStyle}
          onPress={() => openUrl(song.page)}
        >
          <Image style={styles.albumImage} source={{ uri: song.image }} />
          <Text>
            {song.no} - {song.name}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.albumTitle}>Şu an şarkı çalmıyor</Text>
      )}
    </ScrollView>
  );
};
