import {View, Dimensions, Platform, Text} from 'react-native';
import React from 'react';
import {BannerAd} from 'react-native-google-mobile-ads';
import Toast from 'react-native-simple-toast';

export default function AdMob() {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
        marginHorizontal: 24,
        borderRadius: 10,
        height: 70,
        width: Math.floor(Dimensions.get('screen').width - 48),
        overflow: 'hidden',
        backgroundColor: '#E1E4EA',
      }}>
      <BannerAd
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        unitId={
          Platform.OS === 'ios'
            ? 'ca-app-pub-3040874789822833/1483209695'
            : 'ca-app-pub-3040874789822833/5511737001'
          // 'ca-app-pub-3940256099942544/6300978111'
        }
        size={`${Math.floor(Dimensions.get('screen').width - 48)}x70`}
        onAdFailedToLoad={err => {
          console.error(err);
        }}
      />
    </View>
  );
}
