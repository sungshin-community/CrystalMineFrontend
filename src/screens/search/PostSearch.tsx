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
  Platform
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SearchIcon from '../../../resources/icon/SearchIcon';
import {fontBold, fontRegular} from '../../common/font';
import CancelButton from '../../../resources/icon/Cancel';
import Toast from 'react-native-simple-toast';
import { deleteAllRecentSearchWords, deleteRecentSearchWord, loadRecentSearchWord, saveRecentSearchWord } from '../../common/util/recentSearchWordsUtil';
import { useIsFocused } from '@react-navigation/native';

type RootStackParamList = {
  SearchResultInBoard: {
    searchWord: string;
    boardName: string;
    boardId?: number;
  };
  PostListScreen: {boardId: number};
  PostSearchResult: {searchWord: string, boardId: number, boardName: string};
  WikiSearchResult: {searchWord: string, boardId: number, boardName: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;

function PostSearch({navigation, route}: Props) {
  const [recentSearchWords, setRecentSearchWords] = useState<string[]>([]);
  const isFocused = useIsFocused();
  const boardName = route.params.boardName ? route.params.boardName : '';
  const boardId = route.params.boardId;

  const getRecentSearchWords = async () => {
    const searchWords = await loadRecentSearchWord('recentPostSearch' + boardId);
    setRecentSearchWords(searchWords);
  }

  const saveSearchWord = async (text: string) => {
    if (text && text.trim().length > 0) {
      const searchWords = await saveRecentSearchWord(text.trim(), 'recentPostSearch' + boardId);
      setRecentSearchWords(searchWords);
    } else {
      Toast.show('공백은 검색이 불가능합니다.', Toast.SHORT);
    }
  }

  const deleteSearchWord = async (text: string) => {
    const searchWords = await deleteRecentSearchWord(text, 'recentPostSearch' + boardId);
    setRecentSearchWords(searchWords);
  }

  const deleteAllSearchWords = async () => {
    deleteAllRecentSearchWords('recentPostSearch' + boardId);
    setRecentSearchWords([]);
  }

  const search = async (text: string) => {
    await saveSearchWord(text);
    if (boardId >= 5 && boardId <= 9) {
      navigation.navigate('WikiSearchResult', {searchWord: text, boardId: boardId, boardName: boardName});
    } else {
      navigation.navigate('PostSearchResult', {searchWord: text, boardId: boardId, boardName: boardName});
    }
  }

  useEffect(() => {
    getRecentSearchWords();
  }, [isFocused]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (): React.ReactNode =>
      <View style={styles.container}>
        <TextInput
          autoFocus={Platform.OS === 'ios' ? false : true}
          style={styles.input}
          placeholder={`[${boardName.length <= 5 ? boardName : boardName.substring(0, 5) + "..."}] 게시판에서 검색`}
          placeholderTextColor="#898989"
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          onSubmitEditing={(e) => search(e.nativeEvent.text)}
          keyboardType="default"
          enablesReturnKeyAutomatically
        />
        <View style={styles.icon}>
          <SearchIcon />
        </View>
      </View>,
      headerRight: (): React.ReactNode => <TouchableHighlight style={{width: 50, borderRadius: 20, alignItems: 'center', height: 40, justifyContent: 'center'}} underlayColor='#EEEEEE' onPress={() => {navigation.goBack()}}>
      <Text style={{fontSize: 17}}>닫기</Text>
    </TouchableHighlight>,
      headerBackVisible: false,
    });
    getRecentSearchWords();
  }, []);
  return (
    <>
      <View style={{paddingHorizontal: 40, backgroundColor: '#FFFFFF', flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, alignItems: 'center'}}>
          <Text style={[styles.title, fontBold]}>최근 검색어</Text>
          <Pressable onPress={() => {deleteAllSearchWords()}}>
            <Text style={[fontRegular, {color: '#A055FF', textDecorationLine: 'underline'}]}>전체 삭제</Text>
          </Pressable>
        </View>
        <View style={{flex: 1, marginTop: 14}}>
          {recentSearchWords && recentSearchWords.length > 0 ?
            recentSearchWords?.map((text, index) => (
              <TouchableOpacity
                style={{height: 36, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
                key={index}
                onPress={() => search(text)}
              >
                <Text style={[fontRegular, {fontSize: 15}]}>{text}</Text>
                <TouchableHighlight
                  onPress={() => {deleteSearchWord(text)}}
                  underlayColor='#EEEEEE'
                  style={{height: 36, width: 36, justifyContent: 'center', alignItems: 'center', borderRadius: 18}}
                >
                  <CancelButton color="#87919B" />
                </TouchableHighlight>
              </TouchableOpacity>
            ))
            :
            <View style={{alignItems: 'center'}}>
                <Text style={[fontRegular, styles.noResult]}>
                  최근 검색어가 없습니다
                </Text>
              </View>
          }
        </View>
      </View>
    </>
  )
}

export default PostSearch;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingLeft: 5,
  },
  input: {
    backgroundColor: '#EFEFEF',
    width: Dimensions.get('window').width - 100,
    height: 40,
    borderRadius: 20,
    paddingLeft: 57,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    fontSize: 15,
    color: '#222222'
  },
  icon: {
    position: 'absolute',
    top: 9,
    left: 24,
  },
  title: {
    color: '#222222',
    fontSize: 17,
  },
  noResult: {
      fontSize: 15,
      color: '#87919B',
      marginTop: 66,
    },
});