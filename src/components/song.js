import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  highlightText,
  playlistImageStyle,
  songStyle,
  songText,
  styles,
} from "../helpers/styles";
import { IconButton } from "./buttons";
import { SwipeableRow } from "./swipeable";

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
          style={playlistImageStyle()}
          source={{ uri: song.image }}
          accessibilityLabel={`${song.name} şarkısının resmi`}
        />
      )}
      <Text style={songText(selected && playing, highlight)}>{song.name}</Text>
      {highlight && (
        <Text style={highlightText(selected && playing)}>🥁⭐YENİ⭐🥁</Text>
      )}
      <View
        style={{ marginLeft: "auto", display: "flex", flexDirection: "row" }}
      >
        {onSwipe && (
          <IconButton
            onPress={onSwipe}
            icon={selected ? "minus" : "plus"}
            label={`${song.name} şarkısını ${selected ? "listeden kaldır" : "listeye ekle"
              }`}
          />
        )}
      </View>
    </View>
  </SwipeableRow>
);

export const SongDetail = ({ song, openURL }) => {
  return (
    <>
      {song && (
        <TouchableOpacity
          style={styles.songStyle}
          onPress={() => openURL(`${song.page}#Şarkı_Sözleri`)}
        >
          <Image style={styles.songDetailImage} source={{ uri: song.image }} />
          <Text style={styles.text}>{song.name} Sözleri</Text>
        </TouchableOpacity>
      )}
    </>
  );
};
