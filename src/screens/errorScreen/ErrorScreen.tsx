import React from 'react';
import {SafeAreaView, Text, View, Dimensions} from 'react-native';
import NoCommentSuryong from '../../../resources/icon/custom/NoCommentSuryong';
const ErrorScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <NoCommentSuryong/>
        <Text
          style={{
            color: '#6E7882',
            fontSize: 15,
            fontFamily: 'SpoqaHanSansNeo-Regular',
            textAlign: 'center',
            lineHeight: 22.5,
            marginTop: 20
          }}>
          ERROR{"\n"}
          개발팀 열일 중!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ErrorScreen;
