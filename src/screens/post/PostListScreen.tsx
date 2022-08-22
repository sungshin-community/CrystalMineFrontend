import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Pressable,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableHighlight,
} from 'react-native';
import FloatingWriteButton from '../../components/FloatingWriteButton';
import PostItem from '../../components/PostItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  getBoardDetail,
  getBoardInfo,
  getHotBoardPosts,
  reportBoard,
  toggleBoardPin,
} from '../../common/boardApi';
import BoardDetailDto, {ContentPreviewDto} from '../../classes/BoardDetailDto';
import Toast from 'react-native-simple-toast';
import {getPosts} from '../../common/boardApi';
import SpinningThreeDots from '../../components/SpinningThreeDots';
import {BigGrayFlag} from '../../../resources/icon/GrayFlag';
import {fontMedium, fontRegular} from '../../common/font';
import Board from '../../classes/Board';
import {BigOrangeFlag} from '../../../resources/icon/OrangeFlag';
import {
  BigDarkPin,
  BigGrayPin,
  BigOrangePin,
  BigPurplePin,
} from '../../../resources/icon/Pin';
import SearchIcon from '../../../resources/icon/SearchIcon';
import NoReport, {Report} from '../../../resources/icon/Report';
import SettingIcon from '../../../resources/icon/SettingIcon';
import {ModalBottom} from '../../components/ModalBottom';
import {SelectModalBottom} from '../../components/SelectModalBottom';
import SortIcon from '../../../resources/icon/SortIcon';
import { logout } from '../../common/authApi';
import { getHundredsDigit } from '../../common/util/statusUtil';
type RootStackParamList = {
  PostScreen: {postId: number};
  PostWriteScreen: {boardId: number};
  UpdateBoard: {boardId: number};
  BoardSearch: {boardName: string; boardId: number};
  PostSearch: {boardId: number, boardName: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;

const PostListScreen = ({navigation, route}: Props) => {
  const [boardDetail, setBoardDetail] = useState<ContentPreviewDto[]>([]);
  const [boardInfo, setBoardInfo] = useState<Board>();
  const [reportCheckModalVisible, setReportCheckModalVisible] = useState<
    boolean
  >(false);
  const [reportModalVisible, setReportModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
  const [isHotBoard, setIsHotBoard] = useState<boolean>(true);

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      if (route.params.boardId === 2) {
        const hotBoardData = await getHotBoardPosts(0);
        setBoardDetail(hotBoardData);
      } else {
        setIsHotBoard(false);
        const boardDetail = await getBoardDetail(
          route.params.boardId,
          0,
          sortBy,
        );
        if (boardDetail.code === 'BOARD_ALREADY_BLIND') {
          Toast.show('시스템에 의해 블라인드된 게시판입니다.', Toast.SHORT);
          navigation.goBack();
        } else if (
          boardDetail.code === 'BOARD_NOT_FOUND' ||
          boardDetail.code === 'BOARD_ALREADY_DELETED'
        ) {
          Toast.show('삭제된 게시판입니다.', Toast.SHORT);
          navigation.goBack();
        } else setBoardDetail(boardDetail);
      }
      const boardInfo = await getBoardInfo(route.params.boardId);
      setBoardInfo(boardInfo);
      setIsLoading(false);
    }
    init();
  }, [sortBy]);
console.log(boardInfo)
  const handleRefresh = async () => {
    if (route.params.boardId === 2) {
      const postList = await getHotBoardPosts(0);
      setCurrentPage(0);
      setBoardDetail(postList);
    } else {
      const postList = await getBoardDetail(route.params.boardId, 0, sortBy);
      setCurrentPage(0);
      setBoardDetail(postList);
    }
  };

  const fetchNextPage = async () => {
    setIsNextPageLoading(true);
    if (route.params.boardId === 2) {
      let thisPagePostList: ContentPreviewDto[] = await getHotBoardPosts(
        currentPage + 1,
      );
      setBoardDetail(boardDetail.concat(thisPagePostList));
      if (thisPagePostList.length > 0) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      let thisPagePostList: ContentPreviewDto[] = await getBoardDetail(
        route.params.boardId,
        currentPage + 1,
        sortBy,
      );
      setBoardDetail(boardDetail.concat(thisPagePostList));
      if (thisPagePostList.length > 0) {
        setCurrentPage(currentPage + 1);
      }
    }
    setIsNextPageLoading(false);
  };

  const HeaderIcon = () => {
    return (
      <>
        {boardInfo?.id === 1 ? (
          <BigDarkPin />
        ) : (
          <Pressable
            onPress={async () => {
              const response = await toggleBoardPin(route.params.boardId);
              if (response.status === 401) {
                Toast.show('토큰 정보가 만료되어 로그인 화면으로 이동합니다', Toast.SHORT);
                logout();
                navigation.reset({routes: [{name: 'SplashHome'}]});
              } else if (getHundredsDigit(response.status) === 2) {
                const boardInfo = await getBoardInfo(route.params.boardId);
                setBoardInfo(boardInfo);
              } else {
                Toast.show('게시판 고정/고정해제에 실패했습니다.', Toast.SHORT);
              }
            }}>
            {boardInfo?.isOwner ? (
              boardInfo?.isPinned ? (
                <BigOrangeFlag />
              ) : (
                <BigGrayFlag />
              )
            ) : boardInfo?.isPinned ? (
              boardInfo?.type === 'PUBLIC' ? (
                <BigOrangePin />
              ) : (
                <BigPurplePin />
              )
            ) : (
              <BigGrayPin />
            )}
          </Pressable>
        )}
        <Text
          style={[
            fontMedium,
            {
              marginLeft: 8,
              fontSize: boardInfo && boardInfo.name.length <= 10 ? 19 : 17,
              maxWidth: 180,
            },
          ]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {boardInfo ? boardInfo?.name : ''}
        </Text>
      </>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderIcon />,
      headerRight: () => (
        <>
          {boardInfo?.type !== 'OFFICIAL' ? (
            <SpinningThreeDots
              handleDefaultModeComponent={handleBoardSearchComponent}
              isMine={boardInfo?.isOwner}
              handleOptionModeIsMineComponent={handleBoardSettingComponent}
              handleOptionModeIsNotMineComponent={handleBoardReportComponent}
            />
          ) : (
            handleBoardSearchComponent
          )}
        </>
      ),
      headerTitleAlign: 'center',
    });
  }, [navigation, boardInfo, reportModalVisible]);

  const toBoardSearch = () => {
    navigation.navigate('PostSearch', {boardId: boardInfo?.id, boardName: boardInfo?.name});
  };
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
      onPress={toBoardSearch}>
      <SearchIcon />
    </TouchableHighlight>
  );
  const handleBoardSettingComponent = (
    <TouchableHighlight
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      underlayColor="#EEEEEE"
      onPress={() =>
        navigation.navigate('UpdateBoard', {boardId: route.params.boardId})
      }>
      <SettingIcon />
    </TouchableHighlight>
  );
  const handleBoardReportComponent = (
    <>
      {boardInfo?.isReported ? (
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
            Toast.show('이미 신고한 게시판입니다.', Toast.SHORT);
          }}>
          <Report />
        </TouchableHighlight>
      ) : (
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
            setReportModalVisible(true);
          }}>
          <NoReport />
        </TouchableHighlight>
      )}
    </>
  );
  return (
    <>
      {reportModalVisible && (
        <SelectModalBottom
          modalVisible={reportModalVisible}
          setModalVisible={setReportModalVisible}
          title={`게시판 신고`}
          purpleButtonText="신고하기"
          reportId={boardInfo?.id}
          reportFunc={reportBoard}
          whiteButtonText="취소"
          whiteButtonFunc={() => setReportModalVisible(false)}
        />
      )}
      <View style={{flex: 1}}>
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
        {boardDetail.length !== 0 && route.params.boardId !== 2 && (
          <View style={{backgroundColor: '#fff'}}>
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
                marginBottom: 10,
                marginTop: 16,
                width: 83,
                height: 24,
                backgroundColor: '#f6f6f6',
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{marginRight: 5}}>
                {sortBy === 'createdAt' ? '최신순' : '공감순'}
              </Text>
              <SortIcon />
            </TouchableOpacity>
          </View>
        )}
        {boardDetail.length === 0 ? (
          <SafeAreaView style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
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
                  : route.params.boardId === 2
                  ? '공감을 10개 이상 받은 게시글이 없습니다.'
                  : '아직 작성된 게시글이 없습니다.\n첫 글을 작성해주세요.'}
              </Text>
            </View>
          </SafeAreaView>
        ) : (
          <>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{flex: 1, backgroundColor: '#FFFFFF'}}
            data={boardDetail}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={async () => {
                  navigation.navigate('PostScreen', {
                    postId: item.postId
                  });
                }}>
                <PostItem post={item} boardId={boardInfo?.id}/>
              </TouchableOpacity>
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
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.8}
          />
          <View style={{backgroundColor: '#FFFFFF'}}>
          {isNextPageLoading && <ActivityIndicator size="large" color={'#A055FF'} animating={isNextPageLoading} style={{zIndex: 100}} />}
        </View>
          </>
        )}
        {!isHotBoard && (
          <FloatingWriteButton
            onPress={() =>
              navigation.navigate('PostWriteScreen', {
                boardId: route.params.boardId,
              })
            }
          />
        )}
      </View>
    </>
  );
};
export default PostListScreen;

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  floatingButtonStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
