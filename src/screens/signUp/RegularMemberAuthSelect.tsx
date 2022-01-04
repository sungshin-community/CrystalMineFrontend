import React from 'react';
import styled from 'styled-components/native';
import {View, StatusBar, StyleSheet} from 'react-native';
import {TwoLineTitle, Description} from '../../components/Top';
import {PurpleRoundButton, WhiteRoundButton} from '../../components/Button';
import * as Animatable from 'react-native-animatable';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { sendEmail } from '../../common/authApi';

StatusBar.setBackgroundColor('white');
// StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 37px 24px;
`;

const ButtonContainer = styled.View`
  background-color: #ffffff;
  padding-bottom: 21;
`;

const ButtonCenter = styled.View`
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  textDescription: {
    marginTop: 15,
    lineHeight: 16.28,
  },
});

type RootStackParamList = {
  RegularMemberAuth: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;
export default function RegularMemberAuthSelect({navigation}: Props) {
  return (
    <>
      <Container>
        <Animatable.Text
          animation="fadeInUp"
          delay={900}
          duration={1200}
          easing={'ease-in-out-quad'}>
          <TwoLineTitle
            firstLineText="정회원 인증을"
            secondLineText="이어서 진행하시겠어요?"
          />
        </Animatable.Text>
        <Animatable.Text
          animation="fadeIn"
          delay={2100}
          style={{marginTop: 15}}>
          <Description style={styles.textDescription}>
            가입 후 24시간 이내에 인증하지 않을 시{'\n'}
            보안을 위해 계정 정보가 삭제됩니다.
          </Description>
        </Animatable.Text>
      </Container>
      <ButtonContainer>
        <Animatable.View animation="fadeIn" delay={2100}>
          <ButtonCenter>
            <View style={{margin: 16}}>
              <PurpleRoundButton
                text="바로 인증하기"
                onClick={async () => {
                  let result: boolean = await sendEmail();
                  if (result) {
                    navigation.navigate('RegularMemberAuth');
                  }
                  else {
                    console.log("이메일 발송 실패");
                  }
                }}
              />
            </View>
            <WhiteRoundButton
              text="나중에 인증하기"
              onClick={() => {
                navigation.navigate('Home');
              }}
            />
          </ButtonCenter>
        </Animatable.View>
      </ButtonContainer>
    </>
  );
}
