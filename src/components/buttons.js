import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { DrawerItem } from "@react-navigation/drawer";
import { Text, TouchableOpacity } from "react-native";
import { styles, BLUE } from "../helpers/styles";

export const IconPress = ({
  onPress,
  icon,
  color = BLUE,
  size = 32,
  text = null,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <FontAwesomeIcon style={styles.icon} {...{ icon, color, size }} />
      {text && (
        <Text style={{ fontSize: 16 }}>
          {"\t"}
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export const IconDrawerItem = ({ onPress, icon = null, label = null }) => (
  <DrawerItem
    style={styles.zeroMargin}
    icon={() => icon && <FontAwesomeIcon color={BLUE} size={28} icon={icon} />}
    label={() => label && <Text style={styles.menuLabel}>{label}</Text>}
    onPress={onPress}
  />
);
