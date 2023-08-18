import React from "react";
import { Text, Linking } from "react-native";
import Dialog from "react-native-dialog";
import Constants from "expo-constants";
import { styles } from "../helpers";

const About = ({ visible, close }) => {
  return (
    <Dialog.Container
      visible={visible}
      onBackdropPress={close}
      accessibilityLabel="Uygulama Hakkında Bilgi"
    >
      <Dialog.Title style={styles.icon}>
        ŞUBADAPP (Sürüm {Constants.expoConfig.version})
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
      </Dialog.Description>
      <Dialog.Button label="Tamam" onPress={close} style={styles.text} />
    </Dialog.Container>
  );
};

export default About;
