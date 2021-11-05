import { StyleSheet, Dimensions } from "react-native";
export const GRAY = "#E0E0E0";
export const PINK = "#D42E94";
export const BLUE = "#529DD6";
export const PURPLE = "#6B1FBF";
export const WHITE = "#FFFFFF";
export const GREEN = "#009688";

export const deviceWidth = Dimensions.get("window").width;

export const songStyle = (selected) => {
  return {
    flex: 1,
    flexDirection: "row",
    backgroundColor: selected ? PURPLE : "white",
    borderRadius: 5,
    alignItems: "center",
    padding: 5,
  };
};

export const songText = (selected) => {
  return {
    color: selected ? "white" : PURPLE,
    borderRadius: 5,
    padding: 5,
    fontSize: 18,
  };
};

export const styles = StyleSheet.create({
  albumTitle: {
    color: BLUE,
    fontSize: 32,
    textAlign: "center",
  },
  albumYear: {
    color: BLUE,
    fontSize: 24,
    textAlign: "center",
  },
  albumView: {
    width: deviceWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  webview: {
    width: deviceWidth,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  albumImage: {
    height: 150,
    width: 150,
  },
  bottomView: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
  },
  playlistButtons: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-around",
    width: "100%",
  },
  topView: {
    justifyContent: "space-around",
    width: "100%",
    position: "absolute",
    top: 0,
  },
  headerView: {
    flexDirection: "row",
    padding: 5,
    borderBottomColor: BLUE,
    alignItems: "center",
  },
  link: {
    textDecorationLine: "underline",
    color: BLUE,
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
  container: {
    flex: 1,
    justifyContent: "center",
  },
  icon: {
    fontSize: 32,
    color: BLUE,
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
    margin: 5,
  },
  textLink: {
    color: BLUE,
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
    //justifyContent: "center",
    height: 50,
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
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 5,
    margin: 5,
    padding: 5,
    alignItems: "center",
    padding: 10,
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
});
