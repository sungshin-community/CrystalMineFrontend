import React, {useEffect, useState} from 'react';
import {SafeAreaView, ActivityIndicator, Text, Pressable, View, FlatList, TouchableOpacity, RefreshControl, TouchableHighlightBase, TouchableHighlight} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MyPostItem from '../../../components/MyPostItem';
import { deleteMyPosts, toggleBoardPin } from '../../../common/boardApi';
import { MyPostContentDto } from '../../../classes/board/MyPostDto';
import SpinningThreeDots from '../../../components/SpinningThreeDots';
import SearchIcon from '../../../../resources/icon/SearchIcon';
import TrashIcon from '../../../../resources/icon/TrashIcon';
import CancelButton from '../../../../resources/icon/Cancel';
import { ModalBottom } from '../../../components/ModalBottom';
import { RectangleChecked, RectangleUnchecked } from '../../../../resources/icon/CheckBox';
import Toast from 'react-native-simple-toast';
import SortIcon from '../../../../resources/icon/SortIcon';
import { searchBoards, searchPosts } from '../../../common/SearchApi';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DarkPin, GrayPin, OrangePin, PurplePin } from '../../../../resources/icon/Pin';
import OrangeFlag from '../../../../resources/icon/OrangeFlag';
import { SearchBoard } from '../../../classes/Search';
import { fontRegular } from '../../../common/font';
import Board from '../../../classes/Board';
import GrayFlag from '../../../../resources/icon/GrayFlag';
import { logout } from '../../../common/authApi';
import { getHundredsDigit } from '../../../common/util/statusUtil';
import WaterMark from '../../../components/WaterMark';

interface Props {
  searchWord: string;
}
type RootStackParamList = {
  PostScreen: {postId: number};
  BoardSearch: {boardName: string};
  TotalSearchResult: {searchWord: string};
  PostSearchResult: {searchWord: string}
};

export default function BoardSearchResult({searchWord}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [boardList, setBoardList] = useState<Board[]>([]);
  const [sortBy, setSortBy] = useState<string>('pinCount');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const route = useRoute();

  const moveToBoard = (board: Board) => {
    navigation.navigate('PostListScreen', {boardId: board.id});
  }

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      const response = await searchBoards(searchWord, 0, sortBy);
      setCurrentPage(0);
      setBoardList(response.data.content);
      setIsLoading(false);
    }
    init();
  }, [sortBy, searchWord]);


  const handleRefresh = async () => {
    const response = await searchBoards(searchWord, 0, sortBy);
    const postList = response.data.content;
    setCurrentPage(0);
    setBoardList(postList);
  }

  const fetchNextPage = async () => {
    setIsNextPageLoading(true);
    const response = await searchBoards(searchWord, currentPage + 1, sortBy);
    let thisPagePostList: Board[] = response.data.content;
    setBoardList(boardList.concat(thisPagePostList));
    if (thisPagePostList.length > 0) {
      setCurrentPage(currentPage + 1);
    }
    setIsNextPageLoading(false);
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1}}>
      <WaterMark />
      <View style={{position: 'absolute', alignItems: 'center', justifyContent: 'center', left: 0, right: 0, top: 0, bottom: 0}}>
        <ActivityIndicator size="large" color={'#A055FF'} animating={isLoading} style={{zIndex: 100}} />
      </View>
      {boardList && boardList.length === 0 ? 
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F6F6F6'
        }}>
        <Text
          style={{
            color: '#6E7882',
            fontSize: 15,
            fontFamily: 'SpoqaHanSansNeo-Regular',
            textAlign: 'center',
            lineHeight: 22.5,
            marginTop: 20,
          }}>
          {isLoading ? "" : "요청하신 검색어에 대한 결과가 없습니다."}
        </Text>
      </View> :
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16, height: 46}}>
          <TouchableOpacity
            onPress={() => {
              if (sortBy === 'createdAt') {
                setSortBy('pinCount');
              } else if (sortBy === 'pinCount') {
                setSortBy('dictionary');
              } else {
                setSortBy('createdAt')
              }
            }}
            style={{ marginLeft: 24, width: 83, height: 24, backgroundColor: '#f6f6f6', borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[fontRegular, {marginRight: 5}]}>
              {sortBy === 'createdAt' ? "최신순" : (sortBy === 'pinCount' ? "고정순" : '이름순')}
            </Text>
            <SortIcon />
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={boardList}
          renderItem={({item}) => <TouchableOpacity
          onPress={() => moveToBoard(item)}
          style={{
            flexDirection: 'row',
            height: 61,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
          }}>
            <Pressable 
              onPress={async () => {
                if (item.id === 1) return;
                const response = await toggleBoardPin(item.id);
                if (response.status === 401) {
                  setTimeout(function () {     
                    Toast.show('토큰 정보가 만료되어 로그인 화면으로 이동합니다', Toast.SHORT);
                   }, 100);
                  logout();
                  navigation.reset({routes: [{name: 'SplashHome'}]});
                } else if (getHundredsDigit(response.status) === 2) {
                  handleRefresh();
                } else {
                  setTimeout(function () {               
                    Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
                  }, 100);
                }
              }}
              style={{height: 61, justifyContent: 'center', 
            marginLeft: 10,
            width: 44}}>
            {!item.isPinned ? (
              item.isOwner ? <GrayFlag style={{ marginLeft: 13 }}/> : <GrayPin
                style={{ marginLeft: 10 }}
              />
            ) : (
              item.type === "PUBLIC" ? 
                (item.isOwner ? <OrangeFlag style={{ marginLeft: 13 }}
                  /> : <OrangePin
                  style={{ marginLeft: 10 }}
                />) :
                <PurplePin style={{ marginLeft: 10 }} />
            )}
          </Pressable>
          <View style={{flex: 1, marginLeft: 5, marginRight: 15}}>
            <Text
              style={{
                fontSize: 14,
                color: '#000000',
                fontFamily: 'SpoqaHanSansNeo-Regular',
              }}>
              {item.name}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 14,
                color: '#9F9F9F',
                fontFamily: 'SpoqaHanSansNeo-Regular',
              }}>
              {item.introduction}
            </Text>
          </View>
        </TouchableOpacity>}
          ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#F6F6F6'}}></View>}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={['#A055FF']} // for android
              tintColor={'#A055FF'} // for ios
            />
          }
          onEndReached={() => fetchNextPage()}
          onEndReachedThreshold={0.6}
        />
        <View>
          {isNextPageLoading && <ActivityIndicator size="large" color={'#A055FF'} animating={isNextPageLoading} style={{zIndex: 100}} />}
        </View>
      </View>}
    </SafeAreaView>
  );
}

