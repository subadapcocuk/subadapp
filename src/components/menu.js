import React from "react";
import { Platform } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import * as Linking from "expo-linking";
import {
  faBook,
  faCalendarDays,
  faDonate,
  faEnvelope,
  faHome,
  faMusic,
  faQuestion,
  faShare,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCreativeCommonsNc,
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { IconDrawerItem } from "../components/buttons";
import { shareApp } from "../helpers";

export const Menu = (props) => {
  const { navigation } = props;

  const openURL = (url) => {
    if (Platform.OS === "ios") {
      Linking.openURL(url);
    } else {
      navigation.navigate("Page", { url });
    }
  };

  return (
    <>
      <DrawerContentScrollView
        accessibilityLabel="Tüm bağlantıları içeren menü"
        {...props}
      >
        <IconDrawerItem
          icon={faMusic}
          label="Tüm Şarkılar"
          onPress={() => navigation.navigate("Playlist", { tabIndex: 0 })}
        />
        <IconDrawerItem
          onPress={() => openURL("https://ansiklopedi.subadapcocuk.org")}
          icon={faBook}
          label={"Ansiklopedi"}
        />
        <IconDrawerItem
          onPress={() => Linking.openURL("https://subadapcocuk.org")}
          icon={faHome}
          label="Subadap.Org"
        />
        {(Platform.OS !== "ios") &&
          <IconDrawerItem
            onPress={() =>
              Linking.openURL("https://www.kreosus.com/subadapcocuk")
            }

            icon={faDonate}
            label="Kreosus"
          />
        }
        <IconDrawerItem
          onPress={() => openURL("https://subadapcocuk.org/konserler/")}
          icon={faCalendarDays}
          label="Konserler"
        />
        <IconDrawerItem
          onPress={() =>
            Linking.openURL("https://www.youtube.com/c/%C5%9Eubadap%C3%87ocuk")
          }
          icon={faYoutube}
          label="Youtube"
        />
        <IconDrawerItem
          onPress={() =>
            Linking.openURL("https://www.facebook.com/subadapcocuk")
          }
          icon={faFacebook}
          label="Facebook"
        />
        <IconDrawerItem
          onPress={() =>
            Linking.openURL("https://www.instagram.com/subadapcocuk")
          }
          icon={faInstagram}
          label="Instagram"
        />
        <IconDrawerItem
          onPress={() => Linking.openURL("https://twitter.com/subadap")}
          icon={faTwitter}
          label="Twitter"
        />
        <IconDrawerItem
          onPress={() => openURL("https://subadapcocuk.org/iletisim")}
          icon={faEnvelope}
          label="İletişim"
        />
        <IconDrawerItem
          onPress={() =>
            openURL("https://ansiklopedi.subadapcocuk.org/index.php/Copyleft")
          }
          icon={faCreativeCommonsNc}
          label="Copyleft"
        />
        <IconDrawerItem
          onPress={() =>
            openURL("https://subadapcocuk.org/gizlilik-politikasi/")
          }
          icon={faUserShield}
          label="Gizlilik Politikası"
        />
        <IconDrawerItem
          onPress={() => openURL("https://subadapcocuk.org/subadapp/")}
          icon={faQuestion}
          label="Hakkında"
        />
        <IconDrawerItem
          onPress={() => shareApp()}
          icon={faShare}
          label="Paylaş"
        />
      </DrawerContentScrollView>
    </>
  );
};

export default Menu;
