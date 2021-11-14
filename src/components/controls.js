import React from "react";
import { View } from "react-native";
import {
  faPause,
  faPlay,
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
  isPlaying,
  isLooping,
  previousTrack,
  playPause,
  stopPlayer,
  nextTrack,
  clearPlaylist,
  sortPlaylist,
  toggleLoop,
}) => (
  <View style={styles.playlistButtons}>
    <IconPress icon={faStepBackward} onPress={() => previousTrack()} />
    <IconPress
      icon={isPlaying ? faPause : faPlay}
      onPress={() => playPause()}
    />
    <IconPress
      icon={faStop}
      color={isPlaying ? BLUE : GRAY}
      onPress={() => stopPlayer()}
    />
    <IconPress icon={faStepForward} onPress={() => nextTrack()} />
    <IconPress
      icon={faReply}
      color={isLooping ? BLUE : GRAY}
      onPress={() => toggleLoop()}
    />
    <IconPress icon={faSort} onPress={() => sortPlaylist()} />
    <IconPress icon={faTrash} onPress={() => clearPlaylist()} />
  </View>
);

export default PlayerControls;
