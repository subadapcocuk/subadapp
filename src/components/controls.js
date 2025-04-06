import React from "react";
import { View } from "react-native";
import { styles } from "../helpers/styles";
import { IconPress } from "./buttons";

const PlayerControls = ({ isPlaying, onBackward, onForward, onPlay }) => {
  return (
    <View
      style={styles.playlistButtons}
      accessibilityLabel={"oynatma düğmeleri"}
    >
      <IconPress
        icon={"backward"}
        onPress={onBackward}
        label={"önceki şarkı"}
      />
      <IconPress
        icon={isPlaying ? "pause" : "play"}
        onPress={onPlay}
        label={isPlaying ? "duraklat" : "oynat"}
      />
      <IconPress
        icon={"forward"}
        onPress={onForward}
        label={"sonraki şarkı"}
      />
    </View>
  );
};

export default PlayerControls;
