import React from 'react';
import styled from 'styled-components';
import {StatusBar, StyleSheet} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {theme} from '../../theme';
import {BigOneLineText} from '../../components/top';
import BackButton from '../../components/BackButton';
import {PurpleRoundButton} from '../../components/Button';

StatusBar.setBackgroundColor('white');
// StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const styles = StyleSheet.create({
  text: {
    marginTop: 130,
    marginLeft: 24,
  },
  buttonNow: {
    backgroundColor: '#A055FF',
    borderRadius: 15,
    // marginTop: '80%',
    marginHorizontal: '7%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 343,
    height: 56,
  },
  buttonNowText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '400',
  },
});

const Container = styled.SafeAreaView`
  flex: 3;
  background-color: ${({theme}) => theme.background};
`;

const MajorContainer = styled.View`
  flex: 7;
  background-color: ${({theme}) => theme.majorRadio};
`;

export default function MajorSelect() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <BackButton />
        <BigOneLineText style={styles.text}>
          소속 학과를 선택해주세요
        </BigOneLineText>
      </Container>
      <MajorContainer>
        <PurpleRoundButton text="회원가입" />
      </MajorContainer>
    </ThemeProvider>
  );
}

// import MajorSelect from "./screens/MajorSelect";
// export default MajorSelect;
