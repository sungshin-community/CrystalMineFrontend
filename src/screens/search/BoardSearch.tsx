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
import SearchIcon from '../../../resources/icon/SearchIcon';
import {fontBold, fontRegular} from '../../common/font';
import CancelButton from '../../../resources/icon/Cancel';
import Toast from 'react-native-simple-toast';
import {
  deleteAllRecentSearchWords,
  deleteRecentSearchWord,
  loadRecentSearchWord,
  saveRecentSearchWord,
} from '../../common/util/recentSearchWordsUtil';
import {useIsFocused} from '@react-navigation/native';
import BigSearchIcon from '../../../resources/icon/BigSearchIcon';
import InputDeleteButton from './total/InputDeleteButton';
import PlusIcon from '../../../resources/icon/PlusIcon';

type RootStackParamList = {
  SearchResultInBoard: {
    searchWord: string;
    boardName: string;
    boardId?: number;
  };
  PostListScreen: {boardId: number};
  BoardSearchResult: {searchWord: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;

function BoardSearch({navigation, route}: Props) {
  const [recentSearchWords, setRecentSearchWords] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const isFocused = useIsFocused();

  const getRecentSearchWords = async () => {
    const searchWords = await loadRecentSearchWord('recentTotalSearch');
    setRecentSearchWords(searchWords);
  };

  const moveToCreateBoard = () => {
    navigation.navigate('TermAgreeCreateBoard');
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
    navigation.navigate('BoardSearchResult', {searchWord: text});
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
            onSubmitEditing={e => {
              const text = e.nativeEvent.text;
              setSearchText(text); // 입력된 텍스트를 상태로 업데이트
              search(text); // 검색 실행
            }}
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
              width: 35,
              borderRadius: 20,
              alignItems: 'center',
              height: 40,
              justifyContent: 'center',
            }}
            underlayColor="#EEEEEE"
            onPress={() => {
              navigation.goBack();
            }}>
            <Text
              style={[
                fontRegular,
                {
                  fontSize: 16,
                  fontFamily: 'Pretendard-Medium',
                  color: '#3a424e',
                },
              ]}>
              취소
            </Text>
          </TouchableHighlight>
        </View>
      ),
      headerBackVisible: false,
    });
    getRecentSearchWords();
  }, [searchText, navigation]);

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
              <Text style={[styles.noResult]}>게시판 이름을 검색해 보세요</Text>
              <TouchableHighlight
                underlayColor="#EEEEEE"
                onPress={() => moveToCreateBoard()}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#F6F6F6',
                  width: 189,
                  height: 46,
                  borderRadius: 8,
                  marginTop: 16,
                }}>
                <>
                  <PlusIcon style={{marginLeft: 18, marginRight: 12}} />
                  <Text
                    style={{
                      color: '#89919A',
                      fontSize: 14,
                      fontFamily: 'SpoqaHanSansNeo-Regular',
                    }}>
                    새 게시판 만들기
                  </Text>
                </>
              </TouchableHighlight>
            </View>
          )}
        </View>
      </View>
    </>
  );
}

export default BoardSearch;

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
    fontFamily: 'Pretendard-Regular',
    fontWeight: '500',
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
    color: '#9DA4AB',
    marginTop: 12,
  },
});
