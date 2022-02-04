import React, {useEffect, useState} from 'react';

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
import BackButton from '../../components/BackButton';
import {CommonActions} from '@react-navigation/native';

type RootStackParamList = {
  SplashHome: undefined;
  SignUpId: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;
function TermAgree({navigation}: Props) {
  const [firstTermChecked, setFirstTermChecked] = useState<boolean>(false);
  const [secondTermChecked, setSecondTermChecked] = useState<boolean>(false);
  const [firstTermSpread, setFirstTermSpread] = useState<boolean>(false);
  const [secondTermSpread, setSecondTermSpread] = useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (): React.ReactNode => (
        <BackButton
          onPress={() => navigation.dispatch(CommonActions.goBack())}
        />
      ),
    });
  }, [navigation]);

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

  const toggleTermArea = (changedComonent: string) => {
    if (changedComonent === 'firstTerm') {
      setFirstTermSpread(!firstTermSpread);
    } else {
      setSecondTermSpread(!secondTermSpread);
    }
  };

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
      <View
        style={{
          width: Dimensions.get('window').width / 7,
          height: 4,
          backgroundColor: '#A055FF',
        }}
      />
      <View style={{backgroundColor: 'white', flex: 1}}>
        <ScrollView style={{marginBottom: 45}}>
          <View>
            <View>
              <Container>
                <TwoLineTitle
                  firstLineText="이용 약관에 먼저"
                  secondLineText="동의해주세요"
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
                onPress={(e: any) =>
                  onClick(
                    e,
                    firstTermChecked && secondTermChecked
                      ? 'wholeDisagree'
                      : 'wholeAgree',
                  )
                }>
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
                <Text
                  style={{
                    fontSize: 15,
                    lineHeight: 56,
                    fontFamily: 'SpoqaHanSansNeo-Regular',
                  }}>
                  약관 전체 동의
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={(e: any) => toggleTermArea('firstTerm')}
                style={{
                  marginLeft: 35,
                  marginTop: 24,
                  marginRight: 41,
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 40,
                }}>
                <TouchableOpacity
                  style={{
                    height: 40,
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingLeft: 5,
                  }}
                  onPress={(e: any) => onChange('firstTerm')}>
                  {firstTermChecked ? (
                    <Checked
                      style={{marginRight: 16}}
                      // onPress={(e: any) => onChange('firstTerm')}
                    />
                  ) : (
                    <Unchecked
                      style={{marginRight: 16}}
                      // onPress={(e: any) => onChange('firstTerm')}
                    />
                  )}
                </TouchableOpacity>

                <SmallText>서비스 이용약관</SmallText>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    height: 16,
                    marginLeft: 5,
                  }}>
                  {firstTermSpread ? <FoldButton /> : <SpreadButton />}
                </View>
              </TouchableOpacity>
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
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  </Text>
                </ScrollView>
              )}

              <TouchableOpacity
                onPress={(e: any) => toggleTermArea('secondTerm')}
                style={{
                  marginLeft: 35,
                  marginTop: 5,
                  // marginBottom: 12,
                  marginRight: 41,
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 40,
                }}>
                <TouchableOpacity
                  style={{
                    height: 40,
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingLeft: 5,
                  }}
                  onPress={(e: any) => onChange('secondTerm')}>
                  {secondTermChecked ? (
                    <Checked
                      style={{marginRight: 16}}
                      // onPress={(e: any) => onChange('secondTerm')}
                    />
                  ) : (
                    <Unchecked
                      style={{marginRight: 16}}
                      // onPress={(e: any) => onChange('secondTerm')}
                    />
                  )}
                </TouchableOpacity>

                <SmallText>개인 정보 처리 방침</SmallText>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    height: 16,
                    marginLeft: 5,
                  }}>
                  {secondTermSpread ? <FoldButton /> : <SpreadButton />}
                </View>
              </TouchableOpacity>
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
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                    어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                  </Text>
                </ScrollView>
              )}
            </View>
          </View>
        </ScrollView>

        <View
          style={{bottom: 34, justifyContent: 'center', alignItems: 'center'}}>
          {firstTermChecked && secondTermChecked ? (
            <PurpleRoundButton
              text="다음"
              onClick={() => {
                navigation.navigate('SignUpId');
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

export default TermAgree;
