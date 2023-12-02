/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  StatusBar,
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  KeyboardEvent,
} from 'react-native';
import {Description, NormalOneLineText} from '../../../../components/Top';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  DisabledPurpleFullButton,
  DisabledPurpleRoundButton,
  PurpleFullButton,
  PurpleRoundButton,
} from '../../../../components/Button';
import {applyQuitMembership, logout} from '../../../../common/authApi';

import PasswordShow from '../../../../../resources/icon/PasswordShow';
import PasswordNotShow from '../../../../../resources/icon/PasswordNotShow';
import {ModalBottom} from '../../../../components/ModalBottom';
import {checkPassword} from '../../../../common/myPageApi';
import {getHundredsDigit} from '../../../../common/util/statusUtil';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fontRegular} from '../../../../common/font';

if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('white');
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');
}

type RootStackParamList = {
  QuitComplete: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;
export default function QuitPassword({navigation}: Props) {
  const [password, setPassword] = useState<string>('');
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(true);
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const onPasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const onPasswordFocusOut = () => {
    setIsPasswordFocused(false);
    Keyboard.dismiss();
  };

  const letShowPassword = () => {
    setShowPassword(!showPassword);
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
        <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
          <View style={{marginLeft: 24}}>
            <NormalOneLineText style={{marginTop: 34}}>
              비밀번호를 입력해주세요
            </NormalOneLineText>
            <Description style={{marginTop: 7}}>
              본인 확인을 위해 비밀번호를 입력해주세요.
            </Description>
          </View>
          <View style={{paddingRight: 24, paddingLeft: 24, marginTop: 44}}>
            <View
              style={[
                styles.inputContainer,
                {
                  borderColor: isPasswordFocused
                    ? isPasswordCorrect
                      ? '#A055FF'
                      : '#E64646'
                    : '#D7DCE6',
                },
              ]}>
              <TextInput
                autoFocus={true}
                style={[
                  fontRegular,
                  {
                    fontSize: 21,
                    width: '90%',
                    paddingBottom: 7,
                    color: '#222222',
                  },
                ]}
                onFocus={() => {
                  onPasswordFocus();
                }}
                onBlur={() => {
                  onPasswordFocusOut();
                }}
                onChangeText={(value: string) => {
                  setPassword(value);
                  if (value.length > 0) {
                    setIsValidate(true);
                  } else {
                    setIsValidate(false);
                  }
                }}
                maxLength={25}
                placeholder="비밀번호"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                returnKeyType="done"
                selectionColor="#A055FF"
                value={password}
              />
              {showPassword ? (
                <PasswordShow onPress={letShowPassword} />
              ) : (
                <PasswordNotShow onPress={letShowPassword} />
              )}
            </View>
            {!isPasswordCorrect && (
              <Text style={styles.errorMessage}>
                비밀번호를 정확하게 입력해주세요.
              </Text>
            )}
          </View>
        </ScrollView>
        <View
          style={{
            bottom: isPasswordFocused
              ? Platform.OS == 'ios'
                ? keyboardHeight
                : 0
              : 34,
            backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isValidate && !isPasswordFocused && (
            <PurpleRoundButton
              text="탈퇴하기"
              onClick={() => setModalVisible(true)}
            />
          )}
          {isValidate && isPasswordFocused && (
            <PurpleFullButton
              text="탈퇴하기"
              onClick={async () => {
                const response = await checkPassword(password);
                console.log(response.data);
                if (response.status === 401) {
                  setTimeout(function () {
                    Toast.show(
                      '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                      Toast.SHORT,
                    );
                  }, 100);
                  logout();
                  navigation.reset({routes: [{name: 'SplashHome'}]});
                } else if (getHundredsDigit(response.status) === 2) {
                  setIsPasswordCorrect(true);
                  setModalVisible(true);
                } else if (response.data.code === 'PASSWORD_NOT_MATCH') {
                  setIsPasswordCorrect(false);
                } else {
                  setTimeout(function () {
                    Toast.show(
                      '알 수 없는 오류가 발생하였습니다.',
                      Toast.SHORT,
                    );
                  }, 100);
                }
              }}
            />
          )}
          {!isValidate && !isPasswordFocused && (
            <DisabledPurpleRoundButton text="탈퇴하기" />
          )}
          {!isValidate && isPasswordFocused && (
            <DisabledPurpleFullButton text="탈퇴하기" />
          )}
        </View>
      </KeyboardAvoidingView>
      <ModalBottom
        content="정말 탈퇴하시겠습니까?"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        purpleButtonText="네"
        purpleButtonFunc={async () => {
          setModalVisible(false);
          const response = await applyQuitMembership(password);
          AsyncStorage.setItem('accessToken', '');
          AsyncStorage.setItem('refreshToken', '');
          AsyncStorage.setItem('uuid', '');
          if (response.status === 401) {
            setTimeout(function () {
              Toast.show(
                '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                Toast.SHORT,
              );
            }, 100);
            logout();
            navigation.reset({routes: [{name: 'SplashHome'}]});
          } else if (getHundredsDigit(response.status) === 2) {
            navigation.reset({routes: [{name: 'QuitComplete'}]});
          } else if (response.data.code === 'PASSWORD_NOT_MATCH') {
            setIsPasswordCorrect(false);
          } else {
            setTimeout(function () {
              Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
            }, 100);
          }
        }}
        whiteButtonText="아니요"
        whiteButtonFunc={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 2,
    borderColor: '#D7DCE6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorMessage: {
    marginTop: 10,
    color: '#E64646',
    fontSize: 11,
  },
});
