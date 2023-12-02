import React from 'react';
import {SafeAreaView, Text, View, Image} from 'react-native';
interface Props {
  status?: number;
  code?: string;
}
const Error = ({status, code}: Props) => {
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
          source={require('../../resources/images/NoComment.png')}
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
          <Text>{status || ''}</Text>
          {` ERROR\n`}
          앗, 에러가 발생했어요!{`\n`}
          빠른 시일 내에 해결하겠습니다!{`\n`}
          {`\n`}
          <Text style={{color: '#CCCCCC'}}>error code: {code || ''}</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Error;
