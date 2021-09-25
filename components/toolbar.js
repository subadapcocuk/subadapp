import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { IconButton, IconPress } from "./buttons";
import {
  faBook,
  faCopyright,
  faEnvelope,
  faLink,
  faMusic,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import About from "./about";

const Toolbar = ({ openUrl }) => {
  const [about, setAbout] = useState(false);
  return (
    <>
      <About visible={about} close={() => setAbout(false)} />
      <View style={styles.centerView}>
        <IconPress onPress={() => openUrl(null)} icon={faMusic} />
        <IconButton url="https://ansiklopedi.subadapcocuk.org/" icon={faBook} />
        <IconButton url="https://subadapcocuk.org/" icon={faLink} />
        <IconButton
          url="https://www.facebook.com/subadapcocuk"
          icon={faFacebook}
        />
        <IconButton
          url="https://www.instagram.com/subadapcocuk"
          icon={faInstagram}
        />
        <IconButton url="https://twitter.com/subadap" icon={faTwitter} />
        <IconPress
          onPress={() => openUrl("https://subadapcocuk.org/iletisim/")}
          icon={faEnvelope}
        />
        <View style={{ transform: [{ rotate: "180deg" }] }}>
          <IconPress
            onPress={() =>
              openUrl("http://ansiklopedi.subadapcocuk.org/index.php/Copyleft")
            }
            icon={faCopyright}
          />
        </View>
        <IconPress onPress={() => setAbout(true)} icon={faQuestion} />
      </View>
    </>
  );
};

export default Toolbar;
