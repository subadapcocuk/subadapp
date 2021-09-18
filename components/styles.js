import {StyleSheet} from 'react-native';

const GRAY = '#E0E0E0';
const PINK = '#D42E94';
const BLUE = '#529DD6';
const PURPLE = '#6B1FBF';

export const songStyle = selected => {
  return {
    backgroundColor: selected ? BLUE : GRAY,
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    borderRadius: 5,
    padding: 10,
  };
};

export const styles = StyleSheet.create({
  album: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
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
    color: PURPLE,
    textDecorationLine: 'underline',
    fontSize: 25,
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
  title: {
    color: BLUE,
    fontSize: 25,
    textAlign: 'center',
  },
});
