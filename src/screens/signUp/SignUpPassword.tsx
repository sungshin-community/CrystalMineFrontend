import React, {useState} from 'react';
import styled from 'styled-components';
import {StatusBar, View, Keyboard, TextInput, ScrollView} from 'react-native';
import {NormalOneLineText, Description} from '../../components/Top';
import {
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledPurpleFullButton,
  PurpleRoundButton,
} from '../../components/Button';
StatusBar.setBackgroundColor('white');
// StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const TextContainer = styled.View`
  margin: 130px 24px 52px 24px;
`;

const MiddleInputContainerStyle = styled.View`
  font-size: 21px;
  border-bottom-width: 2px;
  flex-direction: row;
  align-items: center;
`;

export default function SignUpPassword() {
  const [password, setPassword] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  // const [isValidate, setIsValidate] = useState<boolean>(false);

  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputFocusOut = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  // const validatePassword = () => {
  //   var validate = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&]){10, 25}$/;
  //   setIsValidate(validate.test(password));
  //   console.log(password, isValidate);
  // };

  return (
    <>
      <Container>
        <TextContainer>
          <NormalOneLineText>비밀번호를 입력해주세요</NormalOneLineText>
          <Description>
            영문, 숫자, 특수문자 필수 포함 10자 이상으로 구성해주세요
          </Description>
        </TextContainer>
        <ScrollView
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          style={{backgroundColor: '#fff', marginHorizontal: 24}}>
          <MiddleInputContainerStyle
            style={{
              borderColor: isFocused ? '#A055FF' : '#D7DCE6',
            }}>
            <TextInput
              style={{width: '60%'}}
              onFocus={(e: any) => {
                // onFocus
                onInputFocus();
              }}
              onBlur={(e: any) => {
                onInputFocusOut();
              }}
              onChangeText={(value: string) => {
                setPassword(value.replace(/\s/g, ''));
              }}
              // onEndEditing={(e: any) => {
              //   validatePassword();
              // }}
              maxLength={25}
              placeholder="비밀번호"
              placeholderTextColor="#A0AAB4"
              keyboardType="default"
              secureTextEntry={true}
              autoCapitalize="none"
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
          {/* {isValidate && isFocused && <PurpleFullButton text="다음" />}
        {isValidate && !isFocused && <PurpleRoundButton text="다음" />}
        {!isValidate && isFocused && <DisabledPurpleFullButton text="다음" />}
        {!isValidate && !isFocused && <DisabledPurpleRoundButton text="다음" />} */}

          {password.length >= 10 && isFocused && (
            <PurpleFullButton text="다음" />
          )}
          {password.length >= 10 && !isFocused && (
            <PurpleRoundButton text="다음" />
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
