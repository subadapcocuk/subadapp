import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, TouchableOpacity } from "react-native";
import { styles, PURPLE } from "../helpers/styles";

export const IconPress = ({
  onPress,
  icon,
  color = PURPLE,
  size = 24,
  text = null,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <FontAwesomeIcon style={styles.icon} {...{ icon, color, size }} />
      {text && (
        <Text>
          {"\t"}
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};
