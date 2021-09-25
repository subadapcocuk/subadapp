import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { styles, BLUE } from "./styles";

export const IconButton = ({ url, icon, color = BLUE }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => WebBrowser.openBrowserAsync(url)}
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
      onPress={() => WebBrowser.openBrowserAsync(url)}
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
