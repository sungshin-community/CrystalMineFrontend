import React from 'react';
import styled from 'styled-components';
import {StatusBar, StyleSheet, View} from 'react-native';
import {TwoLineTitle, Description} from '../../components/Top';
import * as Animatable from 'react-native-animatable';
import {PurpleRoundButton} from '../../components/Button';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

StatusBar.setBackgroundColor('white');
// StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const TextContainer = styled.View`
  margin: 37px 0 0 24px;
`;

const styles = StyleSheet.create({
  buttonContainer: {
    bottom: 21,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

type RootStackParamList = {
  RegularMemberAuthSelect: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function SignUpComplete({navigation}: Props) {
  // const fadeInUp = {
  //   0: {
  //     opacity: 0,

  //   },
  //   0.5: {
  //     opacity: 0,
  //   },
  //   1: {
  //     opacity: 1,
  //   },
  // };

  return (
    <Container>
      <TextContainer>
        <Animatable.Text
          animation="fadeInUp"
          delay={900}
          duration={1200}
          easing={'ease-in-out-quad'}>
          <TwoLineTitle
            firstLineText="회원가입이"
            secondLineText="완료되었습니다"
          />
        </Animatable.Text>
        <Animatable.Text
          animation="fadeIn"
          delay={2100}
          style={{marginTop: 15}}>
          <Description>
            수정광산에 오신 것을 환영합니다!{'\n\n'}
            즐거운 수정광산 생활을 위해{'\n'}
            서로 배려하는 따뜻한 활동 부탁드려요.{'\n\n'}
            또한 모든 수정이들의{'\n'}
            자유로운 활동을 위해{'\n'}
            수정광산 안의 모든 내용은{'\n'}
            밖으로의 유출을 삼가주세요.{'\n'}
          </Description>
        </Animatable.Text>
      </TextContainer>
      <View style={styles.buttonContainer}>
        <Animatable.Text animation="fadeIn" delay={2100}>
          <PurpleRoundButton
            text="다음"
            onClick={() => navigation.navigate('RegularMemberAuthSelect')}
          />
        </Animatable.Text>
      </View>
    </Container>
  );
}
