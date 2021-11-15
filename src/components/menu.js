import React, { useState } from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
  faBook,
  faDonate,
  faEnvelope,
  faHome,
  faMusic,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCreativeCommonsNc,
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { IconDrawerItem } from "../components/buttons";
import About from "../components/about";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Menu = (props) => {
  const [about, setAbout] = useState(false);
  const insets = useSafeAreaInsets();
  const { navigation } = props;

  const openUrl = (url) => {
    navigation.navigate("Page", { url });
  };

  return (
    <>
      <DrawerContentScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
        {...props}
      >
        <IconDrawerItem
          icon={faMusic}
          label="Tüm Şarkılar"
          onPress={() => navigation.navigate("Playlist")}
        />
        <IconDrawerItem
          onPress={() => navigation.navigate("Albums")}
          icon={faHome}
          label="Albümler"
        />
        <IconDrawerItem
          onPress={() => openUrl("https://ansiklopedi.subadapcocuk.org/")}
          icon={faBook}
          label={"Ansiklopedi"}
        />
        <IconDrawerItem
          onPress={() => openUrl("https://subadapcocuk.org/")}
          icon={faHome}
          label="Şubadap Sitesi"
        />
        <IconDrawerItem
          onPress={() => openUrl("https://www.kreosus.com/subadapcocuk")}
          icon={faDonate}
          label="Kreosus"
        />
        <IconDrawerItem
          onPress={() => openUrl("https://www.facebook.com/subadapcocuk")}
          icon={faFacebook}
          label="Facebook"
        />
        <IconDrawerItem
          onPress={() => openUrl("https://www.instagram.com/subadapcocuk")}
          icon={faInstagram}
          label="Instagram"
        />
        <IconDrawerItem
          onPress={() => openUrl("https://twitter.com/subadap")}
          icon={faTwitter}
          label="Twitter"
        />
        <IconDrawerItem
          onPress={() => openUrl("https://subadapcocuk.org/iletisim/")}
          icon={faEnvelope}
          label="İletişim"
        />
        <IconDrawerItem
          onPress={() =>
            openUrl("http://ansiklopedi.subadapcocuk.org/index.php/Copyleft")
          }
          icon={faCreativeCommonsNc}
          label="Copyleft"
        />
        <IconDrawerItem
          onPress={() => setAbout(true)}
          icon={faQuestion}
          label="Hakkında"
        />
      </DrawerContentScrollView>
      <About visible={about} close={() => setAbout(false)} />
    </>
  );
};

export default Menu;
