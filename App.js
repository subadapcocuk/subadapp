import React from "react";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import "react-native-get-random-values";
import Toast from "react-native-toast-message";
import { Platform, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Player from "./src/components/player";
import { ContextProvider } from "./src/helpers/context";
import { NavigationService } from "./src/services/navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <ContextProvider>
        <View
          style={{
            flex: 1,
            width: "100%",
            maxWidth: Platform.OS === "web" ? 600 : undefined,
            alignSelf: "center",
          }}
        >
          <NavigationService />
          <Player />
          <StatusBar style="auto" />
          <Toast />
        </View>
      </ContextProvider>
    </SafeAreaProvider>
  );
}
