import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { BACKGROUND, FOREGROUND, normalize, styles } from "../helpers/styles";

export const IconButton = ({
  icon,
  onPress = null,
  title = null,
  label = null,
  size = 30,
  fontSize = 20,
}) => {
  return (
    <View style={styles.centerView}>
      <FontAwesome style={{ padding: 5 }} size={normalize(size)} name={icon} backgroundColor={BACKGROUND} color={FOREGROUND} onPress={onPress} accessibilityLabel={label ? label : title} />
      {title && <Text style={{ color: FOREGROUND, fontSize: normalize(fontSize) }}>{title}</Text>}
    </View>
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
  <Text style={{ color: BACKGROUND, fontSize: normalize(20) }}>{title}</Text>
</TouchableOpacity>
