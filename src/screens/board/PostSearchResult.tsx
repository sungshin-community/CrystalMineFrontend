import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PostContent} from '../../classes/Search';
import {fontRegular} from '../../common/font';
import {
  getMyCommentSearch,
  getMyPostSearch,
  getPostSearch,
  getPostSearchInBoard,
  getScrapsSearch,
} from '../../common/SearchApi';
import PostSearchItem from '../../components/PostSearchItem';

interface Props {
  searchWord: string;
  isInBoard?: boolean; // 특정 게시판에서 검색하는 경우에는 true
  boardName?: string;
  // myPost?: boolean; // 내가 작성한 글에서 검색하는 경우에는 true
  // myComment?: boolean;
  // isScraped?: boolean;
}

type RootStackParamList = {
  PostScreen: {boardId: number};
};
type NavigateProps = NativeStackScreenProps<RootStackParamList>;

function PostSearchResult(
  {searchWord, isInBoard, boardName}: Props,
  {navigation}: NavigateProps,
) {
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [isData, setIsData] = useState<any>([]);
  const [isTotal, setIsTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        let postResult;

        if (boardName === '내가 작성한 글') {
          postResult = await getMyPostSearch(searchWord, 0, 'createdAt');
        } else if (boardName === '내가 작성한 댓글') {
          postResult = await getMyCommentSearch(searchWord, 0, 'createdAt');
        } else if (boardName === '내가 스크랩한 글') {
          postResult = await getScrapsSearch(searchWord, 0, 'createdAt');
        } else if (isInBoard) {
          postResult = await getPostSearchInBoard(searchWord, 0, 'createdAt');
        } else {
          postResult = await getPostSearch(searchWord, 0, 'createdAt');
        }

        if (Object.keys(postResult).length > 0) {
          console.log('first Rendering', postResult);
          setIsData(postResult.content);
          setIsTotal(postResult.totalElements);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('failed to load recent search', error);
      }
    };
    getData();
  }, []);

  const moveToPost = (postId: number) => {
    navigation.navigate('PostScreen', {postId: postId});
  };

  const sortBtn = async () => {
    setIsLoading(true);

    if (sortBy === 'createdAt') {
      setSortBy('likeCount');
    } else {
      setSortBy('createdAt');
    }

    let newData;

    if (boardName === '내가 작성한 글') {
      newData = await getMyPostSearch(searchWord, 0, sortBy);
    } else if (boardName === '내가 작성한 댓글') {
      newData = await getMyCommentSearch(searchWord, 0, sortBy);
    } else if (boardName === '내가 스크랩한 글') {
      newData = await getScrapsSearch(searchWord, 0, sortBy);
    } else if (isInBoard) {
      newData = await getPostSearchInBoard(searchWord, 0, sortBy);
    } else {
      newData = await getPostSearch(searchWord, 0, sortBy);
    }

    if (Object.keys(newData).length > 0) {
      setIsData(newData);
      setIsLoading(false);
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
        {isTotal === 0 || isData.length === 0 ? (
          <Text style={[fontRegular, styles.noResultText]}>
            요청하신 검색어에 대한 검색 결과가 없습니다.
          </Text>
        ) : (
          <ScrollView style={{backgroundColor: '#fff', width: '100%'}}>
            <View style={{backgroundColor: '#fff', width: '100%'}}>
              <TouchableOpacity
                onPress={sortBtn}
                style={{
                  marginLeft: 24,
                  marginBottom: 10,
                  marginTop: 16,
                  width: 66,
                  height: 24,
                  backgroundColor: '#f6f6f6',
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>{sortBy === 'createdAt' ? '최신순' : '공감순'}</Text>
              </TouchableOpacity>
              {console.log('JSX', isData)}
            </View>
            {isData.map((item: PostContent, index: number) => (
              <PostSearchItem moveToPost={moveToPost} key={index} post={item} />
            ))}
          </ScrollView>
        )}
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
});

export default PostSearchResult;
