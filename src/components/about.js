import React from "react";
import Dialog from "react-native-dialog";
import { Text } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { styles } from "../helpers/styles";

const About = ({ visible, close }) => {
  return (
    <Dialog.Container visible={visible} onBackdropPress={close}>
      <Dialog.Title>Şubadap Çocuk Müzik Çalar</Dialog.Title>
      <Dialog.Description>
        <Text
          onPress={() =>
            WebBrowser.openBrowserAsync("https://subadapcocuk.org")
          }
          style={styles.link}
        >
          Şubadap Çocuk
        </Text>{" "}
        için{" "}
        <Text
          onPress={() =>
            WebBrowser.openBrowserAsync("https://github.com/kinefi")
          }
          style={styles.link}
        >
          Kinefi
        </Text>{" "}
        tarafından geliştirilmiştir.{" "}
        <Text
          onPress={() =>
            WebBrowser.openBrowserAsync(
              "https://github.com/kinefi/subadap-player/blob/main/LICENSE"
            )
          }
          style={styles.link}
        >
          Apache Lisansı v2.0
        </Text>{" "}
        kapsamında yayınlanan{" "}
        <Text
          onPress={() =>
            WebBrowser.openBrowserAsync(
              "https://github.com/kinefi/subadap-player"
            )
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
      <Dialog.Button label="OK" onPress={close} />
    </Dialog.Container>
  );
};

export default About;
