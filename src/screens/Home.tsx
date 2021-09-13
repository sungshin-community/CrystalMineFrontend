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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PurpleRoundButton, WhiteRoundButton } from '../components/Button';

type RootStackParamList = {
    Home: undefined;
    Profile: { userId: string };
    Feed: { sort: 'latest' | 'top' } | undefined;
  };
  
type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;
const Home = ({ navigation }: Props) => {
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 3}}>
          <Text>수정구</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <PurpleRoundButton
          text="로그인"
          onClick={() =>
            navigation.navigate('Profile', { userId: 'Jane' })
          }
        />
        <WhiteRoundButton
          text="회원가입"
          onClick={() =>
            navigation.navigate('Profile', { userId: 'Jane' })
          }
        />
        </View>
      </View>
    );
  };

  export default Home;