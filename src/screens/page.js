import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";
import { styles, PURPLE } from "../helpers/styles";

export const Page = ({ route }) => {
  const [loading, setLoading] = useState(false);

  const url = route.params.url;

  return url ? (
    <>
      {loading && (
        <View style={styles.activityIndicatorStyle}>
          <ActivityIndicator color={PURPLE} size="large" />
        </View>
      )}
      <WebView
        style={styles.webview}
        source={{ uri: url }}
        //onNavigationStateChange={(navState) => console.log(navState)}
        //startInLoadingState={true}
        scalesPageToFit={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </>
  ) : (
    <Text>URL Boş!</Text>
  );
};

export default Page;
