import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { styles, deletePlaylist, getPlaylists, error, ModalDialog, deviceHeight } from "../helpers";
import { IconButton, TextButton } from "./buttons";

const Playlists = ({ visible, open }) => {
  const [playlists, setPlaylists] = useState([]);

  const updatePlaylists = () =>
    getPlaylists()
      .then((value) => {
        setPlaylists(
          Object.keys(value).map((key) => ({
            name: key,
            value: value[key],
          }))
        );
      })
      .catch((e) => error(`Bir hata oluştu:${e}`));

  useEffect(() => {
    updatePlaylists();
  }, [visible]);

  const handleDelete = (name) => {
    deletePlaylist(name)
      .then(() => updatePlaylists())
      .catch((e) => error(`Bir hata oluştu:${e}`));
  };

  const Item = ({ name, value }) => (
    <View style={styles.itemStyle}
      accessibilityLabel={"liste açma ve kaydetme düğmeleri"}
    >
      <IconButton
        onPress={() => open(name, value)}
        icon={"folder-open"}
      />
      <IconButton
        onPress={() => handleDelete(name)}
        icon={"trash"}
      />
      <Text>{name}</Text>
    </View>
  );

  return (
    <ModalDialog visible={visible} onDismiss={open} height={deviceHeight * 0.8}>
      <View style={styles.centerView}>
        <Text style={styles.icon}>Kayıtlı Çalma Listeleri</Text>
      </View>
      <ScrollView style={styles.scrollView} persistentScrollbar>
        {playlists.map((item) => <Item key={`playlist_${item.name}`} {...item} />)}
      </ScrollView>
      <View style={styles.centerView}>
        <TextButton
          title="Kapat"
          onPress={() => open(false)}
        />
      </View>
    </ModalDialog>
  );
};

export default Playlists;
