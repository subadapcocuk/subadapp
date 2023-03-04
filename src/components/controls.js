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
    <View
      style={styles.playlistButtons}
      accessibilityLabel={"oynatma düğmeleri"}
    >
      <IconPress
        icon={faStepBackward}
        onPress={onBackward}
        label={"önceki şarkı"}
      />
      <IconPress
        icon={isPlaying ? faPause : faPlay}
        onPress={onPlay}
        label={isPlaying ? "duraklat" : "oynat"}
      />
      <IconPress
        icon={faStepForward}
        onPress={onForward}
        label={"sonraki şarkı"}
      />
    </View>
  );
};

export default PlayerControls;
