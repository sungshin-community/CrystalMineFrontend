import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  Text,
} from 'react-native';
import SearchIcon from '../../resources/icon/SearchIcon';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'rgb(239, 239, 239)',
    width: Dimensions.get('window').width - 100,
    height: 44,
    borderRadius: 20,
    paddingLeft: 48,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    fontSize: 15,
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 19,
  },
});

interface Props {
  setSearchWord: (value: any) => void;
  startSearching: () => void;
  value: string;
}

function SearchInput({setSearchWord, startSearching, value}: Props) {
  const searchingWord = (word: any) => {
    setSearchWord(word);
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
        value={value}
      />
      <Pressable style={styles.icon} onPress={startSearching}>
        <SearchIcon />
      </Pressable>
    </View>
  );
}

export default SearchInput;
