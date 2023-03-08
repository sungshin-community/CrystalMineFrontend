import {View, Dimensions} from 'react-native';
import React from 'react';
import {BannerAd} from 'react-native-google-mobile-ads';

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
        unitId="ca-app-pub-3040874789822833/1483209695"
        size={`${Math.floor(Dimensions.get('screen').width - 48)}x70`}
      />
    </View>
  );
}
