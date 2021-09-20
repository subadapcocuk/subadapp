/**
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import {faPause, faPlay, faStop} from '@fortawesome/free-solid-svg-icons';
import {getAlbums} from '../api/data';
import Album from './album';
import {styles, BLUE, GRAY} from './styles';
import {IconPress} from './buttons';

const Player = () => {
  const [status, setStatus] = useState({
    paused: false,
    playing: false,
    url: null,
  });

  const togglePause = () => {
    try {
      if (status.paused) {
        SoundPlayer.play();
      } else {
        SoundPlayer.pause();
      }
      setStatus({
        url: status.url,
        paused: !status.paused,
        playing: status.paused,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const playSong = url => {
    try {
      //Fix: https://github.com/johnsonsu/react-native-sound-player/issues/89
      SoundPlayer.loadUrl(url);
      SoundPlayer.addEventListener('FinishedLoadingURL', () => {
        SoundPlayer.play();
        setStatus({
          url: url,
          playing: true,
          paused: false,
        });
      });
      SoundPlayer.addEventListener('FinishedPlaying', () => {
        setStatus({
          url: null,
          playing: false,
          paused: false,
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const stopPlayer = () => {
    try {
      SoundPlayer.stop();
      setStatus({
        url: status.url,
        playing: false,
        paused: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const startPlayer = () => {
    try {
      SoundPlayer.playUrl(status.url);
      setStatus({
        url: status.url,
        playing: true,
        paused: false,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const albums = getAlbums();

  return (
    <>
      <ScrollView horizontal pagingEnabled>
        {albums &&
          albums.map((album, index) => (
            <Album
              key={`subadap_album_${index}`}
              {...album}
              playSong={playSong}
              stopSong={stopPlayer}
            />
          ))}
      </ScrollView>
      <View style={styles.centerView}>
        {/*<IconPress icon={faRedo} onPress={() => toggleRepeat()} />*/}
        <IconPress
          icon={faPlay}
          color={status.playing ? BLUE : GRAY}
          onPress={() => startPlayer()}
        />
        <IconPress
          icon={faStop}
          color={status.playing ? GRAY : BLUE}
          onPress={() => stopPlayer()}
        />
        <IconPress
          icon={faPause}
          color={status.paused ? GRAY : BLUE}
          onPress={() => togglePause()}
        />
      </View>
    </>
  );
};

export default Player;
