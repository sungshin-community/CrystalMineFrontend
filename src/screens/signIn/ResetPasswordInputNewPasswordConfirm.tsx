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
import {resetPassword} from '../../common/authApi';
import {ModalBottom} from '../../components/ModalBottom';

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
  SplashHome: undefined;
  ResetPasswordInputNewPasswordConfirm: {
    userId: string;
    previousPassword: string;
  };
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function ResetPasswordInputNewPasswordConfirm({
  navigation,
  route,
}: Props) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isEqual, setIsEqual] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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

  const resetPasswordConfirm = async () => {
    let result: number = await resetPassword({
      username: route.params.userId,
      password: route.params.previousPassword,
    });
    if (result === 0) {
      setModalVisible(true);
    } 
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
            <TwoLineTitle
              firstLineText="새 비밀번호를"
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
              style={{
                width: '93%',
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
            bottom: isFocused ? 80 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isEqual && isFocused && (
            <PurpleFullButton
              text="비밀번호 재설정"
              onClick={resetPasswordConfirm}
            />
          )}
          {isEqual && !isFocused && (
            <PurpleRoundButton
              text="비밀번호 재설정"
              onClick={resetPasswordConfirm}
            />
          )}
          {!isEqual && isFocused && (
            <DisabledPurpleFullButton text="비밀번호 재설정" />
          )}
          {!isEqual && !isFocused && (
            <DisabledPurpleRoundButton text="비밀번호 재설정" />
          )}
          <ModalBottom
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            modalText={`비밀번호가 성공적으로 변경 되었습니다.
            이전 화면으로 이동합니다.`}
            modalBody=""
            modalButtonText="확인"
            modalButton
            modalButtonFunc={() => navigation.navigate('SplashHome')}
          />
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
            <TwoLineTitle
              firstLineText="새 비밀번호를"
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
              style={{
                width: '93%',
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
            bottom: isFocused ? 0 : 34,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
           {isEqual && isFocused && (
            <PurpleFullButton
              text="비밀번호 재설정"
              onClick={resetPasswordConfirm}
            />
          )}
          {isEqual && !isFocused && (
            <PurpleRoundButton
              text="비밀번호 재설정"
              onClick={resetPasswordConfirm}
            />
          )}
          {!isEqual && isFocused && (
            <DisabledPurpleFullButton text="비밀번호 재설정" />
          )}
          {!isEqual && !isFocused && (
            <DisabledPurpleRoundButton text="비밀번호 재설정" />
          )}
          <ModalBottom
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            modalText={`비밀번호가 성공적으로 변경 되었습니다. 
            이전 화면으로 이동합니다.`}
            modalBody=""
            modalButtonText="확인"
            modalButton
            modalButtonFunc={() => navigation.navigate('SplashHome')}
          />
        </View>
      </Container>
    </>
  );
}
