import {
  faBook,
  faDonate,
  faEnvelope,
  faHome,
  faMusic,
  faQuestion,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { IconPress } from "../components/buttons";
import About from "../components/about";
import {
  faCreativeCommonsNc,
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Menu = ({ navigation }) => {
  const [about, setAbout] = useState(false);
  const insets = useSafeAreaInsets();

  const openUrl = (url) => {
    navigation.navigate("Home", { url });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        border: 10,
      }}
    >
      <View style={{ alignSelf: "flex-end" }}>
        <IconPress onPress={navigation.closeDrawer} icon={faTimes} />
      </View>
      {/*<Text style={{ fontSize: 24 }}>Şubadap Müzik Çalar</Text>*/}
      <View>
        <IconPress onPress={() => openUrl()} icon={faMusic} text="Albümler" />
        <IconPress
          onPress={() => openUrl("https://ansiklopedi.subadapcocuk.org/")}
          icon={faBook}
          text={"Ansiklopedi"}
        />
        <IconPress
          onPress={() => openUrl("https://subadapcocuk.org/")}
          icon={faHome}
          text="Şubadap Sitesi"
        />
        <IconPress
          onPress={() => openUrl("https://www.kreosus.com/subadapcocuk")}
          icon={faDonate}
          text="Kreos'ta Bağış Yap"
        />
        <IconPress
          onPress={() => openUrl("https://www.facebook.com/subadapcocuk")}
          icon={faFacebook}
          text="Facebook"
        />
        <IconPress
          onPress={() => openUrl("https://www.instagram.com/subadapcocuk")}
          icon={faInstagram}
          text="Instagram"
        />
        <IconPress
          onPress={() => openUrl("https://twitter.com/subadap")}
          icon={faTwitter}
          text="Twitter"
        />
        <IconPress
          onPress={() => openUrl("https://subadapcocuk.org/iletisim/")}
          icon={faEnvelope}
          text="İletişim"
        />
        <IconPress
          onPress={() =>
            openUrl("http://ansiklopedi.subadapcocuk.org/index.php/Copyleft")
          }
          icon={faCreativeCommonsNc}
          text="Copyleft"
        />
        <IconPress
          onPress={() => setAbout(true)}
          icon={faQuestion}
          text="Uygulama Hakkında"
        />
      </View>
      <About visible={about} close={() => setAbout(false)} />
    </View>
  );
};

export default Menu;
