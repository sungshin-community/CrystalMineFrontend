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
StatusBar.setBackgroundColor('white');
// StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

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
  SignUpPasswordConfirm: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function SignUpPassword({navigation}: Props) {
  const [password, setPassword] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  // const [isValidate, setIsValidate] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputFocusOut = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  // const validatePassword = () => {
  //   var validate =
  //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10, 25}$/;
  //   validate.test(password) ? setIsValidate(true) : setIsValidate(false);
  //   console.log(password, isValidate, validate.test(password));
  // };

  const letShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return Platform.OS === 'ios' ? (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS == 'ios' ? 10 : 0}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={{width: 160.71, height: 4, backgroundColor: '#A055FF'}} />
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
                borderColor: isFocused ? '#A055FF' : '#D7DCE6',
              }}>
              {showPassword ? (
                <TextInput
                  style={{width: '90%', fontSize: 21}}
                  onFocus={(e: any) => {
                    onInputFocus();
                  }}
                  onBlur={(e: any) => {
                    onInputFocusOut();
                  }}
                  onChangeText={(value: string) => {
                    setPassword(value.replace(/\s/g, ''));
                    // validatePassword();
                  }}
                  maxLength={25}
                  placeholder="비밀번호"
                  placeholderTextColor="#A0AAB4"
                  keyboardType="default"
                  secureTextEntry={false}
                  autoCapitalize="none"
                  returnKeyType="done"
                  selectionColor="#A055FF"
                />
              ) : (
                <TextInput
                  style={{width: '90%', fontSize: 21}}
                  onFocus={(e: any) => {
                    onInputFocus();
                  }}
                  onBlur={(e: any) => {
                    onInputFocusOut();
                  }}
                  onChangeText={(value: string) => {
                    setPassword(value.replace(/\s/g, ''));
                    // validatePassword();
                  }}
                  maxLength={25}
                  placeholder="비밀번호"
                  placeholderTextColor="#A0AAB4"
                  keyboardType="default"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  returnKeyType="done"
                  selectionColor="#A055FF"
                />
              )}
              <PasswordShow onPress={letShowPassword} />
            </MiddleInputContainerStyle>
            {/* {!isValidate && (
            <CautionText
              text="비밀번호 조건을 다시 확인해주세요"
              placeholder={''}
              title={''}
              maxLength={0}
              keyboardType={undefined}
              suffix={''}
            />
          )} */}
            {password.length < 10 && password.length > 0 && (
              <CautionText text="비밀번호 조건 확인 아직 못함" />
            )}
          </ScrollView>
          <View
            style={{
              bottom: isFocused ? 80 : -10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* {isValidate && isFocused && (
            <PurpleFullButton
              text="다음"
              onClick={() => navigation.navigate('SignUpPasswordConfirm')}
            />
          )}
          {isValidate && !isFocused && (
            <PurpleRoundButton
              text="다음"
              onClick={() => navigation.navigate('SignUpPasswordConfirm')}
            />
          )}
          {!isValidate && isFocused && <DisabledPurpleFullButton text="다음" />}
          {!isValidate && !isFocused && (
            <DisabledPurpleRoundButton text="다음" />
          )} */}

            {password.length >= 10 && isFocused && (
              <PurpleFullButton
                text="다음"
                onClick={() => navigation.navigate('SignUpPasswordConfirm')}
              />
            )}
            {password.length >= 10 && !isFocused && (
              <PurpleRoundButton
                text="다음"
                onClick={() => navigation.navigate('SignUpPasswordConfirm')}
              />
            )}
            {password.length < 10 && isFocused && (
              <DisabledPurpleFullButton text="다음" />
            )}
            {password.length < 10 && !isFocused && (
              <DisabledPurpleRoundButton text="다음" />
            )}
          </View>
        </Container>
      </KeyboardAvoidingView>
    </>
  ) : (
    <>
      <View style={{width: 160.71, height: 4, backgroundColor: '#A055FF'}} />
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
              borderColor: isFocused ? '#A055FF' : '#D7DCE6',
            }}>
            {showPassword ? (
              <TextInput
                style={{width: '90%', fontSize: 21}}
                onFocus={(e: any) => {
                  onInputFocus();
                }}
                onBlur={(e: any) => {
                  onInputFocusOut();
                }}
                onChangeText={(value: string) => {
                  setPassword(value.replace(/\s/g, ''));
                  // validatePassword();
                }}
                maxLength={25}
                placeholder="비밀번호"
                placeholderTextColor="#A0AAB4"
                keyboardType="default"
                secureTextEntry={false}
                autoCapitalize="none"
                returnKeyType="done"
                selectionColor="#A055FF"
              />
            ) : (
              <TextInput
                style={{width: '90%', fontSize: 21}}
                onFocus={(e: any) => {
                  onInputFocus();
                }}
                onBlur={(e: any) => {
                  onInputFocusOut();
                }}
                onChangeText={(value: string) => {
                  setPassword(value.replace(/\s/g, ''));
                  // validatePassword();
                }}
                maxLength={25}
                placeholder="비밀번호"
                placeholderTextColor="#A0AAB4"
                keyboardType="default"
                secureTextEntry={true}
                autoCapitalize="none"
                returnKeyType="done"
                selectionColor="#A055FF"
              />
            )}
            <PasswordShow onPress={letShowPassword} />
          </MiddleInputContainerStyle>
          {/* {!isValidate && (
            <CautionText
              text="비밀번호 조건을 다시 확인해주세요"
              placeholder={''}
              title={''}
              maxLength={0}
              keyboardType={undefined}
              suffix={''}
            />
          )} */}
          {password.length < 10 && password.length > 0 && (
            <CautionText text="비밀번호 조건 확인 아직 못함" />
          )}
        </ScrollView>
        <View
          style={{
            bottom: isFocused ? 0 : 21,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* {isValidate && isFocused && (
            <PurpleFullButton
              text="다음"
              onClick={() => navigation.navigate('SignUpPasswordConfirm')}
            />
          )}
          {isValidate && !isFocused && (
            <PurpleRoundButton
              text="다음"
              onClick={() => navigation.navigate('SignUpPasswordConfirm')}
            />
          )}
          {!isValidate && isFocused && <DisabledPurpleFullButton text="다음" />}
          {!isValidate && !isFocused && (
            <DisabledPurpleRoundButton text="다음" />
          )} */}

          {password.length >= 10 && isFocused && (
            <PurpleFullButton
              text="다음"
              onClick={() => navigation.navigate('SignUpPasswordConfirm')}
            />
          )}
          {password.length >= 10 && !isFocused && (
            <PurpleRoundButton
              text="다음"
              onClick={() => navigation.navigate('SignUpPasswordConfirm')}
            />
          )}
          {password.length < 10 && isFocused && (
            <DisabledPurpleFullButton text="다음" />
          )}
          {password.length < 10 && !isFocused && (
            <DisabledPurpleRoundButton text="다음" />
          )}
        </View>
      </Container>
    </>
  );
}
