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
