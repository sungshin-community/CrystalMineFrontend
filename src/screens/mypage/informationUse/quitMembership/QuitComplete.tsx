/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Platform, StatusBar, View, Dimensions, Image} from 'react-native';
import {TwoLineTitle, Description} from '../../../../components/Top';
import * as Animatable from 'react-native-animatable';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RemoveDataSuryong from '../../../../../resources/icon/custom/RemoveDataSuryong';
if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('white');
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');
}

type RootStackParamList = {
  SplashHome: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function QuitComplete({navigation}: Props) {
  const [sec, setSec] = useState(3);

  useEffect(() => {
    const timer = () => {
      setTimeout(() => {
        setSec(2);
      }, 3600);

      setTimeout(() => {
        setSec(1);
      }, 4600);

      setTimeout(() => {
        setSec(0);
        navigation.navigate('SplashHome');
      }, 5600);
    };
    timer();
  }, [navigation]);

  return (
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
      <Animatable.Text animation="fadeIn" delay={2100} style={{marginTop: 15}}>
        <Description style={{lineHeight: 16.28}}>
          {sec}초 후 메인 화면으로 돌아갑니다.
        </Description>
      </Animatable.Text>
      <Animatable.View animation="fadeIn" delay={2100}>
        <View
          style={{
            paddingHorizontal: Dimensions.get('window').width / 4,
            paddingVertical: Dimensions.get('window').height / 8,
          }}>
          <Image
            style={{
              width: 150,
              height: 150,
            }}
            source={{
              uri:
                'https://crystalmine-s3.s3.ap-northeast-2.amazonaws.com/icon/DeleteData.png',
            }}
          />
        </View>
      </Animatable.View>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 37px 24px;
`;
