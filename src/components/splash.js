import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { Animated, StyleSheet, View } from "react-native";

export const AnimatedAppLoader = ({
  children,
  image = { uri: Constants.manifest.splash.image },
}) => {
  const [isSplashReady, setSplashReady] = React.useState(false);

  const startAsync = React.useMemo(
    // If you use a local image with require(...), use `Asset.fromModule`
    () => () => {
      Asset.fromModule("../../assets/splash.png").downloadAsync();
    },
    [image]
  );

  const onFinish = React.useMemo(() => {
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
  const animation = React.useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = React.useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] =
    React.useState(false);

  React.useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  console.log(isAppReady, isSplashAnimationComplete);

  const onImageLoaded = React.useMemo(() => async () => {
    try {
      await SplashScreen.hideAsync();
      const cacheAssets = Asset.loadAsync([
        require("../../assets/adaptive-icon.png"),
        require("../../assets/favicon.png"),
        require("../../assets/icon.png"),
        require("../../assets/splash.png"),
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
