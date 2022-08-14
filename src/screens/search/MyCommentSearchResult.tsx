import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, Pressable, View, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator, TouchableHighlight, TextInput, Dimensions} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MyCommentDto from '../../classes/MyCommentDto';
import MyCommentItem from '../../components/MyCommentItem';
import SearchIcon from '../../../resources/icon/SearchIcon';
import Toast from 'react-native-simple-toast';
import SortIcon from '../../../resources/icon/SortIcon';
import { searchMyComments } from '../../common/SearchApi';
import { saveRecentSearchWord } from '../../common/util/recentSearchWordsUtil';

type RootStackParamList = {
  PostScreen: {postId: number};
  BoardSearch: {boardName: string};
  MyCommentSearch: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function MyCommentSearchResult({navigation, route}: Props) {
  const [searchWord, setSearchWord] = useState<string>(route.params.searchWord);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [myCommentList, setMyCommentList] = useState<MyCommentDto[]>([]);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const search = (text: string) => {
    setSearchWord(text);
    saveRecentSearchWord(text, 'recentMyCommentSearch');
  }

  const moveToPost = (comment: MyCommentDto) => {
    if (comment.isPostDeleted) {
      Toast.show("삭제된 게시글에 작성된 댓글입니다.", Toast.SHORT);
      return;
    } else if (comment.isPostBlinded) {
      Toast.show("블라인드된 게시글에 작성된 댓글입니다.", Toast.SHORT);
      return;
    } else if (comment.isBoardDeleted) {
      Toast.show("삭제된 게시판에 작성된 댓글입니다.", Toast.SHORT);
      return;
    } else if (comment.isBoardBlinded) {
      Toast.show("블라인드된 게시판에 작성된 댓글입니다.", Toast.SHORT);
      return;
    }
    navigation.navigate('PostScreen', {
      postId: comment.postId
    });
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (): React.ReactNode => (
        <View style={styles.container}>
        <TextInput
          autoFocus={true}
          style={styles.input}
          placeholder='내가 작성한 댓글에서 검색'
          placeholderTextColor="#898989"
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          onSubmitEditing={(e) => {search(e.nativeEvent.text)}}
          keyboardType="default"
          enablesReturnKeyAutomatically
          defaultValue={route.params.searchWord}
        />
        <View style={styles.icon}>
          <SearchIcon />
        </View>
      </View>
      ),
      headerRight: (): React.ReactNode => (
        <TouchableHighlight style={{width: 50, borderRadius: 20, alignItems: 'center', height: 40, justifyContent: 'center'}} underlayColor='#EEEEEE' onPress={() => {navigation.goBack()}}>
          <Text style={{fontSize: 17}}>닫기</Text>
        </TouchableHighlight>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      const response = await searchMyComments(searchWord, 0, sortBy);
      let commentList: MyCommentDto[] = response.data.content;
      setCurrentPage(0);
      setMyCommentList(commentList);
      setIsLoading(false);
    }
    init();
  }, [sortBy, searchWord]);

  const handleRefresh = async () => {
    const response = await searchMyComments(searchWord, 0, sortBy);
    let commentList: MyCommentDto[] = response.data.content;
    setCurrentPage(0);
    setMyCommentList(commentList);
  }

  const fetchNextPage = async () => {
    const response = await searchMyComments(searchWord, currentPage + 1, sortBy);
    let thisPageCommentList: MyCommentDto[] = response.data.content;
    setMyCommentList(myCommentList.concat(thisPageCommentList));
    if (thisPageCommentList.length > 0) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1}}>
      <View style={{position: 'absolute', alignItems: 'center', justifyContent: 'center', left: 0, right: 0, top: 0, bottom: 0}}>
       <ActivityIndicator size="large" color={'#A055FF'} animating={isLoading} style={{zIndex: 100}} />
      </View>
      {myCommentList && myCommentList.length === 0 ?
      <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F6F6'
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
        {isLoading ? "" : "요청하신 검색어에 대한 결과가 없습니다."}
      </Text>
    </View> :
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16, height: 46}}>
        <TouchableOpacity
          onPress={() => {
            if (sortBy === 'createdAt') {
              setSortBy('likeCount');
            } else {
              setSortBy('createdAt');
            }
          }}
          style={{ marginLeft: 24, width: 83, height: 24, backgroundColor: '#f6f6f6', borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{marginRight: 5}}>
            {sortBy === 'createdAt' ? "최신순" : "공감순"}
          </Text>
          <SortIcon />
        </TouchableOpacity>
      </View>
      <FlatList
        data={myCommentList}
        renderItem={({item}) => <MyCommentItem comment={item} moveToPost={moveToPost} deleteMode={false} />}
        ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#F6F6F6'}}></View>}
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
      </View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    paddingLeft: 5,
  },
  input: {
    backgroundColor: '#EFEFEF',
    width: Dimensions.get('window').width - 100,
    height: 44,
    borderRadius: 20,
    paddingLeft: 57,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    fontSize: 15,
    color: '#222222'
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 24,
  },
  title: {
    color: '#222222',
    fontSize: 17,
    marginTop: 20
  },
});
