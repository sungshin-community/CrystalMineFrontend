import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PostSearchResult from './PostSearchResult';
import {Dimensions} from 'react-native';
import BoardSearchResult from './BoardSearchResult';
import TagSearchResult from './TagSearchResult';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SearchInput from '../../components/SearchInput';
import SearchCancelButton from '../../components/SearchCancelButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  GlobalNavbar: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;
const Tab = createMaterialTopTabNavigator();
var tabWidth = (Dimensions.get('window').width / 3 - 24) / 2; // 한 탭 당 가로 넓이

// 홈(HomeFragment), 게시판(BoardFragment)에서 검색했을 때 검색 결과로 나오는 [게시글, 게시판 이름, 태그] 탭을 모은 화면
// 게시글, 게시판 이름, 태그 컴포넌트는 하단 <Tab.Screen>의 children 프로퍼티를 통해 결과를 띄움
// 피그마 03. 홈 > 홈 검색 & 04.게시판 > 게시판 탭 내 결과 조회 화면 참고
function SearchResult({navigation, route}: Props) {
  const [searchWord, setSearchWord] = useState<string>(route.params.searchWord);
  const [wordList, setWordList] = useState<string[]>([]);

  // 최근 검색어 불러오는 함수
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
  const startSearching = () => {
    if (searchWord.length > 1) {
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
        />
      ),
      headerRight: (): React.ReactNode => (
        <SearchCancelButton
          onPress={() => navigation.navigate('GlobalNavbar')}
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
          marginHorizontal: tabWidth,
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
        children={() => <PostSearchResult searchWord={searchWord} />}
      />
      <Tab.Screen
        name="게시판 이름"
        children={() => <BoardSearchResult searchWord={searchWord} />}
      />
      <Tab.Screen name="태그" component={TagSearchResult} />
    </Tab.Navigator>
  );
}

export default SearchResult;
