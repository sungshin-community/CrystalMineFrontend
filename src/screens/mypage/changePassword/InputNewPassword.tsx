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
import {checkNewPassword, logout} from '../../../common/authApi';
import { getHundredsDigit } from '../../../common/util/statusUtil';
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
  margin: 55px 0px 52px 0px;
`;

const MiddleInputContainerStyle = styled.View`
  border-bottom-width: 2px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

type RootStackParamList = {
  InputNewPasswordConfirm: {
    username: string;
    previousPassword: string;
  };
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function InputNewPassword({navigation, route}: Props) {
  const [password, setPassword] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [isChangeable, setIsChangeable] = useState<boolean>(true);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

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
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{flex: 1, paddingHorizontal: 24}}>
        <TextContainer>
          <NormalOneLineText>새 비밀번호를 입력해주세요.</NormalOneLineText>
          <Description>
            영문, 숫자, 특수문자 필수 포함 10자 이상으로 구성해주세요
          </Description>
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
                setIsChangeable(true);
              } else {
                setIsWrong(false);
              }
              setPassword(value.replace(/\s/g, ''));
              validatePassword(value);
            }}
            maxLength={25}
            placeholder="새 비밀번호 입력"
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
          <CautionText text="기존 비밀번호와 동일합니다."></CautionText>
        )}
      </ScrollView>
      <View
        style={{
          bottom: isFocused ? (Platform.OS == 'ios' ? keyboardHeight : 0) : 34,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {isValidate && isFocused && (
          <PurpleFullButton
            text="다음"
            onClick={async () => {
              let result = await checkNewPassword({
                username: route.params.username,
                password: password,
              });
              if (result.status === 401) {
                Toast.show('토큰 정보가 만료되어 로그인 화면으로 이동합니다', Toast.SHORT);
                logout();
                navigation.reset({routes: [{name: 'SplashHome'}]});
              } else if (getHundredsDigit(result.status) === 2) {
                navigation.navigate('InputNewPasswordConfirm', {
                  username: route.params.username,
                  previousPassword: password,
                });
              } else if (result.data.code === 'RESET_PASSWORD_FAIL_MATCH') {
                setIsChangeable(false);
              } else {
                Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
              }
            }}
          />
        )}
        {isValidate && !isFocused && (
          <PurpleRoundButton
            text="다음"
            onClick={async () => {
              let result = await checkNewPassword({
                username: route.params.username,
                password: password,
              });
              if (result.status === 401) {
                Toast.show('토큰 정보가 만료되어 로그인 화면으로 이동합니다', Toast.SHORT);
                logout();
                navigation.reset({routes: [{name: 'SplashHome'}]});
              } else if (getHundredsDigit(result.status) === 2) {
                navigation.navigate('InputNewPasswordConfirm', {
                  username: route.params.username,
                  previousPassword: password,
                });
              } else if (result.data.code === 'RESET_PASSWORD_FAIL_MATCH') {
                setIsChangeable(false);
              } else {
                Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
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
