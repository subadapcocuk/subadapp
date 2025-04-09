import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { styles, deletePlaylist, getPlaylists, error, ModalDialog, deviceHeight } from "../helpers";
import { IconButton } from "./buttons";

const Playlists = ({ visible, open }) => {
  const [playlists, setPlaylists] = useState({});

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
    <View
      style={styles.itemStyle}
      accessibilityLabel={"liste açma ve kaydetme düğmeleri"}
    >
      <IconButton
        onPress={() => open(name, value)}
        icon={"folder-open"}
        title={name}
      />
      <IconButton
        onPress={() => handleDelete(name)}
        icon={"trash"}
        style={{ marginLeft: "auto" }}
      />
    </View>
  );

  return (
    <ModalDialog visible={visible} onDismiss={open} height={deviceHeight * 0.8}>
      <Text style={styles.icon}>Kayıtlı Çalma Listeleri</Text>
      <FlatList
        accessibilityLabel="Kayıtlı çalma listelerinizi gösteren liste"
        data={playlists}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item) => item.name}
      />
      <IconButton
        icon={"window-close"}
        title="Kapat"
        onPress={() => open(false)}
      />
    </ModalDialog>
  );
};

export default Playlists;
