import React from "react";
import { Image, TouchableOpacity, Text, View } from "react-native";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { SwipeableRow } from "./swipeable";
import { styles, songStyle, songText, WHITE, PINK } from "../helpers/styles";
import { IconPress } from "./buttons";

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
  <SwipeableRow {...{ onPress, selected, onLeftOpen: onSwipe }}>
    <View style={songStyle(selected && playing)}>
      {image && (
        <Image style={styles.playlistImage} source={{ uri: song.image }} />
      )}
      <Text style={songText(selected && playing)}>{song.name}</Text>
      {onSwipe && (
        <IconPress
          onPress={onSwipe}
          icon={selected ? faMinus : faPlus}
          color={selected && playing ? WHITE : PINK}
          style={{ marginLeft: "auto" }}
        />
      )}
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
          <Text style={{ fontSize: 20 }}>{song.name} Şarkı Sözleri</Text>
        </TouchableOpacity>
      )}
    </>
  );
};
