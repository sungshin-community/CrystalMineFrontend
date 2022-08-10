/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  GestureResponderEvent,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {
  PurpleRoundButton,
  DisabledPurpleRoundButton,
} from '../../../components/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TwoLineTitle, SmallText} from '../../../components/Top';
import {Container} from '../../../components/Container';
import {SpreadButton, FoldButton} from '../../../../resources/icon/Button';
import {
  RoundChecked,
  RoundUnchecked,
  Unchecked,
  Checked,
} from '../../../../resources/icon/CheckBox';
import {DirectionContainer} from '../../../components/HideToggleContainer';
import Agreement, {DirectionAgreement} from '../../../classes/Agreement';
import {
  getAgreements,
  getDirectionAgreements,
  sendEmail,
} from '../../../common/authApi';
import {
  getContractGuide,
  getSignUpDirection,
} from '../../../common/contractApi';
import {ModalBottom} from '../../../components/ModalBottom';
type RootStackParamList = {
  SplashHome: undefined;
  SignUpId: {agreementIds: number[]};
  RegularMemberAuthMyPage: undefined;
  MyPage: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;
function DirectionAgreeMyPage({navigation}: Props) {
  const [firstTermChecked, setFirstTermChecked] = useState<boolean>(false);
  const [secondTermChecked, setSecondTermChecked] = useState<boolean>(false);
  const [agreements, setAgreements] = useState<DirectionAgreement[]>([]);
  const [isCoolTime, setIsCoolTime] = useState<boolean>(false);

  const onClick = (e: GestureResponderEvent, clickedComponent: string) => {
    if (clickedComponent === 'wholeAgree') {
      setFirstTermChecked(true);
      setSecondTermChecked(true);
    } else if (clickedComponent === 'wholeDisagree') {
      setFirstTermChecked(false);
      setSecondTermChecked(false);
    }
  };

  const handleChange = (id: number, checked: boolean) => {
    console.log('hangleChange 호출됨. key는', id);
    const agreementList = agreements.map(a =>
      a.id === id ? {...a, checked: checked} : a,
    );
    setAgreements(agreementList);
  };

  useEffect(() => {
    async function init() {
      const agreementList = await getSignUpDirection();
      setAgreements(agreementList);
    }
    init();
  }, []);

  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('white');
    // StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content');
  }

  let styles = StyleSheet.create({
    text: {color: '#FFFFFF', fontFamily: 'SpoqaHanSansNeo-Regular'},
    nextButton: {
      backgroundColor:
        firstTermChecked && secondTermChecked ? '#A055FF' : '#e5d2fc',
      color: '#FFFFFF',
      width: 343,
      height: 56,
      borderRadius: 10,
    },
    wholeAgreeCheckBox: {
      marginTop: 16,
      marginLeft: 16,
      marginBottom: 16,
      marginRight: 13,
    },
  });

  return (
    <>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <ScrollView style={{marginBottom: 45}}>
          <View>
            <View>
              <Container>
                <TwoLineTitle
                  firstLineText="먼저 수정광산의"
                  secondLineText="이용방향을 확인해주세요."
                />
              </Container>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  height: 56,
                  backgroundColor: '#F6F6F6',
                  marginLeft: 24,
                  marginRight: 24,
                  borderRadius: 10,
                  marginTop: 31,
                }}
                onPress={(e: any) => {
                  let agreementList = agreements.slice();
                  agreements.filter(a => a.checked).length == agreements.length
                    ? agreementList.forEach(a => (a.checked = false))
                    : agreementList.forEach(a => (a.checked = true));
                  setAgreements(agreementList);
                }}>
                {agreements.length > 0 &&
                agreements.filter(a => a.checked).length ==
                  agreements.length ? (
                  <RoundChecked
                    style={styles.wholeAgreeCheckBox}
                    onPress={(e: any) => onClick(e, 'wholeAgree')}
                  />
                ) : (
                  <RoundUnchecked
                    style={styles.wholeAgreeCheckBox}
                    onPress={(e: any) => onClick(e, 'wholeAgree')}
                  />
                )}
                <Text
                  style={{
                    fontSize: 15,
                    lineHeight: 56,
                    fontFamily: 'SpoqaHanSansNeo-Regular',
                  }}>
                  이용 방향 전체 확인
                </Text>
              </TouchableOpacity>
              {agreements.map((a, index) => (
                <DirectionContainer
                  key={index}
                  id={index}
                  title={a.title}
                  content={a.content}
                  checked={a.checked}
                  onChange={handleChange}
                />
              ))}
            </View>
          </View>
        </ScrollView>

        <View
          style={{bottom: 34, justifyContent: 'center', alignItems: 'center'}}>
          {agreements.length > 0 &&
          agreements.filter(a => a.checked).length == agreements.length ? (
            <PurpleRoundButton
              text="다음"
              onClick={async () => {
                let result: string = await sendEmail();
                if (result === 'ok') {
                  Toast.show('메일을 성공적으로 전송했습니다.', Toast.SHORT);
                  navigation.navigate('RegularMemberAuthMyPage');
                } else {
                  console.log('이메일 발송 실패');
                  setIsCoolTime(true);
                }
              }}
            />
          ) : (
            <DisabledPurpleRoundButton text="다음" />
          )}
        </View>
      </View>
      {isCoolTime && (
        <ModalBottom
          modalVisible={isCoolTime}
          setModalVisible={setIsCoolTime}
          content={`이전에 시도하신 인증이 실패하여,\n5분 뒤부터 재인증이 가능합니다.`}
          purpleButtonText="확인"
          purpleButtonFunc={() => navigation.navigate('MyPage')}></ModalBottom>
      )}
    </>
  );
}

export default DirectionAgreeMyPage;
