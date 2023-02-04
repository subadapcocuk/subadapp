import React from "react";
import { StatusBar } from "expo-status-bar";
import { RootSiblingParent } from "react-native-root-siblings";
import "react-native-get-random-values";
import { NavigationService } from "./src/services/navigation";
import { ContextProvider } from "./src/helpers/context";
import Player from "./src/components/player";

export default function App() {
  return (
    <ContextProvider>
      <RootSiblingParent>
        <NavigationService />
        <Player />
        <StatusBar style="auto" />
      </RootSiblingParent>
    </ContextProvider>
  );
}
