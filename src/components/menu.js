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
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import * as WebBrowser from "expo-web-browser";
import { IconDrawerItem } from "../components/buttons";
import About from "../components/about";

export const Menu = (props) => {
  const [about, setAbout] = useState(false);
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
          onPress={() => navigation.navigate("Playlist", { tabIndex: 0 })}
        />
        <IconDrawerItem
          onPress={() => openUrl("https://ansiklopedi.subadapcocuk.org")}
          icon={faBook}
          label={"Ansiklopedi"}
        />
        <IconDrawerItem
          onPress={() => openUrl("https://subadapcocuk.org")}
          icon={faHome}
          label="Şubadap Sitesi"
        />
        <IconDrawerItem
          onPress={() =>
            WebBrowser.openBrowserAsync("https://www.kreosus.com/subadapcocuk")
          }
          icon={faDonate}
          label="Kreosus"
        />
        <IconDrawerItem
          onPress={() =>
            WebBrowser.openBrowserAsync(
              "https://www.youtube.com/c/%C5%9Eubadap%C3%87ocuk"
            )
          }
          icon={faYoutube}
          label="Youtube"
        />
        <IconDrawerItem
          onPress={() =>
            WebBrowser.openBrowserAsync("https://www.facebook.com/subadapcocuk")
          }
          icon={faFacebook}
          label="Facebook"
        />
        <IconDrawerItem
          onPress={() =>
            WebBrowser.openBrowserAsync(
              "https://www.instagram.com/subadapcocuk"
            )
          }
          icon={faInstagram}
          label="Instagram"
        />
        <IconDrawerItem
          onPress={() =>
            WebBrowser.openBrowserAsync("https://twitter.com/subadap")
          }
          icon={faTwitter}
          label="Twitter"
        />
        <IconDrawerItem
          onPress={() => openUrl("https://subadapcocuk.org/iletisim")}
          icon={faEnvelope}
          label="İletişim"
        />
        <IconDrawerItem
          onPress={() =>
            openUrl("https://ansiklopedi.subadapcocuk.org/index.php/Copyleft")
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
