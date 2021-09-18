/**
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {View, Text, Linking} from 'react-native';
import Song from './song';
import {styles} from './styles';
import SoundPlayer from 'react-native-sound-player';

const Album = ({no, name, page, songs}) => {
  const [selected, setSelected] = useState(-1);

  const playSong = songNo => {
    //TODO: https://github.com/johnsonsu/react-native-sound-player/issues/98
    if (selected === songNo) {
      setSelected(-1);
      SoundPlayer.stop();
    } else {
      try {
        const song = songs.filter(s => s.songNo === songNo)[0];
        SoundPlayer.playUrl(song.songURL);
        setSelected(songNo);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      <Text style={styles.title} onPress={() => Linking.openURL(page)}>
        {name}
      </Text>
      <View style={styles.album}>
        {songs.map(song => (
          <Song
            key={`subadap_sarki_${no}_${song.songNo}`}
            song={song}
            playSong={playSong}
            selected={selected === song.songNo}
          />
        ))}
      </View>
    </>
  );
};

export default Album;
