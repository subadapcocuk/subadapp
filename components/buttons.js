/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Linking, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

export const IconButton = ({url, icon}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => Linking.openURL(url)}>
      <FontAwesomeIcon icon={icon} style={styles.icon} size={32} />
    </TouchableOpacity>
  );
};

export const IconPress = ({onPress, icon}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <FontAwesomeIcon icon={icon} style={styles.icon} size={32} />
    </TouchableOpacity>
  );
};

export const TextButton = ({url, text}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => Linking.openURL(url)}>
      <Text style={styles.icon}>{text}</Text>
    </TouchableOpacity>
  );
};
