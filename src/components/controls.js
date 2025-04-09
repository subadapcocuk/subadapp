import React from "react";
import { View } from "react-native";
import { styles } from "../helpers/styles";
import { IconButton } from "./buttons";

const PlayerControls = ({ isPlaying, onBackward, onForward, onPlay }) => {
  return (
    <View
      style={styles.playlistButtons}
      accessibilityLabel={"oynatma düğmeleri"}
    >
      <IconButton
        icon={"backward"}
        onPress={onBackward}
        label={"önceki şarkı"}
      />
      <IconButton
        icon={isPlaying ? "pause" : "play"}
        onPress={onPlay}
        label={isPlaying ? "duraklat" : "oynat"}
      />
      <IconButton
        icon={"forward"}
        onPress={onForward}
        label={"sonraki şarkı"}
      />
    </View>
  );
};

export default PlayerControls;
