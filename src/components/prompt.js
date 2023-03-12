import React, { useState } from "react";
import Dialog from "react-native-dialog";
import { styles } from "../helpers/styles";

export default function PromptDialog({
  save,
  visible = true,
  title = "Kaydet",
  description = "Bilgiyi girin",
  initialValue = "",
}) {
  const [value, setValue] = useState(initialValue);

  const handleCancel = () => {
    save(false);
  };

  const handleOk = () => {
    save(value);
  };

  return (
    <Dialog.Container visible={visible} onBackdropPress={handleCancel}>
      <Dialog.Title accessibilityLabel={title} style={styles.icon}>
        {title}
      </Dialog.Title>
      <Dialog.Description accessibilityLabel={title} style={styles.text}>
        {description}
      </Dialog.Description>
      <Dialog.Input
        accessibilityLabel={description}
        value={value}
        onChangeText={setValue}
        style={styles.text}
      />
      <Dialog.Button
        accessibilityLabel="Tamam düğmesi"
        label="Tamam"
        onPress={handleOk}
        style={styles.text}
      />
      <Dialog.Button
        accessibilityLabel="İptal düğmesi"
        label="İptal"
        onPress={handleCancel}
        style={styles.text}
      />
    </Dialog.Container>
  );
}
