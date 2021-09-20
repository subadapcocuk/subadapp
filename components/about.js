import React from 'react';
import Dialog from 'react-native-dialog';
import {Linking, Text} from 'react-native';
import {styles} from './styles';

const About = ({visible, close}) => {
  return (
    <Dialog.Container visible={visible} onBackdropPress={close}>
      <Dialog.Title>Şubadap Çocuk Müzik Çalar</Dialog.Title>
      <Dialog.Description>
        <Text
          onPress={() => Linking.openURL('https://subadapcocuk.org')}
          style={styles.link}>
          Şubadap Çocuk
        </Text>{' '}
        için{' '}
        <Text
          onPress={() => Linking.openURL('https://github.com/kinefi')}
          style={styles.link}>
          Kinefi
        </Text>{' '}
        tarafından geliştirilmiştir. Tüm şarkılara, kitaplara ve ek bilgilere
        ulaşmak için{' '}
        <Text
          onPress={() =>
            Linking.openURL('https://ansiklopedi.subadapcocuk.org')
          }
          style={styles.link}>
          Şubadap Çocuk Ansiklopedisi
        </Text>'ne bakabilirsiniz.
      </Dialog.Description>
      <Dialog.Button label="OK" onPress={close} />
    </Dialog.Container>
  );
};

export default About;
