import React, { useEffect, useState } from 'react';
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
  boardName?: string;
  searchWord: string;
}

// 검색할 때 상단에 나오는 Input 컴포넌트
function SearchInput({setSearchWord, startSearching, boardName, searchWord}: Props) {
  const [word, setWord] = useState('');

  useEffect(() => {
    if (searchWord) {
      setWord(searchWord);
    }
  }, [searchWord]);

  const handleInput = (value: string) => {
    setSearchWord(value);
    setWord(value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoFocus={true}
        style={styles.input}
        placeholder={
          boardName
            ? boardName.length <= 5
              ? `[${boardName}] 게시판에서 검색`
              : `[${boardName
                  .replace(/ /g, '')
                  .substring(0, 5)}...] 게시판에서 검색`
            : '전체 게시판에서 검색'
        }
        placeholderTextColor="#898989"
        returnKeyType="search"
        onChangeText={(value: any) => handleInput(value)}
        autoCorrect={false}
        autoCapitalize="none"
        onSubmitEditing={startSearching}
        keyboardType="default"
        enablesReturnKeyAutomatically
        value={word}
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
