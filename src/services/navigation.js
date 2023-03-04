import React from "react";
import Constants from "expo-constants";
import { useWindowDimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Menu from "../components/menu";
import { Page, Playlist } from "../screens";
import { FOREGROUND } from "../helpers";

const Drawer = createDrawerNavigator();

export const NavigationService = () => {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;

  return (
    <NavigationContainer accessibilityLabel="Uygulama gezintisi">
      <Drawer.Navigator
        accessibilityLabel="Uygulama menüsünü içeren gezinti"
        drawerContent={(props) => <Menu {...props} />}
        screenOptions={{
          headerTintColor: FOREGROUND,
          headerStyle: {
            height: Constants.statusBarHeight,
          },
          drawerType: isLargeScreen ? "permanent" : "front",
          drawerStyle: isLargeScreen ? null : { width: 250 },
        }}
      >
        <Drawer.Screen
          name="Playlist"
          component={Playlist}
          options={{ title: "" }}
        />
        <Drawer.Screen name="Page" component={Page} options={{ title: "" }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
