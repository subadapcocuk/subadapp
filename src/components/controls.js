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
  isLooping,
  isPlaying,
  isRandom,
  onBackward,
  onClear,
  onForward,
  onPlay,
  onSort,
  onStop,
  onLoop,
  onRandom,
}) => {
  return (
    <View style={styles.playlistButtons}>
      <IconPress icon={faStepBackward} onPress={onBackward} />
      <IconPress icon={isPlaying ? faPause : faPlay} onPress={onPlay} />
      <IconPress
        icon={faStop}
        color={isPlaying ? BLUE : GRAY}
        onPress={onStop}
      />
      <IconPress icon={faStepForward} onPress={onForward} />
      <IconPress
        icon={faReply}
        color={isLooping ? BLUE : GRAY}
        onPress={onLoop}
      />
      <IconPress
        color={isRandom ? BLUE : GRAY}
        icon={faRandom}
        onPress={onRandom}
      />
      <IconPress icon={faSort} onPress={onSort} />
      <IconPress icon={faTrash} onPress={onClear} />
    </View>
  );
};

export default PlayerControls;
