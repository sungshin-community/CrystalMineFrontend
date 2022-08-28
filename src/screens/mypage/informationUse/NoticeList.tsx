import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fontBold, fontMedium, fontRegular} from '../../../common/font';
import NoticeListDto from '../../../classes/mypage/NoticeDto';
import {getNoticeList} from '../../../common/myPageApi';
import WaterMark from '../../../components/WaterMark';
type RootStackParamList = {
  Notice: {noticeId: number};
};
type Props = NativeStackScreenProps<RootStackParamList>;

function NoticeList({navigation}: Props) {
  const [list, setList] = useState<NoticeListDto[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    async function getList() {
      const list = await getNoticeList(0);
      setList(list);
      console.log(list);
    }
    getList();
  }, []);

  const handleRefresh = async () => {
    const postList = await getNoticeList(0);
    setList(postList);
  };

  const fetchNextPage = async () => {
    let thisPagePostList: NoticeListDto[] = await getNoticeList(
      currentPage + 1,
    );
    setList(list?.concat(thisPagePostList));
    if (thisPagePostList.length > 0) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <>
      <WaterMark/>
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}>
        <ActivityIndicator
          size="large"
          color={'#A055FF'}
          animating={isLoading}
          style={{zIndex: 100}}
        />
      </View>
      {list?.length === 0 ? (
        <SafeAreaView style={{flex: 1, backgroundColor: '#E5E5E5'}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#6E7882',
                fontSize: 15,
                fontFamily: 'SpoqaHanSansNeo-Regular',
                textAlign: 'center',
                lineHeight: 22.5,
                marginTop: 20,
              }}>
              {isLoading ? '' : '회원님께 해당되는\n이용 제한 내역이 없습니다.'}
            </Text>
          </View>
        </SafeAreaView>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{flex: 1, backgroundColor: '#E5E5E5'}}
          data={list}
          renderItem={({item, index}) => (
            <View key={item.id}>
              <View style={styles.menuContainer}>
                <Pressable
                  hitSlop={{top: 16}}
                  onPress={() =>
                    navigation.navigate('Notice', {noticeId: item.id})
                  }>
                  <View style={styles.menu}>
                    <Text
                      ellipsizeMode={'tail'}
                      numberOfLines={1}
                      style={[fontMedium, styles.menuText]}>
                      {item?.title}
                    </Text>
                    {item.isNew && (
                      <View style={styles.menuIcon}>
                        <Text
                          style={[fontBold, {color: '#FF6060', fontSize: 13}]}>
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
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View style={{height: 1, backgroundColor: '#F6F6F6'}}></View>
          )}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={['#A055FF']} // for android
              tintColor={'#A055FF'} // for ios
            />
          }
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.8}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
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
    width: Dimensions.get('window').width - 70,
  },
});

export default NoticeList;
