import {useNavigation} from '@react-navigation/native';
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
  myPost?: boolean; // 내가 작성한 글에서 검색하는 경우에는 true
  myComment?: boolean;
  isScraped?: boolean;
}

function PostSearchResult({
  searchWord,
  isInBoard,
  myPost,
  myComment,
  isScraped,
}: Props) {
  const navigation = useNavigation();
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [isData, setIsData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        let postResult;

        if (myPost) {
          postResult = await getMyPostSearch(searchWord, 0, 'createdAt');
        } else if (myComment) {
          postResult = await getMyCommentSearch(searchWord, 0, 'createdAt');
        } else if (isScraped) {
          postResult = await getScrapsSearch(searchWord, 0, 'createdAt');
        } else if (isInBoard) {
          postResult = await getPostSearchInBoard(searchWord, 0, 'createdAt');
        } else if (!myPost && !myComment && !isInBoard) {
          postResult = await getPostSearch(searchWord, 0, 'createdAt');
        }

        if (postResult) {
          setIsData(postResult);
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

  useEffect(() => {
    const sortData = async () => {
      setIsLoading(true);
      let newData = await getPostSearch(searchWord, 0, sortBy);
      if (newData) {
        setIsData(newData);
        setIsLoading(false);
      }
    };
    sortData();
  }, [sortBy]);

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
          <Text style={[fontRegular, styles.noResultText]}>
            요청하신 검색어에 대한 검색 결과가 없습니다.
          </Text>
        ) : (
          <ScrollView style={{backgroundColor: '#fff', width: '100%'}}>
            <View style={{backgroundColor: '#fff', width: '100%'}}>
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
            </View>
            {isData.content.map((item: PostContent, index: number) => (
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
