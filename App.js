import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationService } from "./src/services/navigation";
import "react-native-gesture-handler";
import "react-native-get-random-values";

export default function App() {
  return (
    <>
      <NavigationService />
      <StatusBar style="auto" />
    </>
  );
}
