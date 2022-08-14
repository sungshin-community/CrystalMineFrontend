import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BoardDetailDto, {ContentPreviewDto} from '../../classes/BoardDetailDto';
import Response from '../../classes/Response';
import SortIcon from '../../../resources/icon/SortIcon';
import {PostContent} from '../../classes/Search';
import {getBoardInfo, getHotBoardPosts} from '../../common/boardApi';
import client from '../../common/client';
import {fontRegular} from '../../common/font';
import {getPostSearch} from '../../common/SearchApi';
import FloatingWriteButton from '../../components/FloatingWriteButton';
import PostItem from '../../components/PostItem';
import PostSearchItem from '../../components/PostSearchItem';
import {useIsFocused} from '@react-navigation/native';

interface Props {
  boardId: number;
}

function WikiList({boardId}: Props) {
  const navigation = useNavigation();
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [isData, setIsData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [boardDetail, setBoardDetail] = useState<ContentPreviewDto[]>([]);
  const isFocused = useIsFocused();

  const getBoardDetail = async (
    boardId: number,
    page: number,
    sort: string,
  ) => {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('sort', sort);
      const response = await client.get<Response<BoardDetailDto>>(
        `/boards/${boardId}/posts?${params}`,
      );
      return response.data.data;
    } catch (e: any) {
      console.log('WIkiList.tsx 53번째 줄', e.response.data);
      return e.response.data;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      let boardData = await getBoardDetail(boardId, 0, sortBy);
      if (boardData) {
        setIsData(boardData);
        setIsLoading(false);
      }
    };
    if(isFocused)
      getData();
  }, [boardId, sortBy, isFocused]);

  const handleRefresh = async () => {
    const postList = await getBoardDetail(boardId, 0, sortBy);
    setCurrentPage(0);
    setBoardDetail(postList);
  };

  const fetchNextPage = async () => {
    let thisPagePostList: ContentPreviewDto[] = await getBoardDetail(
      boardId,
      currentPage + 1,
      sortBy,
    );
    setBoardDetail(boardDetail.concat(thisPagePostList));
    if (thisPagePostList.length > 0) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isLoading) {
    return (
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
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.noResult}>
        {isData.totalElements === 0 ? (
          <>
            <Text style={[fontRegular, styles.noResultText]}>
              아직 작성된 게시글이 없습니다.
            </Text>
            <Text style={[fontRegular, styles.noResultText]}>
              첫 글을 작성해주세요.
            </Text>
          </>
        ) : (
          <View style={{backgroundColor: '#fff', flex: 1, width: '100%'}}>
            <View style={{backgroundColor: '#fff'}}>
              <TouchableOpacity
                onPress={() => {
                  if (sortBy === 'createdAt') {
                    setSortBy('likeCount');
                  } else {
                    setSortBy('createdAt');
                  }
                }}
                style={{
                  marginLeft: 24,
                  marginBottom: 10,
                  marginTop: 16,
                  width: 83,
                  height: 24,
                  backgroundColor: '#f6f6f6',
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{marginRight: 5}}>
                  {sortBy === 'createdAt' ? '최신순' : '공감순'}
                </Text>
                <SortIcon />
              </TouchableOpacity>
            </View>
            <FlatList
              style={{flex: 1, backgroundColor: '#FFFFFF', width: '100%'}}
              data={isData.content}
              renderItem={({item}) => (
                <Pressable
                  onPress={async () => {
                    navigation.navigate('PostScreen', {
                      postId: item.postId,
                    });
                  }}>
                  <PostItem post={item} />
                </Pressable>
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
          </View>
        )}
       
        <FloatingWriteButton
          onPress={() =>
            navigation.navigate('PostWriteScreen', {
              boardId: boardId,
            })
          }
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  noResult: {
    width: '100%',
    flex: 1,
    backgroundColor: 'rgb(244, 244, 244)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#6E7882',
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
});

export default WikiList;
