import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Reanimated from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

export const SwipeableRow = ({
  children,
  onLeftOpen,
  onRightOpen,
  onPress,
}) => {

  const renderLeftActions = (_progress, translation) => {
    return (
      <Reanimated.View style={[styles.action, {
        transform: [{ translateX: translation.value - 50 }],
      }]} />
    );
  };

  const renderRightActions = (_progress, translation) => {
    return (
      <Reanimated.View style={[styles.action, {
        transform: [{ translateX: translation.value + 50 }],
      }]} />
    );
  };

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
