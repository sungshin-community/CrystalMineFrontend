import React, {useEffect, useState} from 'react';
import {SafeAreaView, ActivityIndicator, Text, Pressable, View, FlatList, TouchableOpacity, RefreshControl} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MyPostItem from '../../components/MyPostItem';
import { deleteMyPosts, getMyPostList } from '../../common/boardApi';
import { MyPostContentDto } from '../../classes/board/MyPostDto';
import SpinningThreeDots from '../../components/SpinningThreeDots';
import SearchIcon from '../../../resources/icon/SearchIcon';
import TrashIcon from '../../../resources/icon/TrashIcon';
import CancelButton from '../../../resources/icon/Cancel';
import { ModalBottom } from '../../components/ModalBottom';
import { RectangleChecked, RectangleUnchecked } from '../../../resources/icon/CheckBox';
import Toast from 'react-native-simple-toast';

type RootStackParamList = {
  PostScreen: {postId: number};
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function MyPostList({navigation, route}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [myPostList, setMyPostList] = useState<MyPostContentDto[]>([]);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [deleteButtonEnabled, setDeleteButtonEnabled] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
        fontSize: 15,
        fontFamily: 'SpoqaHanSansNeo-Medium',
      },
      headerRight: () => deleteMode ? 
        <>
          <TouchableOpacity
            onPress={() => {setDeleteModalVisible(true)}}
            hitSlop={{top: 5, bottom: 5, left: 10, right: 10 }}
          >
            <Text style={{color: '#FF6060', opacity: deleteButtonEnabled ? 1 : 0.3}}>삭제</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDeleteMode(false);
              const tempList = myPostList.map(p => ({...p, isChecked: false}));
              setMyPostList(tempList);
            }}
          >
            <CancelButton color='#333D4B' style={{marginLeft: 8}} />
          </TouchableOpacity>
          
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
    async function init() {
      setIsLoading(true);
      const postList = await getMyPostList(0, sortBy);
      setCurrentPage(0);
      setMyPostList(postList);
      setIsLoading(false);
    }
    init();
  }, [sortBy]);

  const handleBoardSearchComponent = (
    <View style={{marginRight: 4}}>
      <Pressable hitSlop={5} onPress={() => console.log('search icon click')}>
        <SearchIcon />
      </Pressable>
    </View>
  );

  const handleDeleteComponent = (
    <TouchableOpacity
      onPress={() => {
        setDeleteMode(true);
      }}
      hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
      <TrashIcon />
    </TouchableOpacity>
  );

  const handleRefresh = async () => {
    if (!deleteMode) {
      const postList = await getMyPostList(0, sortBy);
      setCurrentPage(0);
      setMyPostList(postList);
      setIsCheckedAll(false);
    }
  }

  const fetchNextPage = async () => {
    let thisPagePostList: MyPostContentDto[] = await getMyPostList(currentPage + 1, sortBy);
    setMyPostList(myPostList.concat(thisPagePostList));
    if (thisPagePostList.length > 0) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1}}>
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
          {isLoading ? "" : "아직 작성된 게시글이 없습니다.\n첫 글을 작성해주세요."}
        </Text>
      </View> :
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16, height: 46}}>
          {!deleteMode && <TouchableOpacity
            onPress={() => {
              if (sortBy === 'createdAt') {
                setSortBy('likeCount');
              } else {
                setSortBy('createdAt');
              }
            }}
            style={{marginLeft: 24, width: 66, height: 24, backgroundColor: '#f6f6f6', borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text>
              {sortBy === 'createdAt' ? "최신순" : "공감순"}
            </Text>
          </TouchableOpacity>}
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
            {isCheckedAll ? <RectangleChecked /> : <RectangleUnchecked />}
          </TouchableOpacity>}
        </View>
        <FlatList
          style={{marginTop: 10}}
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
          modalText="선택하신 게시글을 삭제하시겠습니까?"
          modalButtonText="삭제"
          modalSecondButtonText='취소'
          modalButton
          modalButtonFunc={async () => {
            setIsLoading(true);
            await deleteMyPosts(myPostList.filter(p => p.isChecked).map(p => p.postId));
            const postList = await getMyPostList(currentPage, sortBy);
            setMyPostList(postList);
            Toast.show("게시글이 성공적으로 삭제되었습니다", Toast.LONG);
            setIsLoading(false);
            setDeleteMode(false);
            setDeleteModalVisible(false);
          }}
          modalSecondButtonFunc={() => {
            setDeleteModalVisible(false);
          }}
        />
      )}
    </SafeAreaView>
  );
}

