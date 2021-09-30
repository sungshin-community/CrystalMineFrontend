import React from 'react';
import styled from 'styled-components';
import {StatusBar, View} from 'react-native';
import {TwoLineTitle} from '../../components/Top';
import {MiddleActiveInputPassword} from '../../components/Input';

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

export default function SignUpPasswordConfirm() {
  return (
    <>
    <View style={{width: 214.28, height: 4, backgroundColor: '#A055FF'}} />
      <Container>
        <TextContainer>
          <TwoLineTitle
            firstLineText="비밀번호를"
            secondLineText="한번 더 입력해주세요"
          />
        </TextContainer>
        <MiddleActiveInputPassword
          placeholder="비밀번호"
          maxLength={25}
          keyboardType="default"
        />
      </Container>
    </>
  );
}
