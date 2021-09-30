import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Button,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PurpleRoundButton, WhiteRoundButton} from '../components/Button';
import Logo from '../../resources/icon/Logo';

type RootStackParamList = {
  TermAgree: undefined;
  SignInID: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;
const Home = ({navigation}: Props) => {
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 3}}>
        <Logo />
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <PurpleRoundButton
          text="로그인"
          onClick={() => navigation.navigate('SignInID')}
        />
        <View style={{marginTop: 16}}>
          <WhiteRoundButton
            text="회원가입"
            onClick={() => navigation.navigate('TermAgree')}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;
