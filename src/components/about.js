import React from "react";
import { Text } from "react-native";
import Dialog from "react-native-dialog";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import { styles } from "../helpers/styles";

const About = ({ visible, close }) => {
  return (
    <Dialog.Container visible={visible} onBackdropPress={close}>
      <Dialog.Title>ŞUBADAPP (Sürüm {Constants.manifest.version})</Dialog.Title>
      <Dialog.Description>
        ŞUBADAPP,{" "}
        <Text
          onPress={() =>
            WebBrowser.openBrowserAsync("https://subadapcocuk.org")
          }
          style={styles.link}
        >Şubadap Çocuk</Text> için geliştirilmiştir.{" "}
        <Text
          onPress={() =>
            WebBrowser.openBrowserAsync(
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
            WebBrowser.openBrowserAsync("https://github.com/subadapcocuk/subadapp")
          }
          style={styles.link}
        >
          özgür bir yazılımdır
        </Text>{" "}
        . Tüm şarkılara, kitaplara ve ek bilgilere ulaşmak için{" "}
        <Text
          onPress={() =>
            WebBrowser.openBrowserAsync("https://ansiklopedi.subadapcocuk.org")
          }
          style={styles.link}
        >
          Şubadap Çocuk Ansiklopedisi
        </Text>
        'ne bakabilirsiniz.
      </Dialog.Description>
      <Dialog.Button label="Tamam" onPress={close} />
    </Dialog.Container>
  );
};

export default About;
