import React, {useState} from 'react';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  GestureResponderEvent,
  TouchableOpacity,
} from 'react-native';

import {
  PurpleRoundButton,
  DisabledPurpleRoundButton,
} from '../../components/Button';
import {TwoLineTitle, SmallText} from '../../components/Top';
import {Container} from '../../components/Container';
import {SpreadButton, FoldButton} from '../../../resources/icon/Button';
import {
  RoundChecked,
  RoundUnchecked,
  Unchecked,
  Checked,
} from '../../../resources/icon/CheckBox';

function TermAgree() {
  const [firstTermChecked, setFirstTermChecked] = useState<boolean>(false);
  const [secondTermChecked, setSecondTermChecked] = useState<boolean>(false);
  const [firstTermSpread, setFirstTermSpread] = useState<boolean>(false);
  const [secondTermSpread, setSecondTermSpread] = useState<boolean>(false);
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

  const onChange = (changedComonent: string) => {
    if (changedComonent === 'firstTerm') {
      setFirstTermChecked(!firstTermChecked);
    } else {
      setSecondTermChecked(!secondTermChecked);
    }
  };

  StatusBar.setBackgroundColor('white');
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');
  let styles = StyleSheet.create({
    text: {color: '#FFFFFF', fontWeight: '400'},
    button: {backgroundColor: '#FF0000'},
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
      <ScrollView>
        <View>
          <View style={{width: 53.57, height: 4, backgroundColor: '#A055FF'}} />
          <View>
            <Container>
              <TwoLineTitle
                firstLineText="이용 약관에 먼저"
                secondLineText="동의해주세요"></TwoLineTitle>
            </Container>
            <View
              style={{
                flexDirection: 'row',
                height: 56,
                backgroundColor: '#F6F6F6',
                marginLeft: 24,
                marginRight: 24,
                borderRadius: 10,
                marginTop: 31,
              }}>
              {firstTermChecked && secondTermChecked ? (
                <RoundChecked
                  style={styles.wholeAgreeCheckBox}
                  onPress={(e: any) => onClick(e, 'wholeDisagree')}
                />
              ) : (
                <RoundUnchecked
                  style={styles.wholeAgreeCheckBox}
                  onPress={(e: any) => onClick(e, 'wholeAgree')}
                />
              )}
              <Text style={{fontSize: 15, lineHeight: 56}}>약관 전체 동의</Text>
            </View>
            <View
              style={{
                marginLeft: 40,
                marginTop: 24,
                marginBottom: 12,
                marginRight: 46,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {firstTermChecked ? (
                <Checked
                  style={{marginRight: 16}}
                  onPress={(e: any) => onChange('firstTerm')}
                />
              ) : (
                <Unchecked
                  style={{marginRight: 16}}
                  onPress={(e: any) => onChange('firstTerm')}
                />
              )}
              <SmallText>서비스 이용약관</SmallText>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                  height: 16,
                }}
                onPress={e => onClick(e, 'firstTerm')}>
                {firstTermSpread ? <FoldButton /> : <SpreadButton />}
              </TouchableOpacity>
            </View>
            {firstTermSpread && (
              <ScrollView
                style={{
                  height: 150,
                  marginLeft: 40,
                  marginRight: 40,
                  backgroundColor: '#F6F6F6',
                  padding: 20,
                }}
                nestedScrollEnabled={true}>
                <Text>
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구
                </Text>
              </ScrollView>
            )}

            <View
              style={{
                marginLeft: 40,
                marginTop: 24,
                marginBottom: 12,
                marginRight: 46,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {secondTermChecked ? (
                <Checked
                  style={{marginRight: 16}}
                  onPress={(e: any) => onChange('secondTerm')}
                />
              ) : (
                <Unchecked
                  style={{marginRight: 16}}
                  onPress={(e: any) => onChange('secondTerm')}
                />
              )}
              <SmallText>개인 정보 처리 방침</SmallText>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                  height: 16,
                }}
                onPress={e => onClick(e, 'secondTerm')}>
                {secondTermSpread ? <FoldButton /> : <SpreadButton />}
              </TouchableOpacity>
            </View>
            {secondTermSpread && (
              <ScrollView
                style={{
                  height: 150,
                  marginLeft: 40,
                  marginRight: 40,
                  backgroundColor: '#F6F6F6',
                  padding: 20,
                }}
                nestedScrollEnabled={true}>
                <Text>
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                </Text>
              </ScrollView>
            )}
          </View>
        </View>
      </ScrollView>
      <View
        style={{bottom: 21, justifyContent: 'center', alignItems: 'center'}}>
        {firstTermChecked && secondTermChecked ? (
          <PurpleRoundButton text="다음" />
        ) : (
          <DisabledPurpleRoundButton text="다음" />
        )}
      </View>
    </View>
  );
}

export default TermAgree;
