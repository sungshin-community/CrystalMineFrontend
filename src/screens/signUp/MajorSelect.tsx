import React, {useState} from 'react';
import styled from 'styled-components';
import {StatusBar, View, StyleSheet} from 'react-native';
import {BigOneLineText} from '../../components/Top';
import {
  DisabledPurpleRoundButton,
  PurpleRoundButton,
} from '../../components/Button';
import Major from '../../components/Major';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

StatusBar.setBackgroundColor('white');
// StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const Container = styled.SafeAreaView`
  flex: 5;
  background-color: #ffffff;
`;

const TextContainer = styled.View`
  margin-top: 130px;
  margin-left: 24px;
`;

const MajorContainer = styled.View`
  flex: 14;
`;

const RadioContainer = styled.ScrollView`
  margin: 24px 12px;
`;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
});

const majorOptionData = [
  {
    id: '1',
    name: '해당 없음',
    value: 'X',
  },
  {
    id: '2',
    name: '국어국문학과',
    value: '국어국문학과',
  },
  {
    id: '3',
    name: '영어영문학과',
    value: '영어영문학과',
  },
  {
    id: '4',
    name: '독일어문ㆍ문화학과',
    value: '독일어문ㆍ문화학과',
  },
  {
    id: '5',
    name: '프랑스어문ㆍ문학과',
    value: '프랑스어문ㆍ문학과',
  },
  {
    id: '6',
    name: '일본어문ㆍ문학과',
    value: '일본어문ㆍ문학과',
  },
  {
    id: '7',
    name: '중국어문ㆍ문학과',
    value: '중국어문ㆍ문학과',
  },
  {
    id: '8',
    name: '사학과',
    value: '사학과',
  },
  {
    id: '9',
    name: '정치외교학과',
    value: '정치외교학과',
  },
  {
    id: '9',
    name: '정치외교학과',
    value: '정치외교학과',
  },
  {
    id: '10',
    name: '심리학과',
    value: '심리학과',
  },
  {
    id: '11',
    name: '지리학과',
    value: '지리학과',
  },
  {
    id: '12',
    name: '경제학과',
    value: '경제학과',
  },
  {
    id: '13',
    name: '경영학과',
    value: '경영학과',
  },
  {
    id: '14',
    name: '경영학부',
    value: '경영학부',
  },
];

type RootStackParamList = {
  SignUpComplete: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function MajorSelect({navigation}: Props) {
  const [yourMajor, setYourMajor] = useState('');
  const [selected, isSelected] = useState<boolean>(false);

  const selectMajor = (major: string) => {
    isSelected(true);
    setYourMajor(major);
  };

  return (
    <>
      <Container>
        <TextContainer>
          <BigOneLineText>소속 학과를 선택해주세요</BigOneLineText>
        </TextContainer>
      </Container>
      <MajorContainer>
        <RadioContainer>
          {majorOptionData.map(major => (
            <Major major={major} selectMajor={selectMajor} />
          ))}
        </RadioContainer>
        <View style={styles.buttonContainer}>
          {selected ? (
            <PurpleRoundButton
              text="회원가입"
              onClick={() => navigation.navigate('SignUpComplete')}
            />
          ) : (
            <DisabledPurpleRoundButton text="회원가입" />
          )}
        </View>
      </MajorContainer>
    </>
  );
}
