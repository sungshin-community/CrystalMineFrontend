import React, {useState} from 'react';
import styled from 'styled-components';

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
} from 'react-native';

import {NormalOneLineText, Description} from '../../components/Top';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledPurpleFullButton,
  PurpleRoundButton,
} from '../../components/Button';

StatusBar.setBackgroundColor('white');
// StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const TextContainer = styled.View`
  margin: 130px 24px 52px 24px;
`;

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 2,
    borderColor: '#D7DCE6',
    flexDirection: 'row',
    alignItems: 'center',
    // textAlign: 'right'
  },
  suffix: {
    fontSize: 15,
    color: '#87919B',
    textAlign: 'right',
    // justifyContent: 'flex-end'
  },
});
type RootStackParamList = {
  SignUpPassword: {userId: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function SignUpID({navigation}: Props) {
  const [studentId, setStudentId] = useState<string>('');
  const [isFocused, setIsIdFocused] = useState<boolean>(false);

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
        keyboardVerticalOffset={Platform.OS == 'ios' ? 10 : 0}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={{width: Dimensions.get('window').width / 7 * 2, height: 4, backgroundColor: '#A055FF'}} />

        <Container>
          <ScrollView
            scrollEnabled={false}
            keyboardShouldPersistTaps="handled"
            style={{backgroundColor: '#fff'}}>
            <TextContainer>
              <NormalOneLineText>아이디를 입력해주세요</NormalOneLineText>
              <Description>
                학교에서 제공하는 성신 G-mail 계정을 사용합니다
              </Description>
            </TextContainer>
            <View
              style={{
                paddingRight: 24,
                paddingLeft: 24,
                marginTop: 12,
              }}>
              <View
                style={[
                  styles.inputContainer,
                  {borderColor: isFocused ? '#A055FF' : '#D7DCE6'},
                ]}>
                <TextInput
                  style={{
                    width: '60%',
                    fontSize: 21,
                  }}
                  onFocus={(e: any) => {
                    onIdFocus();
                  }}
                  onBlur={(e: any) => {
                    onIdFocusOut();
                  }}
                  onChangeText={(value: string) => {
                    setStudentId(value);
                  }}
                  maxLength={8}
                  placeholder="아이디"
                  keyboardType="number-pad"
                  selectionColor="#A055FF"
                />
                <Text style={styles.suffix}>@sungshin.ac.kr</Text>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              bottom: isFocused ? 80 : -10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {studentId.length === 8 && isFocused && (
              <PurpleFullButton
                text="다음"
                onClick={() => navigation.navigate('SignUpPassword', {
                  userId: studentId
                })}
              />
            )}

            {studentId.length === 8 && !isFocused && (
              <PurpleRoundButton
                text="다음"
                onClick={() => navigation.navigate('SignUpPassword', {
                  userId: studentId
                })}
              />
            )}

            {studentId.length < 8 && isFocused && (
              <DisabledPurpleFullButton text="다음" />
            )}

            {studentId.length < 8 && !isFocused && (
              <DisabledPurpleRoundButton text="다음" />
            )}
          </View>
        </Container>
      </KeyboardAvoidingView>
    </>
  ) : (
    <>
      <View style={{width: 107.14, height: 4, backgroundColor: '#A055FF'}} />

      <Container>
        <ScrollView
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          style={{backgroundColor: '#fff'}}>
          <TextContainer>
            <NormalOneLineText>아이디를 입력해주세요</NormalOneLineText>
            <Description>
              학교에서 제공하는 성신 G-mail 계정을 사용합니다
            </Description>
          </TextContainer>
          <View
            style={{
              paddingRight: 24,
              paddingLeft: 24,
              marginTop: 12,
            }}>
            <View
              style={[
                styles.inputContainer,
                {borderColor: isFocused ? '#A055FF' : '#D7DCE6'},
              ]}>
              <TextInput
                style={{
                  width: '60%',
                  fontSize: 21,
                }}
                onFocus={(e: any) => {
                  onIdFocus();
                }}
                onBlur={(e: any) => {
                  onIdFocusOut();
                }}
                onChangeText={(value: string) => {
                  setStudentId(value);
                }}
                maxLength={8}
                placeholder="아이디"
                keyboardType="number-pad"
                selectionColor="#A055FF"
              />
              <Text style={styles.suffix}>@sungshin.ac.kr</Text>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            bottom: isFocused ? 0 : 21,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {studentId.length === 8 && isFocused && (
            <PurpleFullButton
              text="다음"
              onClick={() => navigation.navigate('SignUpPassword', {
                userId: studentId
              })}
            />
          )}

          {studentId.length === 8 && !isFocused && (
            <PurpleRoundButton
              text="다음"
              onClick={() => navigation.navigate('SignUpPassword', {
                userId: studentId
              })}
            />
          )}

          {studentId.length < 8 && isFocused && (
            <DisabledPurpleFullButton text="다음" />
          )}

          {studentId.length < 8 && !isFocused && (
            <DisabledPurpleRoundButton text="다음" />
          )}
        </View>
      </Container>
    </>
  );
}
