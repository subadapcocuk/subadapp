import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";

import Swipeable from "react-native-gesture-handler/Swipeable";
import { IconText } from "./buttons";

export const SwipeableRow = ({
  children,
  onLeftOpen,
  onRightOpen,
  onPress,
}) => {
  const renderLeftActions = (_progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <Animated.View style={[styles.action, { transform: [{ scale }] }]}>
        <IconText icon={faArrowRight} />
      </Animated.View>
    );
  };

  const renderRightActions = (_progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <Animated.View style={[styles.action, { transform: [{ scale }] }]}>
        <IconText icon={faArrowLeft} style={{ alignSelf: "flex-end" }} />
      </Animated.View>
    );
  };

  const onSwipeableRightOpen = () => {
    onRightOpen && onRightOpen();
  };

  const onSwipeableLeftOpen = () => {
    onLeftOpen && onLeftOpen();
  };

  return (
    <Swipeable
      friction={1}
      enableTrackpadTwoFingerGesture
      {...(onLeftOpen && { onSwipeableLeftOpen, renderLeftActions })}
      {...(onRightOpen && { onSwipeableRightOpen, renderRightActions })}
      useNativeAnimations
    >
      {onPress && (
        <TouchableOpacity {...{ onPress }}>{children}</TouchableOpacity>
      )}
      {!onPress && children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  action: {
    width: 1,
  },
});
