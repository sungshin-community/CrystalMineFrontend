import React, {useState} from 'react';
import {
  Text,
  StatusBar,
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

import {Description, NormalOneLineText} from '../../components/Top';
import {
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledPurpleFullButton,
  PurpleRoundButton,
} from '../../components/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

{
  Platform.OS === 'android' && StatusBar.setBackgroundColor('white');
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');
}

const styles = StyleSheet.create({
  inputContainer: {
    fontSize: 21,
    borderBottomWidth: 2,
    borderColor: '#D7DCE6',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'SpoqaHanSansNeo-Regular',
    justifyContent: 'space-between',
  },
  suffix: {
    fontFamily: 'SpoqaHanSansNeo-Regular',
    fontSize: 15,
    color: '#87919B',
    textAlign: 'right',
    paddingBottom: 7,
  },
});

type RootStackParamList = {
  SignInPassword: {userId: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;
export default function SignInId({navigation}: Props) {
  const [studentId, setStudentId] = useState<string>('');
  const [isIdFocused, setIsIdFocused] = useState<boolean>(false);
  const onIdFocus = () => {
    setIsIdFocused(true);
  };

  const onIdFocusOut = () => {
    setIsIdFocused(false);
    Keyboard.dismiss();
  };

  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      keyboardVerticalOffset={10}
      behavior={'padding'}
      style={{flex: 1}}>
      <ScrollView
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        style={{backgroundColor: '#fff', flex: 1}}>
        <NormalOneLineText style={{marginLeft: 24, marginTop: 25}}>
          로그인
        </NormalOneLineText>
        <View>
          <Text style={{marginLeft: 24, marginTop: 47, color: '#A055FF'}}>
            아이디
          </Text>
          <View style={{paddingRight: 24, paddingLeft: 24, marginTop: 12}}>
            <View
              style={[
                styles.inputContainer,
                {borderColor: isIdFocused ? '#A055FF' : '#D7DCE6'},
              ]}>
              <TextInput
                style={{
                  width: '60%',
                  borderColor: '#ff0000',
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
                }}
                maxLength={8}
                placeholder="아이디"
                keyboardType="number-pad"
              />
              <Text style={styles.suffix}>@sungshin.ac.kr</Text>
            </View>
            <View style={{marginTop: 10}}>
              {/* <Description>존재하지 않는 아이디입니다</Description> */}
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          paddingBottom: isIdFocused ? 80 : 34,
          backgroundColor: '#FFFFFF',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {studentId.length === 8 && isIdFocused && (
          <PurpleFullButton
            text="다음"
            onClick={() =>
              navigation.navigate('SignInPassword', {
                userId: studentId,
              })
            }
          />
        )}

        {studentId.length === 8 && !isIdFocused && (
          <PurpleRoundButton
            text="다음"
            onClick={() =>
              navigation.navigate('SignInPassword', {
                userId: studentId,
              })
            }
          />
        )}

        {studentId.length < 8 && isIdFocused && (
          <DisabledPurpleFullButton text="다음" />
        )}

        {studentId.length < 8 && !isIdFocused && (
          <DisabledPurpleRoundButton text="다음" />
        )}
      </View>
    </KeyboardAvoidingView>
  ) : (
    <>
      <ScrollView
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        style={{backgroundColor: '#fff', flex: 1}}>
        <NormalOneLineText style={{marginLeft: 24, marginTop: 25}}>
          로그인
        </NormalOneLineText>
        <View>
          <Text style={{marginLeft: 24, marginTop: 47, color: '#A055FF'}}>
            아이디
          </Text>
          <View style={{paddingRight: 24, paddingLeft: 24, marginTop: 12}}>
            <View
              style={[
                styles.inputContainer,
                {borderColor: isIdFocused ? '#A055FF' : '#D7DCE6'},
              ]}>
              <TextInput
                style={{
                  width: '60%',
                  borderColor: '#ff0000',
                  fontSize: 21,
                  fontFamily: 'SpoqaHanSansNeo-Regular',
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
              />
              <Text style={styles.suffix}>@sungshin.ac.kr</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          paddingBottom: isIdFocused ? 0 : 21,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
        }}>
        {studentId.length === 8 && isIdFocused && (
          <PurpleFullButton
            text="다음"
            onClick={() =>
              navigation.navigate('SignInPassword', {
                userId: studentId,
              })
            }
          />
        )}

        {studentId.length === 8 && !isIdFocused && (
          <PurpleRoundButton
            text="다음"
            onClick={() =>
              navigation.navigate('SignInPassword', {
                userId: studentId,
              })
            }
          />
        )}

        {studentId.length < 8 && isIdFocused && (
          <DisabledPurpleFullButton text="다음" />
        )}

        {studentId.length < 8 && !isIdFocused && (
          <DisabledPurpleRoundButton text="다음" />
        )}
      </View>
    </>
  );
}
