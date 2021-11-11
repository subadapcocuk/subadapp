import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationService } from "./src/services/navigation";
import { RootSiblingParent } from "react-native-root-siblings";
import "react-native-gesture-handler";
import "react-native-get-random-values";

export default function App() {
  return (
    <RootSiblingParent>
      <NavigationService />
      <StatusBar style="auto" />
    </RootSiblingParent>
  );
}
