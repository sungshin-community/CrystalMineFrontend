import React from "react";
import { Dimensions } from "react-native";
import styled from 'styled-components';

const FocusInputStyle = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.placeholderText,
}))`
    width: ${({ width }) => width - 48}px;
    height: 42px;
    margin: 3px 0;
    border-bottom-color: ${({ theme }) => theme.main};
    border-bottom-width: 2px;
    font-size: 21px;
    color: ${({ theme }) => theme.text};
`;

const ErrorInputStyle = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.placeholderText,
}))`
    width: ${({ width }) => width - 48}px;
    height: 42px;
    margin: 3px 0;
    border-bottom-color: ${({ theme }) => theme.error};
    border-bottom-width: 2px;
    font-size: 21px;
    color: ${({ theme }) => theme.text};
`;

const InactiveInputStyle = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.placeholderText,
}))`
    width: ${({ width }) => width - 48}px;
    height: 42px;
    margin: 3px 0;
    border-bottom-color: ${({ theme }) => theme.inactive};
    border-bottom-width: 2px;
    font-size: 21px;
    color: ${({ theme }) => theme.text};
`;

const HelpTextStyle = styled.Text`
    font-size: 11px;
    font-weight: 400;
    color: ${({ theme }) => theme.help};
    margin: 10px 0;
`;

const CautionTextStyle = styled.Text`
    font-size: 11px;
    font-weight: 400;
    color: ${({ theme }) => theme.error};
    margin: 10px 0;
`;

const width = Dimensions.get('window').width;

export const FocusInput = ({ placeholder, props }) => {
    return (
    <>
    <FocusInputStyle width={width} placeholder={placeholder} />
    <HelpTextStyle>도움말</HelpTextStyle>
    </>

    );
};

export const ErrorInput = ({ placeholder, props }) => {
    return (
        <>
        <ErrorInputStyle width={width} placeholder={placeholder}/>
        <CautionTextStyle>도움말</CautionTextStyle>
        </>
    );
};

export const InactiveInput = ({ placeholder, props }) => {
    return (
    <>
    <InactiveInputStyle width={width} placeholder={placeholder}/>
    <HelpTextStyle>도움말</HelpTextStyle>
    </>
    );
};
