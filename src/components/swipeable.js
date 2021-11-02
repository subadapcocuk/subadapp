import React from "react";
import { Animated, StyleSheet, View } from "react-native";

import Swipeable from "react-native-gesture-handler/Swipeable";

const AnimatedView = Animated.createAnimatedComponent(View);

export const SwipeableRow = ({ children, onLeftOpen, onRightOpen }) => {
  renderLeftActions = (_progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return <AnimatedView style={[styles.action, { transform: [{ scale }] }]} />;
  };

  renderRightActions = (_progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return <AnimatedView style={[styles.action, { transform: [{ scale }] }]} />;
  };

  onSwipeableRightOpen = () => {
    onRightOpen && onRightOpen();
  };

  onSwipeableLeftOpen = () => {
    onLeftOpen && onLeftOpen();
  };

  return (
    <Swipeable
      friction={1}
      enableTrackpadTwoFingerGesture
      {...(onLeftOpen && { onSwipeableLeftOpen, renderLeftActions })}
      {...(onRightOpen && { onSwipeableRightOpen, renderRightActions })}
    >
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  action: {
    width: 1,
  },
});
