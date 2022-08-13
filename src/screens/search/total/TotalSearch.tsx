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
import SearchIcon from '../../../../resources/icon/SearchIcon';
import {fontBold, fontRegular} from '../../../common/font';
import CancelButton from '../../../../resources/icon/Cancel';
import Toast from 'react-native-simple-toast';

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

  const getRecentSearchWords = async () => {
    const jsonRecentSearchWords = await AsyncStorage.getItem('recentTotalSearch');
    if (jsonRecentSearchWords) {
      const recentSearchWordList = JSON.parse(jsonRecentSearchWords);
      setRecentSearchWords(recentSearchWordList);
    }
  }

  const saveRecentSearchWords = async (text: string) => {
    if (text && text.trim().length > 0) {
      const jsonRecentSearchWords = await AsyncStorage.getItem('recentTotalSearch');
      console.log("여기는 saveRecentSearchWords 함수. 최근검색어는", jsonRecentSearchWords);
      let recentSearchWordList: string[] = [];
      if (jsonRecentSearchWords) {
        recentSearchWordList = JSON.parse(jsonRecentSearchWords);
      }
      const index = recentSearchWordList.findIndex(word => word === text);
      if (index >= 0) {
        // 있으면 삭제
        recentSearchWordList.splice(index, 1);
      } else {
        console.log("없음");
      }
      recentSearchWordList.unshift(text);
      if (recentSearchWordList.length > 5) {
        // 5개 넘으면 삭제
        recentSearchWordList.pop();
      }
      console.log(recentSearchWordList);
      await AsyncStorage.setItem('recentTotalSearch', JSON.stringify(recentSearchWordList));
      setRecentSearchWords(recentSearchWordList);
    } else {
      Toast.show('공백은 검색이 불가능합니다.', Toast.SHORT);
    }
  }

  const deleteRecentSearchWord = async (text: string) => {
    const jsonRecentSearchWords = await AsyncStorage.getItem('recentTotalSearch');
      let recentSearchWordList: string[] = [];
      if (jsonRecentSearchWords) {
        recentSearchWordList = JSON.parse(jsonRecentSearchWords);
      }
      const index = recentSearchWordList.findIndex(word => word === text);
        if (index >= 0) {
          recentSearchWordList.splice(index, 1);
      }
      await AsyncStorage.setItem('recentTotalSearch', JSON.stringify(recentSearchWordList));
      setRecentSearchWords(recentSearchWordList);
  }

  const search = async (text: string) => {
    if (text && text.trim().length > 0) {
      await saveRecentSearchWords(text);
      navigation.navigate('TotalSearchResult', {searchWord: text});
    } else {
      Toast.show('공백은 검색이 불가능합니다.', Toast.SHORT);
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (): React.ReactNode =>
      <View style={styles.container}>
        <TextInput
          autoFocus={true}
          style={styles.input}
          placeholder='전체 게시판에서 검색'
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
        <Pressable
          onPress={async () => {await AsyncStorage.setItem('recentTotalSearch', ''); setRecentSearchWords([])}}
          style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, alignItems: 'center'}}
        >
          <Text style={[styles.title, fontBold]}>최근 검색어</Text>
          <Text style={[fontRegular, {color: '#A055FF', textDecorationLine: 'underline'}]}>전체 삭제</Text>
        </Pressable>
        <View style={{flex: 1, marginTop: 14}}>
          {
            recentSearchWords?.map((text, index) => (
              <TouchableOpacity
                style={{height: 36, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
                key={index}
                onPress={() => search(text)}
              >
                <Text style={[fontRegular, {fontSize: 15}]}>{text}</Text>
                <TouchableHighlight
                  onPress={() => {deleteRecentSearchWord(text)}}
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

export default TotalSearch;

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