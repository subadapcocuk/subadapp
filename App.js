import React, { useEffect, useState, useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { Asset } from "expo-asset";
import { NavigationService } from "./src/services/navigation";
import { RootSiblingParent } from "react-native-root-siblings";
import "react-native-gesture-handler";
import "react-native-get-random-values";
import AppLoading from "expo-app-loading";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import { Animated, StyleSheet, View } from "react-native";

export const AnimatedAppLoader = ({ children, image }) => {
  const [isSplashReady, setSplashReady] = useState(false);

  const startAsync = useMemo(
    // If you use a local image with require(...), use `Asset.fromModule`
    () => () => {
      Asset.fromModule(image).downloadAsync();
    },
    [image]
  );

  const onFinish = useMemo(() => {
    setSplashReady(true);
  }, []);

  if (!isSplashReady) {
    return (
      <AppLoading
        // Instruct SplashScreen not to hide yet, we want to do this manually
        autoHideSplash={false}
        startAsync={startAsync}
        onError={console.error}
        onFinish={onFinish}
      />
    );
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
};

const AnimatedSplashScreen = ({ children, image }) => {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = useMemo(() => async () => {
    try {
      await SplashScreen.hideAsync();
      const cacheAssets = Asset.loadAsync([
        require("./assets/adaptive-icon.png"),
        require("./assets/favicon.png"),
        require("./assets/icon.png"),
        require("./assets/splash.png"),
      ]);
      return Promise.all([cacheAssets]);
    } catch (e) {
      console.error(e);
    } finally {
      setAppReady(true);
    }
  });

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Constants.manifest.splash.backgroundColor,
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: Constants.manifest.splash.resizeMode || "contain",
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
};
export default function App() {
  return (
    <AnimatedAppLoader image={require("./assets/subadap.png")}>
      <RootSiblingParent>
        <NavigationService />
        <StatusBar style="auto" />
      </RootSiblingParent>
    </AnimatedAppLoader>
  );

  /*!appIsReady ? (
    <AppLoading
      startAsync={loadResources}
      onError={console.warn}
      onFinish={() => setAppIsReady(true)}
    />
  ) : (
    <RootSiblingParent>
      <NavigationService />
      <StatusBar style="auto" />
    </RootSiblingParent>
  );*/
}
