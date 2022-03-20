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
    color: '#797979',
    lineHeight: 25,
  },
});
type RootStackParamList = {
  SignUpPassword: {userId: string; agreementIds: number[]};
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function SignUpId({navigation, route}: Props) {
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
  const modalBody = (
    <>
      <Text style={styles.greyText}>1. 학과 리스트에서 </Text>
      <Text>임의 학과 선택 후 가입{'\n'}</Text>
      <Text style={styles.greyText}>2. 문의하기를 통해 </Text>
      <Text>학과 추가 요청{'\n'}</Text>
      <Text style={styles.greyText}>
        3. 학과 추가 안내를 받은 후, 마이페이지에서{'\n'}
      </Text>
      <Text>{'     '}학과 변경 진행</Text>
    </>
  );
  return Platform.OS === 'ios' ? (
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
            <NormalOneLineText>아이디를 입력해주세요</NormalOneLineText>
            <View style={{flexDirection: 'row'}}>
              <Description>
                학교에서 제공하는 성신 G-mail 계정을 사용합니다
              </Description>
              <ModalBottom
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                modalText={`학교 G-mail 계정 생성 방법`}
                modalBody={modalBody}
                modalButtonText="확인"
                modalButton={
                  <View style={{paddingTop: 3, marginLeft: 5}}>
                    <SignUpQuestionMark />
                  </View>
                }
                modalButtonFunc={() => setModalVisible(!modalVisible)}
              />
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
    </KeyboardAvoidingView>
  ) : (
    <>
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
            <View style={{flexDirection: 'row'}}>
              <Description>
                학교에서 제공하는 성신 G-mail 계정을 사용합니다
              </Description>
              <ModalBottom
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                modalText={`학교 G-mail 계정 생성 방법`}
                modalBody={modalBody}
                modalButtonText="확인"
                modalButton={
                  <View style={{paddingTop: 3, marginLeft: 5}}>
                    <SignUpQuestionMark />
                  </View>
                }
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
