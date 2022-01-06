import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View ,TouchableOpacity, StyleSheet} from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 
'react-native-confirmation-code-field';
import {TwoLineTitle} from '../../components/Top';
import styled from 'styled-components';
import CountDownTimer from '../../components/CountDownTimer';
import AuthInput from '../../components/AuthInput';


const styles = StyleSheet.create({
  root: {
      flex: 1,
      padding: 20,
      alignContent: 'center',
      justifyContent: 'center'
  },
  title: {
      textAlign: 'left',
      fontSize: 20,
      marginStart: 20,
      fontWeight:'bold'
  },
  subTitle: {
      textAlign: 'left',
      fontSize: 16,
      marginStart: 20,
      marginTop: 10
  },
  codeFieldRoot: {
      marginTop: 40,
      width: '90%',
      marginLeft: 20,
      marginRight: 20,
  },
  cellRoot: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
   },
   cellText: {
      color: '#000',
      fontSize: 28,
      textAlign: 'center',
  },
  focusCell: {
      borderBottomColor: '#007AFF',
      borderBottomWidth: 2,
  },
  
  button: {
      marginTop: 20
  },
  resendCode: {
      color: '#00FF00',
      marginStart: 20,
      marginTop: 40,
  },
  resendCodeText: {
      marginStart: 20,
      marginTop: 40,
  },
  resendCodeContainer: {
      flexDirection: 'row',
      alignItems: 'center'
  }
  })

interface VerifyCodeProps {
}
const CELL_COUNT = 6;
const RESEND_OTP_TIME_LIMIT = 90;

const RegularMemberAuth: React.FC<VerifyCodeProps> = () => {
    let resendOtpTimerInterval: any;

    const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
        RESEND_OTP_TIME_LIMIT,
    );

    //시작
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
    const onResendOtpButtonPress = () => {

        setValue('')
        setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
        startResendOtpTimer();

        //인증번호 API 다시 호출
        console.log('todo: Resend OTP');
    };

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

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
        <SafeAreaView style={styles.root}>
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
                renderCell={({ index, symbol, isFocused }) => (
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
                <Text style={styles.resendCodeText}>{resendButtonDisabledTime}</Text>
            ) : (
                    <TouchableOpacity
                        onPress={onResendOtpButtonPress}>
                        <View style={styles.resendCodeContainer}>
                            <Text style={styles.resendCode}>재시도 인증번호</Text>
                            <Text style={{ marginTop: 40 }}>{resendButtonDisabledTime}</Text>
                        </View>
                    </TouchableOpacity >
                )
            }
            <View style={styles.button}>
                <Button buttonTitle="Submit"
                    onClick={() =>
                        console.log("otp is ", value)
                    } />
            </View>
        </SafeAreaView >
    );
}
export default RegularMemberAuth;
