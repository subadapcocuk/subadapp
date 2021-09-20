import {StyleSheet, Dimensions} from 'react-native';

export const GRAY = '#E0E0E0';
export const PINK = '#D42E94';
export const BLUE = '#529DD6';
export const PURPLE = '#6B1FBF';
export const WHITE = '#FFFFFF';

var deviceWidth = Dimensions.get('window').width;

export const songStyle = selected => {
  return {
    backgroundColor: selected ? PINK : 'white',
    borderRadius: 5,
    padding: 5,
  };
};

export const styles = StyleSheet.create({
  albumsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumTitle: {
    color: BLUE,
    fontSize: 32,
    textAlign: 'center',
  },
  albumYear: {
    color: BLUE,
    fontSize: 24,
    textAlign: 'center',
  },
  albumView: {
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
    //flexDirection: 'row',
  },
  albumImage: {
    height: 150,
    width: 150,
  },
  headerView: {
    flexDirection: 'row',
    padding: 5,
    borderBottomColor: BLUE,
    alignItems: 'center',
  },
  titleView: {
    width: 0,
    flexGrow: 1,
    flex: 1,
  },
  songs: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    fontSize: 32,
    color: BLUE,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
  },
  centerView: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    margin: 5,
  },
  textLink: {
    color: BLUE,
  },
  header: {
    position: 'absolute',
    width: '100%',
    height: 150,
    top: 0,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 120,
    borderRadius: 5,
    margin: 40,
  },
  songView: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 5,
    padding: 5,
  },
  songImage: {
    height: 125,
    width: 125,
  },
});
