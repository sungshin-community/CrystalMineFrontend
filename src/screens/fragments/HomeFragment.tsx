import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import { sendEmail } from '../../common/authApi';
import { PurpleRoundButton } from '../../components/Button';

const HomeFragment = () => {
  return (
    <SafeAreaView>
      <View style={{alignItems: 'center'}}>
        <Text>home page</Text>
        <PurpleRoundButton text='정회원 인증받기' onClick={async () => {
          await sendEmail();
        }} />
      </View>
    </SafeAreaView>
  );
};

export default HomeFragment;
