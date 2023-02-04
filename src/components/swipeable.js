import React from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

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
      <Animated.View style={[styles.action, { transform: [{ scale }] }]} />
    );
  };

  const renderRightActions = (_progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <Animated.View style={[styles.action, { transform: [{ scale }] }]} />
    );
  };

  return (
    <Swipeable
      friction={1}
      enableTrackpadTwoFingerGesture
      onSwipeableOpen={(direction) => {
        if (direction === "left" && onLeftOpen) {
          onLeftOpen();
        } else if (direction === "right" && onRightOpen) {
          onRightOpen();
        }
      }}
      {...(onLeftOpen && { renderLeftActions })}
      {...(onRightOpen && { renderRightActions })}
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
