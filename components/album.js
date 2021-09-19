/**
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {View, Text, Linking, Image} from 'react-native';
import Song from './song';
import {styles} from './styles';
import SoundPlayer from 'react-native-sound-player';
import {getSongs} from '../api/data';

const Album = ({no, name, page, image}) => {
  const [selected, setSelected] = useState(-1);

  const songs = getSongs(no);

  const playSong = songNo => {
    if (selected === songNo) {
      setSelected(-1);
      SoundPlayer.pause();
    } else {
      //TODO: https://github.com/johnsonsu/react-native-sound-player/issues/98
      SoundPlayer.pause();
      try {
        const song = songs.filter(s => s.no === songNo)[0];
        SoundPlayer.playUrl(song.url);
        setSelected(songNo);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <View style={styles.albumView}>
      <View style={styles.headerView}>
        <Image style={styles.albumImage} source={{uri: image}} />
        <View style={styles.titleView}>
          <Text style={styles.title} onPress={() => Linking.openURL(page)}>
            {name}
          </Text>
        </View>
      </View>
      <View style={styles.songs}>
        {songs.map(song => (
          <Song
            key={`subadap_sarki_${no}_${song.no}`}
            song={song}
            playSong={playSong}
            selected={selected === song.no}
          />
        ))}
      </View>
    </View>
  );
};

export default Album;
