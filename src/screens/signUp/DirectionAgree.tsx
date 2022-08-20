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
} from '../../components/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TwoLineTitle, SmallText} from '../../components/Top';
import {Container} from '../../components/Container';
import {SpreadButton, FoldButton} from '../../../resources/icon/Button';
import {
  RoundChecked,
  RoundUnchecked,
  Unchecked,
  Checked,
} from '../../../resources/icon/CheckBox';
import {
  AgreementContainer,
  DirectionContainer,
} from '../../components/HideToggleContainer';
import Agreement, {DirectionAgreement} from '../../classes/Agreement';
import {
  getAgreements,
  getDirectionAgreements,
  logout,
  sendEmail,
} from '../../common/authApi';
import {getContractGuide, getSignUpDirection} from '../../common/contractApi';
import {ModalBottom} from '../../components/ModalBottom';
import {getHundredsDigit} from '../../common/util/statusUtil';
type RootStackParamList = {
  SplashHome: undefined;
  SignUpId: {agreementIds: number[]};
  RegularMemberAuth: undefined;
  PortalVerificationMethodGuide: undefined;
  ErrorScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;
function DirectionAgree({navigation, route}: Props) {
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [isCoolTime, setIsCoolTime] = useState<boolean>(false);

  const handleChange = (id: number) => {
    const agreementList = agreements.map((a, index) =>
      index === id ? {...a, checked: !a.checked} : a,
    );
    setAgreements(agreementList);
  };

  useEffect(() => {
    async function init() {
      const agreementList = await getSignUpDirection();
      agreementList.map(a => (a.checked = false));
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
                  alignItems: 'center',
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
                  <RoundChecked style={styles.wholeAgreeCheckBox} />
                ) : (
                  <RoundUnchecked style={styles.wholeAgreeCheckBox} />
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
                <AgreementContainer
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
                const thisYear = new Date().getFullYear();
                const studentId = route.params.studentId;
                let year: number = 0;
                year = +studentId.substring(0, 4);
                if (
                  studentId.length === 8 &&
                  year >= 2008 &&
                  year <= thisYear
                ) {
                  let result = await sendEmail();
                  if (result.status === 401) {
                    logout();
                    navigation.reset({routes: [{name: 'SplashHome'}]});
                  } else if (getHundredsDigit(result.status) === 2) {
                    Toast.show('메일을 성공적으로 전송했습니다.', Toast.SHORT);
                    navigation.navigate('RegularMemberAuth');
                  } else if (result.data.code === 'AUTH_COOL_TIME_LIMIT') {
                    console.log('이메일 발송 실패');
                    setIsCoolTime(true);
                  } else if (
                    result.data.code === 'PORTAL_VERIFICATION_NOT_COMPLETED'
                  ) {
                    // 이 로직 탈 경우는 없지만 혹시 모르니 추가함
                    navigation.navigate('PortalVerificationMethodGuide');
                  } else navigation.navigate('ErrorScreen');
                } else {
                  navigation.navigate('PortalVerificationMethodGuide');
                }
              }}
            />
          ) : (
            <DisabledPurpleRoundButton text="다음" />
          )}
        </View>
        {isCoolTime && (
          <ModalBottom
            modalVisible={isCoolTime}
            setModalVisible={setIsCoolTime}
            content={`이전에 시도하신 인증이 실패하여,\n5분 뒤부터 재인증이 가능합니다.`}
            purpleButtonText="확인"
            purpleButtonFunc={() => navigation.goBack()}></ModalBottom>
        )}
      </View>
    </>
  );
}

export default DirectionAgree;
