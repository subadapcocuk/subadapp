import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Audio from "expo-audio";
import { File, Directory, Paths } from "expo-file-system";

import {
  styles,
  LoopType,
  randomInt,
  useAppContext,
  error,
} from "../helpers";
import PlayerControls from "./controls";
import SeekBar from "./seekbar";


async function saveSong(uri) {
  const fileName = uri.substring(uri.lastIndexOf('/') + 1);
  const fileFolder = new Directory(Paths.document, "subadapp");
  if (!fileFolder.exists) {
    // create persistent app folder if it doesn't exist
    fileFolder.create();
  }
  const file = new File(fileFolder, fileName);
  if (!file.exists) {
    await File.downloadFileAsync(uri, file);
  }
  return file.uri;
}



let player = Audio.createAudioPlayer(null);
let playRequestId = 0;

const Player = () => {
  const [status, setStatus] = useState({});
  const { playlist, setPlaylist, songs, albums } = useAppContext();
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecording: false,
      shouldPlayInBackground: true,
      interruptionMode: "doNotMix",
      playsInSilentMode: true,
      shouldDuckAndroid: true,
      shouldRouteThroughEarpiece: false,
    }).catch(() => { });
  }, []);

  useEffect(() => {
    return () => {
      try {
        if (player) {
          if (player.pause) player.pause();
          if (player.remove) player.remove();
          player = null;
        }
      } catch (e) { }
    };
  }, [player]);

  useEffect(() => {
    playSong();
  }, [playlist?.current]);

  useEffect(() => {
    if (!player) return;

    try {
      player.loop = loop === LoopType.RepeatSong;
    } catch (e) {
      console.log(`set loop ${e}`);
    }

    const listener = player.addListener(
      "playbackStatusUpdate",
      (s) => onPlaybackStatusUpdate(s)
    );
    return () => {
      try {
        if (listener && listener.remove) listener.remove();
      } catch (e) { }
    };
  }, [player, loop]);

  const onPlaybackStatusUpdate = (status) => {
    // Normalize expo-audio status to the shape used by the component
    if (!status) return;
    const normalized = {
      isLoaded: !!status.isLoaded,
      isPlaying: !!status.playing,
      positionMillis: typeof status.currentTime === 'number' ? Math.round(status.currentTime * 1000) : 0,
      durationMillis: typeof status.duration === 'number' ? Math.round(status.duration * 1000) : 0,
      rate: status.playbackRate || 1,
      shouldCorrectPitch: status.shouldCorrectPitch,
      volume: status.volume,
      muted: !!status.mute,
      isLooping: !!status.loop,
      didJustFinish: !!status.didJustFinish,
    };
    setStatus(normalized);
    if (normalized.didJustFinish && !normalized.isLooping) nextTrack();
  };

  const randomTrack = () => {
    try {
      if (!songs || songs.length === 0) return;
      if (playlist.list.length > 1) {
        const index = randomInt(playlist.list.length, playlist.index);
        const songToPlay = songs.find((s) => s.no === playlist.list[index]);
        if (songToPlay) {
          if (playlist.current?.no === songToPlay.no) {
            playSong();
          } else {
            setPlaylist({
              ...playlist,
              current: songToPlay,
              index: index,
            });
          }
        }
      } else if (playlist.list.length === 0) {
        const currentIndex = songs.findIndex((s) => s.no === playlist?.current?.no);
        const nextIndex = randomInt(songs.length, currentIndex);
        const songToPlay = songs[nextIndex];
        if (songToPlay) {
          if (playlist.current?.no === songToPlay.no) {
            playSong();
          } else {
            setPlaylist({
              ...playlist,
              current: songToPlay,
              index: -1,
            });
          }
        }
      } else {
        playSong();
      }
    } catch (e) {
      error(`randomTrack ${e}`);
    }
  };

  const previousTrack = () => {
    try {
      if (!songs || songs.length === 0) return;
      if (loop === LoopType.RandomList || playlist.list.length === 0) {
        randomTrack();
      } else if (loop === LoopType.FollowList) {
        const index =
          playlist.index > 0 ? playlist.index - 1 : playlist.list.length - 1;
        const current = songs.find((s) => s.no === playlist.list[index]);
        if (current) {
          setPlaylist({ ...playlist, index, current });
        }
      }
    } catch (e) {
      error(`previousTrack ${e}`);
    }
  };

  const nextTrack = () => {
    try {
      if (!songs || songs.length === 0) return;
      if (loop === LoopType.RandomList || playlist.list.length === 0) {
        randomTrack();
      } else if (loop === LoopType.FollowList) {
        const index =
          playlist.index + 1 < playlist.list.length ? playlist.index + 1 : 0;
        const current = songs.find((s) => s.no === playlist.list[index]);
        if (current) {
          setPlaylist({ ...playlist, index, current });
        }
      }
    } catch (e) {
      error(`nextTrack ${e}`);
    }
  };

  const onSeek = async (positionMillis) => {
    try {
      if (!player) return;
      await player.seekTo(positionMillis / 1000);
      // optimistically update UI
      setStatus((s) => ({ ...s, positionMillis }));
    } catch (e) {
      error(`onSeek ${e}`);
    }
  };

  const onPlay = () => {
    try {
      if (!player) return;
      if (status.isLoaded) {
        if (status.isPlaying) player.pause();
        else player.play();
      } else {
        if (loop === LoopType.RandomList) randomTrack();
        else playSong();
      }
    } catch (e) {
      error(`onPlay ${e}`);
    }
  };

  const playSong = async () => {
    try {
      if (!player) return;
      if (!playlist?.current) return;
      const thisRequestId = ++playRequestId;
      const filePath = await saveSong(playlist.current.url);
      if (thisRequestId !== playRequestId) return; // stale request guard
      try {
        // pause any current playback before replacing
        try {
          if (player.playing) player.pause();
        } catch (e) { }

        player.replace(filePath);
        player.loop = loop === LoopType.RepeatSong;

        const metadata = {
          title: playlist.current.name || "Bilinmeyen Şarkı",
          artist: "Şubadap Müzik Grubu",
          albumTitle: albums?.[playlist.current.albumNo - 1]?.name || "Şubadap Müzik Grubu",
          artworkUrl: playlist.current.image,
        };

        try {
          player.setActiveForLockScreen(true, metadata, {
            showSeekBackward: true,
            showSeekForward: true,
          });
        } catch (e) {
          console.log(`setActiveForLockScreen ${e}`);
        }

        player.play();
      } catch (e) {
        error(`replace/play ${e}`);
      }
    } catch (e) {
      error(`playSong ${e}`);
    }
  };

  return (
    <SafeAreaView
      style={styles.bottomView}
      accessibilityLabel={"çalma bilgi çubuğu ve oynatma düğmeleri"}
    >
      <SeekBar
        isPlaying={status.isLoaded}
        onSeek={onSeek}
        trackLength={status.positionMillis ? status.durationMillis : 1}
        currentPosition={status.positionMillis ? status.positionMillis : 0}
      />
      <PlayerControls
        isPlaying={playlist?.current && status.isPlaying}
        onForward={nextTrack}
        onBackward={previousTrack}
        onPlay={onPlay}
        loop={loop}
        onLoop={() => setLoop(loop < 2 ? loop + 1 : 0)}
      />
    </SafeAreaView>
  );
};

export default Player;
