import React, {useEffect, useState} from 'react';
import {SafeAreaView, ActivityIndicator, Text, Pressable, View, FlatList, TouchableOpacity, RefreshControl, TouchableHighlightBase, TouchableHighlight} from 'react-native';
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
import SortIcon from '../../../resources/icon/SortIcon';
import { fontRegular } from '../../common/font';
import WaterMark from '../../components/WaterMark';
import { logout } from '../../common/authApi';
import { getHundredsDigit } from '../../common/util/statusUtil';
import ErrorScreen from '../errorScreen/ErrorScreen';
import Error from '../../components/Error';

type RootStackParamList = {
  PostScreen: {postId: number};
  BoardSearch: {boardName: string};
  MyPostSearch: undefined;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [httpStatus, setHttpStatus] = useState<number>();

  const moveToPost = (post: MyPostContentDto) => {
    if (deleteMode) {
      const tempList = myPostList.map(p => p.postId === post.postId ? {...p, isChecked: !p.isChecked} : p);
      setMyPostList(tempList);
    } else {
      if (post.isBoardDeleted) {
        Toast.show("삭제된 게시판에 작성된 게시글입니다.", Toast.SHORT);
        return;
      } else if (post.isBoardBlinded) {
        Toast.show("블라인드된 게시판에 작성된 게시글입니다.", Toast.SHORT);
        return;
      }
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
            onPress={() => {if (myPostList.filter(p => p.isChecked).length > 0) {setDeleteModalVisible(true)}}}
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
    const isAllChecked = myPostList.filter(p => !p.isChecked).length === 0;
    setIsCheckedAll(isAllChecked);

  }, [myPostList]);

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      const response = await getMyPostList(0, sortBy);
      if (response.status === 401) {
        logout();
        navigation.reset({routes: [{name: 'SplashHome'}]});
      } else if (getHundredsDigit(response.status) === 2) {
        setCurrentPage(0);
        setMyPostList(response.data.data.content);
      } else {
        setHttpStatus(response.status);
        setIsError(true);
      }
      setIsLoading(false);
    }
    init();
  }, [sortBy]);

  const handleBoardSearchComponent = (
    <TouchableHighlight
      style={{width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}
      underlayColor='#EEEEEE'
      onPress={() => {navigation.navigate('MyPostSearch')}}
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
      const response = await getMyPostList(0, sortBy);
      if (response.status === 401) {
        logout();
        navigation.reset({routes: [{name: 'SplashHome'}]});
      } else if (getHundredsDigit(response.status) === 2) {
        setCurrentPage(0);
        setMyPostList(response.data.data.content);
        setIsCheckedAll(false);
      } else {
        setHttpStatus(response.status);
        setIsError(true);
      }
    }
  }

  const fetchNextPage = async () => {
    setIsNextPageLoading(true);
    const response = await getMyPostList(currentPage + 1, sortBy);
    if (response.status === 401) {
      logout();
      navigation.reset({routes: [{name: 'SplashHome'}]});
    } else if (getHundredsDigit(response.status) === 2) {
      let thisPagePostList: MyPostContentDto[] = response.data.data.content;
      setMyPostList(myPostList.concat(thisPagePostList));
      if (thisPagePostList.length > 0) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
    }
    setIsNextPageLoading(false);
  }

  return (
    isError ? <Error status={httpStatus} code='M001' /> :
    <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1}}>
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
          style={[{
            color: '#6E7882',
            fontSize: 15,
            fontFamily: 'SpoqaHanSansNeo-Regular',
            textAlign: 'center',
            lineHeight: 22.5,
            marginTop: 20,
          }, fontRegular]}>
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
            style={{ marginLeft: 24, width: 83, height: 24, backgroundColor: '#f6f6f6', borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{marginRight: 5}}>
              {sortBy === 'createdAt' ? "최신순" : "공감순"}
            </Text>
            <SortIcon />
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
            <Text style={{marginRight: 9, fontSize: 13, fontFamily: 'SpoqaHanSansNeo-Medium'}}>
              {`${myPostList.filter(p => p.isChecked).length}/${myPostList.length}`}
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
          onEndReachedThreshold={0.6}
        />
        <View>
          {isNextPageLoading && <ActivityIndicator size="large" color={'#A055FF'} animating={isNextPageLoading} style={{zIndex: 100}} />}
        </View>
      </View>}
      {deleteModalVisible && (
        <ModalBottom
          modalVisible={deleteModalVisible}
          setModalVisible={setDeleteModalVisible}
          content="선택하신 게시글을 삭제하시겠습니까?"
          purpleButtonText="삭제"
          whiteButtonText='취소'
          purpleButtonFunc={async () => {
            setIsLoading(true);
            const deleteResponse = await deleteMyPosts(myPostList.filter(p => p.isChecked).map(p => p.postId));
            if (deleteResponse.status === 401) {
              logout();
              navigation.reset({routes: [{name: 'SplashHome'}]});
            } else if (getHundredsDigit(deleteResponse.status) === 2) {
              Toast.show("게시글이 성공적으로 삭제되었습니다", Toast.SHORT);
              setDeleteMode(false);
              setDeleteModalVisible(false);
            } else {
              Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
            }
            const postResponse = await getMyPostList(0, sortBy);
            if (postResponse.status === 401) {
              logout();
              navigation.reset({routes: [{name: 'SplashHome'}]});
            } else if (getHundredsDigit(postResponse.status) === 2) {
              setCurrentPage(0);
              setMyPostList(postResponse.data.data.content);
            } else {
              setHttpStatus(postResponse.status);
              setIsError(true);
            }
            setIsLoading(false);
          }}
          whiteButtonFunc={() => {
            setDeleteModalVisible(false);
          }}
        />
      )}
    </SafeAreaView>
  );
}

