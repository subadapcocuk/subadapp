/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {ScrollView, StatusBar, useColorScheme} from 'react-native';
import songs from './data/songs.json';
import _ from 'lodash';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Album from './components/album';
import Toolbar from './components/toolbar';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const albums = _.uniqBy(
    songs.map(s => {
      return {
        name: s.albumName,
        no: s.albumNo,
        page: s.albumPage,
      };
    }),
    'name',
  );

  return (
    <>
      <ScrollView style={backgroundStyle}>
        {albums &&
          albums.map((album, index) => (
            <Album
              key={`subadap_album_${index}`}
              {...album}
              songs={songs.filter(s => s.albumName === album.name)}
            />
          ))}
      </ScrollView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Toolbar />
    </>
  );
};

export default App;
