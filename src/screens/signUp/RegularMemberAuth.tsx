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
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {TwoLineTitle} from '../../components/Top';
import styled from 'styled-components';
import CustomButton, {
  WhiteRoundButton,
  PurpleRoundButton,
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledWhiteRoundButton,
  DisabledPurpleFullButton,
} from '../../components/Button';
import {ModalBottom} from '../../components/ModalBottom';
import {checkAuthNumber, sendEmail} from '../../common/authApi';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

{
  Platform.OS === 'android' && StatusBar.setBackgroundColor('white');
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const CELL_COUNT = 6;
const RESEND_OTP_TIME_LIMIT = 90;

type RootStackParamList = {
  Home: undefined;
  GlobalNavbar: undefined;
  BoardScreen: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;
export default function RegularMemberAuth({navigation}: Props) {
  let resendOtpTimerInterval: any;

  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalInCorrectVisble, setModalInCorrectVisible] =
    useState<boolean>(false);

  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  //다시 시도하기 버튼 눌렀을 경우
  const onResendOtpButtonPress = async () => {
    //이 부분 수정 필요(인증번호 시간 초과 후 틀릴 경우 인증 하기 번호 두 번 눌려야 작동하게 됨)
    setModalInCorrectVisible(!modalInCorrectVisble);

    //인증번호 발송 API
    setValue('');
    let result: boolean = await sendEmail();
    if (result) {
      console.log('이메일 재발송 성공');
    } else {
      console.log('이메일 재발송 실패');
    }
    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    startResendOtpTimer();
  };
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [tryCnt, setTryCnt] = useState(5);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const onFocus = () => {
    setIsFocused(true);
  };

  const onFocusOut = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };
  //타이머 시작
  useEffect(() => {
    startResendOtpTimer();
    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{marginTop: 130, marginLeft: 24}}>
          <TwoLineTitle
            firstLineText="메일로 전송된"
            secondLineText="인증번호를 입력해주세요"
          />
        </View>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />

        {resendButtonDisabledTime > 0 ? (
          <></>
        ) : (
          <>
            {/* <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                zIndex: 999,
              }}
            /> */}
            <ModalBottom
              modalVisible={!modalVisible}
              setModalVisible={setModalVisible}
              modalText={`인증 시간이 초과되었습니다.`}
              modalBody=""
              modalButtonText="인증번호 다시 받기"
              modalButton
              modalButtonFunc={onResendOtpButtonPress}></ModalBottom>
          </>
        )}
        {parseInt(String(resendButtonDisabledTime / 60)) > 0 ? (
          parseInt(String(resendButtonDisabledTime % 60)) > 9 ? (
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>
                0{parseInt(String(resendButtonDisabledTime / 60))}:
                {parseInt(String(resendButtonDisabledTime % 60))}
              </Text>
            </View>
          ) : (
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>
                {parseInt(String(resendButtonDisabledTime / 60))}:0
                {parseInt(String(resendButtonDisabledTime % 60))}
              </Text>
            </View>
          )
        ) : parseInt(String(resendButtonDisabledTime % 60)) > 9 ? (
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              00:{parseInt(String(resendButtonDisabledTime % 60))}
            </Text>
          </View>
        ) : (
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              00:0{parseInt(String(resendButtonDisabledTime % 60))}
            </Text>
          </View>
        )}

        <Text style={styles.tryCnt}>남은 횟수 {tryCnt}/5</Text>
      </View>
      <ModalBottom
        modalVisible={modalInCorrectVisble}
        setModalVisible={setModalInCorrectVisible}
        modalText={`인증 번호가 틀렸습니다.`}
        modalBody=""
        modalButtonText="인증번호 다시 받기"
        modalButton
        modalButtonFunc={onResendOtpButtonPress}></ModalBottom>
      <View
        style={{
          paddingBottom: isFocused ? 0 : 15,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
        }}>
        {value.length === 6 && isFocused && (
          <PurpleFullButton
            text="인증하기"
            onClick={async () => {
              let result: boolean = await checkAuthNumber(value);
              if (result) {
                navigation.navigate('GlobalNavbar');
              } else {
                setModalInCorrectVisible(!modalInCorrectVisble);
              }
            }}></PurpleFullButton>
        )}
        {value.length === 6 && !isFocused && (
          <PurpleRoundButton
            text="인증하기"
            onClick={async () => {
              let result: boolean = await checkAuthNumber(value);
              if (result) {
                navigation.navigate('GlobalNavbar');
              } else {
                setModalInCorrectVisible(!modalInCorrectVisble);
              }
            }}></PurpleRoundButton>
        )}
        {value.length < 6 && isFocused && (
          <DisabledPurpleFullButton text="인증하기"></DisabledPurpleFullButton>
        )}
        {value.length < 6 && !isFocused && (
          <DisabledPurpleRoundButton text="인증하기"></DisabledPurpleRoundButton>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 40,
    width: '90%',
    marginLeft: 20,
    marginRight: 20,
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
  timerContainer: {
    marginTop: 32,
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
});
