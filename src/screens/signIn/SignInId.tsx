import React, {useEffect, useState} from 'react';
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
  KeyboardEvent,
} from 'react-native';
import {Description, NormalOneLineText} from '../../components/Top';
import {
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledPurpleFullButton,
  PurpleRoundButton,
} from '../../components/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Toast from 'react-native-simple-toast';
import styled from 'styled-components/native';

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
    paddingBottom: Platform.OS === 'ios' ? 7 : 0,
  },
});

type RootStackParamList = {
  SplashHome: undefined;
  SignInPassword: {userId: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;
export default function SignInId({navigation}: Props) {
  const [studentId, setStudentId] = useState<string>('');
  const [isIdFocused, setIsIdFocused] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const onIdFocus = () => {
    setIsIdFocused(true);
  };

  const onIdFocusOut = () => {
    setIsIdFocused(false);
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

  return (
    <>
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={{flex: 1, paddingHorizontal: 24}}>
          <NormalOneLineText style={{marginTop: 25}}>로그인</NormalOneLineText>
          <View>
            <Text style={{marginTop: 47, color: '#A055FF'}}>아이디</Text>
            <View style={{marginTop: 12}}>
              <MiddleInputContainerStyle
                style={{borderColor: isIdFocused ? '#A055FF' : '#D7DCE6'}}>
                <TextInput
                  autoFocus={true}
                  style={{
                    width: '60%',
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
                    if (value.length === 40)
                      Toast.show(
                        '학번을 정확하게 입력하여 주세요.',
                        Toast.SHORT,
                      );
                  }}
                  placeholder="아이디"
                  placeholderTextColor="#A0AAB4"
                  keyboardType="number-pad"
                  value={studentId}
                  maxLength={40}
                />
                <Text style={styles.suffix}>@sungshin.ac.kr</Text>

                <View style={{marginTop: 10}}>
                  {/* <Description>존재하지 않는 아이디입니다</Description> */}
                </View>
              </MiddleInputContainerStyle>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            bottom: isIdFocused
              ? Platform.OS == 'ios'
                ? keyboardHeight
                : 0
              : 34,
            backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {studentId.length > 0 && isIdFocused && (
            <PurpleFullButton
              text="다음"
              onClick={() =>
                navigation.navigate('SignInPassword', {
                  userId: studentId,
                })
              }
            />
          )}
          {studentId.length > 0 && !isIdFocused && (
            <PurpleRoundButton
              text="다음"
              onClick={() =>
                navigation.navigate('SignInPassword', {
                  userId: studentId,
                })
              }
            />
          )}
          {studentId.length === 0 && isIdFocused && (
            <DisabledPurpleFullButton text="다음" />
          )}
          {studentId.length === 0 && !isIdFocused && (
            <DisabledPurpleRoundButton text="다음" />
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
