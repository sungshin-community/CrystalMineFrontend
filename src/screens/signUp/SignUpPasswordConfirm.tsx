/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {
  StatusBar,
  View,
  Keyboard,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  KeyboardEvent,
} from 'react-native';

import {TwoLineTitle} from '../../components/Top';
import {
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledPurpleFullButton,
  PurpleRoundButton,
} from '../../components/Button';
import {CautionText} from '../../components/Input';
import PasswordShow from '../../../resources/icon/PasswordShow';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import PasswordNotShow from '../../../resources/icon/PasswordNotShow';

if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('white');
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const TextContainer = styled.View`
  margin: 55px 0px 47px 0px;
`;

const MiddleInputContainerStyle = styled.View`
  border-bottom-width: 2px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

type RootStackParamList = {
  SignUpNickname: {userId: string; password: string; agreementIds: number[]};
  SignUpPasswordConfirm: {
    userId: string;
    previousPassword: string;
    agreementIds: number[];
  };
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function SignUpPasswordConfirm({navigation, route}: Props) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isEqual, setIsEqual] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputFocusOut = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const validatePassword = (password: string) => {
    setIsEqual(password === route.params.previousPassword);
    password === route.params.previousPassword
      ? setIsWrong(false)
      : setIsWrong(true);
  };

  const letShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onKeyboardDidshow = (e: KeyboardEvent) => {
    setKeyboardHeight(e.endCoordinates.height);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidshow,
    );
    return () => {
      showSubscription.remove();
    };
  }, []);

  return (
    <>
      <View
        style={{
          width: (Dimensions.get('window').width / 7) * 4,
          height: 4,
          backgroundColor: '#A055FF',
        }}
      />
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={{flex: 1, paddingHorizontal: 24}}>
          <TextContainer>
            <TwoLineTitle
              firstLineText="비밀번호를"
              secondLineText="한번 더 입력해주세요"
            />
          </TextContainer>
          <MiddleInputContainerStyle
            style={{
              borderColor: isWrong
                ? '#ff0000'
                : isFocused
                ? '#A055FF'
                : '#D7DCE6',
            }}>
            <TextInput
              autoFocus={true}
              style={{
                width: '93%',
                fontSize: 21,
                fontFamily: 'SpoqaHanSansNeo-Regular',
                paddingBottom: 7,
                color: '#222222',
              }}
              onFocus={(e: any) => {
                onInputFocus();
              }}
              onBlur={(e: any) => {
                onInputFocusOut();
              }}
              onChangeText={(value: string) => {
                if (value.length > 0) {
                  setIsWrong(true);
                }
                validatePassword(value);
              }}
              maxLength={25}
              placeholder="비밀번호"
              placeholderTextColor="#A0AAB4"
              keyboardType="default"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              returnKeyType="done"
              selectionColor="#A055FF"
            />
            {showPassword ? (
              <PasswordShow onPress={letShowPassword} />
            ) : (
              <PasswordNotShow onPress={letShowPassword} />
            )}
          </MiddleInputContainerStyle>
          {isWrong && !isEqual && (
            <CautionText text="비밀번호를 정확하게 입력해 주세요." />
          )}
        </ScrollView>
        <View
          style={{
            bottom: isFocused
              ? Platform.OS == 'ios'
                ? keyboardHeight
                : 0
              : 34,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isEqual && isFocused && (
            <PurpleFullButton
              text="다음"
              onClick={() =>
                navigation.navigate('SignUpNickname', {
                  userId: route.params.userId,
                  password: route.params.previousPassword,
                  agreementIds: route.params.agreementIds,
                })
              }
            />
          )}
          {isEqual && !isFocused && (
            <PurpleRoundButton
              text="다음"
              onClick={() =>
                navigation.navigate('SignUpNickname', {
                  userId: route.params.userId,
                  password: route.params.previousPassword,
                  agreementIds: route.params.agreementIds,
                })
              }
            />
          )}
          {!isEqual && isFocused && <DisabledPurpleFullButton text="다음" />}
          {!isEqual && !isFocused && <DisabledPurpleRoundButton text="다음" />}
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
