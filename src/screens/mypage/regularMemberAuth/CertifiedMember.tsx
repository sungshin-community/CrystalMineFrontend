/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {
  View,
  StatusBar,
  StyleSheet,
  Platform,
  Dimensions,
  Text,
  TextInput,
} from 'react-native';
import {TwoLineTitle, Description} from '../../../components/Top';
import {DisabledPurpleFullButton, DisabledPurpleRoundButton} from '../../../components/Button';
import * as Animatable from 'react-native-animatable';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ModalBottom} from '../../../components/ModalBottom';
import { fontBold, fontMedium, fontRegular } from '../../../common/font';
import { getUser } from '../../../common/myPageApi';
import User from '../../../classes/User';

if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('white');
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');
}
type RootStackParamList = {
  RegularMemberAuth: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;
export default function CertifiedMember({navigation}: Props) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function getUserInfo() {
      const userDto = await getUser();
      setUser(userDto);
    }
    getUserInfo();
  }, []);
  let expireIn = user ? user.expireIn : 0
  let dDay = [...expireIn.toString()];

  const letThreeLetter = (letter: any) => {
    if (letter.length === 1) {
      letter.unshift('0');
      letter.unshift('0');
    }
    else if (letThreeLetter.length === 2) {
      letter.unshift('0');
    }
  }
  letThreeLetter(dDay);
  return (
    <>
      <Container>
        <Animatable.Text
          animation="fadeInUp"
          delay={500}
          duration={1200}
          easing={'ease-in-out-quad'}>
          <Text style={[styles.title, fontMedium]}>인증 만료까지{'\n'}</Text>
        </Animatable.Text>
        <Animatable.Text
          animation="fadeInUp"
          delay={900}
          duration={1200}
          easing={'ease-in-out-quad'}>
          <View style={{flexDirection: 'row'}}>
            {dDay.map((day, index) => (
              <View style={styles.expirationDate}>
                <TextInput
                  key={index}
                  style={{fontSize: 45, textAlign: 'center'}}
                  editable={false}>
                  {day}
                </TextInput>
              </View>
            ))}
            <Text style={[styles.title, fontMedium]}>일 남았습니다.</Text>
          </View>
        </Animatable.Text>
        <Animatable.Text
          animation="fadeIn"
          delay={2100}
          style={{marginTop: 90}}>
          <Description
            style={[
              styles.textDescription,
              fontBold,
              {marginBottom: 11, color: '#A055FF'},
            ]}>
            정회원 인증 완료 ({user?.expiredDate}) {'\n'}
          </Description>
          <Description style={styles.textDescription}>
            {user?.username}@sungshin.ac.kr
          </Description>
        </Animatable.Text>
      </Container>
      <View style={styles.buttonContainer}>
        <Animatable.View animation="fadeIn" delay={2100}>
          <ButtonCenter>
            <View style={{margin: 16}}>
              <DisabledPurpleRoundButton
                text="미리 인증하기"
              />
            </View>
          </ButtonCenter>
        </Animatable.View>
      </View>
    </>
  );
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
  title: {
    fontSize: 24,
  },
  expirationDate: {
    borderBottomWidth: 2,
    borderColor: '#A055FF',
    width: 40,
    marginRight: 10,
    marginTop: -20,
  },
  textDescription: {
    fontSize: 15,
    color: '#87919B',
  },
  buttonContainer: {
    backgroundColor: '#ffffff',
    paddingBottom: 34,
  },
});
