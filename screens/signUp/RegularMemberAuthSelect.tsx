import React from 'react';
import styled from 'styled-components';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {theme} from '../../src/theme';
import {BigOneLineText, Description} from '../../src/components/top';

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
  buttonNow: {
    backgroundColor: '#A055FF',
    borderRadius: 15,
    marginTop: '80%',
    marginHorizontal: 24,
    justifyContent: 'center',
    width: 343,
    height: 56,
  },
  buttonNowText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '400',
  },
  buttonLater: {
    backgroundColor: '#D7DCE6',
    borderColor: '#A055FF',
    borderStyle: 'solid',
    marginTop: 16,
  },
  buttonLaterText: {
    color: '#A055FF',
  },
});

export default function RegularMemberAuthSelect() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <SafeAreaView>
          <BigOneLineText style={styles.text}>
            정회원 인증을{'\n'}이어서 진행하시겠어요?
          </BigOneLineText>
          <Description style={[styles.text, styles.textDescription]}>
            가입 후 24시간 이내에 인증하지 않을 시{'\n'}
            보안을 위해 계정 정보가 삭제됩니다.
          </Description>
        </SafeAreaView>
        <TouchableOpacity style={styles.buttonNow}>
          <Text style={styles.buttonNowText}>바로 인증하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonNow, styles.buttonLater]}>
          <Text style={[styles.buttonNowText, styles.buttonLaterText]}>
            나중에 인증하기
          </Text>
        </TouchableOpacity>
      </Container>
    </ThemeProvider>
  );
}

// import RegularMemberAuthSelect from "./screens/RegularMemberAuthSelect";
// export default RegularMemberAuthSelect;
