import React from 'react';
import styled from 'styled-components';
import {StatusBar, StyleSheet, View} from 'react-native';
import {TwoLineTitle} from '../../components/Top';
import * as Animatable from 'react-native-animatable';
import {PurpleRoundButton} from '../../components/Button';

StatusBar.setBackgroundColor('white');
// StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const Container = styled.SafeAreaView`
  flex: 89;
  background-color: #ffffff;
`;

const TextContainer = styled.View`
  margin: 130px 24px;
`;

const ButtonContainer = styled.View`
  background-color: #ffffff;
  flex: 11;
`;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function SignUpComplete() {
  return (
    <>
      <Container>
        <TextContainer>
          <Animatable.Text animation="fadeInUp" delay={900}>
            <TwoLineTitle
              firstLineText="회원가입이"
              secondLineText="완료되었습니다"
            />
          </Animatable.Text>
        </TextContainer>
      </Container>
      <ButtonContainer>
        <View style={styles.buttonContainer}>
          <Animatable.Text animation="fadeIn" delay={1300}>
            <PurpleRoundButton text="다음" />
          </Animatable.Text>
        </View>
      </ButtonContainer>
    </>
  );
}
