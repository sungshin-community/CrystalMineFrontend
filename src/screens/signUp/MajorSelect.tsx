import React, {useState} from 'react';
import styled from 'styled-components';
import {StatusBar, View, StyleSheet} from 'react-native';
import {BigOneLineText} from '../../components/Top';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import {
  DisabledPurpleRoundButton,
  PurpleRoundButton,
} from '../../components/Button';
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

const majorOptionData: RadioButtonProps[] = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: '해당 없음',
    value: 'X',
  },
  {
    id: '2',
    label: '국어국문학과',
    value: '국어국문학과',
  },
  {
    id: '3',
    label: '영어영문학과',
    value: '영어영문학과',
  },
  {
    id: '4',
    label: '독일어문ㆍ문화학과',
    value: '독일어문ㆍ문화학과',
  },
  {
    id: '5',
    label: '프랑스어문ㆍ문학과',
    value: '프랑스어문ㆍ문학과',
  },
  {
    id: '6',
    label: '일본어문ㆍ문학과',
    value: '일본어문ㆍ문학과',
  },
  {
    id: '7',
    label: '중국어문ㆍ문학과',
    value: '중국어문ㆍ문학과',
  },
  {
    id: '8',
    label: '사학과',
    value: '사학과',
  },
  {
    id: '9',
    label: '정치외교학과',
    value: '정치외교학과',
  },
  {
    id: '9',
    label: '정치외교학과',
    value: '정치외교학과',
  },
  {
    id: '10',
    label: '심리학과',
    value: '심리학과',
  },
  {
    id: '11',
    label: '지리학과',
    value: '지리학과',
  },
  {
    id: '12',
    label: '경제학과',
    value: '경제학과',
  },
  {
    id: '13',
    label: '경영학과',
    value: '경영학과',
  },
  {
    id: '14',
    label: '경영학부',
    value: '경영학부',
  },
];

type RootStackParamList = {
  SignUpComplete: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function MajorSelect({navigation}: Props) {
  const [radioButtons, setRadioButtons] =
    useState<RadioButtonProps[]>(majorOptionData);

  const [selected, isSelected] = useState<boolean>(false);

  function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
    setRadioButtons(radioButtonsArray);
    isSelected(true);
  }

  return (
    <>
      <Container>
        <TextContainer>
          <BigOneLineText>소속 학과를 선택해주세요</BigOneLineText>
        </TextContainer>
      </Container>
      <MajorContainer>
        <>
          <RadioContainer>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={onPressRadioButton}
            />
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
        </>
      </MajorContainer>
    </>
  );
}
