/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Pressable,
  KeyboardEvent
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {TwoLineTitle} from '../../components/Top';
import CustomButton, {
  WhiteRoundButton,
  PurpleRoundButton,
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledWhiteRoundButton,
  DisabledPurpleFullButton,
} from '../../components/Button';
import {ModalBottom} from '../../components/ModalBottom';
import {checkAuthNumber, logout, sendEmail} from '../../common/authApi';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Dimensions} from 'react-native';
import Toast from 'react-native-simple-toast';
import {useIsFocused} from '@react-navigation/native';
import {getHundredsDigit} from '../../common/util/statusUtil';
import BackgroundTimer from 'react-native-background-timer';
import {LogBox} from 'react-native';
import styled from 'styled-components/native';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('white');
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');
}

const TextContainer = styled.View`
  margin: 55px 0px 52px 0px;
`;

const CELL_COUNT = 6;
const TIME = 600;

type RootStackParamList = {
  Home: undefined;
  GlobalNavbar: undefined;
  RegularMemberAuthSelect: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;
export default function RegularMemberAuth({navigation}: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalIncorrectOverVisble, setModalIncorrectOverVisible] = useState<
    boolean
  >(false);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [tryCnt, setTryCnt] = useState(5);
  const [IsIncorrect, setIsIncorrect] = useState<boolean>(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState<boolean>(
    false,
  );
  const [isCoolTime, setIsCoolTime] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState(TIME);
  const [timerOn, setTimerOn] = useState(true);
  const [min, setMin] = useState<number>(0);
  const [sec, setSec] = useState<number>(0);
   const [isFocused, setIsFocused] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputFocusOut = () => {
    setIsFocused(false);
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
  console.log('시간 가는 중', secondsLeft);

   useEffect(() => {
    if (timerOn) startTimer();
    else BackgroundTimer.stopBackgroundTimer();
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [timerOn]);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(secs => {
        if (secs > 0) return secs - 1;
        else return 0;
      });
    }, 1000);
  };

  useEffect(() => {
    if (secondsLeft === 0) BackgroundTimer.stopBackgroundTimer();
    let mins = Math.floor((secondsLeft / 60) % 60);
    let seconds = Math.floor(secondsLeft % 60);
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    setMin(displayMins);
    setSec(displaySecs);
  }, [secondsLeft]);

  //다시 시도하기 버튼 눌렀을 경우
  const onResendOtpButtonPress = async () => {
    //인증번호 발송 API
    setValue('');
    let result: boolean = await sendEmail();
    if (result) {
      Toast.show('메일을 성공적으로 전송했습니다.', Toast.SHORT);
      console.log('이메일 재발송 성공');
    } else {
      Toast.show('메일 전송을 실패했습니다.', Toast.SHORT);
      console.log('이메일 재발송 실패');
    }
    setSecondsLeft(TIME);
    startTimer();
    setTryCnt(5);
  };
  const gotoHome = () => {
    setModalIncorrectOverVisible(!modalIncorrectOverVisble);
    navigation.reset({routes: [{name: 'GlobalNavbar'}]});
  };
  const onFocusOut = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  return (
    <>
      <KeyboardAvoidingView style={{backgroundColor: '#fff', flex: 1}}>
        <ScrollView style={{flex: 1, paddingHorizontal: 24}}>
          <TextContainer>
            <TwoLineTitle
              firstLineText="성신 G-mail 로 전송된"
              secondLineText="인증번호를 입력해주세요"
            />
          </TextContainer>
          <CodeField
            // autoFocus={true}
            ref={ref}
            {...props}
            value={value}
            onChangeText={value => {
              setValue(value);
              if (value.length !== 6) setIsIncorrect(false);
            }}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <View
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[
                  styles.cellRoot,
                  isFocused && styles.focusCell,
                  IsIncorrect && styles.focusCellIncorrect,
                  value.length !== 6 && styles.cellRoot,
                  value.length !== 6 && isFocused && styles.focusCell,
                ]}>
                <Text style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
          <View style={styles.errorMessageContainer}>
            <Text style={styles.errorMessage}>
              {IsIncorrect && value.length == 6
                ? '인증번호를 정확하게 입력해 주세요.'
                : ''}
            </Text>
          </View>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              {min} : {sec}
            </Text>
          </View>

          <Text style={styles.tryCnt}>남은 횟수 {tryCnt}/5</Text>
          <Pressable onPress={async () => onResendOtpButtonPress()}>
            <View style={{alignSelf: 'center', width: 'auto'}}>
              <Text style={styles.resent}>인증번호 재전송</Text>
            </View>
          </Pressable>
        </ScrollView>
        <View
          style={{
            paddingBottom: isFocused
              ? Platform.OS == 'ios'
                ? keyboardHeight
                : 0
              : 15,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
          }}>
          {value.length === 6 && isFocused && (
            <PurpleFullButton
              text="인증 완료"
              onClick={async () => {
                let result = await checkAuthNumber(value);
                if (result.status === 401) {
                  Toast.show(
                    '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                    Toast.SHORT,
                  );
                  logout();
                  navigation.reset({routes: [{name: 'SplashHome'}]});
                } else if (getHundredsDigit(result.status) === 2) {
                  Toast.show('정회원 인증에 성공하였습니다.', Toast.SHORT);
                  navigation.reset({routes: [{name: 'GlobalNavbar'}]});
                } else if (result.data.code === 'AUTH_NUMBER_INCORRECT') {
                  setTryCnt(5 - result.data.data.attemptCount);
                  setIsIncorrect(true);
                } else if (result.data.code === 'AUTH_COOL_TIME_LIMIT') {
                  setIsCoolTime(true);
                  navigation.reset({routes: [{name: 'GlobalNavbar'}]});
                } else if (result.data.code === 'AUTH_ATTEMPT_COUNT_LIMIT') {
                  setTryCnt(0);
                } else {
                  Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
                }
              }}></PurpleFullButton>
          )}
          {value.length === 6 && !isFocused && (
            <PurpleRoundButton
              text="인증 완료"
              onClick={async () => {
                let result = await checkAuthNumber(value);
                if (result.status === 401) {
                  Toast.show(
                    '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                    Toast.SHORT,
                  );
                  logout();
                  navigation.reset({routes: [{name: 'SplashHome'}]});
                } else if (getHundredsDigit(result.status) === 2) {
                  Toast.show('정회원 인증에 성공하였습니다.', Toast.SHORT);
                  navigation.reset({routes: [{name: 'GlobalNavbar'}]});
                } else if (result.data.code === 'AUTH_NUMBER_INCORRECT') {
                  setTryCnt(5 - result.data.data.attemptCount);
                  setIsIncorrect(true);
                } else if (result.data.code === 'AUTH_COOL_TIME_LIMIT') {
                  setIsCoolTime(true);
                  navigation.reset({routes: [{name: 'GlobalNavbar'}]});
                } else if (result.data.code === 'AUTH_ATTEMPT_COUNT_LIMIT') {
                  setTryCnt(0);
                } else {
                  Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
                }
              }}></PurpleRoundButton>
          )}
          {value.length < 6 && isFocused && (
            <DisabledPurpleFullButton text="인증 완료"></DisabledPurpleFullButton>
          )}
          {value.length < 6 && !isFocused && (
            <DisabledPurpleRoundButton text="인증 완료"></DisabledPurpleRoundButton>
          )}
        </View>
      </KeyboardAvoidingView>
      {secondsLeft === 0 && (
        <ModalBottom
          modalVisible={!modalVisible}
          setModalVisible={setModalVisible}
          content={`인증번호 입력 시간이 초과되어,\n인증번호를 재전송합니다.`}
          purpleButtonText="인증번호 재전송"
          purpleButtonFunc={onResendOtpButtonPress}
          whiteButtonText="인증 취소"
          whiteButtonFunc={() => navigation.navigate('GlobalNavbar') }
        />
      )}
      {tryCnt === 0 && (
        <ModalBottom
          modalVisible={!modalIncorrectOverVisble}
          setModalVisible={setModalIncorrectOverVisible}
          content={`인증번호 입력 최대 횟수를 초과하였습니다.\n5분 뒤 다시 인증을 시도해주세요.`}
          purpleButtonText="확인"
          purpleButtonFunc={() => { gotoHome(); setTimerOn(false);}}></ModalBottom>
      )}
      {isCoolTime && (
        <ModalBottom
          modalVisible={isCoolTime}
          setModalVisible={setIsCoolTime}
          content={`이전에 시도하신 인증이 실패하여,\n5분 뒤부터 재인증이 가능합니다.`}
          purpleButtonText="확인"
          purpleButtonFunc={gotoHome}></ModalBottom>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 40,
    width: '80%',
    marginHorizontal: Dimensions.get('window').width / 11,
  },
  cellRoot: {
    width: 40,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#000',
    fontSize: 45,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#A055FF',
    borderBottomWidth: 2,
  },
  focusCellIncorrect: {
    borderBottomColor: '#E64646',
    borderBottomWidth: 2,
  },
  errorMessageContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: '#E64646',
    fontSize: 11,
  },
  timerContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
  },
  timerText: {
    width: 56,
    height: 26,
    color: '#87919B',
    backgroundColor: '#E2E4E8',
    fontSize: 13,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
  },
  tryCnt: {
    justifyContent: 'center',
    textAlign: 'center',
    color: '#87919B',
    fontSize: 13,
    marginTop: 10,
  },
  resent: {
    color: '#6E7882',
    fontSize: 15,
    marginVertical: 26,
    textDecorationLine: 'underline',
  },
});
