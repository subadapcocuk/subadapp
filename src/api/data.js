import albums from "../../data/albums.json";
import songs from "../../data/songs.json";

export const getAlbums = () => {
  return albums;
};

export const getSongs = (albumNo = null) => {
  return albumNo ? songs.filter((s) => s.albumNo === albumNo) : songs;
};

export const getAlbumTitle = (no) => {
  try {
    const album = albums.filter((a) => a.no === no)[0];
    return `${album.name} - ${album.releaseYear}`;
  } catch (e) {
    console.error(e);
    return "";
  }
};

export const getSongTitle = (song) => {
  return `${song.name} (${getAlbumTitle(song.albumNo)})`;
};
