import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
  TextInput,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SearchIcon from '../../../resources/icon/SearchIcon';
import {fontBold, fontRegular} from '../../common/font';
import CancelButton from '../../../resources/icon/Cancel';

type RootStackParamList = {
  SearchResultInBoard: {
    searchWord: string;
    boardName: string;
    boardId?: number;
  };
  PostListScreen: {boardId: number};
  TotalSearchResult: {searchWord: string};
  PostSearchResult: {searchWord: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;

function PostSearch({navigation, route}: Props) {
  const [searchWord, setSearchWord] = useState<string>('');
  const [recentSearchWords, setRecentSearchWords] = useState<string[]>([]);

  const getRecentSearchWords = async () => {
    try {
      const jsonRecentSearchWords = await AsyncStorage.getItem('recentPostSearch');
      if (jsonRecentSearchWords) {
        const recentSearchWords = JSON.parse(jsonRecentSearchWords);
        setRecentSearchWords(recentSearchWords);
      }
    } catch (error) {
      console.error('최근 검색어 가져오기 실패', error);
    }
  }

  const saveRecentSearchWords = async (text: string) => {
    try {
      // 공백 체크
      const tempArray = [text, ...recentSearchWords];
      console.log("tempArray:", tempArray);
      setRecentSearchWords(tempArray);
      if (true) {
        await AsyncStorage.setItem('recentPostSearch', JSON.stringify(tempArray));
      }
    } catch (error) {
      console.error('최근 검색어 가져오기 실패', error);
    }
  }

  const search = async (text: string) => {
    navigation.navigate('PostSearchResult', {searchWord: text});
    await saveRecentSearchWords(text);
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (): React.ReactNode =>
      <View style={styles.container}>
        <TextInput
          autoFocus={true}
          style={styles.input}
          placeholder='[] 게시판에서 검색'
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
          <Text style={[fontRegular, {color: '#A055FF', textDecorationLine: 'underline'}]}>전체 삭제</Text>
        </View>
        <View style={{flex: 1, marginTop: 14}}>
          {
            recentSearchWords?.map((text, index) => (
              <TouchableOpacity
                style={{height: 36, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
                key={index}
                onPress={() => navigation.navigate('TotalSearchResult', {searchWord: text})}
              >
                <Text style={[fontRegular, {fontSize: 15}]}>{text}</Text>
                <TouchableHighlight
                  onPress={() => {}}
                  underlayColor='#EEEEEE'
                  style={{height: 36, width: 36, justifyContent: 'center', alignItems: 'center', borderRadius: 18}}
                >
                  <CancelButton color="#87919B" />
                </TouchableHighlight>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    </>
  )
}

export default PostSearch;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    paddingLeft: 5,
  },
  input: {
    backgroundColor: '#EFEFEF',
    width: Dimensions.get('window').width - 100,
    height: 44,
    borderRadius: 20,
    paddingLeft: 57,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    fontSize: 15,
    color: '#222222'
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 24,
  },
  title: {
    color: '#222222',
    fontSize: 17,
  },
});