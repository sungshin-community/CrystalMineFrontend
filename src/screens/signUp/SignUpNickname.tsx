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
  Text,
  StyleSheet,
  KeyboardEvent,
} from 'react-native';
import {Description, NormalOneLineText} from '../../components/Top';
import {
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledPurpleFullButton,
  PurpleRoundButton,
} from '../../components/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {checkNicknameConflict, logout} from '../../common/authApi';
import {getHundredsDigit} from '../../common/util/statusUtil';
import Toast from 'react-native-simple-toast';
import { fontRegular } from '../../common/font';

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
  SignUpNickname: {userId: string; password: string; agreementIds: number[]};
  SplashHome: undefined;
  ErrorScreen: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function SignUpNickname({navigation, route}: Props) {
  const [nickname, setNickname] = useState<string>('');
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputFocusOut = () => {
    setIsFocused(false);
    Keyboard.dismiss();
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
          width: (Dimensions.get('window').width / 7) * 5,
          height: 4,
          backgroundColor: '#A055FF',
        }}
      />
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={{flex: 1, paddingHorizontal: 24}}>
          <TextContainer>
            <NormalOneLineText>닉네임을 입력해주세요</NormalOneLineText>
            <Description>공백 없이 10자 이하로 구성해주세요.</Description>
          </TextContainer>
          <MiddleInputContainerStyle
            style={{
              borderColor: isDuplicate
                ? '#ff0000'
                : isFocused
                ? '#A055FF'
                : '#D7DCE6',
            }}>
            <TextInput
              autoFocus={true}
              style={{
                width: '100%',
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
            <Text style={[fontRegular, styles.errorMessage]}>
              사용할 수 없는 닉네임입니다.
            </Text>
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
          {nickname.length >= 1 && isFocused && (
            <PurpleFullButton
              text="다음"
              onClick={async () => {
                let result = await checkNicknameConflict(nickname);
                if (result.status === 401) {
                  setTimeout(function () {
                    Toast.show(
                      '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                      Toast.SHORT,
                    );
                  }, 100);
                  logout();
                  navigation.reset({routes: [{name: 'SplashHome'}]});
                } else if (getHundredsDigit(result.status) === 2) {
                  navigation.navigate('MajorSelect', {
                    userId: route.params.userId,
                    password: route.params.password,
                    nickname: nickname,
                    agreementIds: route.params.agreementIds,
                  });
                } else if (result.data.code === 'NICKNAME_DUPLICATION') {
                  setIsDuplicate(true);
                } else {
                  setTimeout(function () {
                    Toast.show(
                      '알 수 없는 오류가 발생하였습니다.',
                      Toast.SHORT,
                    );
                  }, 100);
                }
              }}
            />
          )}

          {nickname.length >= 1 && !isFocused && (
            <PurpleRoundButton
              text="다음"
              onClick={async () => {
                let result = await checkNicknameConflict(nickname);
                if (result.status === 401) {
                  setTimeout(function () {
                    Toast.show(
                      '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                      Toast.SHORT,
                    );
                  }, 100);
                  logout();
                  navigation.reset({routes: [{name: 'SplashHome'}]});
                } else if (getHundredsDigit(result.status) === 2) {
                  navigation.navigate('MajorSelect', {
                    userId: route.params.userId,
                    password: route.params.password,
                    nickname: nickname,
                    agreementIds: route.params.agreementIds,
                  });
                } else if (result.data.code === 'NICKNAME_DUPLICATION') {
                  setIsDuplicate(true);
                } else
                  setTimeout(function () {
                    Toast.show(
                      '알 수 없는 오류가 발생하였습니다.',
                      Toast.SHORT,
                    );
                  }, 100);
              }}
            />
          )}

          {nickname.length < 1 && isFocused && (
            <DisabledPurpleFullButton text="다음" />
          )}
          {nickname.length < 1 && !isFocused && (
            <DisabledPurpleRoundButton text="다음" />
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
