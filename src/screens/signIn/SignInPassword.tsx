import React, {useState} from 'react';
import {
  Text,
  StatusBar,
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {NormalOneLineText} from '../../components/Top';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledPurpleFullButton,
  PurpleRoundButton,
} from '../../components/Button';
import { login } from '../../common/auth';

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
  },
  suffix: {
    fontSize: 15,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: '#87919B',
    textAlign: 'right',
  },
});

type RootStackParamList = {
  SignInPassword: {userId: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;
export default function SignInPassword({navigation, route}: Props) {
  const [password, setPassword] = useState<string>('');
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);

  const onPasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const onPasswordFocusOut = () => {
    setIsPasswordFocused(false);
    Keyboard.dismiss();
  };

  return Platform.OS === 'ios' ? (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS == 'ios' ? 10 : 0}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          style={{backgroundColor: '#fff'}}>
          <NormalOneLineText style={{marginLeft: 24, marginTop: 25}}>
            로그인
          </NormalOneLineText>

          <View>
            <Text style={{marginLeft: 24, marginTop: 36}}>비밀번호</Text>
            <View style={{paddingRight: 24, paddingLeft: 24, marginTop: 12}}>
              <View
                style={[
                  styles.inputContainer,
                  {borderColor: isPasswordFocused ? '#A055FF' : '#D7DCE6'},
                ]}>
                <TextInput
                  style={{borderColor: '#ff0000', fontSize: 21, width: '100%'}}
                  onFocus={(e: any) => {
                    onPasswordFocus();
                  }}
                  onBlur={(e: any) => {
                    onPasswordFocusOut();
                  }}
                  onChangeText={(value: string) => {
                    setPassword(value);
                  }}
                  maxLength={25}
                  placeholder="비밀번호"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  returnKeyType="done"
                  selectionColor="#A055FF"
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            bottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
          }}>
          {password.length >= 10 && isPasswordFocused && (
            <PurpleFullButton text="다음" />
          )}

          {password.length >= 10 && !isPasswordFocused && (
            <PurpleRoundButton text="다음" />
          )}

          {password.length < 10 && isPasswordFocused && (
            <DisabledPurpleFullButton text="다음" />
          )}

          {password.length < 10 && !isPasswordFocused && (
            <DisabledPurpleRoundButton text="다음" />
          )}
          <Text
            style={{
              marginBottom: 20,
              marginTop: 21,
              fontSize: 13,
              color: '#87929B',
            }}>
            비밀번호를 잊으셨나요?
          </Text>
        </View>
      </KeyboardAvoidingView>
    </>
  ) : (
    <>
      <ScrollView
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        style={{backgroundColor: '#fff'}}>
        <NormalOneLineText style={{marginLeft: 24, marginTop: 25}}>
          로그인
        </NormalOneLineText>

        <View>
          <Text style={{marginLeft: 24, marginTop: 36}}>비밀번호</Text>
          <View style={{paddingRight: 24, paddingLeft: 24, marginTop: 12}}>
            <View
              style={[
                styles.inputContainer,
                {borderColor: isPasswordFocused ? '#A055FF' : '#D7DCE6'},
              ]}>
              <TextInput
                style={{borderColor: '#ff0000', fontSize: 21, width: '100%'}}
                // onFocus={(e: any) => { onPasswordFocus(); }}
                // onBlur={(e: any) => { onPasswordFocusOut(); }}
                onChangeText={(value: string) => {
                  setPassword(value);
                }}
                maxLength={25}
                placeholder="비밀번호"
                secureTextEntry={true}
                autoCapitalize="none"
                returnKeyType="done"
                selectionColor="#A055FF"
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          bottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
        }}>
        {password.length >= 10 ? (
          <PurpleRoundButton text="로그인" onClick={() => login({username: route.params.userId, password: password})} />
        ) : (
          <DisabledPurpleRoundButton text="로그인" />
        )}
        <Text
          style={{
            marginBottom: 20,
            marginTop: 21,
            fontSize: 13,
            color: '#87929B',
          }}>
          비밀번호를 잊으셨나요?
        </Text>
      </View>
    </>
  );
}
