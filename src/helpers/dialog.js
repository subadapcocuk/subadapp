import { Alert, Modal, View } from "react-native";
import { Toast } from "toastify-react-native";
import { deviceWidth, styles } from "./styles";

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
  Toast.info(message);
};

export const error = (
  message
) => {
  Toast.error(message);
};

export const ModalDialog = ({ children, visible, onDismiss, height = null }) => <Modal
  animationType="fade"
  transparent
  visible={visible}
  onDismiss={onDismiss}>
  <View style={styles.modalView}>
    <View style={[styles.modalInnerView, {
      transform: [{ translateX: -(deviceWidth * 0.45) }, { translateY: -(height * 0.5) }],
      height: height,
      width: deviceWidth * 0.9
    }]}>
      {children}
    </View>
  </View>
</Modal>
