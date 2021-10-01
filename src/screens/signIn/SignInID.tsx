import React, {useState} from 'react';
import styled from 'styled-components';
import {
  Text,
  StatusBar,
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

import {NormalOneLineText, Description} from '../../components/Top';
import {MiddleInactiveInput} from '../../components/Input';
import {
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledPurpleFullButton,
  PurpleRoundButton,
} from '../../components/Button';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

StatusBar.setBackgroundColor('white');
// StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
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
    color: '#87919B',
    textAlign: 'right',
    // justifyContent: 'flex-end'
  },
});

type RootStackParamList = {
  SignInPassword: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;
export default function SignInID({navigation}: Props) {
  const [studentId, setStudentId] = useState<string>('');
  const [isIdFocused, setIsIdFocused] = useState<boolean>(false);
  const onIdFocus = () => {
    setIsIdFocused(true);
  };

  const onIdFocusOut = () => {
    setIsIdFocused(false);
    Keyboard.dismiss();
  };
  const keyboardAvoidingViewBehaviour =
    Platform.OS === 'ios' ? 'padding' : null;

  return Platform.OS === 'ios' ? (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS == 'ios' ? 10 : 0}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          style={{backgroundColor: '#fff', flex: 1}}>
          <NormalOneLineText style={{marginLeft: 24, marginTop: 25}}>
            로그인
          </NormalOneLineText>
          <View>
            <Text style={{marginLeft: 24, marginTop: 47}}>아이디</Text>
            <View style={{paddingRight: 24, paddingLeft: 24, marginTop: 12}}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={{width: '60%', borderColor: '#ff0000', fontSize: 21}}
                  onFocus={(e: any) => {
                    onIdFocus();
                  }}
                  onBlur={(e: any) => {
                    onIdFocusOut();
                  }}
                  onChangeText={(value: string) => {
                    setStudentId(value);
                  }}
                  maxLength={8}
                  placeholder="아이디"
                  keyboardType="number-pad"
                />

                <Text style={styles.suffix}>@sungshin.ac.kr</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            bottom: isIdFocused ? 100 : 21,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
          }}>
          {studentId.length === 8 ? (
            <PurpleRoundButton
              text="다음"
              onClick={() => navigation.navigate('SignInPassword')}
            />
          ) : (
            <DisabledPurpleRoundButton text="다음" />
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  ) : (
    <>
      <ScrollView
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        style={{backgroundColor: '#fff', flex: 1}}>
        <NormalOneLineText style={{marginLeft: 24, marginTop: 25}}>
          로그인
        </NormalOneLineText>
        <View>
          <Text style={{marginLeft: 24, marginTop: 47}}>아이디</Text>
          <View style={{paddingRight: 24, paddingLeft: 24, marginTop: 12}}>
            <View style={styles.inputContainer}>
              <TextInput
                style={{width: '60%', borderColor: '#ff0000', fontSize: 21}}
                onFocus={(e: any) => {
                  onIdFocus();
                }}
                onBlur={(e: any) => {
                  onIdFocusOut();
                }}
                onChangeText={(value: string) => {
                  setStudentId(value);
                }}
                maxLength={8}
                placeholder="아이디"
                keyboardType="number-pad"
              />

              <Text style={styles.suffix}>@sungshin.ac.kr</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          bottom: isIdFocused ? 0 : 21,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
        }}>
        {studentId.length === 8 ? (
          <PurpleRoundButton
            text="다음"
            onClick={() => navigation.navigate('SignInPassword')}
          />
        ) : (
          <DisabledPurpleRoundButton text="다음" />
        )}
      </View>
    </>
  );
}
