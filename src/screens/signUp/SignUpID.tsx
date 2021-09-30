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
} from 'react-native';

import {NormalOneLineText, Description} from '../../components/Top';
import {MiddleActiveInputID} from '../../components/Input';
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
    fontSize: 21,
    borderBottomWidth: 2,
    borderColor: '#D7DCE6',
    flexDirection: 'row',
    alignItems: 'center',
    // textAlign: 'right'
  },
  suffix: {
    fontSize: 15,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: '#87919B',
    textAlign: 'right',
    // justifyContent: 'flex-end'
  },
});
type RootStackParamList = {
  SignUpPassword: undefined;
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

  return (
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
        <View style={{paddingRight: 24, paddingLeft: 24, marginTop: 12}}>
          <View style={styles.inputContainer}>
            <TextInput
              style={{
                width: '60%',
                borderColor: isFocused ? '#A055FF' : '#D7DCE6',
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
            onClick={() => navigation.navigate('SignUpPassword')}
          />
        )}

        {studentId.length === 8 && !isFocused && (
          <PurpleRoundButton
            text="다음"
            onClick={() => navigation.navigate('SignUpPassword')}
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
