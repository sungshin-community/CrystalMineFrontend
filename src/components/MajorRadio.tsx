import React, {useState} from 'react';
import styled from 'styled-components';
import {View, StyleSheet} from 'react-native';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import {DisabledPurpleRoundButton, PurpleRoundButton} from './Button';

// const majorOptions = [
//   '해당 없음',
//   '국어국문학과',
//   '영어영문학과',
//   '독일어문ㆍ문화학과',
//   '프랑스어문ㆍ문학과',
//   '일본어문ㆍ문학과',
//   '중국어문ㆍ문학과',
//   '사학과',
//   '정치외교학과',
//   '심리학과',
//   '지리학과',
//   '경제학과',
//   '경영학과',
//   '경영학부',
//   '미디어커뮤니케이션학과',
//   '사회복지학과',
//   '법학부',
//   '수학과',
//   '통계학과',
//   'IT학부',
//   '화학과',
//   '생명과학·화학부',
//   '수리통계데이터사이언스학부',
//   '화학·에너지융합학부',
//   '청정융합에너지공학과',
//   '바이오생명공학과',
//   '바이오식품공학과',
//   '융합보안공학과',
//   '컴퓨터공학과',
//   '정보시스템공학과',
//   '서비스디자인공학과',
//   'AI융합학부',
//   '간호학과',
//   '스포츠레저학과',
//   '운동재활복지학과',
//   '글로벌의과학과',
//   '식품영양학과',
//   '바이오신약의과학부',
//   '바이오헬스융합학부',
//   '스포츠과학부',
//   '글로벌비즈니스학과',
//   '의류산업학과',
//   '뷰티산업학과',
//   '소비자생활문화산업학과',
//   '교육학과',
//   '사회교육과',
//   '윤리교육과',
//   '한문교육과',
//   '유아교육과',
//   '동양화과',
//   '서양화과',
//   '조소과',
//   '공예과',
//   '산업디자인과',
//   '성악과',
//   '기악과',
//   '작곡과',
//   '문화예술경영학과',
//   '미디어영상연기학과',
//   '현대실용음악학과',
//   '무용예술학과',
// ];

const radioButtonsData: RadioButtonProps[] = [
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

export default function MajorRadio() {
  const [radioButtons, setRadioButtons] =
    useState<RadioButtonProps[]>(radioButtonsData);

  const [selected, isSelected] = useState<boolean>(false);

  const Container = styled.ScrollView`
    margin: 24px 12px;
  `;

  const styles = StyleSheet.create({
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 25,
    },
  });

  function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
    setRadioButtons(radioButtonsArray);
    isSelected(true);
  }

  return (
    <>
      <Container>
        <RadioGroup radioButtons={radioButtons} onPress={onPressRadioButton} />
      </Container>
      <View style={styles.buttonContainer}>
        {selected ? (
          <PurpleRoundButton text="회원가입" />
        ) : (
          <DisabledPurpleRoundButton text="회원가입" />
        )}
      </View>
    </>
  );
}
