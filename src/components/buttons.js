import React from "react";
import { Text, TextInput, View } from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { BACKGROUND, FOREGROUND, normalize, styles } from "../helpers/styles";

export const IconPress = ({
  icon,
  onPress = null,
  size = 40,
  title = null,
  label = null,
}) => {
  return (
    <FontAwesome.Button fontSize={normalize(size)} name={icon} backgroundColor={BACKGROUND} color={FOREGROUND} onPress={onPress} accessibilityLabel={label ? label : title}>
      {title && <Text style={styles.iconPressText}>{title}</Text>}
    </FontAwesome.Button>
  );
};

export const IconDrawerItem = ({ onPress, icon = null, label = null }) => (
  <DrawerItem
    style={styles.zeroMargin}
    icon={() => icon && <FontAwesome color={FOREGROUND} size={normalize(30)} name={icon} />}
    label={() => label && <Text style={styles.menuLabel}>{label}</Text>}
    onPress={onPress}
    accessibilityLabel={label}
  />
);

export const TextInputIcon = (props) => {
  const { style, ...rest } = props;
  return (
    <View style={[styles.button, style]} accessibilityLabel={rest.value}>
      {rest?.icon && (
        <FontAwesome
          style={styles.icon}
          name={rest.icon}
          color={FOREGROUND}
        />
      )}
      <TextInput
        style={styles.textInput}
        selectionColor={FOREGROUND}
        selectTextOnFocus
        caretHidden={true}
        {...rest}
      />
    </View>
  );
};
