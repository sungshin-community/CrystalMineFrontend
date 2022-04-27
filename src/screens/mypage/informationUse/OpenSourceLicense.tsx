import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fontBold, fontMedium, fontRegular} from '../../../common/font';
import NoticeListDto from '../../../classes/mypage/NoticeDto';
import { getNoticeList } from '../../../common/myPageApi';

import NoCommentSuryong from '../../../../resources/icon/custom/NoCommentSuryong';

type RootStackParamList = {
  Notice: { noticeId: number };
};
type Props = NativeStackScreenProps<RootStackParamList>;

function OpenSourceLicense({navigation}: Props) {
  const [list, setList] = useState<NoticeListDto[]>();

  useEffect(() => {
    async function getList() {
      const list = await getNoticeList(0);
      setList(list);
      console.log(list);
    }
    getList();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
       <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <NoCommentSuryong />
        <Text
          style={{
            color: '#6E7882',
            fontSize: 15,
            fontFamily: 'SpoqaHanSansNeo-Regular',
            textAlign: 'center',
            lineHeight: 22.5,
            marginTop: 20
          }}>
          아직 미완입니다.{"\n"}
          추후 출시 전에 채워 넣을 예정!
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default OpenSourceLicense;
