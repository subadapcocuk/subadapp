import React from "react";
import { Platform } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import * as Linking from "expo-linking";
import { IconDrawerItem } from "../components/buttons";
import { shareApp } from "../helpers";

export const Menu = (props) => {
  const { navigation } = props;

  return (
    <>
      <DrawerContentScrollView
        accessibilityLabel="Tüm bağlantıları içeren menü"
        {...props}
      >
        <IconDrawerItem
          icon={"music"}
          label="Tüm Şarkılar"
          onPress={() => navigation.navigate("Playlist", { tabIndex: 0 })}
        />
        <IconDrawerItem
          onPress={() => Linking.openURL("https://subadapcocuk.org")}
          icon={"bookmark"}
          label="Subadap.Org"
        />
        <IconDrawerItem
          onPress={() => Linking.openURL("https://ansiklopedi.subadapcocuk.org")}
          icon={"book"}
          label={"Ansiklopedi"}
        />
        {(Platform.OS !== "ios") &&
          <IconDrawerItem
            onPress={() =>
              Linking.openURL("https://www.kreosus.com/subadapcocuk")
            }

            icon={"hand-holding-dollar"}
            label="Kreosus"
          />
        }
        <IconDrawerItem
          onPress={() => Linking.openURL("https://subadapcocuk.org/konserler/")}
          icon={"calendar-days"}
          label="Konserler"
        />
        <IconDrawerItem
          onPress={() =>
            Linking.openURL("https://www.youtube.com/c/%C5%9Eubadap%C3%87ocuk")
          }
          icon={"youtube"}
          label="Youtube"
        />
        <IconDrawerItem
          onPress={() =>
            Linking.openURL("https://www.facebook.com/subadapcocuk")
          }
          icon={"facebook"}
          label="Facebook"
        />
        <IconDrawerItem
          onPress={() =>
            Linking.openURL("https://www.instagram.com/subadapcocuk")
          }
          icon={"instagram"}
          label="Instagram"
        />
        <IconDrawerItem
          onPress={() => Linking.openURL("https://twitter.com/subadap")}
          icon={"twitter"}
          label="Twitter"
        />
        <IconDrawerItem
          onPress={() => Linking.openURL("https://subadapcocuk.org/iletisim")}
          icon={"envelope"}
          label="İletişim"
        />
        <IconDrawerItem
          onPress={() =>
            Linking.openURL("https://ansiklopedi.subadapcocuk.org/index.php/Copyleft")
          }
          icon={"creative-commons-nc"}
          label="Copyleft"
        />
        <IconDrawerItem
          onPress={() =>
            Linking.openURL("https://subadapcocuk.org/gizlilik-politikasi/")
          }
          icon={"user-shield"}
          label="Gizlilik Politikası"
        />
        <IconDrawerItem
          onPress={() => Linking.openURL("https://subadapcocuk.org/subadapp/")}
          icon={"question"}
          label="Hakkında"
        />
        <IconDrawerItem
          onPress={() => shareApp()}
          icon={"share"}
          label="Paylaş"
        />
      </DrawerContentScrollView>
    </>
  );
};

export default Menu;
