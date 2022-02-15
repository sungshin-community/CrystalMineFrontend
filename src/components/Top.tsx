import React from 'react';
import Styled from 'styled-components/native';

export const BigOneLineText = Styled.Text`
    font-family: 'SpoqaHanSansNeo-Medium';
    font-style: normal;
    font-size: 27px;
    line-height: 32.4px;
`;
export const BigTwoLineText = Styled.Text`
    font-family: 'SpoqaHanSansNeo-Medium';
    font-style: normal;
    font-size: 24px;
    line-height: 30.05px;
`;
export const NormalOneLineText = Styled.Text`
    font-family: 'SpoqaHanSansNeo-Medium';
    font-style: normal;
    font-size: 24px;
    line-height: 28.8px;
`;
export const Description = Styled.Text`
    font-family: 'SpoqaHanSansNeo-Regular';
    font-style: normal;
    font-size: 13px;
    line-height: 25.6px;
    color: #87919B;
`;
export const SmallText = Styled.Text`
    font-family: 'SpoqaHanSansNeo-Regular';
    font-style: normal;
    font-size: 13px;
    line-height: 15.6px;
    color: #000000;
`;
export const NormalText = Styled.Text`
    font-family: 'SpoqaHanSansNeo-Regular';
    font-style: normal;
    font-size: 15px;
    line-height: 18px;
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
