import { Alert } from "react-native";

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
