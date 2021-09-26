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

function TestPage() {


  StatusBar.setBackgroundColor("white");
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
        <Text>제발돼라 수고했어</Text>
    </View>
  );

};


export default TestPage;