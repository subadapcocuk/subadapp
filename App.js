/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {ScrollView, StatusBar, useColorScheme} from 'react-native';
import {getAlbums} from './api/data';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Album from './components/album';
import Toolbar from './components/toolbar';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const albums = getAlbums();

  return (
    <>
      <ScrollView style={backgroundStyle}>
        {albums &&
          albums.map((album, index) => (
            <Album key={`subadap_album_${index}`} {...album} />
          ))}
      </ScrollView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Toolbar />
    </>
  );
};

export default App;
