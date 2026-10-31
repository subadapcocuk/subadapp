import React from "react";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import "react-native-get-random-values";
import Toast from "react-native-toast-message";
import { Platform, useWindowDimensions, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Player from "./src/components/player";
import { ContextProvider } from "./src/helpers/context";
import { NavigationService } from "./src/services/navigation";

export default function App() {
  const { width } = useWindowDimensions();
  const appWidth = Math.min(width, 960);
  const wideWebLayout = Platform.OS === "web" && width >= 768;

  return (
    <SafeAreaProvider>
      <ContextProvider>
        <View
          style={{
            flex: 1,
            width: "100%",
            maxWidth: Platform.OS === "web" ? appWidth : undefined,
            alignSelf: "center",
          }}
        >
          <NavigationService />
          <View
            style={
              wideWebLayout
                ? { width: appWidth - 240, marginLeft: 240 }
                : { width: "100%" }
            }
          >
            <Player />
          </View>
          <StatusBar style="auto" />
          <Toast />
        </View>
      </ContextProvider>
    </SafeAreaProvider>
  );
}
