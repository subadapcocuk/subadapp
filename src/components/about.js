import React from "react";
import { Share, Text, Linking } from "react-native";
import Dialog from "react-native-dialog";
import Constants from "expo-constants";
import Toast from "react-native-root-toast";
import { styles } from "../helpers/styles";

const About = ({ visible, close }) => {
  const shareApp = async () => {
    try {
      const result = await Share.share({
        message:
          "https://play.google.com/store/apps/details?id=org.subadapp&hl=tr&gl=TR",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          Toast.show(`Yapılan işlem: ${result.activityType}`);
        } else {
          Toast.show("Paylaşıldı");
        }
      } else if (result.action === Share.dismissedAction) {
        Toast.show("Paylaşım iptal edildi");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Dialog.Container visible={visible} onBackdropPress={close}>
      <Dialog.Title style={styles.icon}>
        ŞUBADAPP (Sürüm {Constants.manifest.version})
      </Dialog.Title>
      <Dialog.Description style={styles.text}>
        ŞUBADAPP,{" "}
        <Text
          onPress={() => Linking.openURL("https://subadapcocuk.org")}
          style={styles.link}
        >
          Şubadap Çocuk
        </Text>{" "}
        için geliştirilmiştir.{" "}
        <Text
          onPress={() =>
            Linking.openURL(
              "https://github.com/subadapcocuk/subadapp/blob/main/LICENSE"
            )
          }
          style={styles.link}
        >
          Apache Lisansı v2.0
        </Text>{" "}
        kapsamında yayınlanan{" "}
        <Text
          onPress={() =>
            Linking.openURL("https://github.com/subadapcocuk/subadapp")
          }
          style={styles.link}
        >
          özgür bir yazılımdır
        </Text>{" "}
        . Tüm şarkılara, kitaplara ve ek bilgilere ulaşmak için{" "}
        <Text
          onPress={() =>
            Linking.openURL("https://ansiklopedi.subadapcocuk.org")
          }
          style={styles.link}
        >
          Şubadap Çocuk Ansiklopedisi
        </Text>
        'ne bakabilirsiniz.
        <Text onPress={shareApp} style={styles.link}>
          Uygulamayı başkalarıyla paylaşın
        </Text>
      </Dialog.Description>
      <Dialog.Button label="Tamam" onPress={close} style={styles.text} />
    </Dialog.Container>
  );
};

export default About;
