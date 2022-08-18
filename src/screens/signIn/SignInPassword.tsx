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
  TouchableWithoutFeedback,
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
import {getHundredsDigit} from '../../common/util/statusUtil';
import Toast from 'react-native-simple-toast';

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
  errorMessage: {
    marginTop: 10,
    color: '#E64646',
    fontSize: 11,
  },
});

type RootStackParamList = {
  ResetPasswordInputId: undefined;
  SignInPassword: {userId: string};
  GlobalNavbar: undefined;
  ErrorScreen: undefined;
  SplashHome: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;
export default function SignInPassword({navigation, route}: Props) {
  const [password, setPassword] = useState<string>('');
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(true);
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const [isBlackList, setIsBlackList] = useState<boolean>(false);

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
      keyboardVerticalOffset={90}
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
          <Text
            style={{
              marginLeft: 24,
              marginTop: 36,
              color: isPasswordCorrect ? '#A055FF' : '#E64646',
            }}>
            비밀번호
          </Text>
          <View style={{paddingRight: 24, paddingLeft: 24, marginTop: 12}}>
            <View
              style={[
                styles.inputContainer,
                {
                  borderColor: isPasswordFocused
                    ? isPasswordCorrect
                      ? '#A055FF'
                      : '#E64646'
                    : '#D7DCE6',
                },
              ]}>
              <TextInput
                // autoFocus={true}
                style={{
                  fontSize: 21,
                  width: '90%',
                  fontFamily: 'SpoqaHanSansNeo-Regular',
                  paddingBottom: 7,
                  color: '#222222',
                }}
                onFocus={(e: any) => {
                  onPasswordFocus();
                }}
                onBlur={(e: any) => {
                  onPasswordFocusOut();
                }}
                onChangeText={(value: string) => {
                  setPassword(value);
                  setIsPasswordCorrect(true);
                  let regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{10,25}$/;
                  if (regExp.test(value)) {
                    setIsValidate(true);
                  } else {
                    setIsValidate(false);
                  }
                  if (value.length === 25)
                    Toast.show(
                      '비밀번호는 25글자까지만 입력 가능합니다.',
                      Toast.SHORT,
                    );
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
            <Text style={styles.errorMessage}>
              {isPasswordCorrect
                ? '아이디 및 비밀번호를 정확하게 입력해주세요.'
                : isBlackList
                ? '접근이 불가능한 계정입니다.'
                : ''}
            </Text>
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
        {isValidate && (
          <PurpleRoundButton
            text="다음"
            onClick={async () => {
              const response = await login({
                username: route.params.userId,
                password: password,
              });
              if (response.status === 401) {
                navigation.navigate('SplashHome');
              } else if (getHundredsDigit(response.status) === 2) {
                navigation.reset({routes: [{name: 'GlobalNavbar'}]});
              } else if (response.data.code === 'INVALID_EMAIL_PASSWORD') {
                setIsPasswordCorrect(false);
              } else if (response.data.code == 'BLACKLIST_MEMBER') {
                setIsBlackList(true);
              } else navigation.navigate('ErrorScreen');
            }}
          />
        )}

        {!isValidate && <DisabledPurpleRoundButton text="다음" />}
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('ResetPasswordInputId')}>
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
        </TouchableWithoutFeedback>
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
          <Text
            style={{
              marginLeft: 24,
              marginTop: 36,
              color: isPasswordCorrect ? '#A055FF' : '#E64646',
            }}>
            비밀번호
          </Text>
          <View style={{paddingRight: 24, paddingLeft: 24, marginTop: 12}}>
            <View
              style={[
                styles.inputContainer,
                {
                  borderColor: isPasswordFocused
                    ? isPasswordCorrect
                      ? '#A055FF'
                      : '#E64646'
                    : '#D7DCE6',
                },
              ]}>
              <TextInput
                autoFocus={true}
                style={{
                  fontFamily: 'SpoqaHanSansNeo-Regular',
                  fontSize: 21,
                  width: '90%',
                  color: '#222222',
                }}
                onFocus={(e: any) => {
                  onPasswordFocus();
                }}
                onBlur={(e: any) => {
                  onPasswordFocusOut();
                }}
                onChangeText={(value: string) => {
                  setPassword(value);
                  setIsPasswordCorrect(true);
                  let regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{10,25}$/;
                  if (regExp.test(value)) {
                    setIsValidate(true);
                  } else {
                    setIsValidate(false);
                  }
                  if (value.length === 25)
                    Toast.show(
                      '비밀번호는 25글자까지만 입력 가능합니다.',
                      Toast.SHORT,
                    );
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
            <Text style={styles.errorMessage}>
              {isPasswordCorrect
                ? '아이디 및 비밀번호를 정확하게 입력해주세요.'
                : isBlackList
                ? '접근이 불가능한 계정입니다.'
                : ''}
            </Text>
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
        {isValidate && (
          <PurpleRoundButton
            text="다음"
            onClick={async () => {
              const response = await login({
                username: route.params.userId,
                password: password,
              });
              if (response.status === 401) {
                navigation.navigate('SplashHome');
              } else if (getHundredsDigit(response.status) === 2) {
                navigation.reset({routes: [{name: 'GlobalNavbar'}]});
              } else if (response.data.code === 'INVALID_EMAIL_PASSWORD') {
                setIsPasswordCorrect(false);
              } else if (response.data.code == 'BLACKLIST_MEMBER') {
                setIsBlackList(true);
              } else navigation.navigate('ErrorScreen');
            }}
          />
        )}

        {!isValidate && <DisabledPurpleRoundButton text="다음" />}
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('ResetPasswordInputId')}>
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
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}
