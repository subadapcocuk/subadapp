import React from "react";
import { Dimensions } from "react-native";
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
          drawerStyle: {
            width: Dimensions.get("window").width / 2,
          },
        }}
      >
        <Drawer.Screen
          name="Playlist"
          component={Playlist}
          options={{ title: "" }}
        />
        {/*<Drawer.Screen
          name="Albums"
          component={Albums}
          options={{ title: "" }}
        />*/}        
        <Drawer.Screen name="Page" component={Page} options={{ title: "" }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
