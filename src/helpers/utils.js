import { Share } from "react-native";
import { deburr } from "lodash";

export const randomInt = (length, previous) => {
  let current = Math.floor(Math.random() * length);
  while (current === previous) {
    current = Math.floor(Math.random() * length);
  }
  return current;
};

export const LoopType = {
  RandomList: 0,
  FollowList: 1,
  RepeatSong: 2,
};

export const turkishCompare = (a, b) => {
  return deburr(a).localeCompare(deburr(b), "tr");
};

export const shareUrl = async (url) =>
  Share.share({
    message: url,
  })
    .then((result) => {
      if (result.action === Share.sharedAction) {
        console.log(`Shared ${url} as ${result.action}`);
      } else if (result.action === Share.dismissedAction) {
        console.log(`Dismissed ${url} as ${result.action}`);
      }
    })
    .catch((error) => console.error(error.message));

export const shareApp = () =>
  shareUrl(
    "https://play.google.com/store/apps/details?id=org.subadapp&hl=tr&gl=TR"
  );
