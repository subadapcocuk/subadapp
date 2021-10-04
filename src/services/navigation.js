import React from "react";
import { Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import "react-native-get-random-values";
import Menu from "../components/menu";
import { Page, Playlist, Home } from "../screens/";

const Drawer = createDrawerNavigator();

export const NavigationService = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={{ width: Dimensions.get("window").width * 0.72 }}
        drawerContent={(props) => <Menu {...props} />}
        //screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Home" component={Home} options={{ title: "" }} />
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
