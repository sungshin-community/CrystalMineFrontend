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
  getBoardHotPost,
  getBoardInfo,
  getHotBoardPosts,
  reportBoard,
  toggleBoardPin,
} from '../../common/boardApi';
import BoardDetailDto, {
  BoardHotPostDto,
  ContentPreviewDto,
} from '../../classes/BoardDetailDto';
import Toast from 'react-native-simple-toast';
import {getPosts} from '../../common/boardApi';
import SpinningThreeDots from '../../components/SpinningThreeDots';
import {BigGrayFlag} from '../../../resources/icon/GrayFlag';
import {fontMedium, fontRegular, fontBold} from '../../common/font';
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
import {logout} from '../../common/authApi';
import {getHundredsDigit} from '../../common/util/statusUtil';
import WaterMark from '../../components/WaterMark';
import AdMob from '../../components/AdMob';
type RootStackParamList = {
  PostScreen: {postId: number};
  PostWriteScreen: {boardId: number};
  UpdateBoard: {boardId: number};
  BoardSearch: {boardName: string; boardId: number};
  PostSearch: {boardId: number; boardName: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;

const PostListScreen = ({navigation, route}: Props) => {
  const [boardDetail, setBoardDetail] = useState<ContentPreviewDto[]>([]);
  const [boardInfo, setBoardInfo] = useState<Board>();
  const [boardHotPost, setBoardHotPost] = useState<BoardHotPostDto>({
    isExist: false,
    postId: null,
    content: null,
    title: null,
  });
  const [reportCheckModalVisible, setReportCheckModalVisible] =
    useState<boolean>(false);
  const [reportModalVisible, setReportModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
  const [isHotBoard, setIsHotBoard] = useState<boolean>(true);
  const listHeaderCondition =
    route.params?.boardId !== 5 &&
    route.params?.boardId !== 6 &&
    route.params?.boardId !== 7 &&
    route.params?.boardId !== 8 &&
    route.params?.boardId !== 9; // 광고/인기글 제외 게시판 목록

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
          setTimeout(function () {
            Toast.show('시스템에 의해 블라인드된 게시판입니다.', Toast.SHORT);
          }, 100);
          navigation.goBack();
        } else if (
          boardDetail.code === 'BOARD_NOT_FOUND' ||
          boardDetail.code === 'BOARD_ALREADY_DELETED'
        ) {
          setTimeout(function () {
            Toast.show('삭제된 게시판입니다.', Toast.SHORT);
          }, 100);
          navigation.goBack();
        } else setBoardDetail(boardDetail);

        //인기 게시물 설정
        const hotPost = await getBoardHotPost(route.params.boardId);
        console.log(hotPost);
        if (hotPost.code === 'BOARD_ALREADY_BLIND') {
          setTimeout(function () {
            Toast.show('시스템에 의해 블라인드된 게시판입니다.', Toast.SHORT);
          }, 100);
          navigation.goBack();
        } else if (
          hotPost.code === 'BOARD_NOT_FOUND' ||
          hotPost.code === 'BOARD_ALREADY_DELETED'
        ) {
          setTimeout(function () {
            Toast.show('삭제된 게시판입니다.', Toast.SHORT);
          }, 100);
          navigation.goBack();
        } else if (hotPost.code === 'READ_HOT_POST_IN_BOARD_SUCCESS') {
          setBoardHotPost(hotPost.data);
        } else {
          setTimeout(function () {
            Toast.show('인기 게시글 생성 중 오류가 발생했습니다.', Toast.SHORT);
          }, 100);
        }
      }
      const boardInfo = await getBoardInfo(route.params.boardId);
      setBoardInfo(boardInfo);
      setIsLoading(false);
    }
    init();
  }, [sortBy]);

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
              if (route.params.boardId === 1) return;
              const response = await toggleBoardPin(route.params.boardId);
              if (response.status === 401) {
                setTimeout(function () {
                  Toast.show(
                    '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                    Toast.SHORT,
                  );
                }, 100);
                logout();
                navigation.reset({routes: [{name: 'SplashHome'}]});
              } else if (getHundredsDigit(response.status) === 2) {
                const boardInfo = await getBoardInfo(route.params.boardId);
                setBoardInfo(boardInfo);
              } else {
                setTimeout(function () {
                  Toast.show(
                    '게시판 고정/고정해제에 실패했습니다.',
                    Toast.SHORT,
                  );
                }, 100);
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
    navigation.navigate('PostSearch', {
      boardId: boardInfo?.id,
      boardName: boardInfo?.name,
    });
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
      <WaterMark />
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
        {boardDetail.length !== 0 &&
          route.params?.boardId !== 2 &&
          !listHeaderCondition && (
            <View>
              <View
                style={{
                  paddingTop: 11,
                  paddingHorizontal: 24,
                  backgroundColor: 'white',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (sortBy === 'createdAt') {
                      setSortBy('likeCount');
                    } else {
                      setSortBy('createdAt');
                    }
                  }}
                  style={[
                    styles.grayButtonStyle,
                    {
                      width: 78,
                      justifyContent: 'center',
                      marginBottom: 2,
                    },
                  ]}>
                  <Text
                    style={{
                      marginRight: 5,
                      color: '#6E7882',
                      fontSize: 12,
                    }}>
                    {sortBy === 'createdAt' ? '최신순' : '공감순'}
                  </Text>
                  <SortIcon />
                </TouchableOpacity>
              </View>
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
                      postId: item.postId,
                    });
                  }}>
                  <PostItem post={item} boardId={boardInfo?.id} />
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
              onEndReached={() => fetchNextPage()}
              onEndReachedThreshold={0.8}
              ListHeaderComponent={
                boardDetail.length !== 0 &&
                route.params?.boardId !== 2 &&
                listHeaderCondition && (
                  <View>
                    <View style={{marginTop: -16}}>
                      <AdMob />
                    </View>
                    <View style={{flexDirection: 'row', paddingHorizontal: 24}}>
                      <TouchableOpacity
                        style={[
                          styles.grayButtonStyle,
                          {
                            flex: 1,
                            marginRight: 10,
                            paddingLeft: 6,
                          },
                        ]}
                        onPress={() => {
                          boardHotPost?.isExist
                            ? navigation.navigate('PostScreen', {
                                postId: boardHotPost.postId,
                              })
                            : {};
                        }}>
                        {boardHotPost?.isExist ? (
                          <Text style={[styles.popularButtonText, fontBold]}>
                            인기
                          </Text>
                        ) : null}
                        <Text
                          style={[
                            styles.grayButtonText,
                            fontRegular,
                            {flex: 1},
                          ]}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {boardHotPost?.isExist === false
                            ? '현재 실시간 인기글이 없습니다.'
                            : boardHotPost?.title !== null
                            ? boardHotPost?.title
                            : boardHotPost.content}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          if (sortBy === 'createdAt') {
                            setSortBy('likeCount');
                          } else {
                            setSortBy('createdAt');
                          }
                        }}
                        style={[
                          styles.grayButtonStyle,
                          {
                            width: 78,
                            justifyContent: 'center',
                          },
                        ]}>
                        <Text
                          style={{
                            marginRight: 5,
                            color: '#6E7882',
                            fontSize: 12,
                          }}>
                          {sortBy === 'createdAt' ? '최신순' : '공감순'}
                        </Text>
                        <SortIcon />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              }
            />
            <View style={{backgroundColor: '#FFFFFF'}}>
              {isNextPageLoading && (
                <ActivityIndicator
                  size="large"
                  color={'#A055FF'}
                  animating={isNextPageLoading}
                  style={{zIndex: 100}}
                />
              )}
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
  grayButtonStyle: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  grayButtonText: {
    color: '#6E7882',
    fontSize: 12,
    lineHeight: 15,
    paddingLeft: 10,
  },
  popularButtonText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#A055FF',
    paddingLeft: 10,
    lineHeight: 15,
  },
});
