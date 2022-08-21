/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {
  StatusBar,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Platform,
  Pressable,
} from 'react-native';
import {NormalOneLineText, Description} from '../../components/Top';
import {
  DisabledPurpleRoundButton,
  PurpleRoundButton,
} from '../../components/Button';
import {MajorRow} from '../../components/MajorRow';
import {ModalBottom} from '../../components/ModalBottom';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getMajorList, logout, register} from '../../common/authApi';
import Major from '../../classes/Major';
import {getHundredsDigit} from '../../common/util/statusUtil';
import Toast from 'react-native-simple-toast';

if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('white');
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');
}

const Container = styled.View`
  padding-bottom: 32px;
  background-color: #ffffff;
  padding: 37px 24px;
  font-family: 'SpoqaHanSansNeo-Regular';
`;

const RadioContainer = styled.ScrollView`
  margin: 24px 12px;
`;

const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  bottom: 21px;
  margin-top: 32px;
  font-family: 'SpoqaHanSansNeo-Regular';
`;

const styles = StyleSheet.create({
  greyText: {
    color: '#797979',
    fontFamily: 'SpoqaHanSansNeo-Regular',
    fontSize: 13,
    lineHeight: 19.5,
  },
  blackText: {
    color: 'black',
  },
  paragraph: {
    flexDirection: 'row',
  },
});

type RootStackParamList = {
  SignUpComplete: {studentId: number};
  SplashHome: undefined;
  ErrorScreen: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function MajorSelect({navigation, route}: Props) {
  const [majorList, setMajorList] = useState<Major[]>([]);
  const [selectedMajorId, setSelectedMajorId] = useState<number>(-1);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    async function getList() {
      const list = await getMajorList();
      setMajorList(list);
    }
    getList();
  }, []);

  const selectMajor = (major: Major) => {
    setSelectedMajorId(major.id);
  };
  const modalBody = (
    <>
      <View style={styles.paragraph}>
        <Text style={styles.greyText}>1. 학과 리스트에서 </Text>
        <Text style={[styles.greyText, styles.blackText]}>
          임의 학과 선택 후 가입
        </Text>
      </View>
      <View style={styles.paragraph}>
        <Text style={styles.greyText}>2. 문의하기를 통해 </Text>
        <Text style={[styles.greyText, styles.blackText]}>학과 추가 요청</Text>
      </View>
      <View>
        <Text style={styles.greyText}>
          3. 학과 추가 안내를 받은 후, 마이페이지에서
        </Text>
        <Text style={[styles.greyText, styles.blackText]}>
          {'     '}학과 변경 진행
        </Text>
      </View>
    </>
  );

  return (
    <>
      {modalVisible && (
        <ModalBottom
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title={`소속 학과가 학과 리스트에 없을 경우,
아래 내용을 따라 이용 부탁드립니다.`}
          content={modalBody}
          isContentCenter={false}
          purpleButtonText="확인"
          purpleButtonFunc={() => setModalVisible(!modalVisible)}
        />
      )}
      <View
        style={{
          width: (Dimensions.get('window').width / 7) * 6,
          height: 4,
          backgroundColor: '#A055FF',
        }}
      />
      <Container>
        <NormalOneLineText style={{marginBottom: 7}}>
          소속 학과를 선택해주세요
        </NormalOneLineText>
        <Pressable onPress={() => setModalVisible(true)}>
          <Description style={{textDecorationLine: 'underline'}}>
            소속 학과가 선택지에 없나요?
          </Description>
        </Pressable>
      </Container>
      <View style={{flex: 1}}>
        <RadioContainer>
          {majorList.map((major, index) => (
            <MajorRow
              key={index}
              major={major}
              selectMajor={selectMajor}
              style={{
                color: major.id === selectedMajorId ? '#a055ff' : '#000000',
              }}
              selected={major.id === selectedMajorId}
            />
          ))}
        </RadioContainer>
        <ButtonContainer>
          {selectedMajorId !== -1 ? (
            <PurpleRoundButton
              text="회원가입"
              onClick={async () => {
                let result = await register({
                  username: route.params.userId,
                  password: route.params.password,
                  nickname: route.params.nickname,
                  departmentId: selectedMajorId,
                });
                if (result.status === 401) {
                  Toast.show(
                    '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                    Toast.SHORT,
                  );
                  logout();
                  navigation.reset({routes: [{name: 'SplashHome'}]});
                } else if (getHundredsDigit(result.status) === 2) {
                  navigation.reset({
                    routes: [
                      {
                        name: 'SignUpComplete',
                        params: {studentId: route.params.userId},
                      },
                    ],
                  });
                } else {
                  Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
                }
              }}
            />
          ) : (
            <DisabledPurpleRoundButton text="회원가입" />
          )}
        </ButtonContainer>
      </View>
    </>
  );
}
