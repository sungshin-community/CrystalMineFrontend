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
import {checkEmailConflict, checkBlackList} from '../../common/authApi';
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
  SignUpPassword: {userId: string; agreementIds: number[]};
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function ResetPasswordInputId({navigation, route}: Props) {
  const [studentId, setStudentId] = useState<string>('');
  const [isFocused, setIsIdFocused] = useState<boolean>(false);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const [isBlackList, setIsBlackList] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onIdFocus = () => {
    setIsIdFocused(true);
  };

  const onIdFocusOut = () => {
    setIsIdFocused(false);
    Keyboard.dismiss();
  };
  return Platform.OS === 'ios' ? (
    <>
      {modalVisible && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
        />
      )}
      <KeyboardAvoidingView
        keyboardVerticalOffset={10}
        behavior={'padding'}
        style={{flex: 1}}>
        <View
          style={{
            width: (Dimensions.get('window').width / 7) * 2,
            height: 4,
            backgroundColor: '#A055FF',
          }}
        />
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
                      isDuplicate || isBlackList
                        ? '#ff0000'
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
                    setIsDuplicate(false);
                  }}
                  placeholder="아이디"
                  keyboardType="ascii-capable"
                  selectionColor="#A055FF"
                  value={studentId}
                />
                <Text style={styles.suffix}>@sungshin.ac.kr</Text>
              </View>
              {isDuplicate && (
                <Text style={styles.errorMessage}>
                  이미 가입되어 있는 계정입니다.
                </Text>
              )}
              {isBlackList && (
                <Text style={styles.errorMessage}>
                  가입이 불가능한 계정입니다.
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
                  if (!result) {
                    setIsDuplicate(true);
                    return;
                  } else if (!resultBlackList) {
                    setIsBlackList(true);
                  }
                  navigation.navigate('SignUpPassword', {
                    userId: studentId,
                    agreementIds: route.params.agreementIds,
                  });
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
                  if (!result) {
                    setIsDuplicate(true);
                    return;
                  } else if (!resultBlackList) {
                    setIsBlackList(true);
                  }
                  navigation.navigate('SignUpPassword', {
                    userId: studentId,
                    agreementIds: route.params.agreementIds,
                  });
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
      {modalVisible && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
        />
      )}
      <View
        style={{
          width: (Dimensions.get('window').width / 7) * 2,
          height: 4,
          backgroundColor: '#A055FF',
        }}
      />
      <Container>
        <ScrollView
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          style={{backgroundColor: '#fff'}}>
          <TextContainer>
            <NormalOneLineText>아이디를 입력해주세요</NormalOneLineText>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Description style={{marginRight: 5.5}}>
                학교에서 제공하는 성신 G-mail 계정을 사용합니다
              </Description>
              <ModalBottom
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                modalText={`학교 G-mail 계정 생성 방법`}
                fontSize={17}
                modalBody={modalBody}
                modalButtonText="확인"
                modalButton={<SignUpQuestionMark />}
                modalButtonFunc={() => setModalVisible(!modalVisible)}
              />
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
                    isDuplicate || isBlackList
                      ? '#ff0000'
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
                  setIsDuplicate(false);
                }}
                placeholder="아이디"
                keyboardType="ascii-capable"
                selectionColor="#A055FF"
                value={studentId}
              />
              <Text style={styles.suffix}>@sungshin.ac.kr</Text>
            </View>
            {isDuplicate && (
              <Text style={styles.errorMessage}>
                이미 가입되어 있는 계정입니다.
              </Text>
            )}
            {isBlackList && (
              <Text style={styles.errorMessage}>
                가입이 불가능한 계정입니다.
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
                let resultBlackList: boolean = await checkBlackList(studentId);
                if (!result) {
                  setIsDuplicate(true);
                  return;
                } else if (!resultBlackList) {
                  setIsBlackList(true);
                }
                navigation.navigate('SignUpPassword', {
                  userId: studentId,
                  agreementIds: route.params.agreementIds,
                });
              }}
            />
          )}

          {studentId.length > 0 && !isFocused && (
            <PurpleRoundButton
              text="다음"
              onClick={async () => {
                let result: boolean = await checkEmailConflict(studentId);
                let resultBlackList: boolean = await checkBlackList(studentId);
                if (!result) {
                  setIsDuplicate(true);
                  return;
                } else if (!resultBlackList) {
                  setIsBlackList(true);
                }
                navigation.navigate('SignUpPassword', {
                  userId: studentId,
                  agreementIds: route.params.agreementIds,
                });
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
