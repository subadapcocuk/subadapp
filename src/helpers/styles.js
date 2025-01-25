import { StyleSheet, Dimensions, PixelRatio, Platform } from "react-native";
export const GRAY = "#F0F0F0";
export const FOREGROUND = "#3D0C71";
export const BACKGROUND = "#FFFFFF";

export const deviceWidth = Dimensions.get("window").width;
export const deviceHeight = Dimensions.get("window").height;

export const isLargeScreen = deviceWidth >= 768;

const scale = deviceWidth / 768;

export function normalize(size) {
  if (isLargeScreen) {
    const newSize = size * scale;
    if (Platform.OS === "ios") {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  } else {
    return size;
  }
}

export function tabItemTitleStyle(currentTab) {
  return {
    color: currentTab ? BACKGROUND : FOREGROUND,
    backgroundColor: currentTab ? FOREGROUND : BACKGROUND,
    borderRadius: 5,
    textTransform: "capitalize",
    fontSize: normalize(20),
  };
}

export function songStyle(selected) {
  return {
    ...styles.itemStyle,
    backgroundColor: selected ? FOREGROUND : BACKGROUND,
    width: isLargeScreen ? "75%" : null,
  };
}

export function songText(selected, highlight) {
  return {
    color: selected ? BACKGROUND : FOREGROUND,
    borderRadius: 5,
    padding: 5,
    fontSize: normalize(highlight ? 24 : 20),
    fontWeight: highlight ? "bold" : "normal",
  };
}

export function highlightText(selected) {
  return {
    color: selected ? BACKGROUND : FOREGROUND,
    fontSize: normalize(10),
    fontWeight: "bold",
    paddingLeft: "auto",
  };
}

export const styles = StyleSheet.create({
  itemStyle: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: BACKGROUND,
    borderRadius: 5,
    alignItems: "center",
    padding: 5,
  },
  text: {
    color: FOREGROUND,
    fontSize: normalize(24),
  },
  highlightText: {
    fontSize: normalize(12),
    fontWeight: "bold",
    paddingLeft: "auto",
    color: FOREGROUND,
  },
  slider: {
    marginTop: 0,
    height: 50,
    flexGrow: 1,
  },
  /*albumTitle: {
    color: FOREGROUND,
    fontSize: normalize(30),
    textAlign: "center",
  },
  albumYear: {
    color: FOREGROUND,
    fontSize: normalize(24),
    textAlign: "center",
  },
  albumView: {
    width: deviceWidth,
    justifyContent: "center",
    alignItems: "center",
  },*/
  menuLabel: {
    color: FOREGROUND,
    fontSize: normalize(18),
    padding: 0,
  },
  scrollView: { backgroundColor: BACKGROUND },
  webview: {
    width: deviceWidth,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  songDetailImage: {
    height: normalize(100),
    width: normalize(100),
  },
  bottomView: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: BACKGROUND,
    bottom: 0,
  },
  playlistButtons: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-around",
    width: deviceWidth,
  },
  tabItemContainer: {
    backgroundColor: BACKGROUND,
    borderRadius: 10,
  },
  topView: {
    justifyContent: "space-around",
    width: deviceWidth,
    position: "absolute",
    top: 0,
  },
  headerView: {
    flexDirection: "row",
    padding: 5,
    borderBottomColor: FOREGROUND,
    alignItems: "center",
  },
  link: {
    textDecorationLine: "underline",
    color: FOREGROUND,
  },
  titleView: {
    width: 0,
    flexGrow: 1,
    flex: 1,
  },
  songs: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    fontSize: normalize(20),
    color: FOREGROUND,
    margin: 5,
  },
  menu: {
    flex: 1,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
  },
  centerView: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-around",
    backgroundColor: BACKGROUND,
    width: isLargeScreen ? "75%" : null,
  },
  textLink: {
    color: FOREGROUND,
  },
  button: {
    alignItems: "center",
    flexDirection: "row",
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    height: 120,
    borderRadius: 5,
    margin: 40,
  },
  playlistSongView: {
    flexDirection: "row",
    alignItems: "center",
  },
  playlistImage: {
    height: normalize(50),
    width: normalize(50),
  },
  songStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  /*songImage: {
    height: 150,
    width: 150,
  },*/
  activityIndicatorStyle: {
    flex: 1,
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  textInput: {
    color: FOREGROUND,
    borderColor: FOREGROUND,
    borderWidth: 1,
    height: 40,
    margin: 5,
    padding: 5,
    width: "85%",
    fontSize: normalize(20),
  },
  iconPressText: {
    fontSize: normalize(20),
    color: FOREGROUND,
  },
  zeroMargin: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  seekBar: {
    flexDirection: "row",
    alignItems: "center",
    width: deviceWidth,
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  },
  modalInnerView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
  }
});
