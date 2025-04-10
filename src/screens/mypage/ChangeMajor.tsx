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
import {getMajorList, register} from '../../common/authApi';
import Major from '../../classes/Major';
import {changeMajor} from '../../common/myPageApi';
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
    // fontFamily: 'SpoqaHanSansNeo-Regular',
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
  ChangeMajor: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function ChangeMajor({navigation}: Props) {
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
              text="변경하기"
              onClick={async () => {
                let result: string = await changeMajor(selectedMajorId);
                if (result === 'UPDATE_DEPARTMENT_SUCCESS') {
                  setTimeout(function () {
                    Toast.show(
                      '소속 학과가 성공적으로 변경되었습니다.',
                      Toast.SHORT,
                    );
                  }, 100);
                  navigation.pop();
                } else if (result === 'DEPARTMENT_NOT_FOUND') {
                  setTimeout(function () {
                    Toast.show('학과 정보를 찾을 수 없습니다.', Toast.SHORT);
                  }, 100);
                } else {
                  setTimeout(function () {
                    Toast.show('학과 변경에 실패하였습니다.', Toast.SHORT);
                  }, 100);
                }
              }}
            />
          ) : (
            <DisabledPurpleRoundButton text="변경하기" />
          )}
        </ButtonContainer>
      </View>
    </>
  );
}
