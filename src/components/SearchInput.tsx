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
  setShowResult: any;
}

function SearchInput({setSearchWord, startSearching, setShowResult}: Props) {
  const searchingWord = (value: any) => {
    if (value) {
      setSearchWord(value);
    }
  };

  const onFocus = () => {
    setShowResult(false);
  };

  const onSubmitEditing = () => {
    setShowResult(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        onFocus={onFocus}
        style={styles.input}
        placeholder="전체 게시판에서 검색"
        placeholderTextColor="#898989"
        returnKeyType="search"
        onChangeText={(value: any) => searchingWord(value)}
        autoCorrect={false}
        autoCapitalize="none"
        onSubmitEditing={onSubmitEditing}
      />
      <Pressable style={styles.icon} onPress={startSearching}>
        <SearchIcon />
      </Pressable>
    </View>
  );
}

export default SearchInput;
