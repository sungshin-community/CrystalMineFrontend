import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {StatusBar, View, Dimensions} from 'react-native';
import {BigOneLineText, Description} from '../../components/Top';
import {
  DisabledPurpleRoundButton,
  PurpleRoundButton,
} from '../../components/Button';
import {MajorRow} from '../../components/MajorRow';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { getMajorList } from '../../common/auth';
import Major from '../../classes/Major';

StatusBar.setBackgroundColor('white');
// StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const Container = styled.View`
  padding-bottom: 32px;
  background-color: #ffffff;
  padding: 37px 24px;
`;

const RadioContainer = styled.ScrollView`
  margin: 24px 12px;
`;

const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  bottom: 21px;
  margin-top: 32px;
`;

type RootStackParamList = {
  SignUpComplete: undefined;
  MajorSelect: {userId: string, password: string, nickname: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function MajorSelect({navigation, route}: Props) {
  const [yourMajor, setYourMajor] = useState('');
  const [selected, isSelected] = useState<boolean>(false);
  const [majorList, setMajorList] = useState<Major[]>([]);

  useEffect(() => {
    async function getList() {
      const list = await getMajorList();
      console.log(list);
      setMajorList(list);
    }
    getList();
    // console.log(majorList);
  //  signUp(signUpDto);
    
  }, []);

  console.log("id는", route.params.userId);
  console.log("비번은", route.params.password);
  console.log("닉네임은", route.params.nickname);

  const selectMajor = (major: string) => {
    isSelected(true);
    setYourMajor(major);
  };

  return (
    <>
      <View style={{width: Dimensions.get('window').width / 7 * 6, height: 4, backgroundColor: '#A055FF'}} />
      <Container>
        <BigOneLineText style={{marginBottom: 7}}>
          소속 학과를 선택해주세요
        </BigOneLineText>
        <Description style={{textDecorationLine: 'underline'}}>
          소속 학과가 선택지에 없나요?
        </Description>
      </Container>
      <View style={{flex: 1}}>
        <RadioContainer>
          {selected
            ? majorList.map(major =>
                major.name === yourMajor ? (
                  <MajorRow
                    major={major}
                    selectMajor={selectMajor}
                    style={{color: '#a055ff'}}
                  />
                ) : (
                  <MajorRow
                    major={major}
                    selectMajor={selectMajor}
                    style={{color: '#000000'}}
                  />
                ),
              )
            : majorList.map(major => (
                <MajorRow
                  major={major}
                  selectMajor={selectMajor}
                  style={{color: '#000000'}}
                />
              ))}
        </RadioContainer>
        <ButtonContainer>
          {selected ? (
            <PurpleRoundButton
              text="회원가입"
              onClick={() => navigation.navigate('SignUpComplete')}
            />
          ) : (
            <DisabledPurpleRoundButton text="회원가입" />
          )}
        </ButtonContainer>
      </View>
    </>
  );
}
