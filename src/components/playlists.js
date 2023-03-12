import { faFolderOpen, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Dialog from "react-native-dialog";
import Toast from "react-native-root-toast";
import { styles, deletePlaylist, getPlaylists } from "../helpers";
import { IconPress } from "./buttons";

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
      .catch((e) => Toast.error(`Bir hata oluştu:${e}`));

  useEffect(() => {
    updatePlaylists();
  }, [visible]);

  const handleDelete = (name) => {
    deletePlaylist(name)
      .then(() => updatePlaylists())
      .catch((e) => Toast.error(`Bir hata oluştu:${e}`));
  };

  const Item = ({ name, value }) => (
    <View
      style={styles.itemStyle}
      accessibilityLabel={"liste açma ve kaydetme düğmeleri"}
    >
      <IconPress
        onPress={() => open(name, value)}
        icon={faFolderOpen}
        text={name}
      />
      <IconPress
        onPress={() => handleDelete(name)}
        icon={faTrash}
        style={{ marginLeft: "auto" }}
      />
    </View>
  );

  return (
    <Dialog.Container visible={visible} onBackdropPress={open}>
      <Dialog.Title style={styles.icon}>Kayıtlı Çalma Listeleri</Dialog.Title>
      <FlatList
        accessibilityLabel="Kayıtlı çalma listelerinizi gösteren liste"
        data={playlists}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item) => item.name}
      />
      <Dialog.Button
        style={styles.text}
        label="İptal"
        onPress={() => open(false)}
      />
    </Dialog.Container>
  );
};

export default Playlists;
