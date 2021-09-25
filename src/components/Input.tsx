import React, {useState} from 'react';
import styled from 'styled-components';
import {View, Text, TextInput, Keyboard, ScrollView} from 'react-native';
import {
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledPurpleFullButton,
  PurpleRoundButton,
} from './Button';

const MiddleFocusInputStyle = styled.TextInput`
  width: 100%;
  height: 45px;
  margin: 3px 0;
  border-bottom-color: #a055ff;
  border-bottom-width: 2px;
  font-size: 21px;
  color: #000000;
`;

const MiddleErrorInputStyle = styled.TextInput`
  width: 100%;
  height: 45px;
  margin: 3px 0;
  border-bottom-color: #e64646;
  border-bottom-width: 2px;
  font-size: 21px;
  color: #000000;
`;

const MiddleInactiveInputStyle = styled.TextInput`
  width: 100%;
  height: 45px;
  margin: 3px 0;
  border-bottom-color: #d7dce6;
  border-bottom-width: 2px;
  font-size: 21px;
  color: #000000;
`;

const BigFocusInputStyle = styled.TextInput`
  width: 100%;
  height: 52px;
  margin: 3px 0;
  border-bottom-color: #a055ff;
  border-bottom-width: 2px;
  font-size: 27px;
  color: #000000;
`;

const BigErrorInputStyle = styled.TextInput`
  width: 100%;
  height: 52px;
  margin: 3px 0;
  border-bottom-color: #e64646;
  border-bottom-width: 2px;
  font-size: 27px;
  color: #000000;
`;

const BigInactiveInputStyle = styled.TextInput`
  width: 100%;
  height: 52px;
  margin: 3px 0;
  border-bottom-color: #d7dce6;
  border-bottom-width: 2px;
  font-size: 27px;
  color: #000000;
`;

const HelpTextStyle = styled.Text`
  font-size: 11px;
  font-weight: 400;
  color: #87919b;
  margin: 10px 0;
`;

const CautionTextStyle = styled.Text`
  font-size: 11px;
  font-weight: 400;
  color: #e64646;
  margin: 10px 0;
`;

const MiddleInputContainerStyle = styled.View`
  font-size: 21px;
  border-bottom-width: 2px;
  flex-direction: row;
  align-items: center;
`;

interface Props {
  placeholder: string;
  title: string;
  maxLength: number;
  keyboardType: any;
  suffix: string;
}

export const MiddleActiveInputID = ({
  placeholder,
  maxLength,
  keyboardType,
  suffix,
}: Props) => {
  const [studentId, setStudentId] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputFocusOut = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };
  return (
    <>
      <ScrollView
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        style={{backgroundColor: '#fff', marginHorizontal: 24}}>
        <MiddleInputContainerStyle
          style={{
            borderColor: isFocused ? '#A055FF' : '#D7DCE6',
          }}>
          <TextInput
            style={{width: '60%'}}
            onFocus={(e: any) => {
              onInputFocus();
            }}
            onBlur={(e: any) => {
              onInputFocusOut();
            }}
            onChangeText={(value: string) => {
              setStudentId(value);
            }}
            maxLength={maxLength}
            placeholder={placeholder}
            placeholderTextColor="#A0AAB4"
            keyboardType={keyboardType}
          />
          <Text
            style={{
              fontSize: 15,
              paddingLeft: 10,
              color: '#87919B',
              textAlign: 'right',
            }}>
            {suffix}
          </Text>
        </MiddleInputContainerStyle>
      </ScrollView>
      <View
        style={{
          bottom: isFocused ? 0 : 21,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {studentId.length === 8 && isFocused && (
          <PurpleFullButton text="다음" />
        )}

        {studentId.length === 8 && !isFocused && (
          <PurpleRoundButton text="다음" />
        )}

        {studentId.length < 8 && isFocused && (
          <DisabledPurpleFullButton text="다음" />
        )}

        {studentId.length < 8 && !isFocused && (
          <DisabledPurpleRoundButton text="다음" />
        )}
      </View>
    </>
  );
};

export const MiddleActiveInputPassword = ({
  placeholder,
  maxLength,
  keyboardType,
}: Props) => {
  const [password, setPassword] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputFocusOut = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };
  return (
    <>
      <ScrollView
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        style={{backgroundColor: '#fff', marginHorizontal: 24}}>
        <MiddleInputContainerStyle
          style={{
            borderColor: isFocused ? '#A055FF' : '#D7DCE6',
          }}>
          <TextInput
            style={{width: '60%'}}
            onFocus={(e: any) => {
              onInputFocus();
            }}
            onBlur={(e: any) => {
              onInputFocusOut();
            }}
            onChangeText={(value: string) => {
              setPassword(value);
            }}
            maxLength={maxLength}
            placeholder={placeholder}
            placeholderTextColor="#A0AAB4"
            keyboardType={keyboardType}
            secureTextEntry={true}
          />
        </MiddleInputContainerStyle>
      </ScrollView>
      <View
        style={{
          bottom: isFocused ? 0 : 21,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {password.length >= 10 && password.length <= 25 && isFocused && (
          <PurpleFullButton text="다음" />
        )}

        {password.length >= 10 && password.length <= 25 && !isFocused && (
          <PurpleRoundButton text="다음" />
        )}

        {password.length < 10 && isFocused && (
          <DisabledPurpleFullButton text="다음" />
        )}

        {password.length < 10 && !isFocused && (
          <DisabledPurpleRoundButton text="다음" />
        )}
      </View>
    </>
  );
};

export const MiddleActiveInputNickname = ({
  placeholder,
  keyboardType,
}: Props) => {
  const [nickname, setNickname] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputFocusOut = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };
  return (
    <>
      <ScrollView
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        style={{backgroundColor: '#fff', marginHorizontal: 24}}>
        <MiddleInputContainerStyle
          style={{
            borderColor: isFocused ? '#A055FF' : '#D7DCE6',
          }}>
          <TextInput
            style={{width: '60%'}}
            onFocus={(e: any) => {
              onInputFocus();
            }}
            onBlur={(e: any) => {
              onInputFocusOut();
            }}
            onChangeText={(value: string) => {
              setNickname(value);
            }}
            placeholder={placeholder}
            placeholderTextColor="#A0AAB4"
            keyboardType={keyboardType}
          />
        </MiddleInputContainerStyle>
      </ScrollView>
      <View
        style={{
          bottom: isFocused ? 0 : 21,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {nickname.length !== 0 && isFocused && <PurpleFullButton text="다음" />}

        {nickname.length !== 0 && !isFocused && (
          <PurpleRoundButton text="다음" />
        )}

        {nickname.length === 0 && isFocused && (
          <DisabledPurpleFullButton text="다음" />
        )}

        {nickname.length === 0 && !isFocused && (
          <DisabledPurpleRoundButton text="다음" />
        )}
      </View>
    </>
  );
};

export const MiddleFocusInput = ({placeholder, title}: Props) => {
  return (
    <>
      <MiddleFocusInputStyle
        placeholder={placeholder}
        placeholderTextColor="#A0AAB4"
      />
      <HelpTextStyle>{title}</HelpTextStyle>
    </>
  );
};

export const MiddleErrorInput = ({placeholder, title}: Props) => {
  return (
    <>
      <MiddleErrorInputStyle
        placeholder={placeholder}
        placeholderTextColor="#A0AAB4"
      />
      <CautionTextStyle>{title}</CautionTextStyle>
    </>
  );
};

export const MiddleInactiveInput = ({placeholder, title}: Props) => {
  return (
    <>
      <MiddleInactiveInputStyle
        placeholder={placeholder}
        placeholderTextColor="#A0AAB4"
      />
      <HelpTextStyle>{title}</HelpTextStyle>
    </>
  );
};

export const BigFocusInput = ({placeholder, title}: Props) => {
  return (
    <>
      <BigFocusInputStyle
        placeholder={placeholder}
        placeholderTextColor="#A0AAB4"
      />
      <HelpTextStyle>{title}</HelpTextStyle>
    </>
  );
};

export const BigErrorInput = ({placeholder, title}: Props) => {
  return (
    <>
      <BigErrorInputStyle
        placeholder={placeholder}
        placeholderTextColor="#A0AAB4"
      />
      <CautionTextStyle>{title}</CautionTextStyle>
    </>
  );
};

export const BigInactiveInput = ({placeholder, title}: Props) => {
  return (
    <>
      <BigInactiveInputStyle
        placeholder={placeholder}
        placeholderTextColor="#A0AAB4"
      />
      <HelpTextStyle>{title}</HelpTextStyle>
    </>
  );
};
