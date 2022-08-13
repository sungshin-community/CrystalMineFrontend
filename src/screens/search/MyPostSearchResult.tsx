import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dimensions, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { View } from 'react-native-animatable';
import SearchIcon from '../../../resources/icon/SearchIcon';
import TagSearchResult from '../board/TagSearchResult';
import CancelButton from '../../../resources/icon/Cancel';
import { fontBold, fontRegular } from '../../common/font';
import PostList from './PostList';
import MyPostList from './MyPostList';

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
let tabWidth = (Dimensions.get('window').width / 2 - 24) / 2;

function MyPostSearchResult({navigation, route}: Props) {
  const [searchWord, setSearchWord] = useState<string>(route.params.searchWord);

  useEffect(() => {

  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (): React.ReactNode => (
        <View style={styles.container}>
        <TextInput
          autoFocus={true}
          style={styles.input}
          placeholder='[] 게시판에서 검색'
          placeholderTextColor="#898989"
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          onSubmitEditing={(e) => {setSearchWord(e.nativeEvent.text)}}
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
      false ? <View style={{paddingHorizontal: 40, backgroundColor: '#FFFFFF', flex: 1}}>
      <Text style={[styles.title, fontBold]}>최근 검색어</Text>
      <View style={{flex: 1, marginTop: 14}}>
        {
          ['네모 좋아', '산업디자인과', '수정유랑단', '크리스탈'].map(text => (
            <TouchableOpacity style={{height: 36, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={[fontRegular, {fontSize: 15}]}>{text}</Text>
              <TouchableHighlight
                onPress={() => {console.log("눌림")}}
                underlayColor='#EEEEEE'
                style={{height: 36, width: 36, justifyContent: 'center', alignItems: 'center', borderRadius: 18}}
              >
                <CancelButton color="#87919B" />
              </TouchableHighlight>
            </TouchableOpacity>
          ))
        }
      </View>
    </View> :
    <Tab.Navigator
      initialRouteName="게시글"
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
        component={() => <MyPostList searchWord={searchWord} />}
        
      />
      <Tab.Screen name="태그" component={TagSearchResult} />
    </Tab.Navigator>
}
    </>
  );
}

export default MyPostSearchResult;

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
    marginTop: 20
  },
});