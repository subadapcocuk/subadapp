import { StyleSheet, Dimensions } from "react-native";
export const GRAY = "#F0F0F0";
export const FOREGROUND = "#3D0C71";
export const BACKGROUND = "#FFFFFF";

export const deviceWidth = Dimensions.get("window").width;

export const tabItemTitleStyle = (currentTab) => {
  return {
    color: currentTab ? BACKGROUND : FOREGROUND,
    backgroundColor: currentTab ? FOREGROUND : BACKGROUND,
    borderRadius: 5,
    textTransform: "capitalize",
    fontSize: 22,
  };
};

export const songStyle = (selected) => {
  return {
    ...styles.itemStyle,
    backgroundColor: selected ? FOREGROUND : BACKGROUND,
  };
};

export const songText = (selected) => {
  return {
    color: selected ? BACKGROUND : FOREGROUND,
    borderRadius: 5,
    padding: 5,
    fontSize: 22,
  };
};

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
    fontSize: 20,
  },
  slider: {
    marginTop: 0,
    height: 50,
    flexGrow: 1,
  },
  albumTitle: {
    color: FOREGROUND,
    fontSize: 32,
    textAlign: "center",
  },
  albumYear: {
    color: FOREGROUND,
    fontSize: 24,
    textAlign: "center",
  },
  albumView: {
    width: deviceWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  menuLabel: {
    color: FOREGROUND,
    fontSize: 20,
    padding: 0,
  },
  webview: {
    width: deviceWidth,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  albumImage: {
    height: 100,
    width: 100,
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
    fontSize: 24,
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
  },
  textLink: {
    color: FOREGROUND,
  },
  header: {
    position: "absolute",
    width: "100%",
    height: 150,
    top: 0,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
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
    height: 50,
    width: 50,
  },
  songStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  songImage: {
    height: 125,
    width: 125,
  },
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
    padding: 5,
    width: "85%",
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
});
