import React, { useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  GestureResponderEvent,
  Button,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import CustomButton, {
  WhiteRoundButton,
  PurpleRoundButton,
  DisabledPurpleRoundButton,
  PurpleFullButton,
  DisabledWhiteRoundButton,
  DisabledPurpleFullButton
} from '../../components/Button';
import { BigTwoLineText, TwoLineTitle, Description, SmallText, NormalText } from '../../components/Top';


import { Container } from '../../components/Container';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Timer from '../../components/Timer';

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingLeft: 42
      },
      input: {
        width: 40,
        height: 55,
        marginRight: 10,
        borderColor: "#A055FF",
        borderWidth: 0,
        borderBottomWidth: 2,
        fontSize: 45,
        paddingLeft: 5
  
      }
});

const RegularMemberAuth = () => {
  return (
    
    <SafeAreaView>
        <View style={{ marginTop: 130, marginBottom: 52 }}>
            <Container>
            <TwoLineTitle firstLineText="메일로 전송된" secondLineText="인증번호를 입력해주세요"></TwoLineTitle>
            </Container>
            <View style={styles.container} >
                <View style={{flexDirection: 'row'}}>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                />
                </View>
            </View>
            <Timer></Timer>
            
        </View>
        <View style={{ marginTop: '73%'}}>
            <DisabledPurpleFullButton text='인증 완료' />    
        </View>
    </SafeAreaView>
    
  );
};
export default RegularMemberAuth;