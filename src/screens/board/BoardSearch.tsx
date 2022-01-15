import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import CancelButton from '../../../resources/icon/Cancel';
import PostList from '../../components/PostList';
import SearchInput from '../../components/SearchInput';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {fontFamily: 'SpoqaHanSansNeo-Medium', fontSize: 15},
  delete: {
    fontSize: 12,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    color: '#BDBDBD',
  },
});

function BoardSearch() {
  const [searchWord, setSearchWord] = useState<string>('');
  const [wordList, setWordList] = useState<string[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);

  useEffect(() => {
    async function loadRecentSearch() {
      try {
        const getRecentSearch = await AsyncStorage.getItem('recentSearch');
        const recentSearch = JSON.parse(getRecentSearch);
        setWordList(recentSearch);
      } catch (error) {
        console.error('failed to load recent search', error);
      }
    }
    loadRecentSearch();
  }, []);

  useEffect(() => {
    async function saveRecentSearch() {
      try {
        await AsyncStorage.setItem('recentSearch', JSON.stringify(wordList));
      } catch (error) {
        console.error('failed to save recent search', error);
      }
    }
    saveRecentSearch();
  }, [wordList]);

  const deleteRecentWord = (index: number) => {
    const restWordList = wordList.filter((_, idx) => idx !== index);
    setWordList(restWordList);
  };

  const totalDelete = () => {
    setWordList([]);
  };

  const startSearching = () => {
    const newWordList = [searchWord].concat(wordList);
    const duplicateFilter = [...new Set(newWordList)];
    if (duplicateFilter.length === 6) {
      duplicateFilter.pop();
    }
    setWordList(duplicateFilter);
    setShowResult(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView>
        <SearchInput
          setSearchWord={setSearchWord}
          startSearching={startSearching}
        />
        {showResult ? (
          <View>
            {dummyData.map((post: Post) => (
              <PostList post={post} />
            ))}
          </View>
        ) : (
          <View style={{padding: 32}}>
            <View style={[styles.rowSpaceBetween, {marginBottom: 12}]}>
              <Text style={styles.title}>최근 검색어</Text>
              <Pressable onPress={totalDelete}>
                <Text style={styles.delete}>전체 삭제</Text>
              </Pressable>
            </View>
            {wordList.length === 0 ? (
              <Text style={{marginVertical: 12}}>최근 검색어가 없습니다</Text>
            ) : (
              wordList.map((word, index) => (
                <View
                  key={index}
                  style={[styles.rowSpaceBetween, {marginVertical: 12}]}>
                  <Text>{word}</Text>
                  <Pressable onPress={() => deleteRecentWord(index)}>
                    <CancelButton />
                  </Pressable>
                </View>
              ))
            )}
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default BoardSearch;

export interface Post {
  nickname: string;
  content: string;
  likeCount: number;
  imageCount: number;
  commentCount: number;
}

const dummyData: Post[] = [
  {
    nickname: '수정',
    content: 'Hey~~~ 오늘 도깨비 방망이 똥 쌌어~ 네모',
    likeCount: 13,
    imageCount: 9,
    commentCount: 7,
  },
  {
    nickname: '나원',
    content: `힘들어도 괜찮아 거친 정글 속에 뛰어든 건 나니깐 I'm ok...`,
    likeCount: 134,
    imageCount: 9,
    commentCount: 7,
  },
  {
    nickname: '효은',
    content:
      '에타 공감 누르면 공감하셨습니다 뜨는거 토스트였는데 스낵바로 바꿨네',
    likeCount: 1779,
    imageCount: 9,
    commentCount: 74,
  },
  {
    nickname: '유진',
    content: '시험 합격 가보자고',
    likeCount: 130,
    imageCount: 0,
    commentCount: 2,
  },
  {
    nickname: '본크레페쿠바딸',
    content: '본크레페 먹고 싶다',
    likeCount: 52,
    imageCount: 2,
    commentCount: 12,
  },
];
