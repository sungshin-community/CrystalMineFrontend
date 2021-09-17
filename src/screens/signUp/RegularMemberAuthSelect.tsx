import React from 'react';
import styled from 'styled-components';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {theme} from '../../theme';
import {TwoLineTitle, Description} from '../../components/top';
import {PurpleRoundButton, WhiteRoundButton} from '../../components/Button';

StatusBar.setBackgroundColor('white');
// StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const styles = StyleSheet.create({
  text: {
    marginTop: 130,
    marginLeft: 24,
  },
  textDescription: {
    marginTop: 15,
  },
});

export default function RegularMemberAuthSelect() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <SafeAreaView>
          <TwoLineTitle
            firstLineText="정회원 인증을"
            secondLineText="이어서 진행하시겠어요?"
          />
          <Description style={[styles.text, styles.textDescription]}>
            가입 후 24시간 이내에 인증하지 않을 시{'\n'}
            보안을 위해 계정 정보가 삭제됩니다.
          </Description>
        </SafeAreaView>
        <PurpleRoundButton text="바로 인증하기" />
        <WhiteRoundButton text="나중에 인증하기" />
      </Container>
    </ThemeProvider>
  );
}

// import RegularMemberAuthSelect from "./screens/RegularMemberAuthSelect";
// export default RegularMemberAuthSelect;
