import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { styles, useAppContext } from "../helpers";
import { Song } from "./song";

const Album = ({ album, openUrl }) => {
  const { songs } = useAppContext();
  const albumSongs = songs.filter((s) => s.albumNo === album.no);

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
          {albumSongs.map((song) => (
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
