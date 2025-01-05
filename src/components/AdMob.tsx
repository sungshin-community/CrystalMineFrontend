import {View, Dimensions, Text} from 'react-native';
import React from 'react';
import {BannerAd} from 'react-native-google-mobile-ads';
import {Platform} from 'react-native';

export default function AdMob() {
  return (
    <View
      style={{
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        height: 70,
        overflow: 'hidden',
        backgroundColor: '#EFEFF3',
      }}>
      <BannerAd
        unitId={
          Platform.OS === 'ios'
            ? 'ca-app-pub-3040874789822833/1483209695'
            : 'ca-app-pub-3040874789822833/5511737001'
        }
        size={`${Math.floor(Dimensions.get('screen').width - 48)}x70`}
      />
      <Text>광고</Text>
    </View>
  );
}
