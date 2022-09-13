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
  KeyboardEvent,
  Pressable,
} from 'react-native';
import {NormalOneLineText} from '../../components/Top';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  DisabledPurpleRoundButton,
  PurpleRoundButton,
} from '../../components/Button';
import {login, logout} from '../../common/authApi';
import PasswordShow from '../../../resources/icon/PasswordShow';
import LoginCheckBoxOn from '../../../resources/icon/LoginCheckBoxOn';
import PasswordNotShow from '../../../resources/icon/PasswordNotShow';
import {getHundredsDigit} from '../../common/util/statusUtil';
import Toast from 'react-native-simple-toast';
import { fontRegular } from '../../common/font';

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
  const [isPasswordInCorrect, setIsPasswordInCorrect] = useState<boolean>(
    false,
  );
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const [isBlackList, setIsBlackList] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

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

  const onKeyboardDidshow = (e: KeyboardEvent) => {
    setKeyboardHeight(e.endCoordinates.height);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidshow,
    );
    return () => {
      showSubscription.remove();
    };
  }, []);

  return (
    <>
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={{flex: 1, paddingHorizontal: 24}}>
          <NormalOneLineText style={{marginTop: 25}}>로그인</NormalOneLineText>
          <View>
            <Text
              style={[
                fontRegular,{
                marginTop: 36,
                color: isPasswordInCorrect ? '#E64646' : '#A055FF',
              }]}>
              비밀번호
            </Text>
            <View style={{marginTop: 12}}>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: isPasswordFocused
                      ? isPasswordInCorrect
                        ? '#E64646'
                        : '#A055FF'
                      : '#D7DCE6',
                  },
                ]}>
                <TextInput
                  autoFocus={true}
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
                    setIsPasswordInCorrect(false);
                    setPassword(value);
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
                  placeholderTextColor="#A0AAB4"
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
              <Text style={[fontRegular,styles.errorMessage]}>
                {isPasswordInCorrect
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
            bottom: isPasswordFocused
              ? Platform.OS == 'ios'
                ? keyboardHeight
                : 0
              : 34,
            backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isValidate && (
            <PurpleRoundButton
              text="로그인"
              onClick={async () => {
                const response = await login({
                  username: route.params.userId,
                  password: password,
                });
                if (response.status === 401) {
                  setTimeout(function () {
                    Toast.show(
                      '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                      Toast.SHORT,
                    );
                  }, 100);
                  logout();
                  navigation.reset({routes: [{name: 'SplashHome'}]});
                } else if (getHundredsDigit(response.status) === 2) {
                  navigation.reset({routes: [{name: 'GlobalNavbar'}]});
                } else if (response.data.code === 'INVALID_EMAIL_PASSWORD') {
                  setIsPasswordInCorrect(true);
                } else if (response.data.code == 'BLACKLIST_MEMBER') {
                  setIsBlackList(true);
                } else
                  setTimeout(function () {
                    Toast.show(
                      '알 수 없는 오류가 발생하였습니다.',
                      Toast.SHORT,
                    );
                  }, 100);
              }}
            />
          )}

          {!isValidate && <DisabledPurpleRoundButton text="로그인" />}
          <Pressable
            onPress={() => {
              navigation.navigate('ResetPasswordInputId');
            }}>
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
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
