import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, Pressable, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fontBold, fontMedium, fontRegular} from '../../../common/font';
import {NoticeDto} from '../../../classes/mypage/NoticeDto';
import {getNotice} from '../../../common/myPageApi';
import PostItem from '../../../components/PostItem';
type RootStackParamList = {
  Notice: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

function Notice({navigation, route}: Props) {
  const [data, setData] = useState<NoticeDto>();

  useEffect(() => {
    async function getData() {
      const data = await getNotice(route.params.noticeId);
      setData(data);
      console.log(data);
    }
    getData();
  }, []);
  return (
    <SafeAreaView style={{backgroundColor: '#E5E5E5'}}>
      <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={[fontMedium, styles.title]}>{data?.title}</Text>
            {data?.isNew && (
              <View style={styles.newIcon}>
                <Text style={[fontBold, {color: '#FF6060', fontSize: 13}]}>
                  N
                </Text>
              </View>
            )}
          </View>
          <Text>{data?.content}</Text>
          <Text
            style={[
              fontRegular,
              {color: '#ADB3BC', fontSize: 12, marginTop: 12},
            ]}>
            {data?.createdAt}
          </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 16,
  },
  newIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  title: {
    fontSize: 15,
    color: '#222222',
  },
});

export default Notice;