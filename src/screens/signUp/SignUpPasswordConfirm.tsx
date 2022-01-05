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

StatusBar.setBackgroundColor('white');
// StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const TextContainer = styled.View`
  margin: 37px 0px 52px 0px;
`;

const MiddleInputContainerStyle = styled.View`
  border-bottom-width: 2px;
  flex-direction: row;
  align-items: center;
`;

type RootStackParamList = {
  SignUpNickname: {userId: string; password: string};
  SignUpPasswordConfirm: {userId: string; previousPassword: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function SignUpPasswordConfirm({navigation, route}: Props) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isEqual, setIsEqual] = useState<boolean>(false);

  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputFocusOut = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const validatePassword = (password: string) => {
    setIsEqual(password === route.params.previousPassword);
  };

  const letShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS == 'ios' ? 10 : 0}
      behavior={'padding'}
      style={{flex: 1}}>
      <View
        style={{
          width: (Dimensions.get('window').width / 7) * 4,
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
            <TwoLineTitle
              firstLineText="비밀번호를"
              secondLineText="한번 더 입력해주세요"
            />
          </TextContainer>
          <MiddleInputContainerStyle
            style={{
              borderColor: isFocused ? '#A055FF' : '#D7DCE6',
            }}>
            <TextInput
              style={{
                width: '90%',
                fontSize: 21,
                fontFamily: 'SpoqaHanSansNeo-Regular',
              }}
              onFocus={(e: any) => {
                onInputFocus();
              }}
              onBlur={(e: any) => {
                onInputFocusOut();
              }}
              onChangeText={(value: string) => {
                validatePassword(value);
              }}
              maxLength={25}
              placeholder="비밀번호"
              placeholderTextColor="#A0AAB4"
              keyboardType="default"
              secureTextEntry={showPassword ? false : true}
              autoCapitalize="none"
              returnKeyType="done"
              selectionColor="#A055FF"
            />

            <PasswordShow onPress={letShowPassword} />
          </MiddleInputContainerStyle>
          {!isEqual && <CautionText text="비밀번호가 일치하지 않습니다" />}
        </ScrollView>
        <View
          style={{
            bottom: isFocused ? 80 : -10,
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
                })
              }
            />
          )}
          {!isEqual && isFocused && <DisabledPurpleFullButton text="다음" />}
          {!isEqual && !isFocused && <DisabledPurpleRoundButton text="다음" />}
        </View>
      </Container>
    </KeyboardAvoidingView>
  ) : (
    <>
      <View
        style={{
          width: (Dimensions.get('window').width / 7) * 4,
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
            <TwoLineTitle
              firstLineText="비밀번호를"
              secondLineText="한번 더 입력해주세요"
            />
          </TextContainer>
          <MiddleInputContainerStyle
            style={{
              borderColor: isFocused ? '#A055FF' : '#D7DCE6',
            }}>
            <TextInput
              style={{
                width: '90%',
                fontSize: 21,
                fontFamily: 'SpoqaHanSansNeo-Regular',
              }}
              onFocus={(e: any) => {
                onInputFocus();
              }}
              onBlur={(e: any) => {
                onInputFocusOut();
              }}
              onChangeText={(value: string) => {
                validatePassword(value);
              }}
              maxLength={25}
              placeholder="비밀번호"
              placeholderTextColor="#A0AAB4"
              keyboardType="default"
              secureTextEntry={showPassword ? false : true}
              autoCapitalize="none"
              returnKeyType="done"
              selectionColor="#A055FF"
            />

            <PasswordShow onPress={letShowPassword} />
          </MiddleInputContainerStyle>
          {!isEqual && <CautionText text="비밀번호가 일치하지 않습니다" />}
        </ScrollView>
        <View
          style={{
            bottom: isFocused ? 0 : 21,
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
                })
              }
            />
          )}
          {!isEqual && isFocused && <DisabledPurpleFullButton text="다음" />}
          {!isEqual && !isFocused && <DisabledPurpleRoundButton text="다음" />}
        </View>
      </Container>
    </>
  );
}
