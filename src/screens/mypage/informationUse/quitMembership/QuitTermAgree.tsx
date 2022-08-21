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
import {
  PurpleRoundButton,
  DisabledPurpleRoundButton,
} from '../../../../components/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TwoLineTitle} from '../../../../components/Top';
import {Container} from '../../../../components/Container';
import {
  RoundChecked,
  RoundUnchecked,
} from '../../../../../resources/icon/CheckBox';
import {AgreementContainer} from '../../../../components/HideToggleContainer';
import Agreement from '../../../../classes/Agreement';
import {getAgreements, getQuitAgreements} from '../../../../common/authApi';

type RootStackParamList = {
  SplashHome: undefined;
  QuitPassword: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;
function QuitTermAgree({navigation}: Props) {
  const [firstTermChecked, setFirstTermChecked] = useState<boolean>(false);
  const [secondTermChecked, setSecondTermChecked] = useState<boolean>(false);
  const [firstTermSpread, setFirstTermSpread] = useState<boolean>(false);
  const [secondTermSpread, setSecondTermSpread] = useState<boolean>(false);
  const [agreements, setAgreements] = useState<Agreement[]>([]);

  const onClick = (e: GestureResponderEvent, clickedComponent: string) => {
    if (clickedComponent === 'firstTerm') {
      setFirstTermSpread(!firstTermSpread);
    } else if (clickedComponent === 'secondTerm') {
      setSecondTermSpread(!secondTermSpread);
    } else if (clickedComponent === 'wholeAgree') {
      setFirstTermChecked(true);
      setSecondTermChecked(true);
    } else if (clickedComponent === 'wholeDisagree') {
      setFirstTermChecked(false);
      setSecondTermChecked(false);
    }
  };

  const handleChange = (id: number, checked: boolean) => {
    console.log('handleChange 호출됨. key는', id);
    const agreementList = agreements.map(a =>
      a.id === id ? {...a, checked: checked} : a,
    );
    setAgreements(agreementList);
  };

  useEffect(() => {
    async function init() {
      const agreementList = await getQuitAgreements();
      agreementList.map(a => (a.checked = false));
      setAgreements(agreementList);
      for (let i = 0; i < 2; i++) {
        console.log(
          agreements[i].title,
          agreements[i].checked,
        );
      }
    }
    init();
  }, []);

  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('white');
    // StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content');
  }

  const styles = StyleSheet.create({
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
    <View style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView style={{marginBottom: 45}}>
        <View>
          <View>
            <Container>
              <TwoLineTitle
                firstLineText="회원 탈퇴 전"
                secondLineText="꼭 확인해 주세요"
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
                alignItems: 'center'
              }}
              onPress={(e: any) => {
                let agreementList = agreements.slice();
                agreements.filter(a => a.checked).length === agreements.length
                  ? agreementList.forEach(a => (a.checked = false))
                  : agreementList.forEach(a => (a.checked = true));
                setAgreements(agreementList);
              }}>
              {agreements.length > 0 &&
              agreements.filter(a => a.checked).length == agreements.length ? (
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
                주의사항 확인 및 동의
              </Text>
            </TouchableOpacity>
            {agreements.map((a, index) => (
              <AgreementContainer
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
            onClick={() => {
              navigation.navigate('QuitPassword');
            }}
          />
        ) : (
          <DisabledPurpleRoundButton text="다음" />
        )}
      </View>
    </View>
  );
}

export default QuitTermAgree;
