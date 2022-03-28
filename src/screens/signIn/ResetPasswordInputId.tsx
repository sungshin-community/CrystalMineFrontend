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

import {
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledPurpleFullButton,
  PurpleRoundButton,
} from '../../components/Button';
import {ModalBottom} from '../../components/ModalBottom';
import {checkEmailConflict, checkBlackList, sendResetPasswordEmail} from '../../common/authApi';
import {SignUpQuestionMark} from '../../../resources/icon/QuestionMark';
import {fontRegular} from '../../common/font';
if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('white');
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const TextContainer = styled.View`
  margin: 55px 24px 52px 24px;
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
  ResetPasswordInputRegularMemberAuthNumber: {userId: string;};
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function ResetPasswordInputId({navigation, route}: Props) {
  const [studentId, setStudentId] = useState<string>('');
  const [isFocused, setIsIdFocused] = useState<boolean>(false);
  const [isNotExisted, setIsNotExisted] = useState<boolean>(false);
  const [isBlackList, setIsBlackList] = useState<boolean>(false);

  const onIdFocus = () => {
    setIsIdFocused(true);
  };

  const onIdFocusOut = () => {
    setIsIdFocused(false);
    Keyboard.dismiss();
  };
  return Platform.OS === 'ios' ? (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={10}
        behavior={'padding'}
        style={{flex: 1}}>
        <Container>
          <ScrollView
            scrollEnabled={false}
            keyboardShouldPersistTaps="handled"
            style={{backgroundColor: '#fff'}}>
            <TextContainer>
              <NormalOneLineText>비밀번호 재설정</NormalOneLineText>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Description style={{marginRight: 5.5}}>
                  수정광산에 가입하신 성신 G-mail 계정을 입력해 주세요.
                </Description>
              </View>
            </TextContainer>

            <View
              style={{
                paddingRight: 24,
                paddingLeft: 24,
              }}>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor:
                      isNotExisted || isBlackList
                        ? '#E64646'
                        : isFocused
                        ? '#A055FF'
                        : '#D7DCE6',
                  },
                ]}>
                <TextInput
                  style={{
                    width: '65%',
                    fontSize: 21,
                    fontFamily: 'SpoqaHanSansNeo-Regular',
                    paddingBottom: 7,
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
                  }}
                  placeholder="아이디"
                  keyboardType="ascii-capable"
                  selectionColor="#A055FF"
                  value={studentId}
                />
                <Text style={styles.suffix}>@sungshin.ac.kr</Text>
              </View>
              {isNotExisted && (
                <Text style={styles.errorMessage}>
                  아이디를 정확하게 입력해 주세요.
                </Text>
              )}
              {isBlackList && (
                <Text style={styles.errorMessage}>
                  접근이 불가능한 계정입니다.
                </Text>
              )}
            </View>
          </ScrollView>
          <View
            style={{
              bottom: isFocused ? 80 : 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {studentId.length > 0 && isFocused && (
              <PurpleFullButton
                text="다음"
                onClick={async () => {
                  let result: boolean = await checkEmailConflict(studentId);
                  let resultBlackList: boolean = await checkBlackList(
                    studentId,
                  );
                  if (result) {
                    setIsNotExisted(true);
                    return;
                  } else if (!resultBlackList) {
                    setIsBlackList(true);
                  }
                  let check: boolean = await sendResetPasswordEmail({username: studentId});
                  if (check) {
                    navigation.navigate('ResetPasswordInputRegularMemberAuthNumber', {
                    userId: studentId,
                  });
                  } else {
                    console.log('비밀번호 재설정 이메일 발송 실패');
                  }
                }}
              />
            )}

            {studentId.length > 0 && !isFocused && (
              <PurpleRoundButton
               text="다음"
                onClick={async () => {
                  let result: boolean = await checkEmailConflict(studentId);
                  let resultBlackList: boolean = await checkBlackList(
                    studentId,
                  );
                  if (result) {
                    setIsNotExisted(true);
                    return;
                  } else if (!resultBlackList) {
                    setIsBlackList(true);
                  }
                  let check: boolean = await sendResetPasswordEmail({username: studentId});
                  if (check) {
                    navigation.navigate('ResetPasswordInputRegularMemberAuthNumber', {
                    userId: studentId,
                  });
                  } else {
                    console.log('비밀번호 재설정 이메일 발송 실패');
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
        </Container>
      </KeyboardAvoidingView>
    </>
  ) : (
    <>
      <Container>
        <ScrollView
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          style={{backgroundColor: '#fff'}}>
          <TextContainer>
            <NormalOneLineText>비밀번호 재설정</NormalOneLineText>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Description style={{marginRight: 5.5}}>
                수정광산에 가입하신 성신 G-mail 계정을 입력해 주세요.
              </Description>
            
            </View>
          </TextContainer>

          <View
            style={{
              paddingHorizontal: 24,
            }}>
            <View
              style={[
                styles.inputContainer,
                {
                  borderColor:
                    isNotExisted || isBlackList
                      ? '#E64646'
                      : isFocused
                      ? '#A055FF'
                      : '#D7DCE6',
                },
              ]}>
              <TextInput
                style={{
                  width: '65%',
                  fontSize: 21,
                  fontFamily: 'SpoqaHanSansNeo-Regular',
                  paddingBottom: 7,
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
                }}
                placeholder="아이디"
                keyboardType="ascii-capable"
                selectionColor="#A055FF"
                value={studentId}
              />
              <Text style={styles.suffix}>@sungshin.ac.kr</Text>
            </View>
            {isNotExisted && (
              <Text style={styles.errorMessage}>
                아이디를 정확하게 입력해 주세요.
              </Text>
            )}
            {isBlackList && (
              <Text style={styles.errorMessage}>
                접근이 불가능한 계정입니다.
              </Text>
            )}
          </View>
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
                  let result: boolean = await checkEmailConflict(studentId);
                  let resultBlackList: boolean = await checkBlackList(
                    studentId,
                  );
                  if (result) {
                    setIsNotExisted(true);
                    return;
                  } else if (!resultBlackList) {
                    setIsBlackList(true);
                  }
                  let check: boolean = await sendResetPasswordEmail({username: studentId});
                  if (check) {
                    navigation.navigate('ResetPasswordInputRegularMemberAuthNumber', {
                    userId: studentId,
                  });
                  } else {
                    console.log('비밀번호 재설정 이메일 발송 실패');
                  }
                }}
              />
          )}

          {studentId.length > 0 && !isFocused && (
            <PurpleRoundButton
              text="다음"
                onClick={async () => {
                  let result: boolean = await checkEmailConflict(studentId);
                  let resultBlackList: boolean = await checkBlackList(
                    studentId,
                  );
                  if (result) {
                    setIsNotExisted(true);
                    return;
                  } else if (!resultBlackList) {
                    setIsBlackList(true);
                  }
                  let check: boolean = await sendResetPasswordEmail({username: studentId});
                  if (check) {
                    navigation.navigate('ResetPasswordInputRegularMemberAuthNumber', {
                    userId: studentId,
                  });
                  } else {
                    console.log('비밀번호 재설정 이메일 발송 실패');
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
      </Container>
    </>
  );
}
