import React from 'react';
import styled from 'styled-components';
import {View, StatusBar, StyleSheet} from 'react-native';
import {TwoLineTitle, Description} from '../../components/Top';
import {PurpleRoundButton, WhiteRoundButton} from '../../components/Button';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

StatusBar.setBackgroundColor('white');
// StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const Container = styled.SafeAreaView`
  flex: 7;
  background-color: #ffffff;
`;

const TextContainer = styled.View`
  margin: 130px 24px;
`;

const ButtonContainer = styled.View`
  background-color: #ffffff;
  flex: 2;
`;

const styles = StyleSheet.create({
  textDescription: {
    marginTop: 15,
    lineHeight: 16.28,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 16,
  },
});
type RootStackParamList = {
  RegularMemberAuth: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;
export default function RegularMemberAuthSelect({ navigation }: Props) {
  return (
    <>
      <Container>
        <TextContainer>
          <TwoLineTitle
            firstLineText="정회원 인증을"
            secondLineText="이어서 진행하시겠어요?"
          />
          <Description style={styles.textDescription}>
            가입 후 24시간 이내에 인증하지 않을 시{'\n'}
            보안을 위해 계정 정보가 삭제됩니다.
          </Description>
        </TextContainer>
      </Container>
      <ButtonContainer>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <PurpleRoundButton text="바로 인증하기" onClick={() => {navigation.navigate('RegularMemberAuth')}}/>
          </View>
          <WhiteRoundButton text="나중에 인증하기" onClick={() => {navigation.navigate('Home')}}/>
        </View>
      </ButtonContainer>
    </>
  );
}

// import RegularMemberAuthSelect from "./screens/RegularMemberAuthSelect";
// export default RegularMemberAuthSelect;
