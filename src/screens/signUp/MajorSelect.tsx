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
import { getMajorList, register } from '../../common/auth';
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
  const [majorList, setMajorList] = useState<Major[]>([]);
  const [selectedMajorId, setSelectedMajorId] = useState<number>(-1);

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

  const selectMajor = (major: Major) => {
    setSelectedMajorId(major.id);
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
          {majorList.map((major, index) =>
                  <MajorRow
                    key={index}
                    major={major}
                    selectMajor={selectMajor}
                    style={{color: major.id === selectedMajorId ? '#a055ff' : '#000000'}}
                  />
                ,
              )
            }
        </RadioContainer>
        <ButtonContainer>
          {selectedMajorId !== -1 ? (
            <PurpleRoundButton
              text="회원가입"
              onClick={() => {
                  register({username: route.params.userId, password: route.params.password, nickname: route.params.nickname, departmentId: selectedMajorId, agreementIds: [3, 4]});
                  navigation.navigate('SignUpComplete')
                }
              }
            />
          ) : (
            <DisabledPurpleRoundButton text="회원가입" />
          )}
        </ButtonContainer>
      </View>
    </>
  );
}
