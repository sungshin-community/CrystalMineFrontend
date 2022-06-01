import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  Platform,
} from 'react-native';
import SearchIcon from '../../resources/icon/SearchIcon';

interface Props {
  setSearchWord: (value: any) => void;
  startSearching: () => void;
}

function SearchInput({setSearchWord, startSearching}: Props) {
  const searchingWord = (word: any) => {
    setSearchWord(word);
    console.log('Search Input에서 나오는 searchWord ::: ', word);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="전체 게시판에서 검색"
        placeholderTextColor="#898989"
        returnKeyType="search"
        onChangeText={(word: any) => searchingWord(word)}
        autoCorrect={false}
        autoCapitalize="none"
        onSubmitEditing={startSearching}
        keyboardType="default"
        enablesReturnKeyAutomatically
      />
      <Pressable style={styles.icon} onPress={startSearching}>
        <SearchIcon />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    paddingLeft: 5,
    marginTop: Platform.OS === 'android' ? 10 : 0,
  },
  input: {
    backgroundColor: 'rgb(239, 239, 239)',
    width: Dimensions.get('window').width - 100,
    height: 44,
    borderRadius: 20,
    paddingLeft: 57,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    fontSize: 15,
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 24,
  },
});

export default SearchInput;
