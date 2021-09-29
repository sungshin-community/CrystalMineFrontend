import React, {useState} from 'react';
import styled from 'styled-components';
import {StatusBar, View, Keyboard, TextInput, ScrollView} from 'react-native';
import {TwoLineTitle} from '../../components/Top';
import {
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledPurpleFullButton,
  PurpleRoundButton,
} from '../../components/Button';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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

type RootStackParamList = {
  SignUpNickname: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function SignUpPasswordConfirm({ navigation }: Props) {
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isEqual, setIsEqual] = useState<boolean>(false);

  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputFocusOut = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  // const passwordEqual = () => {
  // 앞에 password 받아와서 참/거짓 반환
  // if (password === passwordConfirm) { setIsEqual(true); }
  // };

  return (
    <>
      <Container>
        <TextContainer>
          <TwoLineTitle
            firstLineText="비밀번호를"
            secondLineText="한번 더 입력해주세요"
          />
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
                onInputFocus();
                // passwordEqual();
              }}
              onBlur={(e: any) => {
                onInputFocusOut();
              }}
              onChangeText={(value: string) => {
                setPasswordConfirm(value.replace(/\s/g, ''));
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
          </MiddleInputContainerStyle>
        </ScrollView>
        <View
          style={{
            bottom: isFocused ? 0 : 21,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {passwordConfirm.length >= 10 && isFocused && (
            <PurpleFullButton text="다음"
            onClick={() =>
              navigation.navigate('SignUpNickname')
            } />
          )}
          {passwordConfirm.length >= 10 && !isFocused && (
            <PurpleRoundButton text="다음" 
            onClick={() =>
              navigation.navigate('SignUpNickname')
            } />
          )}
          {passwordConfirm.length < 10 && isFocused && (
            <DisabledPurpleFullButton text="다음" />
          )}
          {passwordConfirm.length < 10 && !isFocused && (
            <DisabledPurpleRoundButton text="다음" />
          )}
          {/* {isEqual === true && isFocused && <PurpleFullButton text="다음" />}
          {isEqual === true && !isFocused && <PurpleRoundButton text="다음" />}
          {isEqual === false && isFocused && (
            <DisabledPurpleFullButton text="다음" />
          )}
          {isEqual === false && !isFocused && (
            <DisabledPurpleRoundButton text="다음" />
          )} */}
        </View>
      </Container>
    </>
  );
}
