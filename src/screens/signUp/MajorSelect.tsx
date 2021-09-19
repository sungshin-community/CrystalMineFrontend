import React from 'react';
import styled from 'styled-components';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {theme} from '../../theme';
import {BigOneLineText} from '../../components/Top';
import {PurpleRoundButton} from '../../components/Button';
import {MajorRadio} from '../../components/MajorRadio';

StatusBar.setBackgroundColor('white');
// StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const Container = styled.SafeAreaView`
  flex: 3;
  background-color: ${({theme}) => theme.background};
`;

const TextContainer = styled.View`
  margin-top: 130px;
  margin-left: 24px;
`;

const MajorContainer = styled.View`
  flex: 8;
  background-color: ${({theme}) => theme.majorRadio};
`;

const ButtonContainer = styled.View`
  background-color: ${({theme}) => theme.background};
  flex: 2;
`;

export default function MajorSelect() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <TextContainer>
          <BigOneLineText>소속 학과를 선택해주세요</BigOneLineText>
        </TextContainer>
      </Container>
      <MajorContainer>
        <MajorRadio />
        <PurpleRoundButton text="회원가입" />
      </MajorContainer>
    </ThemeProvider>
  );
}
