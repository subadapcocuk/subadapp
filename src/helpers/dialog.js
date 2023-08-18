import { Alert } from "react-native";
import Toast from "react-native-root-toast";

export const confirm = (
  title,
  message,
  onOK = () => {},
  onCancel = () => {}
) => {
  Alert.alert(title, message, [
    {
      text: "Evet",
      onPress: onOK,
    },
    {
      text: "Hayır",
      style: "cancel",
      onPress: onCancel,
    },
  ]);
};

export const show = (
  message
) => {
  Toast.show(message);
};

export const error = (
  message
) => {
  Toast.show(message);
};
