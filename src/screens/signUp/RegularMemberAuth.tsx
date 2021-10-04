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
  Keyboard,
  Platform,
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
  const [password, setPassword] = useState<string>('');
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputFocusOut = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };
  return Platform.OS === 'ios' ? (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS == 'ios' ? 10 : 0}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
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

          <View
            style={{
              bottom: -300,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {isFocused && <PurpleFullButton text="다음" />}

            {!isFocused && <PurpleRoundButton text="다음" />}

            {/* {isFocused && <DisabledPurpleFullButton text="다음" />}

        {!isFocused && <DisabledPurpleRoundButton text="다음" />} */}
          </View>
        </Container>
      </KeyboardAvoidingView>
    </>
  ) : (
    <>
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

        <View
          style={{
            bottom: -250,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isFocused && <PurpleFullButton text="다음" />}

          {!isFocused && <PurpleRoundButton text="다음" />}

          {/* {isFocused && <DisabledPurpleFullButton text="다음" />}

        {!isFocused && <DisabledPurpleRoundButton text="다음" />} */}
        </View>
      </Container>
    </>
  );
};
export default RegularMemberAuth;
