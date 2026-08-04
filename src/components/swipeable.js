import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Reanimated, { useAnimatedStyle } from "react-native-reanimated";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

const LeftActionView = ({ translation }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translation.value - 50 }],
  }));
  return <Reanimated.View style={[styles.action, animatedStyle]} />;
};

const RightActionView = ({ translation }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translation.value + 50 }],
  }));
  return <Reanimated.View style={[styles.action, animatedStyle]} />;
};

export const SwipeableRow = ({
  children,
  onLeftOpen,
  onRightOpen,
  onPress,
}) => {
  const renderLeftActions = (_progress, translation) => (
    <LeftActionView translation={translation} />
  );

  const renderRightActions = (_progress, translation) => (
    <RightActionView translation={translation} />
  );

  return (
    <Swipeable
      onSwipeableOpen={(direction) => {
        if (direction === "left" && onLeftOpen) {
          onLeftOpen();
        } else if (direction === "right" && onRightOpen) {
          onRightOpen();
        }
      }}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
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
