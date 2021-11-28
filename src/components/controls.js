import React from "react";
import { View } from "react-native";
import {
  faPause,
  faPlay,
  faRandom,
  faReply,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import { styles, BLUE, GRAY } from "../helpers/styles";
import { IconPress } from "./buttons";

const PlayerControls = ({
  isLooping,
  isPlaying,
  isRandom,
  onBackward,
  onForward,
  onPlay,
  onLoop,
  onRandom,
}) => {
  return (
    <View style={styles.playlistButtons}>
      <IconPress icon={faStepBackward} onPress={onBackward} />
      <IconPress
        icon={isPlaying ? faPause : faPlay}
        onPress={onPlay}
        size={48}
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
    </View>
  );
};

export default PlayerControls;
