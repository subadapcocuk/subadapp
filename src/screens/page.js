import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { styles } from "../helpers/styles";
import { useAppContext } from "../services/context";

export const Page = ({ route }) => {
  const { setLoading } = useAppContext();

  const url = route.params.url;

  return (
    <SafeAreaView style={styles.albumsView}>
      {url ? (
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
      ) : (
        <Text>URL Boş!</Text>
      )}
    </SafeAreaView>
  );
};

export default Page;
