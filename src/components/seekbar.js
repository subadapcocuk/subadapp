import React from "react";

import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { styles, BLUE, GRAY } from "../helpers/styles";

function pad(n, width, z = 0) {
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = (position) => [
  Math.floor(position / 60000, 0),
  pad(Math.floor((position / 1000) % 60, 2), 2),
];

const SeekBar = ({ trackLength, currentPosition, onSeek, onSlidingStart }) => {
  const elapsed = minutesAndSeconds(currentPosition);
  const remaining = minutesAndSeconds(trackLength - currentPosition);
  return (
    <View style={styles.deviceWidth}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.text}>{elapsed[0] + ":" + elapsed[1]}</Text>
        <View style={{ flex: 1 }} />
        <Text style={styles.text}>
          {trackLength > 1 && "-" + remaining[0] + ":" + remaining[1]}
        </Text>
      </View>
      <Slider
        style={styles.slider}
        maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSeek}
        value={currentPosition}
        minimumTrackTintColor={BLUE}
        maximumTrackTintColor={GRAY}
        thumbTintColor={BLUE}
      />
    </View>
  );
};

export default SeekBar;
