import React, { useState } from "react";
import { View } from "react-native";
import {
  faPause,
  faPlay,
  faRandom,
  faReply,
  faSort,
  faStepBackward,
  faStepForward,
  faStop,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { styles, BLUE, GRAY } from "../helpers/styles";
import { IconPress } from "./buttons";

const PlayerControls = ({
  clearPlaylist,
  isLooping,
  isPlaying,
  nextTrack,
  playPause,
  previousTrack,
  randomTrack,
  sortPlaylist,
  stopPlayer,
  toggleLoop,
}) => {
  const [random, setRandom] = useState(false);

  return (
    <View style={styles.playlistButtons}>
      <IconPress
        icon={faStepBackward}
        onPress={() => {
          if (random) {
            randomTrack();
          } else {
            previousTrack();
          }
        }}
      />
      <IconPress
        icon={isPlaying ? faPause : faPlay}
        onPress={() => playPause(random)}
      />
      <IconPress
        icon={faStop}
        color={isPlaying ? BLUE : GRAY}
        onPress={stopPlayer}
      />
      <IconPress
        icon={faStepForward}
        onPress={() => {
          if (random) {
            randomTrack();
          } else {
            nextTrack();
          }
        }}
      />
      <IconPress
        icon={faReply}
        color={isLooping ? BLUE : GRAY}
        onPress={toggleLoop}
      />
      <IconPress
        color={random ? BLUE : GRAY}
        icon={faRandom}
        onPress={() => setRandom(!random)}
      />
      <IconPress icon={faSort} onPress={sortPlaylist} />
      <IconPress icon={faTrash} onPress={clearPlaylist} />
    </View>
  );
};

export default PlayerControls;
