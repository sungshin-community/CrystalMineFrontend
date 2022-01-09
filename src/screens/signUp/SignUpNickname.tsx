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

import {NormalOneLineText} from '../../components/Top';
import {
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledPurpleFullButton,
  PurpleRoundButton,
} from '../../components/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {checkNicknameConflict} from '../../common/authApi';

{
  Platform.OS === 'android' && StatusBar.setBackgroundColor('white');
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
`;

const styles = StyleSheet.create({
  errorMessage: {
    marginTop: 10,
    color: '#FF0000',
  },
});

type RootStackParamList = {
  MajorSelect: {userId: string; password: string; nickname: string};
  SignUpNickname: {userId: string; password: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function SignUpNickname({navigation, route}: Props) {
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
      <View
        style={{
          width: (Dimensions.get('window').width / 7) * 5,
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
            <NormalOneLineText>닉네임을 입력해주세요</NormalOneLineText>
          </TextContainer>
          <MiddleInputContainerStyle
            style={{
              borderColor: isFocused ? '#A055FF' : '#D7DCE6',
            }}>
            <TextInput
              style={{
                width: '60%',
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
          {isDuplicate && (
            <Text style={styles.errorMessage}>이미 존재하는 닉네임입니다.</Text>
          )}
        </ScrollView>
        <View
          style={{
            bottom: isFocused ? 80 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {nickname.length !== 0 && isFocused && (
            <PurpleFullButton
              text="다음"
              onClick={async () => {
                let result: boolean = await checkNicknameConflict(nickname);
                if (!result) {
                  setIsDuplicate(true);
                  return;
                }
                navigation.navigate('MajorSelect', {
                  userId: route.params.userId,
                  password: route.params.password,
                  nickname: nickname,
                });
              }}
            />
          )}

          {nickname.length !== 0 && !isFocused && (
            <PurpleRoundButton
              text="다음"
              onClick={async () => {
                let result: boolean = await checkNicknameConflict(nickname);
                if (!result) {
                  setIsDuplicate(true);
                  return;
                }
                navigation.navigate('MajorSelect', {
                  userId: route.params.userId,
                  password: route.params.password,
                  nickname: nickname,
                });
              }}
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
  ) : (
    <>
      <View
        style={{
          width: (Dimensions.get('window').width / 7) * 5,
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
            <NormalOneLineText>닉네임을 입력해주세요</NormalOneLineText>
          </TextContainer>
          <MiddleInputContainerStyle
            style={{
              borderColor: isFocused ? '#A055FF' : '#D7DCE6',
            }}>
            <TextInput
              style={{
                width: '60%',
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
          {isDuplicate && (
            <Text style={styles.errorMessage}>이미 존재하는 닉네임입니다.</Text>
          )}
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
              onClick={async () => {
                let result: boolean = await checkNicknameConflict(nickname);
                if (!result) {
                  setIsDuplicate(true);
                  return;
                }
                navigation.navigate('MajorSelect', {
                  userId: route.params.userId,
                  password: route.params.password,
                  nickname: nickname,
                });
              }}
            />
          )}

          {nickname.length !== 0 && !isFocused && (
            <PurpleRoundButton
              text="다음"
              onClick={async () => {
                let result: boolean = await checkNicknameConflict(nickname);
                if (!result) {
                  setIsDuplicate(true);
                  return;
                }
                navigation.navigate('MajorSelect', {
                  userId: route.params.userId,
                  password: route.params.password,
                  nickname: nickname,
                });
              }}
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
