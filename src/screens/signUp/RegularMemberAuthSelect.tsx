/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {
  View,
  StatusBar,
  StyleSheet,
  Platform,
  Dimensions,
  Text,
} from 'react-native';
import {TwoLineTitle, Description} from '../../components/Top';
import {PurpleRoundButton, WhiteRoundButton} from '../../components/Button';
import * as Animatable from 'react-native-animatable';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ModalBottom} from '../../components/ModalBottom';
if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('white');
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');
}

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 37px 24px;
`;

const ButtonCenter = styled.View`
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  textDescription: {
    marginTop: 15,
    lineHeight: 16.28,
  },
  buttonContainer: {
    backgroundColor: '#ffffff',
    paddingBottom: 34,
  },
});

type RootStackParamList = {
  DirectionAgree: {studentId: number};
  RegularMemberAuth: undefined;
  GlobalNavbar: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;
export default function RegularMemberAuthSelect({navigation, route}: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const modalBody = (
    <Text>
      나중에 정회원 인증하기를 선택하실 경우 {'\n'}[마이페이지-정회원인증]에서
      인증을 다시 진행할 수 있습니다.
    </Text>
  );
  return (
    <>
      <Container>
        <Animatable.Text
          animation="fadeInUp"
          delay={900}
          duration={1200}
          easing={'ease-in-out-quad'}>
          <TwoLineTitle
            firstLineText="정회원 인증을"
            secondLineText="진행하시겠어요?"
          />
        </Animatable.Text>
        <Animatable.Text
          animation="fadeIn"
          delay={2100}
          style={{marginTop: 15}}>
          <Description style={styles.textDescription}>
            가입 후 24시간 이내에 인증하지 않을 시{'\n'}
            보안을 위해 계정 정보가 삭제됩니다.
          </Description>
        </Animatable.Text>
        <Animatable.View animation="fadeIn" delay={2100}>
          <View
            style={{
              paddingHorizontal: Dimensions.get('window').width / 4,
              paddingVertical: Dimensions.get('window').height / 8,
            }}></View>
        </Animatable.View>
      </Container>
      <View style={styles.buttonContainer}>
        <Animatable.View animation="fadeIn" delay={2100}>
          <ButtonCenter>
            <View style={{margin: 16}}>
              <PurpleRoundButton
                text="지금 인증하기"
                onClick={() => {
                  navigation.navigate('DirectionAgree', {
                    studentId: route.params.studentId,
                  });
                }}
              />
            </View>
            <WhiteRoundButton
              text="다음에 인증하기"
              onClick={() => {
                console.log('click');
                setModalVisible(!modalVisible);
              }}
            />
          </ButtonCenter>
        </Animatable.View>
      </View>
      <ModalBottom
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        content={modalBody}
        isContentCenter={false}
        purpleButtonText="확인"
        purpleButtonFunc={() => {
          setModalVisible(false);
          navigation.reset({routes: [{name: 'GlobalNavbar'}]});
        }}
      />
    </>
  );
}
