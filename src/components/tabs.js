import React from "react";
import { Tab, TabView } from "react-native-elements";
import { styles, tabItemTitleStyle, deviceWidth } from "../helpers";

export const Tabs = ({ titles, value, onChange }) => (
  <Tab value={value} onChange={onChange} disableIndicator>
    {titles.map((title, index) => (
      <Tab.Item
        key={`${title}_${index}`}
        title={title}
        containerStyle={styles.tabItemContainer}
        titleStyle={tabItemTitleStyle(value == index)}
      />
    ))}
  </Tab>
);

export const AnimatedTabView = ({ value, children }) => (
  <TabView
    value={value}
    animationConfig={{ duration: 50, useNativeDriver: true }}
    animationType="spring"
  >
    {children}
  </TabView>
);

export const TabViewItem = ({ selected, children }) =>
  selected && (
    <TabView.Item
      style={{width: deviceWidth}}
      //Fix from: https://github.com/react-native-elements/react-native-elements/issues/3091#issuecomment-866226005
      onMoveShouldSetResponder={(e) => e.stopPropagation()}
    >
      {children}
    </TabView.Item>
  );
