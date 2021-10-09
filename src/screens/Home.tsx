import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Button,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PurpleRoundButton, WhiteRoundButton} from '../components/Button';
import Logo from '../../resources/icon/Logo';
import * as Animatable from 'react-native-animatable';

type RootStackParamList = {
  TermAgree: undefined;
  SignInID: undefined;
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const CenterContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

type Props = NativeStackScreenProps<RootStackParamList>;
const Home = ({navigation}: Props) => {
  return (
    <Container>
      <CenterContainer style={{flex: 3}}>
        <Animatable.Text animation="fadeIn" duration={2000}>
          <Logo />
        </Animatable.Text>
      </CenterContainer>
      <CenterContainer style={{flex: 1}}>
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
      </CenterContainer>
    </Container>
  );
};

export default Home;
