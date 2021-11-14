import React, { useState } from "react";
import { ScrollView } from "react-native";
import Toast from "react-native-root-toast";
import { getSongs } from "../api/data";
import { randomInt } from "../helpers/";
import Player from "../components/player";
import { SongDetail, SongItem } from "../components/song";
import { AnimatedTabView, Tabs, TabViewItem } from "../components/tabs";

export const Playlist = ({ navigation }) => {
  const [playlist, setPlaylist] = useState([]);
  const [random, setRandom] = useState(false);
  const [order, setOrder] = useState(0);
  const [current, setCurrent] = useState({ song: null, index: -1 });
  const [tabIndex, setTabIndex] = useState(0);

  const songs = getSongs();

  const toggleSong = ({ name, no }) => {
    if (playlist.find((n) => n === no)) {
      setPlaylist(playlist.filter((o) => o !== no));
      Toast.show(`${name} listeden kaldırıldı`);
    } else {
      setPlaylist([...playlist, no]);
      Toast.show(`${name} listeye eklendi`);
    }
  };

  const sortSongs = () => {
    switch (order) {
      case 0:
        return songs.slice().sort((a, b) => a.name > b.name);
      case 1:
        return songs.slice().sort((a, b) => a.name < b.name);
      case 2:
        return songs.slice().sort((a, b) => a.albumNo < b.albumNo);
      default:
        return songs;
    }
  };

  const randomTrack = () => {
    let index = -1;
    let song = null;
    if (playlist.length > 0) {
      index = randomInt(playlist.length);
      song = songs.filter((s) => s.no === playlist[index])[0];
    } else {
      song = songs[randomInt(songs.length)];
    }
    setCurrent({ ...{ index, song } });
  };

  const previousTrack = () => {
    if (random) {
      randomTrack();
    } else {
      const index = current.index > 0 ? current.index - 1 : playlist.length - 1;
      const song = songs.filter((s) => s.no === playlist[index])[0];
      setCurrent({ ...{ index, song } });
    }
  };

  const nextTrack = () => {
    if (random) {
      randomTrack();
    } else {
      const index = current.index + 1 < playlist.length ? current.index + 1 : 0;
      const song = songs.filter((s) => s.no === playlist[index])[0];
      setCurrent({ ...{ index, song } });
    }
  };

  return (
    <>
      <Tabs
        value={tabIndex}
        onChange={setTabIndex}
        titles={["Şarkılar", "Çalma Listesi"]}
      />
      <AnimatedTabView value={tabIndex} onChange={setTabIndex}>
        <TabViewItem selected={tabIndex === 0}>
          <ScrollView>
            {sortSongs().map((item) => (
              <SongItem
                key={`playlist_song_${item.no}`}
                song={item}
                selected={playlist.find((no) => no === item.no) !== undefined}
                onLeftOpen={() => toggleSong(item)}
              />
            ))}
          </ScrollView>
        </TabViewItem>
        <TabViewItem selected={tabIndex === 1}>
          <ScrollView>
            <SongDetail
              song={current.song}
              openUrl={(url) => {
                navigation.navigate("Page", { url });
              }}
            />
            {playlist.map((no, index) => {
              const item = songs.filter((s) => no === s.no)[0];
              return (
                <SongItem
                  key={`playlist_detail_${no}`}
                  song={item}
                  selected={no === current?.song?.no}
                  onRightOpen={() => toggleSong(item)}
                  onPress={() => setCurrentIndex(index)}
                />
              );
            })}
          </ScrollView>
        </TabViewItem>
      </AnimatedTabView>
      <Player
        song={current?.song}
        toggleRandom={() => setRandom(!random)}
        clearPlaylist={() => setPlaylist([])}
        sortPlaylist={() => setOrder(order < 3 ? order + 1 : 0)}
        previousTrack={previousTrack}
        nextTrack={nextTrack}
      />
    </>
  );
};

export default Playlist;
