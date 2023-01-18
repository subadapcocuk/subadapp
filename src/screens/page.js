import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";
import { styles, FOREGROUND } from "../helpers/styles";

export const Page = ({ route }) => {
  const [loading, setLoading] = useState(false);

  const url = route.params.url;

  return url ? (
    <>
      {loading && (
        <View style={styles.activityIndicatorStyle} accessibilityLabel={"işlem bildirimi"}>
          <ActivityIndicator color={FOREGROUND} size="large" />
        </View>
      )}
      <WebView
        style={styles.webview}
        source={{ uri: url }}
        scalesPageToFit={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        accessibilityLabel={`${url} sayfası açık tarayıcı`}
      />
    </>
  ) : (
    <Text>URL Boş!</Text>
  );
};

export default Page;
