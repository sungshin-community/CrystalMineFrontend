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
import {
  DisabledPurpleRoundButton,
  PurpleRoundButton,
} from '../../../components/Button';
import * as Animatable from 'react-native-animatable';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ModalBottom} from '../../../components/ModalBottom';
import {fontBold, fontMedium, fontRegular} from '../../../common/font';
import {getUser} from '../../../common/myPageApi';
import User from '../../../classes/User';

if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('white');
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');
}
type RootStackParamList = {
  DirectionAgreeMyPage: {studentId: number};
};

type Props = NativeStackScreenProps<RootStackParamList>;
export default function CertifiedMember({navigation}: Props) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function getUserInfo() {
      const userDto = await getUser();
      setUser(userDto.data.data);
    }
    getUserInfo();
  }, []);
  let expireIn = user ? user.expireIn : 0;
  let dDay = [...expireIn.toString()];

  const letThreeLetter = (letter: any) => {
    if (letter.length === 1) {
      letter.unshift('0');
      letter.unshift('0');
    } else if (letter.length === 2) {
      letter.unshift('0');
    }
  };
  letThreeLetter(dDay);

  const expireInComponent = (
    <View style={{flexDirection: 'row'}}>
      {dDay.map((day, index) => (
        <View style={styles.expirationDate} key={index}>
          <TextInput
            key={index}
            style={[
              fontRegular, {
              fontSize: 45,
              textAlign: 'center',
              color: '#222222',
              paddingBottom: 0,
            }]}
            editable={false}>
            {day}
          </TextInput>
        </View>
      ))}
      <Text style={[styles.title, fontMedium]}>일 남았습니다.</Text>
    </View>
  );

  return (
    <>
      <Container>
        <Text style={[styles.title, fontMedium]}>인증 만료까지{'\n'}</Text>

        {expireInComponent}
        <View style={{marginTop: 90}}>
          <Description
            style={[
              styles.textDescription,
              fontBold,
              {color: '#A055FF', marginBottom: 11},
            ]}>
            정회원 인증 완료 ({user?.authenticatedDate})
          </Description>
          <Description style={[styles.textDescription]}>
            {user?.email}
          </Description>
        </View>
      </Container>
      <View style={styles.buttonContainer}>
        <ButtonCenter>
          <View style={{margin: 16}}>
            {expireIn > 7 ? (
              <DisabledPurpleRoundButton text="미리 인증하기" />
            ) : (
              <PurpleRoundButton
                text="미리 인증하기"
                onClick={() => {
                  if (user?.username)
                    navigation.navigate('DirectionAgreeMyPage', {
                      studentId: user?.username,
                    });
                }}
              />
            )}
          </View>
        </ButtonCenter>
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
    marginTop: Platform.OS === 'ios' ? -20 : -25,
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
