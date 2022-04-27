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
import {getNoticeList} from '../../../common/myPageApi';
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
    <ScrollView>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    paddingVertical: 16,
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
  menuIcon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  menu: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  menuText: {
    fontSize: 15,
    color: '#222222',
  },
});

export default OpenSourceLicense;
