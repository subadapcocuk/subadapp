/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {IconButton, TextButton} from './buttons';
import {faBook, faEnvelope, faMusic} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

const Toolbar = () => {
  return (
    <>
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
    </>
  );
};

export default Toolbar;
