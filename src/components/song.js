import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
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
  highlight = false,
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
      <Text style={songText(selected && playing, highlight)}>{song.name}</Text>
      {highlight && <Text style={styles.highlightText}>🌈🎉YENİ🎉🌈</Text>}
      <View
        style={{ marginLeft: "auto", display: "flex", flexDirection: "row" }}
      >
        {/*<IconPress
          onPress={() =>
            shareUrl(
              `Şubadap Çocuk'tan ${song.name} şarkısını dinlemelisin: https://subadapp.page.link/oynat?song=${song.no}`
            )
          }
          icon={faShare}
          color={selected && playing ? BACKGROUND : FOREGROUND}
          label={`${song.name} şarkısını paylaş`}
        />*/}
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
