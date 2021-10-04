import albums from '../../data/albums.json';
import songs from '../../data/songs.json';

export const getAlbums = () => {
  return albums;
};

export const getSongs = (albumNo = null) => {

  return albumNo ? songs.filter(s => s.albumNo === albumNo) : songs;
};