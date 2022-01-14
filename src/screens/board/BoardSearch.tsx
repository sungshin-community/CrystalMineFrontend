import React, {useState} from 'react';
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
  const recentSearch = [
    '네모 좋아',
    '영양제 추천',
    '수학과',
    '수리통계데이터사이언스학부',
    '수정광산',
  ];
  const [searchWord, setSearchWord] = useState<string>('');
  const [wordList, setWordList] = useState<string[]>(recentSearch);
  const [showResult, setShowResult] = useState<boolean>(false);

  const searchWordDelete = (index: number) => {
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
    //? 대충 검색 함수 있어야함
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
          {showResult ? (
            <Text>{searchWord}</Text>
          ) : (
            <>
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
                    <Pressable onPress={() => searchWordDelete(index)}>
                      <CancelButton />
                    </Pressable>
                  </View>
                ))
              )}
            </>
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default BoardSearch;
