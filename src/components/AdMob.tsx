import {View, Dimensions} from 'react-native';
import React from 'react';
import {BannerAd, TestIds} from 'react-native-google-mobile-ads';

export default function AdMob() {
  return (
    <View
      style={{
        alignItems: 'center',
        marginVertical: 16,
        marginHorizontal: 24,
        borderRadius: 10,
        height: 70,
        overflow: 'hidden',
      }}>
      <BannerAd
        unitId={TestIds.BANNER}
        size={`${Math.floor(Dimensions.get('screen').width - 48)}x70`}
      />
    </View>
  );
}
