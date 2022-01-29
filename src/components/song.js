import React from "react";
import { Image, TouchableOpacity, Text, View } from "react-native";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { SwipeableRow } from "./swipeable";
import { styles, songStyle, songText, WHITE, BLUE } from "../helpers/styles";
import { IconPress, IconText } from "./buttons";

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
  selected,
  onLeftOpen,
  onRightOpen,
  image = true,
  onPress = false,
}) => (
  <SwipeableRow {...{ onLeftOpen, onRightOpen, onPress, selected }}>
    <View style={songStyle(selected)}>
      {onRightOpen && (
        <IconPress
          onPress={onRightOpen}
          icon={faArrowLeft}
          color={selected ? WHITE : BLUE}
        />
      )}
      {image && (
        <Image style={styles.playlistImage} source={{ uri: song.image }} />
      )}
      <Text style={songText(selected)}>{song.name}</Text>
      {onLeftOpen && (
        <IconPress
          onPress={onLeftOpen}
          icon={faArrowRight}
          color={selected ? WHITE : BLUE}
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
          <Text style={{ fontSize: 18 }}>{song.name}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};
