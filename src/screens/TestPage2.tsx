import React, { useState } from 'react';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  GestureResponderEvent,
  TouchableOpacity
} from 'react-native';

export default function TestPage2() {


  StatusBar.setBackgroundColor("white");
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
        <Text>이건 TestPage 2!!!!!!!!!!!</Text>
    </View>
  );

};