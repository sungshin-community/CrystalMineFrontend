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
  Notice: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

function NoticeList({navigation}: Props) {
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
      {list?.map(item => (
        <>
          <View style={styles.menuContainer} key={item.id}>
            <Pressable
              hitSlop={{top: 16}}
              onPress={() => navigation.navigate('Notice')}>
              <View style={styles.menu}>
                <Text style={[fontRegular, styles.menuText]}>
                  {item?.title}
                </Text>
                {item.isNew && (
                  <View style={styles.menuIcon}>
                    <Text style={[fontBold, {color: '#FF6060', fontSize: 13}]}>
                      N
                    </Text>
                  </View>
                )}
              </View>
              <Text
                style={[
                  fontRegular,
                  {color: '#ADB3BC', fontSize: 13, marginTop: 8},
                ]}>
                {item.createdAt}
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              borderBottomColor: '#F0F0F0',
              borderBottomWidth: 1,
            }}
          />
        </>
      ))}
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

export default NoticeList;
