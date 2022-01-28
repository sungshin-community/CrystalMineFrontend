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
  flex: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: Dimensions.get('window').width - 48,
    marginHorizontal: 16,
  },
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
    marginTop: 19,
  },
  icon: {
    position: 'absolute',
    top: 30,
    left: 19,
  },
  cancel: {
    fontFamily: 'SpoqaHanSansNeo-Regular',
    fontSize: 17,
    marginTop: 29,
    marginLeft: 20,
  },
});

interface Props {
  setSearchWord: (value: any) => void;
  startSearching: () => void;
}

type RootStackParamList = {
  BoardScreen: undefined;
  BoardSearch: {
    setSearchWord: (value: any) => void;
    startSearching: () => void;
  };
};

type NavigateProps = NativeStackScreenProps<RootStackParamList>;

function SearchInput({setSearchWord, startSearching}: Props) {
  // {navigation}: NavigateProps,
  const searchingWord = (value: any) => {
    if (value) {
      setSearchWord(value);
    }
  };

  const cancelClick = () => {
    // navigation.navigate('BoardScreen');
  };

  return (
    <View style={styles.flex}>
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
      <Pressable onPress={cancelClick}>
        <Text style={styles.cancel}>닫기</Text>
      </Pressable>
    </View>
  );
}

export default SearchInput;
