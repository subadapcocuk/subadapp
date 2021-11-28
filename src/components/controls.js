import React from "react";
import { View } from "react-native";
import {
  faPause,
  faPlay,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import { styles } from "../helpers/styles";
import { IconPress } from "./buttons";

const PlayerControls = ({ isPlaying, onBackward, onForward, onPlay }) => {
  return (
    <View style={styles.playlistButtons}>
      <IconPress icon={faStepBackward} onPress={onBackward} />
      <IconPress
        icon={isPlaying ? faPause : faPlay}
        onPress={onPlay}
        size={48}
      />
      <IconPress icon={faStepForward} onPress={onForward} />
    </View>
  );
};

export default PlayerControls;
