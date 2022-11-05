import React from "react";

import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { styles, GRAY, FOREGROUND } from "../helpers/styles";

function pad(n, width, z = 0) {
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = (position) => [
  Math.floor(position / 60000, 0),
  pad(Math.floor((position / 1000) % 60, 2), 2),
];

const SeekBar = ({
  isPlaying,
  trackLength,
  currentPosition,
  onSeek,
  onSlidingStart,
}) => {
  const elapsed = minutesAndSeconds(currentPosition);
  const remaining = minutesAndSeconds(trackLength - currentPosition);
  return (
    <View style={styles.deviceWidth}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.icon}>{elapsed[0] + ":" + elapsed[1]}</Text>
        <Slider
          style={styles.slider}
          disabled={!isPlaying}
          maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
          onSlidingStart={onSlidingStart}
          onSlidingComplete={onSeek}
          value={currentPosition}
          minimumTrackTintColor={FOREGROUND}
          maximumTrackTintColor={GRAY}
          thumbTintColor={isPlaying ? FOREGROUND : GRAY}
          accessibilityLabel={"şarkı çalma çubuğu"}
        />
        <Text style={styles.icon}>
          {trackLength > 1 && "-" + remaining[0] + ":" + remaining[1]}
        </Text>
      </View>
    </View>
  );
};

export default SeekBar;
