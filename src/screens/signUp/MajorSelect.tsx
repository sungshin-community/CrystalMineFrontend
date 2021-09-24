import React from 'react';
import styled from 'styled-components';
import {StatusBar, View, StyleSheet} from 'react-native';
import {BigOneLineText} from '../../components/Top';
import {PurpleRoundButton} from '../../components/Button';
import MajorRadio from '../../components/MajorRadio';

StatusBar.setBackgroundColor('white');
// StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const Container = styled.SafeAreaView`
  flex: 5;
  background-color: #ffffff;
`;

const TextContainer = styled.View`
  margin-top: 130px;
  margin-left: 24px;
`;

const MajorContainer = styled.View`
  flex: 14;
  background-color: #ffffff;
`;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
});

export default function MajorSelect() {
  return (
    <>
      <Container>
        <TextContainer>
          <BigOneLineText>소속 학과를 선택해주세요</BigOneLineText>
        </TextContainer>
      </Container>
      <MajorContainer>
        <MajorRadio />
        <View style={styles.buttonContainer}>
          <PurpleRoundButton text="회원가입" />
        </View>
      </MajorContainer>
    </>
  );
}
