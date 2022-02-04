import React, {useEffect, useState} from 'react';
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
  PurpleRoundButton,
} from '../../components/Button';
import {login} from '../../common/authApi';

import PasswordShow from '../../../resources/icon/PasswordShow';
import LoginCheckBoxOn from '../../../resources/icon/LoginCheckBoxOn';
import PasswordNotShow from '../../../resources/icon/PasswordNotShow';
import {CommonActions} from '@react-navigation/native';
import BackButton from '../../components/BackButton';

if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('white');
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');
}

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 2,
    borderColor: '#D7DCE6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

type RootStackParamList = {
  SignInPassword: {userId: string};
  Home: undefined;
  GlobalNavbar: undefined;
  BoardScreen: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;
export default function SignInPassword({navigation, route}: Props) {
  const [password, setPassword] = useState<string>('');
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (): React.ReactNode => (
        <BackButton
          onPress={() => navigation.dispatch(CommonActions.goBack())}
        />
      ),
    });
  }, [navigation]);

  const onPasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const onPasswordFocusOut = () => {
    setIsPasswordFocused(false);
    Keyboard.dismiss();
  };

  const letShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      keyboardVerticalOffset={10}
      behavior={'padding'}
      style={{flex: 1}}>
      <ScrollView
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        style={{backgroundColor: '#fff'}}>
        <NormalOneLineText style={{marginLeft: 24, marginTop: 25}}>
          로그인
        </NormalOneLineText>

        <View>
          <Text style={{marginLeft: 24, marginTop: 36, color: '#A055FF'}}>
            비밀번호
          </Text>
          <View style={{paddingRight: 24, paddingLeft: 24, marginTop: 12}}>
            <View
              style={[
                styles.inputContainer,
                {borderColor: isPasswordFocused ? '#A055FF' : '#D7DCE6'},
              ]}>
              <TextInput
                style={{
                  fontSize: 21,
                  width: '90%',
                  fontFamily: 'SpoqaHanSansNeo-Regular',
                  paddingBottom: 7,
                }}
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
                secureTextEntry={!showPassword}
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
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <LoginCheckBoxOn />
              <Text style={{color: '#87919B', marginLeft: 6}}>자동로그인</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={
          isPasswordFocused
            ? {
                paddingBottom: 91,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
              }
            : {
                paddingBottom: 21,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
              }
        }>
        {password.length >= 10 && (
          <PurpleRoundButton
            text="다음"
            onClick={async () => {
              let result: boolean = await login({
                username: route.params.userId,
                password: password,
              });
              if (result) {
                navigation.navigate('GlobalNavbar');
              } else {
                console.log('로그인 실패');
              }
            }}
          />
        )}

        {password.length < 10 && <DisabledPurpleRoundButton text="다음" />}
        <Text
          style={{
            paddingBottom: 20,
            marginTop: 21,
            fontSize: 13,
            fontFamily: 'SpoqaHanSansNeo-Regular',
            color: '#87929B',
            textDecorationLine: 'underline',
          }}>
          비밀번호를 잊으셨나요?
        </Text>
      </View>
    </KeyboardAvoidingView>
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
          <Text style={{marginLeft: 24, marginTop: 36, color: '#A055FF'}}>
            비밀번호
          </Text>
          <View style={{paddingRight: 24, paddingLeft: 24, marginTop: 12}}>
            <View
              style={[
                styles.inputContainer,
                {borderColor: isPasswordFocused ? '#A055FF' : '#D7DCE6'},
              ]}>
              <TextInput
                style={{
                  fontFamily: 'SpoqaHanSansNeo-Regular',
                  fontSize: 21,
                  width: '90%',
                }}
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
                secureTextEntry={!showPassword}
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
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <LoginCheckBoxOn />
              <Text style={{color: '#87919B', marginLeft: 6}}>자동로그인</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          paddingBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
        }}>
        {password.length >= 10 && (
          <PurpleRoundButton
            text="다음"
            onClick={async () => {
              let result: boolean = await login({
                username: route.params.userId,
                password: password,
              });
              if (result) {
                navigation.navigate('GlobalNavbar');
              } else {
                console.log('로그인 실패');
              }
            }}
          />
        )}

        {password.length < 10 && <DisabledPurpleRoundButton text="다음" />}
        <Text
          style={{
            marginTop: 21,
            fontSize: 13,
            fontFamily: 'SpoqaHanSansNeo-Regular',
            color: '#87929B',
            textDecorationLine: 'underline',
          }}>
          비밀번호를 잊으셨나요?
        </Text>
      </View>
    </>
  );
}
