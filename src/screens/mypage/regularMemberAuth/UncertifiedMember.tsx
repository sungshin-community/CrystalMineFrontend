/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {
  View,
  StatusBar,
  StyleSheet,
  Platform,
  Dimensions,
  Text,
} from 'react-native';
import {TwoLineTitle, Description} from '../../../components/Top';
import {PurpleRoundButton, WhiteRoundButton} from '../../../components/Button';
import * as Animatable from 'react-native-animatable';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ModalBottom} from '../../../components/ModalBottom';
import { fontBold } from '../../../common/font';
if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('white');
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');
}

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 37px 24px;
`;

const ButtonCenter = styled.View`
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  textDescription: {
    fontSize: 15,
    color: '#87919B'
  },
  buttonContainer: {
    backgroundColor: '#ffffff',
    paddingBottom: 34,
  },
});

type RootStackParamList = {
  RegularMemberAuth: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;
export default function UncertifiedMember({navigation}: Props) {
  return (
    <>
      <Container>
        <Animatable.Text
          animation="fadeInUp"
          delay={900}
          duration={1200}
          easing={'ease-in-out-quad'}>
          <TwoLineTitle
            firstLineText="수정광산을 이용하기"
            secondLineText="위해서는 인증이 필요해요."
          />
        </Animatable.Text>
        <Animatable.Text
          animation="fadeIn"
          delay={2100}
          style={{marginTop: 90}}>
          <Description style={[styles.textDescription, fontBold, {marginBottom: 11}]}>
            정회원 인증 필요{'\n'}
          </Description>
          <Description style={styles.textDescription}>
            00000@sungshin.ac.kr
          </Description>
        </Animatable.Text>
      </Container>
      <View style={styles.buttonContainer}>
        <Animatable.View animation="fadeIn" delay={2100}>
          <ButtonCenter>
            <View style={{margin: 16}}>
              <PurpleRoundButton
                text="인증하기"
                onClick={() => 
                  navigation.navigate('DirectionAgree')
                }
              />
            </View>
          </ButtonCenter>
        </Animatable.View>
      </View>
    </>
  );
}
