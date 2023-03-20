import {View, Dimensions, Platform} from 'react-native';
import React from 'react';
import {BannerAd} from 'react-native-google-mobile-ads';
import Toast from 'react-native-simple-toast';

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
        unitId={
          Platform.OS === 'ios'
            ? 'ca-app-pub-3040874789822833/1483209695'
            : 'ca-app-pub-3040874789822833/5511737001'
          // 'ca-app-pub-3940256099942544/6300978111'
        }
        size={`${Math.floor(Dimensions.get('screen').width - 48)}x70`}
        onAdFailedToLoad={err => {
          setTimeout(function () {
            Toast.show(
              `광고가 정상적으로 작동하지 않습니다, ${err}`,
              Toast.SHORT,
            );
          }, 100);
        }}
      />
    </View>
  );
}
