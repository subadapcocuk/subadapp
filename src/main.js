import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useAppContext } from "./services/context";
import { PURPLE, styles } from "./helpers/";
import { NavigationService } from "./services/navigation";

export const Main = () => {
  const { loading } = useAppContext();
  return (
    <>
      <NavigationService />
      {loading && (
        <View style={styles.activityIndicatorStyle}>
          <ActivityIndicator color={PURPLE} size="large" />
        </View>
      )}
    </>
  );
};

export default Main;
