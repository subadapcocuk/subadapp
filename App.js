/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StatusBar} from 'react-native';
import Toolbar from './components/toolbar';
import {styles} from './components/styles';
import Player from './components/player';

const App = () => {
  return (
    <View style={styles.albumsView}>
      <Player />
      <StatusBar />
      <Toolbar />
    </View>
  );
};

export default App;
