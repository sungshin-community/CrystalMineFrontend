import React from 'react';
import styled from 'styled-components';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {theme} from '../../src/theme';
import {TwoLineTitle} from '../../src/components/Top';
import * as Animatable from 'react-native-animatable';

StatusBar.setBackgroundColor('white');
// StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const TextContainer = styled.View`
  margin: 130px 24px;
`;

export default function SignupComplete() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <TextContainer>
          <Animatable.Text animation="fadeInUp" delay={1000}>
            <TwoLineTitle firstLineText="회원가입이" secondLineText="완료되었습니다" />
          </Animatable.Text>
        </TextContainer>
      </Container>
    </ThemeProvider>
  );
}

// import SignupComplete from "./src/screens/SignupComplete";
// export default SignupComplete;
