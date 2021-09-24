import React from 'react';
import styled from 'styled-components';

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
interface Props {
  placeholder: string;
  title: string;
}

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
