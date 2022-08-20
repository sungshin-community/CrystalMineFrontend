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
  Pressable,
  KeyboardEvent
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
import {checkEmailConflict} from '../../common/authApi';
import {SignUpQuestionMark} from '../../../resources/icon/QuestionMark';
import {fontRegular} from '../../common/font';
import {getHundredsDigit} from '../../common/util/statusUtil';
import Toast from 'react-native-simple-toast';
import { useEffect } from 'react';
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
  margin: 55px 0px 52px 0px;
`;
const MiddleInputContainerStyle = styled.View`
  border-bottom-width: 2px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
  MailVerificationMethodGuide: undefined;
  CreateMailGuide: undefined;
  ErrorScreen: undefined;
  SplashHome: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function SignUpId({navigation, route}: Props) {
  const [studentId, setStudentId] = useState<string>('');
  const [isFocused, setIsIdFocused] = useState<boolean>(false);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const [isBlackList, setIsBlackList] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const onIdFocus = () => {
    setIsIdFocused(true);
  };

  const onIdFocusOut = () => {
    setIsIdFocused(false);
    Keyboard.dismiss();
  };
 
  const onKeyboardDidshow = (e: KeyboardEvent) => {
    setKeyboardHeight(e.endCoordinates.height)
  }
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidshow);
      return () => {
        showSubscription.remove();
    }
  }, [])
  console.log('keyboardHeight', keyboardHeight);

  return (
    <>
      <View
        style={{
          width: (Dimensions.get('window').width / 7) * 2,
          height: 4,
          backgroundColor: '#A055FF',
        }}
      />
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        // behavior={Platform.select({ios: 'padding'})}
        style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={{flex: 1, paddingHorizontal: 24}}>
          <TextContainer>
            <NormalOneLineText>아이디를 입력해주세요</NormalOneLineText>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Description style={{marginRight: 5.5}}>
                학번으로 이루어진 성신 G-mail 계정을 사용합니다.
              </Description>
              <Pressable onPress={() => navigation.navigate('CreateMailGuide')}>
                <SignUpQuestionMark />
              </Pressable>
            </View>
          </TextContainer>

          <MiddleInputContainerStyle
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
                setIsDuplicate(false);
                if (value.length === 40)
                  Toast.show('학번을 정확하게 입력하여 주세요.', Toast.SHORT);
              }}
              placeholder="아이디"
              placeholderTextColor='#A0AAB4'
              keyboardType="number-pad"
              selectionColor="#A055FF"
              value={studentId}
              maxLength={40}
            />
            <Text style={styles.suffix}>@sungshin.ac.kr</Text>
          </MiddleInputContainerStyle>

          <Text style={styles.errorMessage}>
            {isDuplicate
              ? '이미 가입되어 있는 계정입니다.'
              : isBlackList
              ? '가입이 불가능한 계정입니다.'
              : ''}
          </Text>
        </ScrollView>

        <View
          style={{
            bottom: isFocused ? (Platform.OS == 'ios' ? keyboardHeight : 0) : 34,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {studentId.length > 0 && isFocused && (
            <PurpleFullButton
              text="다음"
              onClick={async () => {
                let result = await checkEmailConflict(studentId);
                if (result.status === 401) {
                  navigation.navigate('SplashHome');
                } else if (getHundredsDigit(result.status) === 2) {
                  navigation.navigate('SignUpPassword', {
                    userId: studentId,
                    agreementIds: route.params.agreementIds,
                  });
                } else if (result.data.code === 'EMAIL_DUPLICATION') {
                  setIsDuplicate(true);
                } else if (
                  result.data.code === 'BLACKLIST_MEMBER' ||
                  result.data.code === 'HOLDING_WITHDRAWAL'
                ) {
                  setIsBlackList(true);
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
                let result = await checkEmailConflict(studentId);
                if (result.status === 401) {
                  navigation.navigate('SplashHome');
                } else if (getHundredsDigit(result.status) === 2) {
                  navigation.navigate('SignUpPassword', {
                    userId: studentId,
                    agreementIds: route.params.agreementIds,
                  });
                } else if (result.data.code === 'EMAIL_DUPLICATION') {
                  setIsDuplicate(true);
                } else if (
                  result.data.code === 'BLACKLIST_MEMBER' ||
                  result.data.code === 'HOLDING_WITHDRAWAL'
                ) {
                  setIsBlackList(true);
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
    </>
  );
}
