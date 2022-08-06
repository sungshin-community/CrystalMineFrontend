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
  TouchableOpacity,
} from 'react-native';
import CancelButton from '../../../resources/icon/Cancel';
import SearchInput from '../../components/SearchInput';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fontBold, fontRegular} from '../../common/font';
import SearchCancelButton from '../../components/SearchCancelButton';

type RootStackParamList = {
  SearchResult: {
    searchWord: any;
  };
  SearchResultInBoard: {
    searchWord: any;
    boardName: any;
    boardId?: number;
  };
  GlobalNavbar: undefined;
  PostListScreen: {boardId: number};
  MyPostList: undefined;
  MyCommentList: undefined;
  ScrapedPostList: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

// 검색 버튼 누른 후 [최근 검색어]가 나오는 화면
function BoardSearch({navigation, route}: Props) {
  const [searchWord, setSearchWord] = useState<string>('');
  const [wordList, setWordList] = useState<string[]>([]);

  // SearchInput 컴포넌트에서 검색 버튼을 눌렀을 경우 실행되는 함수
  const startSearching = () => {
    if (searchWord.length > 1) {
      const newWordList = [searchWord].concat(wordList);
      const duplicateFilter = [...new Set(newWordList)]; // 최근 검색어 중복 체크
      if (duplicateFilter.length === 6) {
        // 최근 검색어를 담은 배열이 6개가 된 경우 맨 끝(오래된 검색어) 검색어 삭제
        duplicateFilter.pop();
      }
      setWordList(duplicateFilter);

      if (route.params.boardName === '내가 작성한 글') {
        // 내가 쓴 글에서 검색
        navigation.navigate('SearchResultInBoard', {
          searchWord: searchWord,
          boardName: '내가 작성한 글',
        });
      } else if (route.params.boardName === '내가 작성한 댓글') {
        // 내가 쓴 댓글에서 검색
        navigation.navigate('SearchResultInBoard', {
          searchWord: searchWord,
          boardName: '내가 작성한 댓글',
        });
      } else if (route.params.boardName === '내가 스크랩한 글') {
        // 내가 스크랩한 글에서 검색
        navigation.navigate('ScrapedPostList', {
          searchWord: searchWord,
          boardName: '내가 스크랩한 글',
        });
      } else if (route.params.boardId && route.params.boardName) {
        // 특정 게시판 탭 내 검색
        navigation.navigate('SearchResultInBoard', {
          searchWord: searchWord,
          boardName: route.params.boardName,
          boardId: route.params.boardId,
        });
      } else {
        navigation.navigate('SearchResult', {
          searchWord: searchWord,
        });
      }
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (): React.ReactNode =>
        route.params ? (
          <SearchInput
            setSearchWord={setSearchWord}
            startSearching={startSearching}
            boardName={route.params.boardName}
          />
        ) : (
          <SearchInput
            setSearchWord={setSearchWord}
            startSearching={startSearching}
          />
        ),
      headerRight: (): React.ReactNode => (
        <SearchCancelButton
          onPress={() => {
            if (route.params.boardName === '내가 작성한 글') {
              // 내가 쓴 글에서 검색
              navigation.navigate('MyPostList');
            } else if (route.params.boardName === '내가 작성한 댓글') {
              // 내가 쓴 댓글에서 검색
              navigation.navigate('MyCommentList');
            } else if (route.params.boardName === '내가 스크랩한 글') {
              // 내가 쓴 댓글에서 검색
              navigation.navigate('ScrapedPostList');
            } else if (route.params.boardId && route.params.boardName) {
              // 특정 게시판 탭 내 검색
              navigation.navigate('PostListScreen', {
                boardId: route.params.boardId,
              });
            } else {
              navigation.navigate('GlobalNavbar');
            }
          }}
        />
      ),
      headerBackVisible: false,
    });
  }, [navigation, searchWord, wordList]);

  // 최근 검색어 불러오기
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

  // 최근 검색어 저장
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

  // 최근 검색어에서 개별 삭제
  const deleteRecentWord = (index: number) => {
    const restWordList = wordList.filter((_, idx) => idx !== index);
    setWordList(restWordList);
  };

  // 최근 검색어 전체 삭제
  const totalDelete = () => {
    setWordList([]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 28,
          }}>
          <View style={styles.rowSpaceBetween}>
            <Text style={[fontBold, styles.title]}>최근 검색어</Text>
            <Pressable onPress={totalDelete}>
              <Text style={styles.delete}>전체 삭제</Text>
            </Pressable>
          </View>
          {wordList ? (
            wordList.length === 0 ? (
              <View style={{alignItems: 'center'}}>
                <Text style={[fontRegular, styles.noResult]}>
                  최근 검색어가 없습니다
                </Text>
              </View>
            ) : (
              wordList.map((word, index) => (
                <TouchableOpacity
                  onPress={() => {
                    if (route.params) {
                      // route.params(게시판 이름)가 있는 경우 > 특정 게시판 탭 내 검색
                      navigation.navigate('SearchResultInBoard', {
                        searchWord: word,
                        boardName: route.params.boardName,
                        boardId: route.params.boardId,
                      });
                    } else {
                      navigation.navigate('SearchResult', {
                        searchWord: word,
                      });
                    }
                  }}
                  key={index}
                  style={[styles.rowSpaceBetween, {marginVertical: 9}]}>
                  <Text style={[fontRegular, styles.text]}>{word}</Text>
                  <Pressable
                    style={{marginRight: 5}}
                    onPress={() => deleteRecentWord(index)}
                    hitSlop={5}>
                    <CancelButton color="#87919B" />
                  </Pressable>
                </TouchableOpacity>
              ))
            )
          ) : null}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 20,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {fontSize: 17, marginBottom: 14},
  text: {fontSize: 15},
  delete: {
    fontSize: 13,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    color: '#A055FF',
    textDecorationLine: 'underline',
  },
  noResult: {
    fontSize: 15,
    color: '#87919B',
    marginTop: 66,
  },
});

export default BoardSearch;
