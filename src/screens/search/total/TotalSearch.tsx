import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
  TextInput,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SearchIcon from '../../../../resources/icon/SearchIcon';
import {fontBold, fontRegular} from '../../../common/font';
import CancelButton from '../../../../resources/icon/Cancel';
import Toast from 'react-native-simple-toast';
import {
  deleteAllRecentSearchWords,
  deleteRecentSearchWord,
  loadRecentSearchWord,
  saveRecentSearchWord,
} from '../../../common/util/recentSearchWordsUtil';
import {useIsFocused} from '@react-navigation/native';
import BigSearchIcon from '../../../../resources/icon/BigSearchIcon';
import InputDeleteButton from './InputDeleteButton';

type RootStackParamList = {
  SearchResultInBoard: {
    searchWord: string;
    boardName: string;
    boardId?: number;
  };
  PostListScreen: {boardId: number};
  TotalSearchResult: {searchWord: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;

function TotalSearch({navigation, route}: Props) {
  const [recentSearchWords, setRecentSearchWords] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const isFocused = useIsFocused();

  const getRecentSearchWords = async () => {
    const searchWords = await loadRecentSearchWord('recentTotalSearch');
    setRecentSearchWords(searchWords);
  };

  const saveSearchWord = async (text: string) => {
    if (text && text.trim().length > 0) {
      const searchWords = await saveRecentSearchWord(
        text.trim(),
        'recentTotalSearch',
      );
      setRecentSearchWords(searchWords);
    } else {
      setTimeout(function () {
        Toast.show('공백은 검색이 불가능합니다.', Toast.SHORT);
      }, 100);
    }
  };

  const deleteSearchWord = async (text: string) => {
    const searchWords = await deleteRecentSearchWord(text, 'recentTotalSearch');
    setRecentSearchWords(searchWords);
  };

  const deleteAllSearchWords = async () => {
    deleteAllRecentSearchWords('recentTotalSearch');
    setRecentSearchWords([]);
  };

  const search = async (text: string) => {
    await saveSearchWord(text);
    navigation.navigate('TotalSearchResult', {searchWord: text});
  };

  useEffect(() => {
    getRecentSearchWords();
  }, [isFocused]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (): React.ReactNode => (
        <View style={styles.container}>
          <TextInput
            autoFocus={true}
            style={styles.input}
            placeholder="검색"
            placeholderTextColor="#89919A"
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            onSubmitEditing={e => search(e.nativeEvent.text)}
            keyboardType="default"
            enablesReturnKeyAutomatically
            value={searchText}
            onChangeText={setSearchText}
          />
          <View style={styles.icon}>
            <SearchIcon />
          </View>
          <View style={styles.delete}>
            <InputDeleteButton onPress={() => setSearchText('')} />
          </View>
        </View>
      ),
      headerRight: (): React.ReactNode => (
        <View style={{marginLeft: 16}}>
          <TouchableHighlight
            style={{
              width: 28,
              borderRadius: 20,
              alignItems: 'center',
              height: 40,
              justifyContent: 'center',
            }}
            underlayColor="#EEEEEE"
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={[fontRegular, {fontSize: 16}]}>취소</Text>
          </TouchableHighlight>
        </View>
      ),
      headerBackVisible: false,
    });
    getRecentSearchWords();
  }, [searchText]);

  return (
    <>
      <View
        style={{paddingHorizontal: 40, backgroundColor: '#FFFFFF', flex: 1}}>
        {recentSearchWords && recentSearchWords.length > 0 && (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                alignItems: 'center',
              }}>
              <Text style={[styles.title, fontBold]}>최근 검색어</Text>
              <Pressable
                onPress={() => {
                  deleteAllSearchWords();
                }}>
                <Text
                  style={[
                    fontRegular,
                    {color: '#A055FF', textDecorationLine: 'underline'},
                  ]}>
                  전체 삭제
                </Text>
              </Pressable>
            </View>
          </>
        )}
        <View style={{flex: 1, marginTop: 14}}>
          {recentSearchWords && recentSearchWords.length > 0 ? (
            recentSearchWords?.map((text, index) => (
              <TouchableOpacity
                style={{
                  height: 36,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                key={index}
                onPress={() => search(text)}>
                <Text style={[fontRegular, {fontSize: 15}]}>{text}</Text>
                <TouchableHighlight
                  onPress={() => {
                    deleteSearchWord(text);
                  }}
                  underlayColor="#EEEEEE"
                  style={{
                    height: 36,
                    width: 36,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 18,
                  }}>
                  <CancelButton color="#87919B" />
                </TouchableHighlight>
              </TouchableOpacity>
            ))
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                marginBottom: 60,
              }}>
              <BigSearchIcon />
              <Text style={[styles.noResult]}>
                수정광산의 모든 글을 검색해 보세요
              </Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
}

export default TotalSearch;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#F6F6F6',
    width: Dimensions.get('window').width - 75,
    alignItems: 'center',
    alignContent: 'center',
    height: 35,
    borderRadius: 8,
    paddingLeft: 40,
    paddingVertical: 8,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    fontSize: 16,
    color: '#222222',
  },
  icon: {
    position: 'absolute',
    top: 6,
    left: 12,
  },
  delete: {
    position: 'absolute',
    top: 8,
    right: 12,
  },
  title: {
    color: '#222222',
    fontSize: 17,
  },
  noResult: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: '#9DA4AB',
    marginTop: 12,
  },
});
