import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { PINK, styles } from "../helpers/styles";

export const IconPress = ({
  icon,
  onPress = null,
  color = PINK,
  size = 40,
  text = null,
  style = {},
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} accessibilityLabel={text}>
      <FontAwesomeIcon style={styles.icon} {...{ icon, color, size }} />
      {text && <Text style={{ fontSize: 20 }}>{text}</Text>}
    </TouchableOpacity>
  );
};

export const IconDrawerItem = ({ onPress, icon = null, label = null }) => (
  <DrawerItem
    style={styles.zeroMargin}
    icon={() => icon && <FontAwesomeIcon color={PINK} size={30} icon={icon} />}
    label={() => label && <Text style={styles.menuLabel}>{label}</Text>}
    onPress={onPress}
    accessibilityLabel={label}
  />
);

export const IconText = ({
  icon,
  color = PINK,
  size = 30,
  text = null,
  style = {},
}) => {
  return (
    <View style={[styles.button, style]} accessibilityLabel={text}>
      <FontAwesomeIcon style={styles.icon} {...{ icon, color, size }} />
      {text && <Text style={{ fontSize: 16 }}>{text}</Text>}
    </View>
  );
};

export const TextInputIcon = (props) => {
  const { style, ...rest } = props;
  return (
    <View style={[styles.button, style]} accessibilityLabel={rest.value}>
      {rest?.icon && (
        <FontAwesomeIcon
          style={styles.icon}
          icon={rest.icon}
          color={PINK}
          size={30}
        />
      )}
      <TextInput
        style={styles.textInput}
        selectionColor={PINK}
        selectTextOnFocus
        caretHidden={true}
        {...rest}
      />
    </View>
  );
};
