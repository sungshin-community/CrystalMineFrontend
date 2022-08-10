import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fontBold, fontMedium, fontRegular} from '../../../common/font';
import {getUsageRestrictions} from '../../../common/myPageApi';
import UsageRestrictionsDto from '../../../classes/mypage/UsageRestrictionsDto';
type RootStackParamList = {
  Announcement: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

function UsageRestrictions({navigation}: Props) {
  const [list, setList] = useState<UsageRestrictionsDto[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    async function getList() {
      const list = await getUsageRestrictions(0);
      setList(list);
    }
    getList();
  }, []);

  const handleRefresh = async () => {
      const postList = await getUsageRestrictions(0);
      setList(postList);
  };

  const fetchNextPage = async () => {
      let thisPagePostList: UsageRestrictionsDto[] = await getUsageRestrictions(
        currentPage + 1,
      );
      setList(list?.concat(thisPagePostList));
      if (thisPagePostList.length > 0) {
        setCurrentPage(currentPage + 1);
      }
  };

  return (
    <>
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
        <SafeAreaView style={{ flex: 1 }}>
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
              {isLoading
                ? ''
                : '회원님께 해당되는\n이용 제한 내역이 없습니다.'}
            </Text>
          </View>
        </SafeAreaView>
      ) : (
        <FlatList
          style={{ flex: 1, backgroundColor: '#F6F6F6' }}
          data={list}
          renderItem={({ item, index }) => (
            <View key={index}>
              <View style={styles.menuContainer}>
                <View style={[styles.menu]}>
                  <Text style={[fontRegular, styles.boardName]}>
                    {item.boardTitle}
                  </Text>
                  <View style={styles.menuIcon}>
                    <Text style={[fontRegular, styles.blindDate]}>
                      {item.blindedAt}
                    </Text>
                  </View>
                </View>
                <View style={[styles.menu, { marginTop: 5 }]}>
                  <Text style={[fontBold, styles.blindTitle]}>
                    {item.type === 'POST' ? '게시글 블라인드' : '댓글 블라인드'}
                  </Text>
                  <View style={styles.menuIcon}>
                    <Text style={[fontRegular, styles.points]}>
                      -{item.point} points
                    </Text>
                  </View>
                </View>
                <Text style={[fontRegular, styles.blindReason]}>
                  블라인드 사유 : {item.reason}
                </Text>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: '#F0F0F0' }}></View>
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
          onEndReachedThreshold={0.8} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    paddingVertical: 24,
    backgroundColor: 'white',
    paddingHorizontal: 32,
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
  boardName: {
    fontSize: 13,
    color: '#222222',
  },
  blindDate: {
    color: '#6E7882',
    fontSize: 12,
  },
  blindTitle: {
    color: '#222222',
    fontSize: 15,
  },
  points: {
    color: '#A055FF',
    fontSize: 13,
  },
  blindReason: {
    color: '#6E7882',
    fontSize: 13,
    marginTop: 12,
  },
});

export default UsageRestrictions;
