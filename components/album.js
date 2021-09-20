/**
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {View, Text, Linking, ScrollView, Image} from 'react-native';
import Song from './song';
import {styles} from './styles';
import {getSongs} from '../api/data';

const Album = ({no, name, page, image, releaseYear, playSong, stopSong}) => {
  const [selected, setSelected] = useState(-1);
  const songs = getSongs(no);

  return (
    <ScrollView>
      <View style={styles.albumView}>
        <View style={styles.headerView}>
          <Image style={styles.albumImage} source={{uri: image}} />
          <View style={styles.titleView}>
            <Text style={styles.albumYear}>{releaseYear}</Text>
            <Text
              style={styles.albumTitle}
              onPress={() => Linking.openURL(page)}>
              {name}
            </Text>
          </View>
        </View>
        <View style={styles.songs}>
          {songs.map(song => (
            <Song
              key={`subadap_sarki_${no}_${song.no}`}
              song={song}
              playSong={() => {
                if (selected === song.no) {
                  setSelected(-1);
                  stopSong();
                } else {
                  setSelected(song.no);
                  playSong(song.url);
                }
              }}
              selected={selected === song.no}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Album;
