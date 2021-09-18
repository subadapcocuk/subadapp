/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {styles, songStyle} from './styles';

const Song = ({song, playSong, selected}) => {
  return (
    <View style={styles.centerView}>
      <TouchableOpacity
        style={songStyle(selected)}
        onPress={() => playSong(song.songNo)}>
        <Text>
          {song.songNo} - {song.songName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Song;
