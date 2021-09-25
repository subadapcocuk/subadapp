import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Linking, Text, TouchableOpacity } from "react-native";
import { styles, BLUE } from "./styles";

export const IconButton = ({ url, icon, color = BLUE }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => Linking.openURL(url)}
    >
      <FontAwesomeIcon
        icon={icon}
        style={styles.icon}
        size={32}
        color={color}
      />
    </TouchableOpacity>
  );
};

export const IconPress = ({ onPress, icon, color = BLUE }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <FontAwesomeIcon
        icon={icon}
        style={styles.icon}
        color={color}
        size={32}
      />
    </TouchableOpacity>
  );
};

export const TextButton = ({ url, text }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => Linking.openURL(url)}
    >
      <Text style={styles.icon}>{text}</Text>
    </TouchableOpacity>
  );
};

export const TextPress = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.icon}>{text}</Text>
    </TouchableOpacity>
  );
};
