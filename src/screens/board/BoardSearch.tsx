import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  Platform,
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
  Dimensions,
  Pressable,
} from 'react-native';
import CancelButton from '../../../resources/icon/Cancel';
import SearchIcon from '../../../resources/icon/SearchIcon';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'rgb(239, 239, 239)',
    width: Dimensions.get('window').width - 32,
    height: 44,
    borderRadius: 20,
    paddingLeft: 48,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    fontSize: 15,
    marginTop: 19,
  },
  icon: {
    position: 'absolute',
    top: 30,
    left: 19,
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

  const searchWordDelete = (index: number) => {
    const restWordList = wordList.filter((_, idx) => idx !== index);
    setWordList(restWordList);
  };

  const startSearching = (e: any) => {
    setSearchWord(e.nativeEvent.text);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView>
        <View style={{position: 'relative'}}>
          <TextInput
            style={styles.input}
            placeholder="전체 게시판에서 검색"
            placeholderTextColor="#898989"
            returnKeyType="search"
            onSubmitEditing={(e: any) => startSearching(e)}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <View style={styles.icon}>
            <SearchIcon />
          </View>
        </View>
        <View style={{padding: 32}}>
          <View style={[styles.rowSpaceBetween, {marginBottom: 12}]}>
            <Text style={styles.title}>최근 검색어</Text>
            <Text style={styles.delete}>전체 삭제</Text>
          </View>
          {wordList.map((word, index) => {
            return (
              <View
                key={index}
                style={[styles.rowSpaceBetween, {marginVertical: 12}]}>
                <Text>{word}</Text>
                <Pressable onPress={() => searchWordDelete(index)}>
                  <CancelButton />
                </Pressable>
              </View>
            );
          })}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default BoardSearch;
