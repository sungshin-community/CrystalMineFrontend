import React from 'react';
import Styled from 'styled-components/native';

export const BigOneLineText = Styled.Text`
    font-family: 'SpoqaHanSansNeo-Medium';
    font-style: normal;
    font-size: 27px;
`;
export const BigTwoLineText = Styled.Text`
    font-family: 'SpoqaHanSansNeo-Medium';
    font-style: normal;
    font-size: 24px;
`;
export const NormalOneLineText = Styled.Text`
    font-family: 'SpoqaHanSansNeo-Medium';
    font-style: normal;
    font-size: 24px;
`;
export const Description = Styled.Text`
    font-family: 'SpoqaHanSansNeo-Regular';
    font-style: normal;
    font-size: 13px;
    color: #87919B;
`;
export const SmallText = Styled.Text`
    font-family: 'SpoqaHanSansNeo-Regular';
    font-style: normal;
    font-size: 13px;
    color: #000000;
`;
export const NormalText = Styled.Text`
    font-family: 'SpoqaHanSansNeo-Regular';
    font-style: normal;
    font-size: 15px;
    color: #000000;
`;
interface Props {
  firstLineText: string;
  secondLineText: string;
}

export function TwoLineTitle({firstLineText, secondLineText}: Props) {
  return (
    <BigTwoLineText>
      {firstLineText}
      {'\n'}
      {secondLineText}
    </BigTwoLineText>
  );
}
