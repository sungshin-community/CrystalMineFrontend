import React from 'react';
import {SafeAreaView, Text, View, Dimensions, Image} from 'react-native';
const MessageFragment = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
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
          source={require('../../../resources/images/NoComment.png')}
        />
        <Text
          style={{
            color: '#6E7882',
            fontSize: 15,
            fontFamily: 'SpoqaHanSansNeo-Regular',
            textAlign: 'center',
            lineHeight: 22.5,
            marginTop: 20
          }}>
          현재 개발 중인 기능입니다.{"\n"}
          추후 기능 개발 후 사용하실 수 있습니다.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default MessageFragment;
