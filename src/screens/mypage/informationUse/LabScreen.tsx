import React from 'react';
import {SafeAreaView, Text, View, Dimensions, Image} from 'react-native';
const LabScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: 150,
            height: 150,
          }}
          source={require('../../../../resources/images/Lab.png')}
        />
        <Text
          style={{
            color: '#6E7882',
            fontSize: 15,
            fontFamily: 'SpoqaHanSansNeo-Regular',
            textAlign: 'center',
            lineHeight: 22.5,
            marginTop: 20,
          }}>
          두근두근 수정광산 실험실!{'\n'}
          어떤 기능들이 준비되고 있을까요?
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LabScreen;
