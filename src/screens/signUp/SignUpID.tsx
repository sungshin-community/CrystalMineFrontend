import React from 'react';
import styled from 'styled-components';
import {StatusBar} from 'react-native';
import {NormalOneLineText, Description} from '../../components/Top';
import {
  MiddleActiveInputID,
  MiddleActiveInputNickname,
  MiddleActiveInputPassword,
} from '../../components/Input';

StatusBar.setBackgroundColor('white');
// StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const TextContainer = styled.View`
  margin: 130px 24px 0 24px;
`;

export default function SignUpID() {
  return (
    <>
      <Container>
        <TextContainer>
          <NormalOneLineText>아이디를 입력해주세요</NormalOneLineText>
          <Description style={{marginBottom: 52}}>
            학교에서 제공하는 성신 G-mail 계정을 사용합니다
          </Description>
        </TextContainer>
        <MiddleActiveInputID
          placeholder="아이디"
          maxLength={8}
          keyboardType="numeric"
          suffix="@sungshin.ac.kr"
          title=''
        />
      </Container>
    </>
  );
}
