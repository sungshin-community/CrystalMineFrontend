import React from 'react';
import styled from 'styled-components';

const MiddleFocusInputStyle = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor: theme.placeholderText,
}))`
  width: 100%;
  height: 45px;
  margin: 3px 0;
  border-bottom-color: ${({theme}) => theme.main};
  border-bottom-width: 2px;
  font-size: 21px;
  color: ${({theme}) => theme.text};
`;

const MiddleErrorInputStyle = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor: theme.placeholderText,
}))`
  width: 100%;
  height: 45px;
  margin: 3px 0;
  border-bottom-color: ${({theme}) => theme.error};
  border-bottom-width: 2px;
  font-size: 21px;
  color: ${({theme}) => theme.text};
`;

const MiddleInactiveInputStyle = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor: theme.placeholderText,
}))`
  width: 100%;
  height: 45px;
  margin: 3px 0;
  border-bottom-color: ${({theme}) => theme.inactive};
  border-bottom-width: 2px;
  font-size: 21px;
  color: ${({theme}) => theme.text};
`;

const BigFocusInputStyle = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor: theme.placeholderText,
}))`
  width: 100%;
  height: 52px;
  margin: 3px 0;
  border-bottom-color: ${({theme}) => theme.main};
  border-bottom-width: 2px;
  font-size: 27px;
  color: ${({theme}) => theme.text};
`;

const BigErrorInputStyle = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor: theme.placeholderText,
}))`
  width: 100%;
  height: 52px;
  margin: 3px 0;
  border-bottom-color: ${({theme}) => theme.error};
  border-bottom-width: 2px;
  font-size: 27px;
  color: ${({theme}) => theme.text};
`;

const BigInactiveInputStyle = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor: theme.placeholderText,
}))`
  width: 100%;
  height: 52px;
  margin: 3px 0;
  border-bottom-color: ${({theme}) => theme.inactive};
  border-bottom-width: 2px;
  font-size: 27px;
  color: ${({theme}) => theme.text};
`;

const HelpTextStyle = styled.Text`
  font-size: 11px;
  font-weight: 400;
  color: ${({theme}) => theme.help};
  margin: 10px 0;
`;

const CautionTextStyle = styled.Text`
  font-size: 11px;
  font-weight: 400;
  color: ${({theme}) => theme.error};
  margin: 10px 0;
`;

export const MiddleFocusInput = ({placeholder, title}) => {
  return (
    <>
      <MiddleFocusInputStyle placeholder={placeholder} />
      <HelpTextStyle>{title}</HelpTextStyle>
    </>
  );
};

export const MiddleErrorInput = ({placeholder, title}) => {
  return (
    <>
      <MiddleErrorInputStyle placeholder={placeholder} />
      <CautionTextStyle>{title}</CautionTextStyle>
    </>
  );
};

export const MiddleInactiveInput = ({placeholder, title}) => {
  return (
    <>
      <MiddleInactiveInputStyle placeholder={placeholder} />
      <HelpTextStyle>{title}</HelpTextStyle>
    </>
  );
};

export const BigFocusInput = ({placeholder, title}) => {
  return (
    <>
      <BigFocusInputStyle placeholder={placeholder} />
      <HelpTextStyle>{title}</HelpTextStyle>
    </>
  );
};

export const BigErrorInput = ({placeholder, title}) => {
  return (
    <>
      <BigErrorInputStyle placeholder={placeholder} />
      <CautionTextStyle>{title}</CautionTextStyle>
    </>
  );
};

export const BigInactiveInput = ({placeholder, title}) => {
  return (
    <>
      <BigInactiveInputStyle placeholder={placeholder} />
      <HelpTextStyle>{title}</HelpTextStyle>
    </>
  );
};
