import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Menu from "../components/menu";
import { Page, Playlist } from "../screens";

const Drawer = createDrawerNavigator();

export const NavigationService = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <Menu {...props} />}
        screenOptions={{
          //headerShown: false,
          headerStyle: {
            height: 40,
          },
          drawerStyle: {
            width: 250,
          },
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
