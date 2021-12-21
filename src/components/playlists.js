import { faFolderOpen, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Dialog from "react-native-dialog";
import { deletePlaylist, getPlaylists } from "../api/data";
import { styles } from "../helpers";
import { IconPress } from "./buttons";

const Playlists = ({ visible, open }) => {
  const [playlists, setPlaylists] = useState({});

  const updatePlaylists = () =>
    getPlaylists().then((value) => {
      setPlaylists(
        Object.keys(value).map((key) => ({
          name: key,
          value: value[key],
        }))
      );
    });

  useEffect(() => {
    updatePlaylists();
  }, [visible]);

  const handleDelete = (name) => {
    deletePlaylist(name).then(() => updatePlaylists());
  };

  const Item = ({ name, value }) => (
    <View style={styles.itemStyle}>
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
      <Dialog.Title>Kayıtlı Çalma Listeleri</Dialog.Title>
      <FlatList
        data={playlists}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item) => item.name}
      />
      <Dialog.Button label="İptal" onPress={() => open(false)} />
    </Dialog.Container>
  );
};

export default Playlists;
