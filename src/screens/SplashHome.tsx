import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PurpleRoundButton, WhiteRoundButton} from '../components/Button';
import Logo from '../../resources/icon/Logo';
import * as Animatable from 'react-native-animatable';

type RootStackParamList = {
  TermAgree: undefined;
  SignInID: undefined;
};

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.View`
  background-color: #ffffff;
  padding-bottom: 21;
  justify-content: center;
  align-items: center;
`;

type Props = NativeStackScreenProps<RootStackParamList>;
const SplashHome = ({navigation}: Props) => {
  return (
    <>
      <Container>
        <Animatable.Text animation="fadeIn" duration={2000}>
          <Logo />
        </Animatable.Text>
      </Container>
      <ButtonContainer>
        <Animatable.View animation="fadeInUp" delay={2000} duration={1200}>
          <PurpleRoundButton
            text="로그인"
            onClick={() => navigation.navigate('SignInID')}
          />
          <View style={{marginTop: 16}}>
            <WhiteRoundButton
              text="회원가입"
              onClick={() => navigation.navigate('TermAgree')}
            />
          </View>
        </Animatable.View>
      </ButtonContainer>
    </>
  );
};

export default SplashHome;
