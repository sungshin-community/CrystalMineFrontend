import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, ScrollView} from 'react-native';
import { sendEmail } from '../../common/authApi';
import { PurpleRoundButton } from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeFragment = () => {
  const [nickname, setNickname] = useState<string>('익명');
  useEffect(() => {
    async function getNickname() {
      const nickname = await AsyncStorage.getItem("nickname");
      if (nickname != null) {
        setNickname(nickname);
      }
    }
    getNickname();
    
  }, []);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View>
        <View style={{ backgroundColor: '#F7F7F7', marginHorizontal: 12, borderRadius: 20, marginTop: 12}}>
          <View style={{ borderRadius: 20, marginLeft: 32, marginTop: 32, marginBottom: 32}}><Text style={{fontSize: 22}}>{`${nickname} 님, 안녕하세요!`}</Text></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeFragment;
