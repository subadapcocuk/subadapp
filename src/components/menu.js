import React from "react";
import { Platform } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import * as Linking from "expo-linking";
import { IconDrawerItem } from "../components/buttons";
import { shareApp } from "../helpers";
import { URLS } from "../constants/urls";

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
          onPress={() => Linking.openURL(URLS.WEBSITE)}
          icon={"bookmark"}
          label="Subadap.Org"
        />
        <IconDrawerItem
          onPress={() => Linking.openURL(URLS.ENCYCLOPEDIA)}
          icon={"book"}
          label={"Ansiklopedi"}
        />
        {Platform.OS !== "ios" && (
          <IconDrawerItem
            onPress={() => Linking.openURL(URLS.KREOSUS)}
            icon={"hand-holding-dollar"}
            label="Kreosus"
          />
        )}
        <IconDrawerItem
          onPress={() => Linking.openURL(URLS.CONCERTS)}
          icon={"calendar-days"}
          label="Konserler"
        />
        <IconDrawerItem
          onPress={() => Linking.openURL(URLS.YOUTUBE)}
          icon={"youtube"}
          label="Youtube"
        />
        <IconDrawerItem
          onPress={() => Linking.openURL(URLS.FACEBOOK)}
          icon={"facebook"}
          label="Facebook"
        />
        <IconDrawerItem
          onPress={() => Linking.openURL(URLS.INSTAGRAM)}
          icon={"instagram"}
          label="Instagram"
        />
        <IconDrawerItem
          onPress={() => Linking.openURL(URLS.TWITTER)}
          icon={"twitter"}
          label="Twitter"
        />
        <IconDrawerItem
          onPress={() => Linking.openURL(URLS.CONTACT)}
          icon={"envelope"}
          label="İletişim"
        />
        <IconDrawerItem
          onPress={() => Linking.openURL(URLS.COPYLEFT)}
          icon={"creative-commons-nc"}
          label="Copyleft"
        />
        <IconDrawerItem
          onPress={() => Linking.openURL(URLS.PRIVACY)}
          icon={"user-shield"}
          label="Gizlilik Politikası"
        />
        <IconDrawerItem
          onPress={() => Linking.openURL(URLS.ABOUT)}
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
