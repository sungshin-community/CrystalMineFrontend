/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PurpleRoundButton, WhiteRoundButton} from '../components/Button';
import Logo from '../../resources/icon/Logo';
import * as Animatable from 'react-native-animatable';
import {fontRegular} from '../common/font';
import QuestionMark from '../../resources/icon/QuestionMark';
import {ModalBottom} from '../components/ModalBottom';

type RootStackParamList = {
  TermAgree: undefined;
  SignInId: undefined;
};

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.View`
  background-color: #ffffff;
  padding-bottom: 34px;
  justify-content: center;
  align-items: center;
`;

type Props = NativeStackScreenProps<RootStackParamList>;
const SplashHome = ({navigation}: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <View
        style={{
          backgroundColor: '#fff',
          justifyContent: 'flex-end',
          flexDirection: 'row',
          paddingRight: 20,
        }}>
        <Pressable hitSlop={30} onPress={() => setModalVisible(true)}>
          <QuestionMark />
        </Pressable>
      </View>
      <Container>
        <Animatable.Text animation="fadeIn" duration={2000}>
          <Logo />
        </Animatable.Text>
      </Container>
      <ButtonContainer>
        <Animatable.View animation="fadeInUp" delay={2000} duration={1200}>
          <PurpleRoundButton
            text="로그인"
            onClick={() => navigation.navigate('SignInId')}
          />
          <View style={{marginTop: 16}}>
            <WhiteRoundButton
              text="회원가입"
              onClick={() => navigation.navigate('TermAgree')}
            />
          </View>
        </Animatable.View>
      </ButtonContainer>
      {/* <Text
        style={[
          fontRegular,
          {textAlign: 'center', color: '#D0D0D0', paddingVertical: 30, backgroundColor: '#fff'},
        ]}>
        Salty Lab | sungshin.community@gmail.com
      </Text> */}
      <ModalBottom
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        content={`개인정보 민원 처리, 제휴, 콜라보 등의 외부 문의는 아래 수정광산 메일로 내용을 보내주시면 담당자가 확인 후 연락드리도록 하겠습니다.\n\nsungshin.community@gmail.com`}
        purpleButtonText="확인"
        purpleButtonFunc={() => {
          setModalVisible(false);
        }}
      />
    </>
  );
};

export default SplashHome;
