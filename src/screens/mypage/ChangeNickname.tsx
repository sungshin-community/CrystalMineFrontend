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
  Text,
  StyleSheet,
} from 'react-native';

import {Description, NormalOneLineText} from '../../components/Top';
import {
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledPurpleFullButton,
  PurpleRoundButton,
} from '../../components/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {checkNicknameConflict} from '../../common/authApi';
import { changeNickname } from '../../common/myPageApi';
import Toast from 'react-native-simple-toast';

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
  margin-top: 32;
`;

const MiddleInputContainerStyle = styled.View`
  border-bottom-width: 2px;
  flex-direction: row;
  align-items: center;
`;

const styles = StyleSheet.create({
  errorMessage: {
    marginTop: 10,
    color: '#FF0000',
  },
});

type RootStackParamList = {
  MajorSelect: {
    userId: string;
    password: string;
    nickname: string;
    agreementIds: number[];
  };
  ChangeNickname: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function ChangeNickname({navigation}: Props) {
  const [nickname, setNickname] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);

  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputFocusOut = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      keyboardVerticalOffset={10}
      behavior={'padding'}
      style={{flex: 1}}>
      <Container>
        <ScrollView
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          style={{backgroundColor: '#fff', marginHorizontal: 24}}>
          <TextContainer>
            <NormalOneLineText>새로운 닉네임을 입력해주세요</NormalOneLineText>
            <Description>공백 없이 10자 이하로 구성해주세요.</Description>
          </TextContainer>
          <MiddleInputContainerStyle
            style={{
              borderColor: isFocused ? '#A055FF' : '#D7DCE6',
              marginTop: 52
            }}>
            <TextInput
              autoFocus={true}
              style={{
                width: '100%',
                fontSize: 21,
                fontFamily: 'SpoqaHanSansNeo-Regular',
                paddingBottom: 7,
                color: '#222222'
              }}
              onFocus={(e: any) => {
                onInputFocus();
              }}
              onBlur={(e: any) => {
                onInputFocusOut();
              }}
              onChangeText={(value: string) => {
                setNickname(value.replace(/\s/g, ''));
                setIsDuplicate(false);
              }}
              placeholder="닉네임"
              placeholderTextColor="#A0AAB4"
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              selectionColor="#A055FF"
              value={nickname}
              maxLength={10}
            />
          </MiddleInputContainerStyle>
          {isDuplicate && (
            <Text style={styles.errorMessage}>
              사용할 수 없는 닉네임입니다.
            </Text>
          )}
        </ScrollView>
        <View
          style={{
            bottom: isFocused ? 80 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {nickname.length > 1 && isFocused && (
            <PurpleFullButton
              text="변경하기"
              onClick={async () => {
                let result: string = await changeNickname(nickname);
                if (result === 'UPDATE_NICKNAME_SUCCESS') {
                  Toast.show('닉네임이 성공적으로 변경되었습니다.', Toast.SHORT);
                  navigation.pop();
                }
                else if (result === 'NICKNAME_DUPLICATION') {
                  setIsDuplicate(true);
                }
                else {
                  Toast.show('닉네임 변경에 실패하였습니다.', Toast.SHORT);
                }
              }}
            />
          )}

          {nickname.length > 1 && !isFocused && (
            <PurpleRoundButton
              text="변경하기"
              onClick={async () => {
                let result: string = await changeNickname(nickname);
                if (result === 'UPDATE_NICKNAME_SUCCESS') {
                  Toast.show('닉네임이 성공적으로 변경되었습니다.', Toast.SHORT);
                  navigation.pop();
                }
                else if (result === 'NICKNAME_DUPLICATION') {
                  setIsDuplicate(true);
                }
                else {
                  Toast.show('닉네임 변경에 실패하였습니다.', Toast.SHORT);
                }
              }}
            />
          )}

          {nickname.length < 2 && isFocused && (
            <DisabledPurpleFullButton text="다음" />
          )}

          {nickname.length < 2 && !isFocused && (
            <DisabledPurpleRoundButton text="다음" />
          )}
        </View>
      </Container>
    </KeyboardAvoidingView>
  ) : (
    <>
      <Container>
        <ScrollView
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          style={{backgroundColor: '#fff', marginHorizontal: 24}}>
          <TextContainer>
            <NormalOneLineText>새로운 닉네임을 입력해주세요</NormalOneLineText>
            <Description>공백 없이 10자 이하로 구성해주세요.</Description>
          </TextContainer>
          <MiddleInputContainerStyle
            style={{
              borderColor: isDuplicate
                ? '#ff0000'
                : isFocused
                ? '#A055FF'
                : '#D7DCE6',
              marginTop: 52
            }}>
            <TextInput
              autoFocus={true}
              style={{
                width: '100%',
                fontSize: 21,
                fontFamily: 'SpoqaHanSansNeo-Regular',
                paddingBottom: 7,
                color: '#222222'
              }}
              onFocus={(e: any) => {
                onInputFocus();
              }}
              onBlur={(e: any) => {
                onInputFocusOut();
              }}
              onChangeText={(value: string) => {
                setNickname(value.replace(/\s/g, ''));
                setIsDuplicate(false);
              }}
              placeholder="닉네임"
              placeholderTextColor="#A0AAB4"
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              selectionColor="#A055FF"
              value={nickname}
              maxLength={10}
            />
          </MiddleInputContainerStyle>
          {isDuplicate && (
            <Text style={styles.errorMessage}>
              사용할 수 없는 닉네임입니다.
            </Text>
          )}
        </ScrollView>
        <View
          style={{
            bottom: isFocused ? 0 : 34,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {nickname.length > 1 && isFocused && (
            <PurpleFullButton
              text="변경하기"
              onClick={async () => {
                let result: string = await changeNickname(nickname);
                if (result === 'UPDATE_NICKNAME_SUCCESS') {
                  Toast.show('닉네임이 성공적으로 변경되었습니다.', Toast.SHORT);
                  navigation.pop();
                }
                else if (result === 'NICKNAME_DUPLICATION') {
                  setIsDuplicate(true);
                }
                else {
                  Toast.show('닉네임 변경에 실패하였습니다.', Toast.SHORT);
                }
              }}
            />
          )}

          {nickname.length > 1 && !isFocused && (
            <PurpleRoundButton
              text="변경하기"
              onClick={async () => {
                let result: string = await changeNickname(nickname);
                if (result === 'UPDATE_NICKNAME_SUCCESS') {
                  Toast.show('닉네임이 성공적으로 변경되었습니다.', Toast.SHORT);
                  navigation.pop();
                }
                else if (result === 'NICKNAME_DUPLICATION') {
                  setIsDuplicate(true);
                }
                else {
                  Toast.show('닉네임 변경에 실패하였습니다.', Toast.SHORT);
                }
              }}
            />
          )}

          {nickname.length < 2 && isFocused && (
            <DisabledPurpleFullButton text="다음" />
          )}

          {nickname.length < 2 && !isFocused && (
            <DisabledPurpleRoundButton text="다음" />
          )}
        </View>
      </Container>
    </>
  );
}
