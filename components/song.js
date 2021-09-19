/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Image, TouchableOpacity, View, Text, Linking} from 'react-native';
import {styles, songStyle} from './styles';

const Song = ({song, playSong, selected}) => {
  return (
    <View style={styles.songView}>
      <TouchableOpacity
        style={songStyle(selected)}
        onPress={() => playSong(song.no)}>
        <Image style={styles.songImage} source={{uri: song.image}} />
      </TouchableOpacity>
      <Text style={styles.textLink} onPress={() => Linking.openURL(song.page)}>
        {song.no} - {song.name}
      </Text>
    </View>
  );
};

export default Song;
