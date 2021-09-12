import React, { useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  GestureResponderEvent,
  Button
} from 'react-native';

import {
Colors,
DebugInstructions,
Header,
LearnMoreLinks,
ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import CustomButton from '../components/CustomButton';
import { BigTwoLineText, TwoLineTitle, Description, SmallText, NormalText } from '../components/Top';

function TermAgree() {
  const [checked, setChecked] = useState<boolean>(false);
  const [spread, setSpread] = useState<boolean>(true);
  const [spread2, setSpread2] = useState<boolean>(true);
  const onClick = (e: GestureResponderEvent) => {
    setSpread(!spread);
  }

  StatusBar.setBackgroundColor("white");
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>

    <View style={{ width: 53.57, height: 4, backgroundColor: "#A055FF" }}>

    </View>

    <View>

    <TwoLineTitle firstLineText="이용 약관에 먼저" secondLineText="동의해주세요"></TwoLineTitle>
    <View style={{flexDirection: 'row', height: 56, backgroundColor: '#F6F6F6', marginLeft: 24, marginRight: 24, borderRadius: 10, marginTop: 31}}>
      <View style={{width: 22, height: 22, borderRadius: 11, backgroundColor: '#D6D6D6', margin: 17, marginRight: 14}}></View>
      <Text style={{fontSize: 15, lineHeight: 56}}>약관 전체 동의</Text>
    </View>
    <View style={{position: 'absolute', bottom: 34, right: 30, height: 100, backgroundColor: '#A055FF'}}></View>
    <View style={{marginLeft: 40, marginTop: 24, marginBottom: 12, flexDirection: 'row'}}>
      <SmallText>서비스 이용약관</SmallText>
      <CustomButton color='#FF0000' width={40} height={20} onClick={onClick} title={spread ? "접기" : "펴기"}></CustomButton>
    </View>
    {spread && <ScrollView style={{ height: 150, marginLeft: 40, marginRight: 40, backgroundColor: '#F6F6F6', padding: 20 }}>

      <Text>
        어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
        어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
        어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
        어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
        어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
        어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
        어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
        어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
      </Text>
    </ScrollView>}

    <View style={{marginLeft: 40, marginTop: 20, marginBottom: 12}}>
      <Text>서비스 이용약관</Text>
    </View>
    <ScrollView style={{ height: 150, marginLeft: 40, marginRight: 40, backgroundColor: '#F6F6F6', padding: 20 }}>
      <Text>
        어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
        어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
        어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
        어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
        어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
        어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
        어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
        어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
      </Text>

    </ScrollView>

  </View>

</View>

);

};


export default TermAgree;