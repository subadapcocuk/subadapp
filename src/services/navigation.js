import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform, useWindowDimensions } from "react-native";
import Menu from "../components/menu";
import { PlaylistScreen } from "../screens";

const Drawer = createDrawerNavigator();

export const NavigationService = () => {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  return (
    <NavigationContainer accessibilityLabel="Uygulama gezintisi" >
      <Drawer.Navigator
        accessibilityLabel="Uygulama menüsünü içeren gezinti"
        drawerContent={(props) => <Menu {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: isLargeScreen ? "permanent" : "front",
          drawerStyle: isLargeScreen
            ? Platform.OS === "web"
              ? { width: 240 }
              : null
            : Platform.OS === "web"
              ? { width: Math.min(width * 0.82, 320) }
              : { width: "60%" },
        }}
      >
        <Drawer.Screen
          name="Playlist"
          component={PlaylistScreen}
          options={{ title: "" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
