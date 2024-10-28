import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {deleteMyComments, getMyCommentList} from '../../common/boardApi';
import MyCommentDto from '../../classes/MyCommentDto';
import MyCommentItem from '../../components/MyCommentItem';
import {
  RectangleChecked,
  RectangleUnchecked,
} from '../../../resources/icon/CheckBox';
import CancelButton from '../../../resources/icon/Cancel';
import SpinningThreeDots from '../../components/SpinningThreeDots';
import {TrashIcon} from '../../../resources/icon/TrashIcon';
import SearchIcon from '../../../resources/icon/SearchIcon';
import {ModalBottom} from '../../components/ModalBottom';
import Toast from 'react-native-simple-toast';
import SortIcon from '../../../resources/icon/SortIcon';
import {fontMedium, fontRegular} from '../../common/font';
import WaterMark from '../../components/WaterMark';

type RootStackParamList = {
  PostScreen: {postId: number};
  BoardSearch: {boardName: string};
  MyCommentSearch: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function MyCommentList({navigation, route}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [myCommentList, setMyCommentList] = useState<MyCommentDto[]>([]);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [deleteButtonEnabled, setDeleteButtonEnabled] =
    useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);

  const moveToPost = (comment: MyCommentDto) => {
    if (deleteMode) {
      const tempList = myCommentList.map(c =>
        c.id === comment.id ? {...c, isChecked: !c.isChecked} : c,
      );
      setMyCommentList(tempList);
    } else {
      if (comment.isPostDeleted) {
        setTimeout(function () {
          Toast.show('삭제된 게시글에 작성된 댓글입니다.', Toast.SHORT);
        }, 100);
        return;
      } else if (comment.isPostBlinded) {
        setTimeout(function () {
          Toast.show('블라인드된 게시글에 작성된 댓글입니다.', Toast.SHORT);
        }, 100);
        return;
      } else if (comment.isBoardDeleted) {
        setTimeout(function () {
          Toast.show('삭제된 게시판에 작성된 댓글입니다.', Toast.SHORT);
        }, 100);
        return;
      } else if (comment.isBoardBlinded) {
        setTimeout(function () {
          Toast.show('블라인드된 게시판에 작성된 댓글입니다.', Toast.SHORT);
        }, 100);
        return;
      }
      navigation.navigate('PostScreen', {
        postId: comment.postId,
      });
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontSize: 19,
        fontFamily: 'SpoqaHanSansNeo-Medium',
      },
      headerRight: () =>
        deleteMode ? (
          <>
            <TouchableOpacity
              onPress={() => {
                if (myCommentList.filter(c => c.isChecked).length > 0) {
                  setDeleteModalVisible(true);
                }
              }}
              hitSlop={{top: 5, bottom: 5, left: 10, right: 10}}>
              <Text
                style={[
                  fontRegular,
                  {
                    color: '#FF6060',
                    opacity: deleteButtonEnabled ? 1 : 0.3,
                    fontSize: 17,
                  },
                ]}>
                삭제
              </Text>
            </TouchableOpacity>
            <TouchableHighlight
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              underlayColor="#EEEEEE"
              onPress={() => {
                setDeleteMode(false);
                const tempList = myCommentList.map(p => ({
                  ...p,
                  isChecked: false,
                }));
                setMyCommentList(tempList);
              }}>
              <CancelButton color="#333D4B" />
            </TouchableHighlight>
          </>
        ) : (
          <SpinningThreeDots
            handleDefaultModeComponent={handleBoardSearchComponent}
            handleOptionModeIsNotMineComponent={handleDeleteComponent}
          />
        ),
      headerTitleAlign: 'center',
    });
  }, [navigation, deleteMode, deleteButtonEnabled]);

  useEffect(() => {
    const checkedCount = myCommentList.filter(c => c.isChecked).length;
    if (checkedCount > 0) {
      setDeleteButtonEnabled(true);
    } else {
      setDeleteButtonEnabled(false);
    }

    const isAllChecked = myCommentList.filter(c => !c.isChecked).length === 0;
    setIsCheckedAll(isAllChecked);
  }, [myCommentList]);

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      const commentList = await getMyCommentList(0, sortBy);
      setCurrentPage(0);
      setMyCommentList(commentList);
      setIsLoading(false);
    }
    init();
  }, [sortBy]);

  const handleBoardSearchComponent = (
    <TouchableHighlight
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      underlayColor="#EEEEEE"
      onPress={() => {
        navigation.navigate('MyCommentSearch');
      }}>
      <SearchIcon />
    </TouchableHighlight>
  );

  const handleDeleteComponent = (
    <TouchableHighlight
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      underlayColor="#EEEEEE"
      onPress={() => {
        setDeleteMode(true);
      }}>
      <TrashIcon />
    </TouchableHighlight>
  );

  const handleRefresh = async () => {
    if (!deleteMode) {
      const commentList = await getMyCommentList(0, sortBy);
      setCurrentPage(0);
      setMyCommentList(commentList);
      setIsCheckedAll(false);
    }
  };

  const fetchNextPage = async () => {
    let thisPageCommentList: MyCommentDto[] = await getMyCommentList(
      currentPage + 1,
      sortBy,
    );
    setMyCommentList(myCommentList.concat(thisPageCommentList));
    if (thisPageCommentList.length > 0) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <WaterMark />
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}>
        <ActivityIndicator
          size="large"
          color={'#A055FF'}
          animating={isLoading}
          style={{zIndex: 100}}
        />
      </View>
      {myCommentList.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F6F6F6',
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
            {isLoading
              ? ''
              : '아직 작성된 댓글이 없습니다.\n첫 댓글을 작성해주세요.'}
          </Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 16,
              height: 46,
            }}>
            {!deleteMode && (
              <TouchableOpacity
                onPress={() => {
                  if (sortBy === 'createdAt') {
                    setSortBy('likeCount');
                  } else {
                    setSortBy('createdAt');
                  }
                }}
                style={{
                  marginLeft: 24,
                  width: 83,
                  height: 24,
                  backgroundColor: '#f6f6f6',
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={[fontRegular, {marginRight: 5}]}>
                  {sortBy === 'createdAt' ? '최신순' : '공감순'}
                </Text>
                <SortIcon />
              </TouchableOpacity>
            )}
            {deleteMode && (
              <TouchableOpacity
                onPress={() => {
                  setIsCheckedAll(!isCheckedAll);
                  const tempList = myCommentList.map(p => ({
                    ...p,
                    isChecked: !isCheckedAll,
                  }));
                  setMyCommentList(tempList);
                }}
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  paddingRight: 27,
                }}>
                <Text style={[{marginRight: 9, fontSize: 13}, fontMedium]}>
                  {`${myCommentList.filter(c => c.isChecked).length}/${
                    myCommentList.length
                  }`}
                </Text>
                {isCheckedAll ? <RectangleChecked /> : <RectangleUnchecked />}
              </TouchableOpacity>
            )}
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={myCommentList}
            renderItem={({item}) => (
              <MyCommentItem
                comment={item}
                moveToPost={moveToPost}
                deleteMode={deleteMode}
              />
            )}
            ItemSeparatorComponent={() => (
              <View style={{height: 1, backgroundColor: '#F6F6F6'}}></View>
            )}
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
            onEndReachedThreshold={0.8}
          />
        </View>
      )}
      {deleteModalVisible && (
        <ModalBottom
          modalVisible={deleteModalVisible}
          setModalVisible={setDeleteModalVisible}
          content="선택하신 댓글을 삭제하시겠습니까?"
          purpleButtonText="삭제"
          whiteButtonText="취소"
          purpleButtonFunc={async () => {
            setIsLoading(true);
            await deleteMyComments(
              myCommentList.filter(c => c.isChecked).map(c => c.id),
            );
            const commentList = await getMyCommentList(currentPage, sortBy);
            setMyCommentList(commentList);
            setIsLoading(false);
            setDeleteMode(false);
            setDeleteModalVisible(false);
            setTimeout(function () {
              Toast.show('댓글이 성공적으로 삭제되었습니다', Toast.SHORT);
            }, 100);
          }}
          whiteButtonFunc={() => {
            setDeleteModalVisible(false);
          }}
        />
      )}
    </SafeAreaView>
  );
}
