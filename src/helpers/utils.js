import { Share } from "react-native";
import { deburr } from "lodash";
import { error } from "./dialog";
import { URLS } from "../constants/urls";

export const PLAY_STORE_URL = URLS.PLAY_STORE;

export const randomInt = (length, previous) => {
  if (!length || length <= 1) return 0;
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
  Share.share({ message })
    .then((result) => {
      if (result.action === Share.sharedAction) {
        console.log(message);
      } else if (result.action === Share.dismissedAction) {
        console.log(message);
      }
    })
    .catch((e) => error(`Bir hata oluştu:${e}`));

export const shareApp = () =>
  shareUrl(`ŞubadApp uygulamasını mutlaka denemelisin: ${PLAY_STORE_URL}`);
