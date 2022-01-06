import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PurpleRoundButton, WhiteRoundButton} from '../components/Button';
import Logo from '../../resources/icon/Logo';
import * as Animatable from 'react-native-animatable';

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
  padding-bottom: 21;
  justify-content: center;
  align-items: center;
`;

type Props = NativeStackScreenProps<RootStackParamList>;
const SplashHome = ({navigation}: Props) => {
  return (
    <>
      <ModalBottom
        modalText="안녕하세요"
        modalButtonText="확인"
        modalButton={<Text>모달버튼</Text>}></ModalBottom>
    </>
  );
};

export default SplashHome;
