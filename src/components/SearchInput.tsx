import React from 'react';
import {TextInput, StyleSheet, View, Dimensions, Pressable} from 'react-native';
import SearchIcon from '../../resources/icon/SearchIcon';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginHorizontal: 16,
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
});

interface Props {
  setSearchWord: (value: any) => void;
  startSearching: () => void;
}

function SearchInput({setSearchWord, startSearching}: Props) {
  const searchingWord = (value: any) => {
    if (value) {
      setSearchWord(value);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="전체 게시판에서 검색"
        placeholderTextColor="#898989"
        returnKeyType="search"
        onChangeText={(value: any) => searchingWord(value)}
        autoCorrect={false}
        autoCapitalize="none"
        onSubmitEditing={startSearching}
      />
      <Pressable style={styles.icon} onPress={startSearching}>
        <SearchIcon />
      </Pressable>
    </View>
  );
}

export default SearchInput;
