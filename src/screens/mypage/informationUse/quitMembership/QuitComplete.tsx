/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {Platform, StatusBar, View, Dimensions} from 'react-native';
import {TwoLineTitle, Description} from '../../../../components/Top';
import * as Animatable from 'react-native-animatable';
import {PurpleRoundButton} from '../../../../components/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RemoveDataSuryong from '../../../../../resources/icon/custom/RemoveDataSuryong';
if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('white');
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');
}

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 37px 24px;
`;

const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding-bottom: 34;
`;

type RootStackParamList = {
  RegularMemberAuthSelect: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function QuitComplete({navigation}: Props) {
  return (
    <>
      <Container>
        <Animatable.Text
          animation="fadeIn"
          delay={900}
          duration={1200}
          easing={'ease-in-out-quad'}>
          <TwoLineTitle
            firstLineText="회원탈퇴가"
            secondLineText="완료되었습니다"
          />
        </Animatable.Text>
        <Animatable.Text
          animation="fadeIn"
          delay={2100}
          style={{marginTop: 15}}>
          <Description style={{lineHeight: 16.28}}>
            n초 후 메인 화면으로 돌아갑니다.
          </Description>
        </Animatable.Text>
        <Animatable.View animation="fadeIn" delay={2100}>
          <View
            style={{
              paddingHorizontal: Dimensions.get('window').width / 4,
              paddingVertical: Dimensions.get('window').height / 8,
            }}>
            <RemoveDataSuryong />
          </View>
        </Animatable.View>
      </Container>
      <ButtonContainer>
        <Animatable.View animation="fadeIn" delay={2100}>
          <PurpleRoundButton
            text="다음"
            onClick={() => navigation.navigate('RegularMemberAuthSelect')}
          />
        </Animatable.View>
      </ButtonContainer>
    </>
  );
}
