import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Menu from "../components/menu";
import { PlaylistScreen } from "../screens";
import { isLargeScreen } from "../helpers";

const Drawer = createDrawerNavigator();

export const NavigationService = () => {

  return (
    <NavigationContainer accessibilityLabel="Uygulama gezintisi" >
      <Drawer.Navigator
        accessibilityLabel="Uygulama menüsünü içeren gezinti"
        drawerContent={(props) => <Menu {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: isLargeScreen ? "permanent" : "front",
          drawerStyle: isLargeScreen ? null : { width: "60%" },
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
