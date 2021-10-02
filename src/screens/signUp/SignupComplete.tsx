import React from 'react';
import styled from 'styled-components';
import {StatusBar, StyleSheet, View} from 'react-native';
import {TwoLineTitle} from '../../components/Top';
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
  margin: 130px 24px;
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
  return (
    <>
      <Container>
        <TextContainer>
          <Animatable.Text animation="fadeInUp" delay={900}>
            <TwoLineTitle
              firstLineText="회원가입이"
              secondLineText="완료되었습니다"
            />
          </Animatable.Text>
        </TextContainer>
      </Container>
      <View style={styles.buttonContainer}>
        <Animatable.Text animation="fadeIn" delay={1300}>
          <PurpleRoundButton
            text="다음"
            onClick={() => navigation.navigate('RegularMemberAuthSelect')}
          />
        </Animatable.Text>
      </View>
    </>
  );
}
