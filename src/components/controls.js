import React from "react";
import { View } from "react-native";
import { styles } from "../helpers/styles";
import { LoopType } from "../helpers/utils";
import { IconButton } from "./buttons";

const PlayerControls = ({ isPlaying, onBackward, onForward, onPlay, loop, onLoop }) => {

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
      <IconButton
        icon={loop === LoopType.RepeatSong ? "rotate-right" : (loop === LoopType.RandomList ? "repeat" : "arrow-down-a-z")}
        onPress={onLoop}
        label={"Döngüyü değiştir"}
      />
    </View>
  );
};

export default PlayerControls;
