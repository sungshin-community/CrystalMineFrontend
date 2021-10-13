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
} from 'react-native';

import {Description, NormalOneLineText} from '../../components/Top';
import {
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledPurpleFullButton,
  PurpleRoundButton,
} from '../../components/Button';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

StatusBar.setBackgroundColor('white');
// StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const TextContainer = styled.View`
  margin: 130px 0px 52px 0px;
`;

const MiddleInputContainerStyle = styled.View`
  border-bottom-width: 2px;
  flex-direction: row;
  align-items: center;
`;

type RootStackParamList = {
  MajorSelect: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function SignUpNickname({navigation}: Props) {
  const [nickname, setNickname] = useState<string>('');
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
        <View style={{width: 267.85, height: 4, backgroundColor: '#A055FF'}} />
        <Container>
          <ScrollView
            scrollEnabled={false}
            keyboardShouldPersistTaps="handled"
            style={{backgroundColor: '#fff', marginHorizontal: 24}}>
            <TextContainer>
              <NormalOneLineText>닉네임을 입력해주세요</NormalOneLineText>
            </TextContainer>
            <MiddleInputContainerStyle
              style={{
                borderColor: isFocused ? '#A055FF' : '#D7DCE6',
              }}>
              <TextInput
                style={{width: '60%', fontSize: 21}}
                onFocus={(e: any) => {
                  onInputFocus();
                }}
                onBlur={(e: any) => {
                  onInputFocusOut();
                }}
                onChangeText={(value: string) => {
                  setNickname(value);
                }}
                placeholder="닉네임"
                placeholderTextColor="#A0AAB4"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                selectionColor="#A055FF"
              />
            </MiddleInputContainerStyle>
          </ScrollView>
          <View
            style={{
              bottom: isFocused ? 80 : -10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {nickname.length !== 0 && isFocused && (
              <PurpleFullButton
                text="다음"
                onClick={() => navigation.navigate('MajorSelect')}
              />
            )}

            {nickname.length !== 0 && !isFocused && (
              <PurpleRoundButton
                text="다음"
                onClick={() => navigation.navigate('MajorSelect')}
              />
            )}

            {nickname.length === 0 && isFocused && (
              <DisabledPurpleFullButton text="다음" />
            )}

            {nickname.length === 0 && !isFocused && (
              <DisabledPurpleRoundButton text="다음" />
            )}
          </View>
        </Container>
      </KeyboardAvoidingView>
    </>
  ) : (
    <>
      <View style={{width: 267.85, height: 4, backgroundColor: '#A055FF'}} />
      <Container>
        <ScrollView
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          style={{backgroundColor: '#fff', marginHorizontal: 24}}>
          <TextContainer>
            <NormalOneLineText>닉네임을 입력해주세요</NormalOneLineText>
            <Description>
              영문, 숫자, 특수문자 필수 포함 10자 이상으로 구성해주세요
            </Description>
          </TextContainer>
          <MiddleInputContainerStyle
            style={{
              borderColor: isFocused ? '#A055FF' : '#D7DCE6',
            }}>
            <TextInput
              style={{width: '60%', fontSize: 21}}
              onFocus={(e: any) => {
                onInputFocus();
              }}
              onBlur={(e: any) => {
                onInputFocusOut();
              }}
              onChangeText={(value: string) => {
                setNickname(value);
              }}
              placeholder="닉네임"
              placeholderTextColor="#A0AAB4"
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              selectionColor="#A055FF"
            />
          </MiddleInputContainerStyle>
        </ScrollView>
        <View
          style={{
            bottom: isFocused ? 0 : 21,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {nickname.length !== 0 && isFocused && (
            <PurpleFullButton
              text="다음"
              onClick={() => navigation.navigate('MajorSelect')}
            />
          )}

          {nickname.length !== 0 && !isFocused && (
            <PurpleRoundButton
              text="다음"
              onClick={() => navigation.navigate('MajorSelect')}
            />
          )}

          {nickname.length === 0 && isFocused && (
            <DisabledPurpleFullButton text="다음" />
          )}

          {nickname.length === 0 && !isFocused && (
            <DisabledPurpleRoundButton text="다음" />
          )}
        </View>
      </Container>
    </>
  );
}
