import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, Pressable, View, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, TouchableHighlight} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MyPostItem from '../../components/MyPostItem';
import { cancelScrapedPosts, getScrapedPostList } from '../../common/boardApi';
import { MyPostContentDto } from '../../classes/board/MyPostDto';
import CancelButton from '../../../resources/icon/Cancel';
import SpinningThreeDots from '../../components/SpinningThreeDots';
import TrashIcon from '../../../resources/icon/TrashIcon';
import SearchIcon from '../../../resources/icon/SearchIcon';
import { ModalBottom } from '../../components/ModalBottom';
import { RectangleChecked, RectangleUnchecked } from '../../../resources/icon/CheckBox';
import Toast from 'react-native-simple-toast';
import WaterMark from '../../components/WaterMark';

type RootStackParamList = {
  PostScreen: {postId: number};
  BoardSearch: {boardName: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function ScrapedPostList({navigation}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [myPostList, setMyPostList] = useState<MyPostContentDto[]>([]);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [deleteButtonEnabled, setDeleteButtonEnabled] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);

  const moveToPost = (post: MyPostContentDto) => {
    if (deleteMode) {
      const tempList = myPostList.map(p => p.postId === post.postId ? {...p, isChecked: !p.isChecked} : p);
      setMyPostList(tempList);
    } else {
      navigation.navigate('PostScreen', {
        postId: post.postId
      });
    }
  }

  useEffect(() => {
    navigation.setOptions({
       headerTitleStyle: {
        fontSize: 19,
        fontFamily: 'SpoqaHanSansNeo-Medium',
      },
      headerRight: () => deleteMode ? 
        <>
          <TouchableOpacity
            onPress={() => {if (myPostList.filter(c => c.isChecked).length > 0) {setDeleteModalVisible(true)}}}
            hitSlop={{top: 5, bottom: 5, left: 10, right: 10 }}
          >
            <Text style={{color: '#FF6060', opacity: deleteButtonEnabled ? 1 : 0.3, fontSize: 17}}>삭제</Text>
          </TouchableOpacity>
          <TouchableHighlight
            style={{width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}
            underlayColor='#EEEEEE'
            onPress={() => {
              setDeleteMode(false);
              const tempList = myPostList.map(p => ({...p, isChecked: false}));
              setMyPostList(tempList);
            }}
          >
            <CancelButton color='#333D4B' />
          </TouchableHighlight>
          
        </>
        : 
        <SpinningThreeDots
          handleDefaultModeComponent={handleBoardSearchComponent}
          handleOptionModeIsNotMineComponent={handleDeleteComponent}
        />
      ,
      headerTitleAlign: 'center',
    });
  }, [navigation, deleteMode, deleteButtonEnabled]);

  useEffect(() => {
    const checkedCount = myPostList.filter(p => p.isChecked).length;
    if (checkedCount > 0) {
      setDeleteButtonEnabled(true);
    } else {
      setDeleteButtonEnabled(false);
    }
    const isAllChecked = myPostList.filter(c => !c.isChecked).length === 0;
    setIsCheckedAll(isAllChecked);

  }, [myPostList]);

  useEffect(() => {
    setIsLoading(true)
    async function init() {
      const postList = await getScrapedPostList(0);
      console.log('postList', postList);
      
      setMyPostList(postList);
      setIsLoading(false)
    }
    init();
  }, []);

  const handleBoardSearchComponent = (
    <TouchableHighlight
      style={{width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}
      underlayColor='#EEEEEE'
      onPress={() => {navigation.navigate('ScrapedPostSearch')}}
    >
      <SearchIcon />
    </TouchableHighlight>
  );

  const handleDeleteComponent = (
    <TouchableHighlight
      style={{width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}
      underlayColor='#EEEEEE'
      onPress={() => {
        setDeleteMode(true);
      }}
    >
      <TrashIcon />
    </TouchableHighlight>
  );

  const handleRefresh = async () => {
    if (!deleteMode) {
      const postList = await getScrapedPostList(0);
      setCurrentPage(0);
      setMyPostList(postList);
      setIsCheckedAll(false);
    }
  }

  const fetchNextPage = async () => {
    let thisPagePostList: MyPostContentDto[] = await getScrapedPostList(currentPage + 1);
    setMyPostList(myPostList.concat(thisPagePostList));
    if (thisPagePostList.length > 0) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
      <WaterMark />
      <View style={{position: 'absolute', alignItems: 'center', justifyContent: 'center', left: 0, right: 0, top: 0, bottom: 0}}>
       <ActivityIndicator size="large" color={'#A055FF'} animating={isLoading} style={{zIndex: 100}} />
      </View>
      {myPostList.length === 0 ? 
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
          {isLoading ? "" : "아직 스크랩한 게시글이 없습니다.\n게시글을 스크랩 해보세요."}
        </Text>
      </View> :
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
          {deleteMode &&
          <TouchableOpacity
            onPress={() => {
              setIsCheckedAll(!isCheckedAll);
              const tempList = myPostList.map(p => ({...p, isChecked: !isCheckedAll}));
              setMyPostList(tempList);
            }}
            style={{flexDirection: 'row',
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingRight: 27}}>
            <Text style={{marginRight: 9, fontSize: 13, fontFamily: 'SpoqaHanSansNeo-Medium'}}>
              {`${myPostList.filter(c => c.isChecked).length}/${myPostList.length}`}
            </Text>
            {isCheckedAll ? <RectangleChecked /> : <RectangleUnchecked />}
          </TouchableOpacity>}
        </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={myPostList}
        renderItem={({item}) => <MyPostItem post={item} moveToPost={moveToPost} deleteMode={deleteMode} />}
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
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.8}
      />
    </View>}
      {deleteModalVisible && (
        <ModalBottom
          modalVisible={deleteModalVisible}
          setModalVisible={setDeleteModalVisible}
          content={"선택하신 게시글을 내가 스크랩한 글에서\n삭제하시겠습니까?"}
          purpleButtonText="삭제"
          whiteButtonText='취소'
          purpleButtonFunc={async () => {
            setIsLoading(true);
            await cancelScrapedPosts(myPostList.filter(p => p.isChecked).map(p => p.postId));
            const postList = await getScrapedPostList(currentPage);
            setMyPostList(postList);
            Toast.show("스크랩한 게시글이 성공적으로 삭제되었습니다", Toast.SHORT);
            setIsLoading(false);
            setDeleteMode(false);
            setDeleteModalVisible(false);
          }}
          whiteButtonFunc={() => {
            setDeleteModalVisible(false);
          }}
        />
      )}
    </SafeAreaView>
  );
}

