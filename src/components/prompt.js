import React, { useState } from "react";
import Dialog from "react-native-dialog";

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
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>{description}</Dialog.Description>
      <Dialog.Input value={value} onChangeText={setValue} />
      <Dialog.Button label="Tamam" onPress={handleOk} />
      <Dialog.Button label="İptal" onPress={handleCancel} />
    </Dialog.Container>
  );
}
