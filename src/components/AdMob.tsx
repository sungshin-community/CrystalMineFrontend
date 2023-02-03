import {View} from 'react-native';
import React from 'react';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

export default function AdMob() {
  return (
    <View style={{alignItems:'center', marginBottom: 16, marginTop: 16}}>
      <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.BANNER} />
    </View>
  );
}
