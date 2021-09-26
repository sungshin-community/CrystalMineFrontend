import React from 'react';
import styled from 'styled-components';
import {StatusBar} from 'react-native';
import {NormalOneLineText, Description} from '../../components/Top';
import {MiddleActiveInputID} from '../../components/Input';

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

export default function SignUpID() {
  return (
    <>
      <Container>
        <TextContainer>
          <NormalOneLineText>아이디를 입력해주세요</NormalOneLineText>
          <Description>
            학교에서 제공하는 성신 G-mail 계정을 사용합니다
          </Description>
        </TextContainer>
        <MiddleActiveInputID
          placeholder="아이디"
          maxLength={8}
          keyboardType="number-pad"
          suffix="@sungshin.ac.kr"
          title=""
        />
      </Container>
    </>
  );
}
