import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dimensions, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { View } from 'react-native-animatable';
import SearchIcon from '../../../../resources/icon/SearchIcon';
import TagSearchResult from '../../board/TagSearchResult';
import CancelButton from '../../../../resources/icon/Cancel';
import { fontBold, fontRegular } from '../../../common/font';
import PostSearchResult from './PostSearchResult';
import BoardSearchResult from './BoardSearchResult';
import { saveRecentSearchWord } from '../../../common/util/recentSearchWordsUtil';

type RootStackParamList = {
  SearchResult: {
    searchWord: any;
  };
  SearchResultInBoard: {
    searchWord: any;
    boardName: any;
    boardId?: number;
  };
  GlobalNavbar: undefined;
  PostListScreen: {boardId: number};
  MyPostList: undefined;
  MyCommentList: undefined;
  ScrapedPostList: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;
const Tab = createMaterialTopTabNavigator();
let tabWidth = (Dimensions.get('window').width / 3 - 24) / 2;

function TotalSearchResult({navigation, route}: Props) {
  const [searchWord, setSearchWord] = useState<string>(route.params.searchWord);
  
  const search = (text: string) => {
    setSearchWord(text);
    saveRecentSearchWord(text, 'recentTotalSearch');
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (): React.ReactNode => (
        <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='전체 게시판에서 검색'
          placeholderTextColor="#898989"
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          onSubmitEditing={(e) => {search(e.nativeEvent.text)}}
          keyboardType="default"
          enablesReturnKeyAutomatically
          defaultValue={route.params.searchWord}
        />
        <View style={styles.icon}>
          <SearchIcon />
        </View>
      </View>
      ),
      headerRight: (): React.ReactNode => (
        <TouchableHighlight style={{width: 50, borderRadius: 20, alignItems: 'center', height: 40, justifyContent: 'center'}} underlayColor='#EEEEEE' onPress={() => {navigation.goBack()}}>
          <Text style={{fontSize: 17}}>닫기</Text>
        </TouchableHighlight>
      ),
    });
  }, []);

  return (
    <>
    {
    <Tab.Navigator
      initialRouteName="BoardSearch"
      screenOptions={{
        tabBarStyle: {
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 5},
          shadowRadius: 20,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#A055FF',
          height: 8,
          width: 24,
          bottom: -4,
          borderRadius: 10,
          marginHorizontal: tabWidth,
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: 'SpoqaHanSansNeo-Regular',
          fontSize: 14,
          marginTop: 14,
          marginBottom: 6,
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#717171',
      }}
      keyboardDismissMode="on-drag"
      initialLayout={{width: Dimensions.get('window').width}}>
      <Tab.Screen
        name="게시글"
        component={() => <PostSearchResult searchWord={searchWord} />}
        initialParams={{searchWord: searchWord}}
        
      />
      <Tab.Screen
        name="게시판"
        children={() => <BoardSearchResult searchWord={searchWord} />}
      />
      <Tab.Screen name="태그" component={TagSearchResult} />
    </Tab.Navigator>
}
    </>
  );
}

export default TotalSearchResult;

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
    marginTop: 20
  },
});