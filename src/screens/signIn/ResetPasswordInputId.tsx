/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import styled from 'styled-components/native';

import {
  View,
  TextInput,
  Text,
  StyleSheet,
  StatusBar,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

import {NormalOneLineText, Description} from '../../components/Top';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Toast from 'react-native-simple-toast';
import {
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledPurpleFullButton,
  PurpleRoundButton,
} from '../../components/Button';
import {ModalBottom} from '../../components/ModalBottom';
import {sendResetPasswordEmail} from '../../common/authApi';
import {SignUpQuestionMark} from '../../../resources/icon/QuestionMark';
import {fontRegular} from '../../common/font';
import {getHundredsDigit} from '../../common/util/statusUtil';

if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('white');
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');
}

const MiddleInputContainerStyle = styled.View`
  border-bottom-width: 2px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TextContainer = styled.View`
  margin: 55px 0px 52px 0px;
`;

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 2,
    borderColor: '#D7DCE6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  suffix: {
    fontSize: 15,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    color: '#87919B',
    textAlign: 'right',
    paddingBottom: Platform.OS === 'ios' ? 7 : 0,
  },
  errorMessage: {
    marginTop: 10,
    color: '#E64646',
    fontSize: 11,
  },
  greyText: {
    color: '#87919B',
    fontSize: 13,
    lineHeight: 18.2,
  },
  blackText: {
    color: '#222222',
    fontSize: 13,
    lineHeight: 18.2,
  },
  number: {
    marginRight: 9,
    fontSize: 13,
  },
  paragraph: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
});
type RootStackParamList = {
  ResetPasswordInputRegularMemberAuthNumber: {userId: string};
  SplashHome: undefined;
  ErrorScreen: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function ResetPasswordInputId({navigation, route}: Props) {
  const [studentId, setStudentId] = useState<string>('');
  const [isFocused, setIsIdFocused] = useState<boolean>(false);
  const [isNotExisted, setIsNotExisted] = useState<boolean>(false);
  const [isBlackList, setIsBlackList] = useState<boolean>(false);
  const [isCoolTime, setIsCoolTime] = useState<boolean>(false);

  const onIdFocus = () => {
    setIsIdFocused(true);
  };

  const onIdFocusOut = () => {
    setIsIdFocused(false);
    Keyboard.dismiss();
  };
  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={90}
        behavior={Platform.select({ios: 'padding'})}
        style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={{flex: 1, paddingHorizontal: 24}}>
          <TextContainer>
            <NormalOneLineText>비밀번호 재설정</NormalOneLineText>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Description style={{marginRight: 5.5}}>
                수정광산에 가입하신 성신 G-mail 계정을 입력해 주세요.
              </Description>
            </View>
          </TextContainer>
          <MiddleInputContainerStyle
            style={{
              borderColor:
                isNotExisted || isBlackList
                  ? '#E64646'
                  : isFocused
                  ? '#A055FF'
                  : '#D7DCE6',
            }}>
            <TextInput
              autoFocus={Platform.OS === 'ios' ? false : true}
              style={{
                width: '65%',
                fontSize: 21,
                fontFamily: 'SpoqaHanSansNeo-Regular',
                paddingBottom: 7,
                color: '#222222',
              }}
              onFocus={(e: any) => {
                onIdFocus();
              }}
              onBlur={(e: any) => {
                onIdFocusOut();
              }}
              onChangeText={(value: string) => {
                setStudentId(value);
                setIsNotExisted(false);
                if (value.length === 40)
                  Toast.show('학번을 정확하게 입력하여 주세요.', Toast.SHORT);
              }}
              placeholder="아이디"
              placeholderTextColor='#A0AAB4'
              keyboardType="ascii-capable"
              selectionColor="#A055FF"
              value={studentId}
              maxLength={40}
            />
            <Text style={styles.suffix}>@sungshin.ac.kr</Text>
          </MiddleInputContainerStyle>
            <Text style={styles.errorMessage}>
              {isNotExisted
                ? '아이디를 정확하게 입력해 주세요.'
                : isBlackList
                ? '접근이 불가능한 계정입니다.'
                : ''}
            </Text>
        </ScrollView>

        <View
          style={{
            bottom: isFocused ? 0 : 34,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {studentId.length > 0 && isFocused && (
            <PurpleFullButton
              text="다음"
              onClick={async () => {
                let check = await sendResetPasswordEmail({
                  username: studentId,
                });
                if (check.status === 401) {
                  navigation.navigate('SplashHome');
                } else if (getHundredsDigit(check.status) === 2) {
                  Toast.show('메일을 성공적으로 전송했습니다.', Toast.SHORT);
                  navigation.navigate(
                    'ResetPasswordInputRegularMemberAuthNumber',
                    {
                      userId: studentId,
                    },
                  );
                } else if (check.data.code === 'ACCOUNT_NOT_FOUND') {
                  setIsNotExisted(true);
                } else if (check.data.code === 'BLACKLIST_MEMBER') {
                  setIsBlackList(true);
                } else if (check.data.code === 'AUTH_COOL_TIME_LIMIT') {
                  setIsCoolTime(true);
                  navigation.navigate('SplashHome');
                } else {
                  navigation.navigate('ErrorScreen');
                }
              }}
            />
          )}

          {studentId.length > 0 && !isFocused && (
            <PurpleRoundButton
              text="다음"
              onClick={async () => {
                let check = await sendResetPasswordEmail({
                  username: studentId,
                });
                if (check.status === 401) {
                  navigation.navigate('SplashHome');
                } else if (getHundredsDigit(check.status) === 2) {
                  Toast.show('메일을 성공적으로 전송했습니다.', Toast.SHORT);
                  navigation.navigate(
                    'ResetPasswordInputRegularMemberAuthNumber',
                    {
                      userId: studentId,
                    },
                  );
                } else if (check.data.code === 'ACCOUNT_NOT_FOUND') {
                  setIsNotExisted(true);
                } else if (check.data.code === 'BLACKLIST_MEMBER') {
                  setIsBlackList(true);
                } else if (check.data.code === 'AUTH_COOL_TIME_LIMIT') {
                  setIsCoolTime(true);
                  navigation.navigate('SplashHome');
                } else {
                  navigation.navigate('ErrorScreen');
                }
              }}
            />
          )}

          {studentId.length === 0 && isFocused && (
            <DisabledPurpleFullButton text="다음" />
          )}

          {studentId.length === 0 && !isFocused && (
            <DisabledPurpleRoundButton text="다음" />
          )}
        </View>
      </KeyboardAvoidingView>
      {isCoolTime && (
        <ModalBottom
          modalVisible={isCoolTime}
          setModalVisible={setIsCoolTime}
          content={`이전에 시도하신 인증이 실패하여,\n5분 뒤부터 재인증이 가능합니다.`}
          purpleButtonText="확인"
          purpleButtonFunc={navigation.navigate('SplashHome')}></ModalBottom>
      )}
    </>
  );
}
