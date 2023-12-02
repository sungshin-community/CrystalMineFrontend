import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Keyboard,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import WaterMark from '../../components/WaterMark';
import {BigTwoLineText, Description} from '../../components/Top';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  PurpleFullButton,
  DisabledPurpleFullButton,
} from '../../components/Button';
import {
  checkSecondEmailConfilct,
  logout,
  sendSecondEmail,
} from '../../common/authApi';
import Toast from 'react-native-simple-toast';

type RootStackParamList = {
  SplashHome: undefined;
  ReplaceEmailCheck: {email: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function ReplaceEmailInput({navigation}: Props) {
  const [isFocused, setIsIdFocused] = useState<boolean>(false);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const [isBlackList, setIsBlackList] = useState<boolean>(false);
  const [replaceEmail, setReplaceEmail] = useState<string>('');
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  const onIdFocus = () => {
    setIsIdFocused(true);
  };

  const onIdFocusOut = () => {
    setIsIdFocused(false);
    Keyboard.dismiss();
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
      <WaterMark />
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView>
          <BigTwoLineText style={{paddingBottom: 5}}>
            대체 이메일을 입력해주세요.
          </BigTwoLineText>
          <Description style={{marginBottom: 24}}>
            입력한 이메일로 인증번호가 전송됩니다.
          </Description>
          <View
            style={[
              styles.inputContainer,
              {
                borderColor:
                  isDuplicate || isBlackList
                    ? '#ff0000'
                    : isFocused
                    ? '#A055FF'
                    : '#D7DCE6',
              },
            ]}>
            <TextInput
              autoFocus={true}
              style={{
                width: '65%',
                fontSize: 18,
                fontFamily: 'SpoqaHanSansNeo-Regular',
                paddingBottom: 12,
                color: '#222222',
              }}
              onFocus={() => {
                onIdFocus();
              }}
              onBlur={() => {
                onIdFocusOut();
              }}
              onChangeText={(value: string) => {
                setReplaceEmail(value);
                setIsDuplicate(false);
              }}
              placeholder="ex) Crystal@sungshin.ac.kr"
              placeholderTextColor="#A0AAB4"
              keyboardType="email-address"
              selectionColor="#A055FF"
              value={replaceEmail}
            />
          </View>
        </ScrollView>

        <View
          style={{
            bottom: isFocused
              ? Platform.OS === 'ios'
                ? keyboardHeight
                : 0
              : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {replaceEmail.length > 0 && (
            <PurpleFullButton
              text="다음"
              onClick={async () => {
                //이메일 유효성 검사
                let result = await checkSecondEmailConfilct(replaceEmail);
                console.log(result);
                if (result.status === 401) {
                  setTimeout(function () {
                    Toast.show(
                      '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                      Toast.SHORT,
                    );
                  }, 100);
                  logout();
                  navigation.reset({routes: [{name: 'SplashHome'}]});
                } else if (result.code === 'CHECK_EMAIL_SUCCESS') {
                  // 이메일 유효하면 대체이메일로 인증번호 전송
                  console.log('확인 성공');
                  let sendResult = await sendSecondEmail(replaceEmail);
                  console.log(sendResult);
                  if (sendResult.status === 401) {
                    setTimeout(function () {
                      Toast.show(
                        '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                        Toast.SHORT,
                      );
                    }, 100);
                    logout();
                    navigation.reset({routes: [{name: 'SplashHome'}]});
                  } else if (sendResult.code === 'SEND_SECOND_MAIL_SUCCESS') {
                    setTimeout(function () {
                      Toast.show(
                        '메일을 성공적으로 전송했습니다.',
                        Toast.SHORT,
                      );
                    }, 100);
                    navigation.navigate('ReplaceEmailCheck', {
                      email: replaceEmail,
                    });
                  } else if (sendResult.code === 'AUTH_COOL_TIME_LIMIT') {
                    console.log('이메일 발송 실패');
                  } else {
                    setTimeout(function () {
                      Toast.show(
                        '알 수 없는 오류가 발생하였습니다.',
                        Toast.SHORT,
                      );
                    }, 100);
                  }
                } else if (result.code === 'EMAIL_DUPLICATION') {
                  setIsDuplicate(true);
                } else if (
                  result.code === 'BLACKLIST_MEMBER' ||
                  result.code === 'HOLDING_WITHDRAWAL'
                ) {
                  setIsBlackList(true);
                } else {
                  setTimeout(function () {
                    Toast.show(
                      '알 수 없는 오류가 발생하였습니다.',
                      Toast.SHORT,
                    );
                  }, 100);
                }
              }}
            />
          )}

          {replaceEmail.length === 0 && (
            <DisabledPurpleFullButton text="다음" />
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 34,
  },
  inputContainer: {
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#D7DCE6',
  },
});
