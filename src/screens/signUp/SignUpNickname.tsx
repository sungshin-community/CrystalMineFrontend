import React from 'react';
import styled from 'styled-components/native';
import {StatusBar} from 'react-native';
import {Description, NormalOneLineText} from '../../components/Top';
import {MiddleActiveInputNickname} from '../../components/Input';

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

export default function SignUpNickname() {
  return (
    <Container>
      <TextContainer>
        <NormalOneLineText>닉네임을 입력해주세요</NormalOneLineText>
        <Description>
          영문, 숫자, 특수문자 필수 포함 10자 이상으로 구성해주세요
        </Description>
      </TextContainer>
      <MiddleActiveInputNickname placeholder="닉네임" keyboardType="default" />
    </Container>
  );
}
