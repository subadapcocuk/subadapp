import { Share } from "react-native";
import { deburr } from "lodash";

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=org.subadapp";

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

export const shareUrl = async (message) =>
  Share.share({message})
    .then((result) => {
      if (result.action === Share.sharedAction) {
        console.log(message);
      } else if (result.action === Share.dismissedAction) {
        console.log(message);
      }
    })
    .catch((error) => console.error(error.message));

export const shareApp = () =>
  shareUrl(
    `Arkadaşınız sizinle Şubadapp uygulamasını paylaştı: ${PLAY_STORE_URL}`
  );
