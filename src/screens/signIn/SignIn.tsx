import React, { useState } from 'react';

import {
  StatusBar,
  View,
} from 'react-native';
import { NormalOneLineText } from '../../components/Top';


export default function SignIn() {


  StatusBar.setBackgroundColor("white");
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');
  
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <NormalOneLineText style={{marginLeft: 24, marginTop: 130}}>로그인</NormalOneLineText>
    </View>
  );

};
