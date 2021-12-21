import { deburr } from "lodash";

export const randomInt = (length) => Math.floor(Math.random() * length);

export const LoopType = {
  RandomList: 0,
  FollowList: 1,
  RepeatSong: 2,
};

export const turkishCompare = (a, b) => {
  return deburr(a).localeCompare(deburr(b), "tr");
};
