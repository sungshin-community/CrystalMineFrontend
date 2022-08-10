/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
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
} from 'react-native';

import {NormalOneLineText, Description} from '../../../components/Top';
import {
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledPurpleFullButton,
  PurpleRoundButton,
} from '../../../components/Button';
import {CautionText} from '../../../components/Input';
import PasswordShow from '../../../../resources/icon/PasswordShow';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import PasswordNotShow from '../../../../resources/icon/PasswordNotShow';
import {checkNewPassword} from '../../../common/authApi';

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
  margin: 55px 0px 52px 0px;
`;

const MiddleInputContainerStyle = styled.View`
  border-bottom-width: 2px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

type RootStackParamList = {
  InputNewPassword: {username: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function InputPassword({navigation, route}: Props) {
  const [password, setPassword] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [isChangeable, setIsChangeable] = useState<boolean>(true);
  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputFocusOut = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const validatePassword = (password: string) => {
    let regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{10,25}$/;
    if (regExp.test(password)) {
      setIsValidate(true);
      setIsWrong(false);
    } else {
      setIsValidate(false);
    }
  };

  const letShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={90}
      behavior={Platform.select({ios: 'padding'})}
      style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{flex: 1, paddingHorizontal: 24}}>
        <TextContainer>
          <NormalOneLineText>현재 비밀번호를 입력해주세요.</NormalOneLineText>
          <Description>현재 등록되어 있는 비밀번호를 입력해주세요.</Description>
        </TextContainer>
        <MiddleInputContainerStyle
          style={{
            borderColor:
              isWrong || !isChangeable
                ? '#ff0000'
                : isFocused
                ? '#A055FF'
                : '#D7DCE6',
          }}>
          <TextInput
            autoFocus={true}
            style={{
              width: '90%',
              fontSize: 21,
              fontFamily: 'SpoqaHanSansNeo-Regular',
              paddingBottom: 7,
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
                setIsChangeable(true);
              } else {
                setIsWrong(false);
              }
              setPassword(value.replace(/\s/g, ''));
              validatePassword(value);
            }}
            maxLength={25}
            placeholder="비밀번호"
            placeholderTextColor="#A0AAB4"
            keyboardType="default"
            secureTextEntry={!showPassword} //! 인풋 초기화 얘가 문제
            clearTextOnFocus={false}
            autoCapitalize="none"
            returnKeyType="done"
            selectionColor="#A055FF"
            value={password}
          />
          {showPassword ? (
            <PasswordShow onPress={letShowPassword} />
          ) : (
            <PasswordNotShow onPress={letShowPassword} />
          )}
        </MiddleInputContainerStyle>
        {isWrong && !isValidate && (
          <CautionText text="사용할 수 없는 비밀번호 입니다." />
        )}
        {!isChangeable && (
          <CautionText text="비밀번호를 정확하게 입력해 주세요."></CautionText>
        )}
      </ScrollView>
      <View
        style={{
          bottom: isFocused ? 0 : 34,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {isValidate && isFocused && (
          <PurpleFullButton
            text="다음"
            onClick={async () => {
              let result: number = await checkNewPassword({
                username: route.params.username,
                password: password,
              });
              if (result === 0) {
                setIsChangeable(false);
              } else {
                navigation.navigate('InputNewPassword', {username: route.params.username});
              }
            }}
          />
        )}
        {isValidate && !isFocused && (
          <PurpleRoundButton
            text="다음"
            onClick={async () => {
              let result: number = await checkNewPassword({
                username: route.params.username,
                password: password,
              });
              if (result === 0) {
                setIsChangeable(false);
              } else {
                navigation.navigate('InputNewPassword', {username: route.params.username});
              }
            }}
          />
        )}
        {!isValidate && isFocused && <DisabledPurpleFullButton text="다음" />}
        {!isValidate && !isFocused && <DisabledPurpleRoundButton text="다음" />}
      </View>
    </KeyboardAvoidingView>
  );
}
