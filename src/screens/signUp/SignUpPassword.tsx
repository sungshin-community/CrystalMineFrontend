/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import styled from 'styled-components';

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

import {NormalOneLineText, Description} from '../../components/Top';
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
  margin: 55px 0px 52px 0px;
`;

const MiddleInputContainerStyle = styled.View`
  border-bottom-width: 2px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

type RootStackParamList = {
  SignUpPasswordConfirm: {previousPassword: string};
  SignUpPassword: {userId: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function SignUpPassword({navigation, route}: Props) {
  const [password, setPassword] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);

  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputFocusOut = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const validatePassword = (password: string) => {
    let regExp =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{10,25}$/;
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

  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      keyboardVerticalOffset={10}
      behavior={'padding'}
      style={{flex: 1}}>
      <View
        style={{
          width: (Dimensions.get('window').width / 7) * 3,
          height: 4,
          backgroundColor: '#A055FF',
        }}
      />
      <Container>
        <ScrollView
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          style={{backgroundColor: '#fff', marginHorizontal: 24}}>
          <TextContainer>
            <NormalOneLineText>비밀번호를 입력해주세요</NormalOneLineText>
            <Description>
              영문, 숫자, 특수문자 필수 포함 10자 이상으로 구성해주세요
            </Description>
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
                value.length > 0 ? setIsWrong(true) : setIsWrong(false);
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
        </ScrollView>
        <View
          style={{
            bottom: isFocused ? 80 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isValidate && isFocused && (
            <PurpleFullButton
              text="다음"
              onClick={() =>
                navigation.navigate('SignUpPasswordConfirm', {
                  previousPassword: password,
                  userId: route.params.userId,
                })
              }
            />
          )}
          {isValidate && !isFocused && (
            <PurpleRoundButton
              text="다음"
              onClick={() =>
                navigation.navigate('SignUpPasswordConfirm', {
                  previousPassword: password,
                  userId: route.params.userId,
                })
              }
            />
          )}
          {!isValidate && isFocused && <DisabledPurpleFullButton text="다음" />}
          {!isValidate && !isFocused && (
            <DisabledPurpleRoundButton text="다음" />
          )}
        </View>
      </Container>
    </KeyboardAvoidingView>
  ) : (
    <>
      <View
        style={{
          width: (Dimensions.get('window').width / 7) * 3,
          height: 4,
          backgroundColor: '#A055FF',
        }}
      />
      <Container>
        <ScrollView
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          style={{backgroundColor: '#fff', marginHorizontal: 24}}>
          <TextContainer>
            <NormalOneLineText>비밀번호를 입력해주세요</NormalOneLineText>
            <Description>
              영문, 숫자, 특수문자 필수 포함 10자 이상으로 구성해주세요
            </Description>
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
                value.length > 0 ? setIsWrong(true) : setIsWrong(false);
                setPassword(value.replace(/\s/g, ''));
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
              onClick={() =>
                navigation.navigate('SignUpPasswordConfirm', {
                  previousPassword: password,
                  userId: route.params.userId,
                })
              }
            />
          )}
          {isValidate && !isFocused && (
            <PurpleRoundButton
              text="다음"
              onClick={() =>
                navigation.navigate('SignUpPasswordConfirm', {
                  previousPassword: password,
                  userId: route.params.userId,
                })
              }
            />
          )}
          {!isValidate && isFocused && <DisabledPurpleFullButton text="다음" />}
          {!isValidate && !isFocused && (
            <DisabledPurpleRoundButton text="다음" />
          )}
        </View>
      </Container>
    </>
  );
}
