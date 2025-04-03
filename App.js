import React from "react";
import "react-native-gesture-handler";
import "react-native-get-random-values";
import ToastManager from "toastify-react-native";
import Player from "./src/components/player";
import { ContextProvider } from "./src/helpers/context";
import { NavigationService } from "./src/services/navigation";

export default function App() {
  return (
    <ContextProvider>
      <NavigationService />
      <Player />
      <ToastManager />
    </ContextProvider>
  );
}
