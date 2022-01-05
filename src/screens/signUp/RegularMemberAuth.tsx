import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import CustomButton, {
  WhiteRoundButton,
  PurpleRoundButton,
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledWhiteRoundButton,
  DisabledPurpleFullButton,
} from '../../components/Button';
import {TwoLineTitle} from '../../components/Top';
import styled from 'styled-components';
import CountDownTimer from '../../components/CountDownTimer';
import AuthInput from '../../components/AuthInput';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const RegularMemberAuth = () => {
  const [password, setPassword] = useState<string>('');
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);

  const [isFocused, setIsFocused] = useState<boolean>(false);
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
        <View style={{marginTop: 130, marginLeft: 24}}>
          <TwoLineTitle
            firstLineText="메일로 전송된"
            secondLineText="인증번호를 입력해주세요"
          />
        </View>
        <View style={styles.container}>
          <AuthInput />
        </View>
        <CountDownTimer minutes={3} seconds={0} />

        <View
          style={{
            bottom: -300,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isFocused && <PurpleFullButton text="다음" />}

          {!isFocused && <PurpleRoundButton text="다음" />}

          {/* {isFocused && <DisabledPurpleFullButton text="다음" />}

        {!isFocused && <DisabledPurpleRoundButton text="다음" />} */}
        </View>
      </Container>
    </KeyboardAvoidingView>
  ) : (
    <Container>
      <View style={{marginTop: 130, marginLeft: 24}}>
        <TwoLineTitle
          firstLineText="메일로 전송된"
          secondLineText="인증번호를 입력해주세요"
        />
      </View>
      <View style={styles.container}>
        <AuthInput />
      </View>
      <CountDownTimer minutes={3} seconds={0} />

      <View
        style={{
          bottom: -250,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {isFocused && <PurpleFullButton text="다음" />}

        {!isFocused && <PurpleRoundButton text="다음" />}

        {/* {isFocused && <DisabledPurpleFullButton text="다음" />}

        {!isFocused && <DisabledPurpleRoundButton text="다음" />} */}
      </View>
    </Container>
  );
};
export default RegularMemberAuth;
