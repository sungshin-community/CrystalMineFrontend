import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dimensions} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SearchInput from '../../components/SearchInput';
import SearchCancelButton from '../../components/SearchCancelButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getPostSearchInBoard} from '../../common/SearchApi';
import PostSearchResult from '../board/PostSearchResult';
import TagSearchResult from '../board/TagSearchResult';

type RootStackParamList = {
  PostListScreen: {boardId: number};
  MyPostList: undefined;
  MyCommentList: undefined;
  ScrapedPostList: undefined;
  SearchResult: {
    searchWord: any;
  };
  SearchResultInBoard: {
    searchWord: any;
    boardName: any;
    boardId?: number;
  };
  GlobalNavbar: undefined;
  WikiTab: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;
const Tab = createMaterialTopTabNavigator();

function SearchResultInBoard({navigation, route}: Props) {
  const [searchWord, setSearchWord] = useState<string>(route.params.searchWord);
  const [wordList, setWordList] = useState<string[]>([]);

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

  // SearchInput 컴포넌트에서 검색 버튼을 눌렀을 경우 실행되는 함수
  const startSearching = async () => {
    if (searchWord.length > 1 && searchWord.replace(/ /g, '') !== '') {
      const newWordList = [searchWord].concat(wordList);
      const duplicateFilter = [...new Set(newWordList)];
      if (duplicateFilter.length === 6) {
        duplicateFilter.pop();
      }
      setWordList(duplicateFilter);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (): React.ReactNode => (
        <SearchInput
          setSearchWord={setSearchWord} // SearchInput 컴포넌트에서 입력한 value 값(검색어)를 가져오는 props
          startSearching={startSearching}
          boardName={route.params.boardName}
          searchWord={searchWord}
        />
      ),
      headerRight: (): React.ReactNode => (
        <SearchCancelButton
          onPress={() => {
            if (route.params.boardId === 5) {
              navigation.navigate('WikiTab');
            } else if (route.params.boardName === '내가 작성한 글') {
              navigation.navigate('MyPostList');
            } else if (route.params.boardName === '내가 작성한 댓글') {
              navigation.navigate('MyCommentList');
            } else if (route.params.boardName === '내가 스크랩한 글') {
              navigation.navigate('ScrapedPostList');
            } else {
              navigation.navigate('PostListScreen', {
                boardId: route.params.boardId,
              });
            }
          }}
        />
      ),
    });
  }, [navigation, route, searchWord, wordList]);

  return (
    <Tab.Navigator
      initialRouteName="BoardSearch"
      screenOptions={{
        tabBarStyle: {
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 5},
          shadowRadius: 20,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#A055FF',
          height: 8,
          width: 24,
          bottom: -4,
          borderRadius: 10,
          marginHorizontal: 85,
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: 'SpoqaHanSansNeo-Regular',
          fontSize: 14,
          marginTop: 14,
          marginBottom: 6,
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#717171',
      }}
      keyboardDismissMode="on-drag"
      initialLayout={{width: Dimensions.get('window').width}}>
      <Tab.Screen
        name="게시글"
        children={() => (
          <PostSearchResult
            isInBoard={!!(route.params.boardName && route.params.boardId)}
            boardName={route.params.boardName}
            searchWord={searchWord}
          />
        )}
      />
      <Tab.Screen name="태그" component={TagSearchResult} />
    </Tab.Navigator>
  );
}

export default SearchResultInBoard;
