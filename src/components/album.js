import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import Song from "./song";
import { styles } from "../helpers/";
import { getSongs } from "../api/data";

const Album = ({ album, openUrl }) => {
  const songs = getSongs(album.no);

  return (
    <ScrollView>
      <View style={styles.albumView}>
        <View style={styles.headerView}>
          <Image style={styles.albumImage} source={{ uri: album.image }} />
          <View style={styles.titleView}>
            <Text style={styles.albumYear}>{album.releaseYear}</Text>
            <Text style={styles.albumTitle} onPress={() => openUrl(album.page)}>
              {album.name}
            </Text>
          </View>
        </View>
        <View style={styles.songs}>
          {songs.map((song) => (
            <Song
              key={`subadap_sarki_${album.no}_${song.no}`}
              {...{ song, openUrl }}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Album;
