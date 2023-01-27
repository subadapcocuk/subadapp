import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { faMinus, faPlus, faShare } from "@fortawesome/free-solid-svg-icons";
import { PLAY_STORE_URL, shareUrl } from "../helpers";
import {
  BACKGROUND,
  FOREGROUND,
  songStyle,
  songText,
  styles,
} from "../helpers/styles";
import { IconPress } from "./buttons";
import { SwipeableRow } from "./swipeable";

export const Song = ({ song, openUrl }) => (
  <TouchableOpacity style={styles.songStyle} onPress={() => openUrl(song.page)}>
    <Image style={styles.songImage} source={{ uri: song.image }} />
    <Text>
      {song.no} - {song.name}
    </Text>
  </TouchableOpacity>
);

export const SongItem = ({
  song,
  onSwipe,
  playing = true,
  selected = true,
  image = true,
  onPress = false,
}) => (
  <SwipeableRow
    {...{ onPress, selected, onLeftOpen: onSwipe }}
    accessibilityLabel={`${song.name} şarkısı`}
  >
    <View style={songStyle(selected && playing)}>
      {image && (
        <Image
          style={styles.playlistImage}
          source={{ uri: song.image }}
          accessibilityLabel={`${song.name} şarkısının resmi`}
        />
      )}
      <Text style={songText(selected && playing)}>{song.name}</Text>
      <View
        style={{ marginLeft: "auto", display: "flex", flexDirection: "row" }}
      >
        <IconPress
          onPress={() =>
            shareUrl(
              `Şubadap'tan ${song.name} şarkısını dinle: https://subadapp.page.link/?no=${song.no}. Şubadapp uygulamasını indir: ${PLAY_STORE_URL}`
            )
          }
          icon={faShare}
          color={selected && playing ? BACKGROUND : FOREGROUND}
          label={`${song.name} şarkısını paylaş`}
        />
        {onSwipe && (
          <IconPress
            onPress={onSwipe}
            icon={selected ? faMinus : faPlus}
            color={selected && playing ? BACKGROUND : FOREGROUND}
            label={`${song.name} şarkısını ${
              selected ? "listeden kaldır" : "listeye ekle"
            }`}
          />
        )}
      </View>
    </View>
  </SwipeableRow>
);

export const SongDetail = ({ song, openUrl }) => {
  return (
    <>
      {song && (
        <TouchableOpacity
          style={styles.songStyle}
          onPress={() => openUrl(`${song.page}#Şarkı_Sözleri`)}
        >
          <Image style={styles.albumImage} source={{ uri: song.image }} />
          <Text style={styles.text}>{song.name} Sözleri</Text>
        </TouchableOpacity>
      )}
    </>
  );
};
