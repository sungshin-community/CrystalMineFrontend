import React, { useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  GestureResponderEvent,
  Button,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import CustomButton, { 
  WhiteRoundButton,
  PurpleRoundButton,
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledWhiteRoundButton,
  DisabledPurpleFullButton
} from '../components/Button';
import { BigTwoLineText, TwoLineTitle, Description, SmallText, NormalText } from '../components/Top';
import { Container } from '../components/Container';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function TermAgree() {
  const [firstTermChecked, setFirstTermChecked] = useState<boolean>(false);
  const [secondTermChecked, setSecondTermChecked] = useState<boolean>(false);
  const [firstTermSpread, setFirstTermSpread] = useState<boolean>(false);
  const [secondTermSpread, setSecondTermSpread] = useState<boolean>(false);
  const onClick = (e: GestureResponderEvent, clickedComponent: string) => {
    if (clickedComponent === 'firstTerm') {
      setFirstTermSpread(!firstTermSpread);
    }
    else if (clickedComponent === 'secondTerm') {
      setSecondTermSpread(!secondTermSpread);
    }
  }

  const onChange = (changedComonent: string) => {
    if (changedComonent === 'firstTerm') {
      setFirstTermChecked(!firstTermChecked);
    }
    else {
      setSecondTermChecked(!secondTermChecked);
    }
  }

  StatusBar.setBackgroundColor("white");
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');
  let styles = StyleSheet.create({
    text: { color: '#FFFFFF', fontWeight: '400' },
    button: { backgroundColor: '#FF0000' },
    nextButton: { backgroundColor: firstTermChecked && secondTermChecked ? '#A055FF' : '#e5d2fc', color: '#FFFFFF', width: 343, height: 56, borderRadius: 10 }
  })
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView>
      <View>
      <View style={{ width: 53.57, height: 4, backgroundColor: "#A055FF" }} />
      <View>
        <Container>
          <TwoLineTitle firstLineText="이용 약관에 먼저" secondLineText="동의해주세요"></TwoLineTitle>
        </Container>
        <View style={{ flexDirection: 'row', height: 56, backgroundColor: '#F6F6F6', marginLeft: 24, marginRight: 24, borderRadius: 10, marginTop: 31 }}>
          <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: '#D6D6D6', margin: 17, marginRight: 14 }}></View>
          <Text style={{ fontSize: 15, lineHeight: 56 }}>약관 전체 동의</Text>
        </View>
        <View style={{ marginLeft: 40, marginTop: 24, marginBottom: 12, flexDirection: 'row' }}>
          <CheckBox value={firstTermChecked} onChange={e => onChange('firstTerm')} style={{borderRadius: 11, width: 22, height: 22}} />
          <SmallText>서비스 이용약관</SmallText>
          <CustomButton style={styles.button} textStyle={styles.text} onClick={e => onClick(e, 'firstTerm')} text={firstTermSpread ? "접기" : "펴기"}></CustomButton>
        </View>
        {firstTermSpread && <ScrollView style={{ height: 150, marginLeft: 40, marginRight: 40, backgroundColor: '#F6F6F6', padding: 20 }} nestedScrollEnabled={true}>

          <Text>
            어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
            어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
            어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
            어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
            어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
            어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
            어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
            어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
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

        <View style={{ marginLeft: 40, marginTop: 20, marginBottom: 12, flexDirection: 'row' }}>
          <CheckBox value={secondTermChecked} onChange={e => onChange('secondTerm')} style={{borderRadius: 11, width: 22, height: 22}} />
          <SmallText>서비스 이용약관</SmallText>
          <CustomButton style={styles.button} textStyle={styles.text} onClick={e => onClick(e, 'secondTerm')} text={secondTermSpread ? "접기" : "펴기"}></CustomButton>
        </View>
        {secondTermSpread && <ScrollView style={{ height: 150, marginLeft: 40, marginRight: 40, backgroundColor: '#F6F6F6', padding: 20 }} nestedScrollEnabled={true}>
          <Text>
            어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
            어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
            어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
            어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
            어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
            어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
            어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
            어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
            어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
            어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
            어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
            어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
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

      </View>
      </View>
      </ScrollView>
      <View style={{ bottom: 21, justifyContent: 'center', alignItems: 'center' }}>
        {firstTermChecked && secondTermChecked ? 
        <PurpleRoundButton text="다음" />
        : <DisabledPurpleRoundButton text="다음" />}
      </View>
    </View>
  );

};


export default TermAgree;