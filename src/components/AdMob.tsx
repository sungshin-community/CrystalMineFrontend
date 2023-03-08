import {View} from 'react-native';
import React from 'react';
import {BannerAd} from 'react-native-google-mobile-ads';

export default function AdMob() {
  return (
    <View style={{alignItems:'center', marginBottom: 16, marginTop: 16}}>
      <BannerAd unitId="ca-app-pub-3040874789822833/1483209695" size="320x70" />
    </View>
  );
}
