/**
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {IconButton, TextButton, IconPress} from './buttons';
import SoundPlayer from 'react-native-sound-player';
import {
  faBook,
  faEnvelope,
  faMusic,
  faPause,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

const Toolbar = () => {
  const [paused, setPaused] = useState(false);

  const togglePlay = () => {
    try {
      if (paused) {
        SoundPlayer.play();
      } else {
        SoundPlayer.pause();
      }
      setPaused(!paused);
    } catch (error) {
      console.error(error);
    }
  };

  const renderPlayer = () => {
    const icon = paused ? faPlay : faPause;
    return (
      <View style={styles.centerView}>
        <IconPress icon={icon} onPress={() => togglePlay()} />
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View style={styles.centerView}>
        <IconButton url="https://ansiklopedi.subadapcocuk.org/" icon={faBook} />
        <IconButton url="https://subadapcocuk.org/" icon={faMusic} />
        <IconButton
          url="https://www.facebook.com/subadapcocuk"
          icon={faFacebook}
        />
        <IconButton
          url="https://www.instagram.com/subadapcocuk"
          icon={faInstagram}
        />
        <IconButton url="https://twitter.com/subadap" icon={faTwitter} />
        <IconButton
          url="https://subadapcocuk.org/iletisim/"
          icon={faEnvelope}
        />
        <TextButton
          url="http://ansiklopedi.subadapcocuk.org/index.php/Copyleft"
          text="🄯"
        />
      </View>
    );
  };

  return (
    <>
      {renderPlayer()}
      {renderButtons()}
    </>
  );
};

export default Toolbar;
