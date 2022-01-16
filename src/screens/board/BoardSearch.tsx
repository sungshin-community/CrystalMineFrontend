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

type RootStackParamList = {
  SearchResult: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

function BoardSearch({navigation}: Props) {
  const [searchWord, setSearchWord] = useState<string>('');
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
    if (searchWord !== '') {
      const newWordList = [searchWord].concat(wordList);
      const duplicateFilter = [...new Set(newWordList)];
      if (duplicateFilter.length === 6) {
        duplicateFilter.pop();
      }
      setWordList(duplicateFilter);
      navigation.navigate('SearchResult');
    }
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

export default BoardSearch;
