import React from "react";
import { Platform, ScrollView, Text, View } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import * as Linking from "expo-linking";
import { IconDrawerItem, TextButton } from "../components/buttons";
import { deviceHeight, ModalDialog, shareApp, styles } from "../helpers";
import { URLS } from "../constants/urls";

export const Menu = (props) => {
  const { navigation } = props;
  const [installHelpVisible, setInstallHelpVisible] = React.useState(false);

  const openLink = (url) => {
    if (Platform.OS === "web") {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    return Linking.openURL(url);
  };

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
        {Platform.OS === "web" && (
          <IconDrawerItem
            onPress={() => setInstallHelpVisible(true)}
            icon={"mobile-screen-button"}
            label="Telefona ekle"
          />
        )}
        <IconDrawerItem
          onPress={() => openLink(URLS.WEBSITE)}
          icon={"bookmark"}
          label="Subadap.Org"
        />
        <IconDrawerItem
          onPress={() => openLink(URLS.ENCYCLOPEDIA)}
          icon={"book"}
          label={"Ansiklopedi"}
        />
        {Platform.OS !== "ios" && (
          <IconDrawerItem
            onPress={() => openLink(URLS.KREOSUS)}
            icon={"hand-holding-dollar"}
            label="Kreosus"
          />
        )}
        <IconDrawerItem
          onPress={() => openLink(URLS.CONCERTS)}
          icon={"calendar-days"}
          label="Konserler"
        />
        <IconDrawerItem
          onPress={() => openLink(URLS.YOUTUBE)}
          icon={"youtube"}
          label="Youtube"
        />
        <IconDrawerItem
          onPress={() => openLink(URLS.FACEBOOK)}
          icon={"facebook"}
          label="Facebook"
        />
        <IconDrawerItem
          onPress={() => openLink(URLS.INSTAGRAM)}
          icon={"instagram"}
          label="Instagram"
        />
        <IconDrawerItem
          onPress={() => openLink(URLS.TWITTER)}
          icon={"twitter"}
          label="Twitter"
        />
        <IconDrawerItem
          onPress={() => openLink(URLS.CONTACT)}
          icon={"envelope"}
          label="İletişim"
        />
        <IconDrawerItem
          onPress={() => openLink(URLS.COPYLEFT)}
          icon={"creative-commons-nc"}
          label="Copyleft"
        />
        <IconDrawerItem
          onPress={() => openLink(URLS.PRIVACY)}
          icon={"user-shield"}
          label="Gizlilik Politikası"
        />
        <IconDrawerItem
          onPress={() => openLink(URLS.ABOUT)}
          icon={"question"}
          label="Hakkında"
        />
        <IconDrawerItem
          onPress={() => shareApp()}
          icon={"share"}
          label="Paylaş"
        />
      </DrawerContentScrollView>
      {Platform.OS === "web" && (
        <ModalDialog
          visible={installHelpVisible}
          onDismiss={() => setInstallHelpVisible(false)}
          height={deviceHeight * 0.8}
        >
          <ScrollView style={{ width: "100%" }}>
            <View style={{ padding: 16 }}>
              <Text style={[styles.text, { fontWeight: "bold", marginBottom: 12 }]}>
                ŞubadApp’ı telefona ekle
              </Text>
              <Text style={{ color: "#3D0C71", fontSize: 18, fontWeight: "bold" }}>
                iPhone (Safari)
              </Text>
              <Text style={{ color: "#3D0C71", fontSize: 16, marginBottom: 16 }}>
                1. Bu sayfayı Safari’de açın.{"\n"}
                2. Paylaş düğmesine dokunun.{"\n"}
                3. “Ana Ekrana Ekle”yi seçin ve “Ekle”ye dokunun.
              </Text>
              <Text style={{ color: "#3D0C71", fontSize: 18, fontWeight: "bold" }}>
                Android (Chrome)
              </Text>
              <Text style={{ color: "#3D0C71", fontSize: 16 }}>
                1. Chrome menüsünü (⋮) açın.{"\n"}
                2. “Ana ekrana ekle” veya “Uygulamayı yükle”yi seçin.{"\n"}
                3. Onaylamak için “Ekle” ya da “Yükle”ye dokunun.
              </Text>
            </View>
          </ScrollView>
          <View style={styles.centerView}>
            <TextButton
              title="Kapat"
              onPress={() => setInstallHelpVisible(false)}
            />
          </View>
        </ModalDialog>
      )}
    </>
  );
};

export default Menu;
