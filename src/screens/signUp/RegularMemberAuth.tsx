import React, { useState } from 'react';

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
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import CustomButton, {
  WhiteRoundButton,
  PurpleRoundButton,
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledWhiteRoundButton,
  DisabledPurpleFullButton
} from '../../components/Button';
import { BigTwoLineText, TwoLineTitle, Description, SmallText, NormalText } from '../../components/Top';


import { Container } from '../../components/Container';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CountDownTimer from '../../components/CountDownTimer';
import AuthInput from '../../components/AuthInput'

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingLeft: 10,
        paddingRight: 10,
      },

});

const RegularMemberAuth = () => {
  return (
    
    <SafeAreaView>
        <View style={{ marginTop: 130, marginBottom: 52 }}>
            <Container>
            <TwoLineTitle firstLineText="메일로 전송된" secondLineText="인증번호를 입력해주세요"></TwoLineTitle>
            </Container>
            <View style={styles.container} >
                <AuthInput></AuthInput>
            </View>
            <CountDownTimer minutes={3} seconds={0}/>
            
        </View>
        <View style={{ marginTop: '74%'}}>
            <DisabledPurpleFullButton text='인증 완료' />    
        </View>
    </SafeAreaView>
    
  );
};
export default RegularMemberAuth;