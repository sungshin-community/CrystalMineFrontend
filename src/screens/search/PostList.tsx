import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  Text,
  Pressable,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  TouchableHighlightBase,
  TouchableHighlight,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {searchPosts, searchPostsInBoard} from '../../common/SearchApi';
import {useNavigation, useRoute} from '@react-navigation/native';
import {PostContent} from '../../classes/Search';
import SearchPostItem from '../../components/SearchPostItem';
import {ContentPreviewDto} from '../../classes/BoardDetailDto';
import WaterMark from '../../components/WaterMark';

interface Props {
  searchWord: string;
  boardId: number;
  boardName: string;
}
type RootStackParamList = {
  PostScreen: {postId: number};
  BoardSearch: {boardName: string};
  TotalSearchResult: {searchWord: string};
  PostSearchResult: {searchWord: string};
};
type NavigateProps = NativeStackScreenProps<RootStackParamList>;

export default function PostList({searchWord, boardId, boardName}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [myPostList, setMyPostList] = useState<ContentPreviewDto[]>([]);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      const response = await searchPostsInBoard(boardId, searchWord, 0, sortBy);
      const postLength = response.data.content.length;
      setCurrentPage(0);
      setMyPostList(postLength === 0 ? [] : response.data.content);
      setIsLoading(false);
    }
    init();
  }, [sortBy, searchWord]);

  const handleRefresh = async () => {
    const response = await searchPostsInBoard(boardId, searchWord, 0, sortBy);
    let postList = response.data.content;
    setCurrentPage(0);
    setMyPostList(postList);
  };

  const fetchNextPage = async () => {
    setIsNextPageLoading(true);
    const response = await searchPostsInBoard(
      boardId,
      searchWord,
      currentPage + 1,
      sortBy,
    );
    let thisPagePostList: ContentPreviewDto[] = response.data.content;
    setMyPostList(myPostList.concat(thisPagePostList));
    if (thisPagePostList.length > 0) {
      setCurrentPage(currentPage + 1);
    }
    setIsNextPageLoading(false);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <WaterMark />
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
      {myPostList.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F6F6F6',
          }}>
          <Text
            style={{
              color: '#6E7882',
              fontSize: 15,
              fontFamily: 'SpoqaHanSansNeo-Regular',
              textAlign: 'center',
              lineHeight: 22.5,
              //marginTop: 20,
            }}>
            {isLoading ? '' : '요청하신 검색어에 대한 결과가 없습니다.'}
          </Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              //marginTop: 16,
              //height: 46,
            }}>
            {/* <TouchableOpacity
              onPress={() => {
                if (sortBy === 'createdAt') {
                  setSortBy('likeCount');
                } else {
                  setSortBy('createdAt');
                }
              }}
              style={{
                marginLeft: 24,
                width: 83,
                height: 24,
                backgroundColor: '#f6f6f6',
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={[fontRegular, {marginRight: 5}]}>
                {sortBy === 'createdAt' ? '최신순' : '공감순'}
              </Text>
              <SortIcon />
            </TouchableOpacity> */}
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={myPostList}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={async () => {
                  navigation.navigate('PostScreen', {
                    postId: item.postId,
                  });
                }}>
                <SearchPostItem post={item} />
              </TouchableOpacity>
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
            onEndReached={() => fetchNextPage()}
            onEndReachedThreshold={0.6}
          />
          <View>
            {isNextPageLoading && (
              <ActivityIndicator
                size="large"
                color={'#A055FF'}
                animating={isNextPageLoading}
                style={{zIndex: 100}}
              />
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
