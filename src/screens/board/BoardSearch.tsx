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
import SearchInput from '../../components/SearchInput';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fontBold, fontRegular} from '../../common/font';
import SearchCancelButton from '../../components/SearchCancelButton';
import {getBoardSearch, getPostSearch} from '../../common/SearchApi';

type RootStackParamList = {
  SearchResult: {
    searchWord: any;
  };
  GlobalNavbar: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

function BoardSearch({navigation}: Props) {
  const [searchWord, setSearchWord] = useState<string>('');
  const [wordList, setWordList] = useState<string[]>([]);

  const startSearching = () => {
    if (searchWord.length > 1) {
      const newWordList = [searchWord].concat(wordList);
      const duplicateFilter = [...new Set(newWordList)];
      if (duplicateFilter.length === 6) {
        duplicateFilter.pop();
      }
      setWordList(duplicateFilter);

      navigation.navigate('SearchResult', {
        searchWord: searchWord,
      });
    }
  };

  useEffect(() => {
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
          onPress={() => navigation.navigate('GlobalNavbar')}
        />
      ),
      headerBackVisible: false,
    });
  }, [navigation, searchWord, wordList]);

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
          {wordList.length === 0 ? (
            <View style={{alignItems: 'center'}}>
              <Text style={[fontRegular, styles.noResult]}>
                최근 검색어가 없습니다
              </Text>
            </View>
          ) : (
            wordList.map((word, index) => (
              <View
                key={index}
                style={[styles.rowSpaceBetween, {marginVertical: 9}]}>
                <Text style={[fontRegular, styles.text]}>{word}</Text>
                <Pressable
                  style={{marginRight: 5}}
                  onPress={() => deleteRecentWord(index)}
                  hitSlop={5}>
                  <CancelButton />
                </Pressable>
              </View>
            ))
          )}
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
