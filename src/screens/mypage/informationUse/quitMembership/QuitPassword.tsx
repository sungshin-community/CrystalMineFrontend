/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
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
} from 'react-native';
import {Description, NormalOneLineText} from '../../../../components/Top';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  DisabledPurpleFullButton,
  DisabledPurpleRoundButton,
  PurpleFullButton,
  PurpleRoundButton,
} from '../../../../components/Button';
import {applyQuitMembership} from '../../../../common/authApi';

import PasswordShow from '../../../../../resources/icon/PasswordShow';
import PasswordNotShow from '../../../../../resources/icon/PasswordNotShow';
import {ModalBottom} from '../../../../components/ModalBottom';

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

  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      keyboardVerticalOffset={10}
      behavior={'padding'}
      style={{flex: 1}}>
      <ScrollView
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        style={{backgroundColor: '#fff'}}>
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
              style={{
                fontSize: 21,
                width: '90%',
                fontFamily: 'SpoqaHanSansNeo-Regular',
                paddingBottom: 7,
                color: '#222222'
              }}
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
        style={
          isPasswordFocused
            ? {
                paddingBottom: 91,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
              }
            : {
                paddingBottom: 21,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
              }
        }>
        {isValidate && !isPasswordFocused && (
          <PurpleRoundButton
            text="탈퇴하기"
            onClick={() => setModalVisible(true)}
          />
        )}
        {isValidate && isPasswordFocused && (
          <PurpleFullButton
            text="탈퇴하기"
            onClick={() => setModalVisible(true)}
          />
        )}
        {modalVisible && (
          <ModalBottom
            content="정말 탈퇴하시겠습니까?"
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            purpleButtonText="네"
            purpleButtonFunc={async () => {
              let result: boolean = await applyQuitMembership(password);
              setModalVisible(false);
              if (result) {
                navigation.navigate('QuitComplete');
              } else {
                setIsPasswordCorrect(false);
              }
            }}
            whiteButtonText="아니요"
            whiteButtonFunc={() => setModalVisible(false)}
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
  ) : (
    <>
      <ScrollView
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        style={{backgroundColor: '#fff'}}>
        <View style={{marginLeft: 24}}>
          <NormalOneLineText style={{marginTop: 34}}>
            비밀번호를 입력해 주세요
          </NormalOneLineText>
          <Description style={{marginTop: 7}}>
            본인 확인을 위해 비밀번호를 입력해주세요.
          </Description>
        </View>
        <View>
          <View style={{paddingRight: 24, paddingLeft: 24, marginTop: 12}}>
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
                style={{
                  fontFamily: 'SpoqaHanSansNeo-Regular',
                  fontSize: 21,
                  width: '90%',
                  color: '#222222'
                }}
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
        </View>
      </ScrollView>
      <View
        style={{
          paddingBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
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
            onClick={() => setModalVisible(true)}
          />
        )}
        {modalVisible && (
          <ModalBottom
            content="정말 탈퇴하시겠습니까?"
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            purpleButtonText="네"
            purpleButtonFunc={async () => {
              let result: boolean = await applyQuitMembership(password);
              if (result) {
                navigation.navigate('QuitComplete');
              } else {
                setModalVisible(false);
                setIsPasswordCorrect(false);
              }
            }}
            whiteButtonText="아니요"
            whiteButtonFunc={() => setModalVisible(false)}
          />
        )}
        {!isValidate && !isPasswordFocused && (
          <DisabledPurpleRoundButton text="탈퇴하기" />
        )}
        {!isValidate && isPasswordFocused && (
          <DisabledPurpleFullButton text="탈퇴하기" />
        )}
      </View>
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
