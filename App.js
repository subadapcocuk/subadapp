import React from "react";
import { StatusBar } from "expo-status-bar";
import { ContextProvider } from "./src/services/context";
import { Main } from "./src/main";

export default function App() {
  return (
    <ContextProvider>
      <Main />
      <StatusBar style="auto" />
    </ContextProvider>
  );
}
