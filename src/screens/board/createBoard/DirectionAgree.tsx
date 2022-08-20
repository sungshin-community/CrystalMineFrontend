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
import {AgreementContainer} from '../../../components/HideToggleContainer';
import Agreement from '../../../classes/Agreement';
import {getBoardirectionAgreements} from '../../../common/boardApi';
import { getContractCreateBoard } from '../../../common/contractApi';
import WaterMark from '../../../components/WaterMark';

type RootStackParamList = {
  CreateBoard: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;
function TermAgreeCreateBoard({navigation}: Props) {
  const [agreements, setAgreements] = useState<Agreement[]>([]);

  const handleChange = (id: number) => {
    const agreementList = agreements.map((a, index) => index === id ? {...a, checked: !a.checked} : a);
    setAgreements(agreementList);
  };

  useEffect(() => {
    async function init() {
      const agreementList = await getContractCreateBoard();
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
      <WaterMark />
      <View style={{backgroundColor: 'white', flex: 1}}>
        <ScrollView style={{marginBottom: 45}}>
          <View>
            <View>
              <Container>
                <TwoLineTitle
                  firstLineText="게시판 생성 전"
                  secondLineText="다시 한번 확인해주세요."
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
                  />
                ) : (
                  <RoundUnchecked
                    style={styles.wholeAgreeCheckBox}
                  />
                )}
                <Text
                  style={{
                    fontSize: 15,
                    lineHeight: 56,
                    fontFamily: 'SpoqaHanSansNeo-Regular',
                  }}>
                  이용 방향 및 주의사항 전체 확인
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
              onClick={() => {
                navigation.navigate('CreateBoard');
              }}
            />
          ) : (
            <DisabledPurpleRoundButton text="다음" />
          )}
        </View>
      </View>
    </>
  );
}

export default TermAgreeCreateBoard;
