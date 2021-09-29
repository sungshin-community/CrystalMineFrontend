import React, {useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  GestureResponderEvent,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import CustomButton, {
  WhiteRoundButton,
  PurpleRoundButton,
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledWhiteRoundButton,
  DisabledPurpleFullButton,
} from '../../components/Button';
import {
  BigTwoLineText,
  TwoLineTitle,
  Description,
  SmallText,
  NormalText,
} from '../../components/Top';

import styled from 'styled-components';
import {NavigationContainer} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CountDownTimer from '../../components/CountDownTimer';
import AuthInput from '../../components/AuthInput';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const styles = StyleSheet.create({
  containe: {
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const RegularMemberAuth = () => {
  return (
    <Container>
      <View style={{marginTop: 130, marginLeft: 24}}>
        <TwoLineTitle
          firstLineText="메일로 전송된"
          secondLineText="인증번호를 입력해주세요"></TwoLineTitle>
      </View>
      <View style={styles.containe}>
        <AuthInput></AuthInput>
      </View>
      <CountDownTimer minutes={3} seconds={0} />

      <View>
        <DisabledPurpleFullButton text="인증 완료" />
      </View>
    </Container>
  );
};
export default RegularMemberAuth;
