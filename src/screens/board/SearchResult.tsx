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
  BoardSearch: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;
const Tab = createMaterialTopTabNavigator();

function SearchResult({navigation, route}: Props) {
  const [searchWord, setSearchWord] = useState<string>(route.params.searchWord);
  const [wordList, setWordList] = useState<string[]>([]);

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
    const startSearching = () => {
      if (searchWord !== '') {
        const newWordList = [searchWord].concat(wordList);
        const duplicateFilter = [...new Set(newWordList)];
        if (duplicateFilter.length === 6) {
          duplicateFilter.pop();
        }
        setWordList(duplicateFilter);
      }
    };

    navigation.setOptions({
      headerTitle: (): React.ReactNode => (
        <SearchInput
          setSearchWord={setSearchWord}
          startSearching={startSearching}
          value={searchWord}
        />
      ),
      headerRight: (): React.ReactNode => (
        <SearchCancelButton
          onPress={() => navigation.navigate('BoardSearch')}
        />
      ),
      headerBackVisible: false,
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
          marginHorizontal: 53,
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
      <Tab.Screen name="게시글" component={PostSearchResult} />
      <Tab.Screen name="게시판 이름" component={BoardSearchResult} />
      <Tab.Screen name="태그" component={TagSearchResult} />
    </Tab.Navigator>
  );
}

export default SearchResult;
