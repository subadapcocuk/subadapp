import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { BACKGROUND, FOREGROUND, normalize, styles } from "../helpers/styles";

export const IconButton = ({
  icon,
  onPress = null,
  size = 20,
  title = null,
  label = null,
}) => {
  return (
    <FontAwesome.Button fontSize={normalize(size)} name={icon} backgroundColor={BACKGROUND} color={FOREGROUND} onPress={onPress} accessibilityLabel={label ? label : title}>
      {title && <Text style={{ color: FOREGROUND, fontSize: normalize(size) }}>{title}</Text>}
    </FontAwesome.Button>
  );
};

export const IconDrawerItem = ({ onPress, icon = null, label = null }) => (
  <DrawerItem
    style={styles.zeroMargin}
    icon={() => icon && <FontAwesome color={FOREGROUND} size={normalize(20)} name={icon} />}
    label={() => label && <Text style={{ color: FOREGROUND, fontSize: normalize(20) }}>{label}</Text>}
    onPress={onPress}
    accessibilityLabel={label}
  />
);

export const TextButton = ({ title, onPress, label = null }) => <TouchableOpacity
  style={styles.button}
  onPress={onPress}
  accessibilityLabel={label ? label : title}>
  <Text>{title}</Text>
</TouchableOpacity>
