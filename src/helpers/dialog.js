import { Alert } from "react-native";
import Toast from "react-native-toast-message";

export const confirm = (
  title,
  message,
  onOK = () => { },
  onCancel = () => { }
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
  Toast.show({
    text2: message,
  });
};

export const error = (
  message
) => {
  console.error(message);
};
