import React, {useState} from 'react';
import styled from 'styled-components';
import {
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {BigOneLineText} from '../../components/Top';
import {
  DisabledPurpleRoundButton,
  PurpleRoundButton,
} from '../../components/Button';
import {Major} from '../../components/Major';
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
    bottom: 21,
    justifyContent: 'center',
    alignItems: 'center',
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
  {
    id: '15',
    name: '미디어커뮤니케이션학과',
    value: '미디어커뮤니케이션학과',
  },
  {
    id: '16',
    name: '사회복지학과',
    value: '사회복지학과',
  },
  {
    id: '17',
    name: '법학부',
    value: '법학부',
  },
  {
    id: '18',
    name: '수학과',
    value: '수학과',
  },
  {
    id: '19',
    name: '통계학과',
    value: '통계학과',
  },
  {
    id: '20',
    name: 'IT학부',
    value: 'IT학부',
  },
  {
    id: '21',
    name: '화학과',
    value: '화학과',
  },
  {
    id: '22',
    name: '생명과학·화학부',
    value: '생명과학·화학부',
  },
  {
    id: '23',
    name: '수리통계데이터사이언스학부',
    value: '수리통계데이터사이언스학부',
  },
  {
    id: '24',
    name: '화학·에너지융합학부',
    value: '화학·에너지융합학부',
  },
  {
    id: '25',
    name: '청정융합에너지공학과',
    value: '청정융합에너지공학과',
  },
  {
    id: '26',
    name: '바이오생명공학과',
    value: '바이오생명공학과',
  },
  {
    id: '27',
    name: '바이오식품공학과',
    value: '바이오식품공학과',
  },
  {
    id: '28',
    name: '융합보안공학과',
    value: '융합보안공학과',
  },
  {
    id: '29',
    name: '컴퓨터공학과',
    value: '컴퓨터공학과',
  },
  {
    id: '30',
    name: '정보시스템공학과',
    value: '정보시스템공학과',
  },
  {
    id: '31',
    name: '서비스디자인공학과',
    value: '서비스디자인공학과',
  },
  {
    id: '32',
    name: 'AI융합학부',
    value: 'AI융합학부',
  },
  {
    id: '33',
    name: '간호학과',
    value: '간호학과',
  },
  {
    id: '34',
    name: '스포츠레저학과',
    value: '스포츠레저학과',
  },
  {
    id: '35',
    name: '운동재활복지학과',
    value: '운동재활복지학과',
  },
  {
    id: '36',
    name: '글로벌의과학과',
    value: '글로벌의과학과',
  },
  {
    id: '37',
    name: '식품영양학과',
    value: '식품영양학과',
  },
  {
    id: '38',
    name: '바이오신약의과학부',
    value: '바이오신약의과학부',
  },
  {
    id: '39',
    name: '바이오헬스융합학부',
    value: '바이오헬스융합학부',
  },
  {
    id: '40',
    name: '스포츠과학부',
    value: '스포츠과학부',
  },
  {
    id: '41',
    name: '글로벌비즈니스학과',
    value: '글로벌비즈니스학과',
  },
  {
    id: '42',
    name: '의류산업학과',
    value: '의류산업학과',
  },
  {
    id: '43',
    name: '뷰티산업학과',
    value: '뷰티산업학과',
  },
  {
    id: '44',
    name: '소비자생활문화산업학과',
    value: '소비자생활문화산업학과',
  },
  {
    id: '45',
    name: '교육학과',
    value: '교육학과',
  },
  {
    id: '46',
    name: '사회교육과',
    value: '사회교육과',
  },
  {
    id: '47',
    name: '윤리교육과',
    value: '윤리교육과',
  },
  {
    id: '48',
    name: '한문교육과',
    value: '한문교육과',
  },
  {
    id: '49',
    name: '유아교육과',
    value: '유아교육과',
  },
  {
    id: '50',
    name: '동양화과',
    value: '동양화과',
  },
  {
    id: '51',
    name: '서양화과',
    value: '서양화과',
  },
  {
    id: '52',
    name: '조소과',
    value: '조소과',
  },
  {
    id: '53',
    name: '공예과',
    value: '공예과',
  },
  {
    id: '54',
    name: '산업디자인과',
    value: '산업디자인과',
  },
  {
    id: '55',
    name: '성악과',
    value: '성악과',
  },
  {
    id: '56',
    name: '기악과',
    value: '기악과',
  },
  {
    id: '57',
    name: '작곡과',
    value: '작곡과',
  },
  {
    id: '58',
    name: '문화예술경영학과',
    value: '문화예술경영학과',
  },
  {
    id: '59',
    name: '미디어영상연기학과',
    value: '미디어영상연기학과',
  },
  {
    id: '60',
    name: '현대실용음악학과',
    value: '현대실용음악학과',
  },
  {
    id: '61',
    name: '무용예술학과',
    value: '무용예술학과',
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
      <View
        style={{
          width: 321.42,
          height: 4,
          backgroundColor: '#A055FF',
        }}
      />
      <Container>
        <TextContainer>
          <BigOneLineText>소속 학과를 선택해주세요</BigOneLineText>
        </TextContainer>
      </Container>
      <MajorContainer>
        <RadioContainer>
          {selected
            ? majorOptionData
                //.forEach(major => major.name === yourMajor)
                .map(major =>
                  major.name === yourMajor ? (
                    <Major
                      major={major}
                      selectMajor={selectMajor}
                      style={{color: '#a055ff'}}
                    />
                  ) : (
                    <Major
                      major={major}
                      selectMajor={selectMajor}
                      style={{color: '#000000'}}
                    />
                  ),
                )
            : majorOptionData.map(major => (
                <Major
                  major={major}
                  selectMajor={selectMajor}
                  style={{color: '#000000'}}
                />
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
