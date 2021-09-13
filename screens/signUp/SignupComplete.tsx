import React from 'react';
import styled from 'styled-components';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {theme} from '../../src/theme';
import {BigOneLineText} from '../../src/components/top';
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
            <BigOneLineText>회원가입이{'\n'}완료되었습니다</BigOneLineText>
          </Animatable.Text>
        </TextContainer>
      </Container>
    </ThemeProvider>
  );
}

// import SignupComplete from "./src/screens/SignupComplete";
// export default SignupComplete;
