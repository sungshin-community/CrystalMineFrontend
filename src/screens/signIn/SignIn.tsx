import React, { useState } from 'react';
import styled from 'styled-components';
import { Text, StatusBar, View, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { NormalOneLineText, Description } from '../../components/Top';
import { MiddleInactiveInput } from '../../components/Input';
import { DisabledPurpleRoundButton, PurpleFullButton, DisabledPurpleFullButton, PurpleRoundButton } from '../../components/Button';

StatusBar.setBackgroundColor('white');
// StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const styles = StyleSheet.create({
  inputContainer: {
    fontSize: 21,
    borderBottomWidth: 2,
    borderColor: '#D7DCE6',
    flexDirection: 'row',
    alignItems: 'center',
    // textAlign: 'right'
  },
  suffix: {
    fontSize: 15,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: '#87919B',
    textAlign: 'right',
    // justifyContent: 'flex-end'
  }
})

export default function SignIn() {

  const [studentId, setStudentId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isIdFocused, setIsIdFocused] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
  const onIdFocus = () => {
    setIsIdFocused(true);
  }

  const onIdFocusOut = () => {
    setIsIdFocused(false);
    Keyboard.dismiss();
  }

  const onPasswordFocus = () => {
    setIsPasswordFocused(true);
  }

  const onPasswordFocusOut = () => {
    setIsPasswordFocused(false);
    Keyboard.dismiss();
  }

  return (
    <>
      <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled" style={{ backgroundColor: '#fff' }}>
        <NormalOneLineText style={{ marginLeft: 24, marginTop: 25 }}>로그인</NormalOneLineText>
        <View>
          <Text style={{ marginLeft: 24, marginTop: 47 }}>아이디</Text>
          <View style={{ paddingRight: 24, paddingLeft: 24, marginTop: 12 }}>
            <View style={styles.inputContainer}>
              <TextInput
                style={{ width: '60%', borderColor: '#ff0000', fontSize: 21 }}
                // onFocus={(e: any) => { onIdFocus(); }}
                // onBlur={(e: any) => { onIdFocusOut(); }}
                onChangeText={(value: string) => { setStudentId(value) }}
                maxLength={8}
                placeholder="아이디"
                keyboardType="number-pad"
              />

              <Text style={styles.suffix}>@sungshin.ac.kr</Text>
            </View>

          </View>
        </View>

        <View>
          <Text style={{ marginLeft: 24, marginTop: 36 }}>비밀번호</Text>
          <View style={{ paddingRight: 24, paddingLeft: 24, marginTop: 12 }}>
            <View style={styles.inputContainer}>
              <TextInput
                style={{ borderColor: '#ff0000', fontSize: 21, width: '100%' }}
                // onFocus={(e: any) => { onPasswordFocus(); }}
                // onBlur={(e: any) => { onPasswordFocusOut(); }}
                onChangeText={(value: string) => { setPassword(value) }}
                // maxLength={8}
                placeholder="비밀번호"
                secureTextEntry={true}
              />

            </View>

          </View>
        </View>


      </ScrollView>
      <View style={{ bottom: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        {studentId.length === 8 && password.length >= 10 ?
          <PurpleRoundButton text="다음" /> :
          <DisabledPurpleRoundButton text='다음' />
        }
        <Text style={{ marginBottom: 20, marginTop: 21, fontSize: 13, color: '#87929B' }}>비밀번호를 잊으셨나요?</Text>
      </View>
    </>
  );
}
