import React, {useEffect, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableHighlight,
  Platform,
} from 'react-native';
import FloatingWriteButton from '../../components/FloatingWriteButton';
import PostItem from '../../components/PostItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  getBoardDetail,
  getAdBoardPost,
  getBoardHotPost,
  getBoardInfo,
  getHotBoardPosts,
  reportBoard,
  toggleBoardPin,
  checkIsAdminForAdBoardPost,
  getRandomMidAd,
  getCurrentPost,
  setPostLike,
} from '../../common/boardApi';
import BoardDetailDto, {
  BoardHotPostDto,
  ContentPreviewDto,
} from '../../classes/BoardDetailDto';
import Toast from 'react-native-simple-toast';
import SpinningThreeDots from '../../components/SpinningThreeDots';
import {BigGrayFlag} from '../../../resources/icon/GrayFlag';
import {fontMedium, fontRegular, fontBold} from '../../common/font';
import Board from '../../classes/Board';
import SearchIcon from '../../../resources/icon/SearchIcon';
import NoReport, {Report} from '../../../resources/icon/Report';
import SettingIcon from '../../../resources/icon/SettingIcon';
import {SelectModalBottom} from '../../components/SelectModalBottom';
import SortIcon from '../../../resources/icon/SortIcon';
import {logout} from '../../common/authApi';
import {getHundredsDigit} from '../../common/util/statusUtil';
import WaterMark from '../../components/WaterMark';
import PurpleArrow from '../../../resources/icon/PurpleArrow';
import HotIcon from '../../../resources/icon/HotIcon';
import PostAdMid from '../../components/PostAdMid';
import PostAdItem from '../../components/PostAdItem';
import PostWriteBCase from '../../components/PostWriteBCase';
import GlobalNavbar from '../../components/GlobalNavbar';
import remoteConfig from '@react-native-firebase/remote-config';
import fetchAndActivate from '@react-native-firebase/remote-config';
import getValue from '@react-native-firebase/remote-config';
import analytics from '@react-native-firebase/analytics';

import HomeTabIcon from '../../../resources/icon/HomeTabIcon';
import BoardTabIcon from '../../../resources/icon/BoardTabIcon';
import AlertTabIcon from '../../../resources/icon/AlertTabIcon';
import MessageTabIcon from '../../../resources/icon/MessageTabIcon';
import MyPageGNB from '../../../resources/icon/MypageTabIcon';

type RootStackParamList = {
  PostScreen: {postId: number};
  PostWriteScreen: {boardId: number};
  UpdateBoard: {boardId: number};
  BoardSearch: {boardName: string; boardId: number};
  PostSearch: {boardId: number; boardName: string};
  PostListScreen: {boardId: number};
};
type Props = NativeStackScreenProps<RootStackParamList> & {
  contentType: 'TYPE1' | 'TYPE2' | 'TYPE3' | 'TYPE4';
};

const PostListScreen = ({navigation, route}: Props) => {
  const [boardDetail, setBoardDetail] = useState<ContentPreviewDto[]>([]);
  const [boardInfo, setBoardInfo] = useState<Board>();
  const [boardHotPost, setBoardHotPost] = useState<BoardHotPostDto>({
    isExist: false,
    postId: null,
    content: null,
    title: null,
  });
  const [reportModalVisible, setReportModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
  const [isHotBoard, setIsHotBoard] = useState<boolean>(true);
  const [isAdBoard, setIsAdBoard] = useState<boolean>(false);
  const [config, setConfig] = useState<{
    componentToUse: string;
  } | null>(null);
  const [midAd, setMidAd] = useState<any>(null);

  const getTextColor = (focused: boolean) => {
    return focused ? '#A055FF' : '#6E7882';
  };

  useEffect(() => {
    const initializeFirebaseAnalytics = async () => {
      await analytics().setAnalyticsCollectionEnabled(true);
    };
    initializeFirebaseAnalytics();
  }, []);

  // 중간 광고 가져오는 함수
  const fetchMidAd = async () => {
    try {
      const adData = await getRandomMidAd(route.params.boardId);
      console.log('광고 데이터:', adData);
      if (adData) {
        // 광고 데이터 구조 맞추기
        const processedAdData = {
          postAdId: adData.postAdId,
          title: adData.title,
          content: adData.content,
          thumbnail: adData.thumbnail,
          profileImage: adData.profileImage,
          displayName: '광고',
          storeName: adData.storeName,
          createdAt: adData.createdAt,
          isOwner: adData.isOwner,
          imageCount: adData.imageCount || 0,
          isAd: true,
        };
        setMidAd(processedAdData);
      }
    } catch (error) {
      console.error('중간 광고 로딩 실패:', error);
    }
  };

  // 중간 광고: boardId가 10인 경우에만 5개마다 광고 삽입
  const getProcessedData = () => {
    if (!boardDetail || !midAd || route.params.boardId !== 10)
      return boardDetail;

    const processed = [...boardDetail];
    for (let i = 0; i < processed.length; i += 5) {
      processed.splice(i, 0, {...midAd, isAd: true});
    }
    return processed;
  };

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const remoteConfigInstance = remoteConfig();

        console.log('Fetching existing activated value...');
        const currentComponent = remoteConfigInstance
          .getValue('write_component')
          .asString();

        if (currentComponent) {
          console.log('Using previously activated value:', currentComponent);
          setConfig({
            componentToUse: currentComponent,
          });
        } else {
          console.log('No previously activated value. Fetching new values...');
          await remoteConfigInstance.fetchAndActivate();
          const newComponent = remoteConfigInstance
            .getValue('write_component')
            .asString();

          console.log('Fetched and activated value:', newComponent);
          setConfig({
            componentToUse: newComponent,
          });
        }
      } catch (error) {
        console.log('Remote Config error:', error);
      }
    };

    loadConfig();
  }, []);
  console.log('config:', config);

  const listHeaderCondition =
    route.params?.boardId !== 5 &&
    route.params?.boardId !== 6 &&
    route.params?.boardId !== 7 &&
    route.params?.boardId !== 8 &&
    route.params?.boardId !== 9;
  const fetchAdminStatus = useCallback(async (boardId: number) => {
    try {
      const response = await checkIsAdminForAdBoardPost(285);
      console.log('response', response);
      setIsAdBoard(response.data);
      console.log('관리자 권한 확인123', response.data);
      console.log('관리자 권한 확인', isAdBoard);
    } catch (error) {
      console.error('관리자 권한 확인', error);
    }
  }, []);

  // 게시글 목록 업데이트 함수를 별도로 분리
  const updateBoardDetail = useCallback(async () => {
    if (route.params.boardId === 284 || route.params.boardId === 2) {
      // 102 별도 처리하지 않음.
      return;
    }
    if (route.params.boardId !== 284 && route.params.boardId !== 285) {
      const boardDetail = await getBoardDetail(route.params.boardId, 0, sortBy);
      if (!boardDetail.code) {
        setBoardDetail(boardDetail);
      }
    }
  }, [route.params.boardId, sortBy]);

  // 초기 데이터 로딩 수정
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      try {
        if (route.params.boardId === 284) {
          const currentPost = await getCurrentPost(0);
          setBoardDetail(currentPost);
        } else if (route.params.boardId === 2) {
          const hotBoardData = await getHotBoardPosts(0);
          setBoardDetail(hotBoardData);
        } else if (route.params.boardId === 285) {
          const adBoardData = await getAdBoardPost(285, 0);
          setBoardDetail(adBoardData);
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
              Toast.show(
                '인기 게시글 생성 중 오류가 발생했습니다.',
                Toast.SHORT,
              );
            }, 100);
          }
        }
        const boardInfo = await getBoardInfo(route.params.boardId);
        setBoardInfo(boardInfo);
        if (boardInfo?.id) {
          console.log('광고', boardInfo.id);
          await fetchAdminStatus(boardInfo.id);
        }
        await fetchMidAd(); // 광고 데이터 가져오기
        if (route.params.boardId !== 284) {
          await updateBoardDetail();
        }
      } catch (error) {
        console.error('초기 데이터 로딩 실패:', error);
        Toast.show('데이터를 불러오는데 실패했습니다.', Toast.SHORT);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [route.params.boardId]);

  // 정렬 기준 변경시 게시글 목록만 업데이트
  useEffect(() => {
    updateBoardDetail();
  }, [sortBy]);

  // 화면이 focus될 때마다 데이터 새로 불러오기
  useFocusEffect(
    useCallback(() => {
      const refreshData = async () => {
        try {
          if (route.params.boardId === 284) {
            const currentPost = await getCurrentPost(0);
            setBoardDetail(currentPost);
          } else if (route.params.boardId === 2) {
            const hotBoardData = await getHotBoardPosts(0);
            setBoardDetail(hotBoardData);
          } else if (route.params.boardId === 285) {
            const adBoardData = await getAdBoardPost(285, 0);
            setBoardDetail(adBoardData);
          } else {
            const boardDetail = await getBoardDetail(
              route.params.boardId,
              0,
              sortBy,
            );
            if (!boardDetail.code) {
              setBoardDetail(boardDetail);
            }
          }
        } catch (error) {
          console.error('데이터 새로고침 실패:', error);
        }
      };

      refreshData();
    }, [route.params.boardId, sortBy]),
  );

  const handleRefresh = async () => {
    if (route.params.boardId === 284) {
      const postList = await getCurrentPost(0);
      setCurrentPage(0);
      setBoardDetail(postList);
    } else if (route.params.boardId === 2) {
      const postList = await getHotBoardPosts(0);
      setCurrentPage(0);
      setBoardDetail(postList);
    } else if (route.params.boardId === 285) {
      const postList = await getAdBoardPost(285, 0);
      setCurrentPage(0);
      setBoardDetail(postList);
    } else {
      const postList = await getBoardDetail(route.params.boardId, 0, sortBy);
      setCurrentPage(0);
      setBoardDetail(postList);
    }
  };

  // fetchNextPage 함수 수정
  const fetchNextPage = async () => {
    setIsNextPageLoading(true);
    if (route.params.boardId === 284) {
      const nextPagePosts = await getCurrentPost(currentPage + 1);
      setBoardDetail(boardDetail.concat(nextPagePosts));
      if (nextPagePosts.length > 0) {
        setCurrentPage(currentPage + 1);
      }
    } else if (route.params.boardId === 2) {
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
          <></>
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
              } else if (getHundredsDigit(response.status) === 284) {
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
            {/* {boardInfo?.isOwner ? (
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
            )} */}
          </Pressable>
        )}
        <Text
          style={[
            fontMedium,
            {
              marginLeft: 0,
              fontSize: boardInfo && boardInfo.name.length <= 10 ? 19 : 17,
              // maxWidth: 180,
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
      headerTitleAlign: 'left',
    });
  }, [navigation, boardInfo, reportModalVisible]);

  const toBoardSearch = () => {
    navigation.navigate('PostSearch', {
      boardId: boardInfo?.id,
      boardName: boardInfo?.name,
    });
  };

  const toPostWriteScreen = () => {
    navigation.navigate('PostWriteScreen', {
      boardId: route.params.boardId,
    });
  };
  const handleBoardSearchComponent = (
    <TouchableHighlight
      style={{
        width: 30,
        height: 30,
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
        {/* 헤더 아래선 제거 */}
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

        {/* 게시글 목록 */}
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
                    styles.purpleButtonStyle,
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

        {boardDetail.length === 0 && route.params.boardId !== 285 ? (
          <>
            <View style={{backgroundColor: 'white'}}>
              {!isLoading &&
                config?.componentToUse === 'writing_box' &&
                ![93, 94, 95, 284, 286, 287, 288].includes(
                  route.params.boardId,
                ) && (
                  <PostWriteBCase
                    navigation={navigation}
                    route={route}
                    contentType={boardInfo?.contentType}
                    hasTitle={boardDetail?.hasTitle}
                    onPress={async () => {
                      console.log('Writing box clicked');
                      await analytics().logEvent('writing_box_click', {
                        component: 'writing_box',
                        boardId: route.params.boardId.toString(),
                      });
                    }}
                  />
                )}
            </View>
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
                    //marginTop: 20,
                  }}>
                  {isLoading
                    ? ''
                    : route.params.boardId === 2
                    ? '공감을 10개 이상 받은 게시글이 없습니다.'
                    : '아직 작성된 게시글이 없습니다.\n첫 글을 작성해주세요.'}
                </Text>
              </View>
            </SafeAreaView>
          </>
        ) : (
          <>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{flex: 1, backgroundColor: '#FFFFFF'}}
              data={getProcessedData()}
              renderItem={({item, index}) =>
                item.isAd ? (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('PostScreen', {
                        postId: item.postAdId,
                        boardId: 285,
                      });
                    }}>
                    <PostAdMid
                      post={item}
                      boardId={285}
                      navigation={navigation}
                      route={route}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('PostScreen', {
                        postId: item.postId,
                      });
                    }}>
                    {boardInfo?.id === 285 ? (
                      <PostAdItem
                        post={item}
                        boardId={boardInfo?.id}
                        navigation={navigation}
                        route={route}
                      />
                    ) : (
                      <PostItem
                        post={item}
                        boardId={boardInfo?.id}
                        navigation={navigation}
                        route={route}
                        handlePostLike={async postId => {
                          try {
                            const response = await setPostLike(postId);
                            if (response) {
                              // 특정 postId를 가진 게시물의 좋아요 상태만 업데이트
                              setBoardDetail(prevPosts =>
                                prevPosts.map(post =>
                                  post.postId === postId
                                    ? {
                                        ...post,
                                        isLiked: !post.isLiked,
                                        likeCount:
                                          post.likeCount +
                                          (post.isLiked ? -1 : 1),
                                      }
                                    : post,
                                ),
                              );
                            }
                          } catch (error) {
                            console.error('좋아요 처리 실패:', error);
                            Toast.show(
                              '좋아요 처리에 실패했습니다.',
                              Toast.SHORT,
                            );
                          }
                        }}
                      />
                    )}
                  </TouchableOpacity>
                )
              }
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
                    {!isHotBoard &&
                      ![93, 94, 95, 285].includes(route.params.boardId) && (
                        <View
                          style={{
                            flexDirection: 'row',
                            paddingHorizontal: 16,
                          }}>
                          <TouchableOpacity
                            style={[
                              styles.purpleButtonStyle,
                              {
                                flex: 1,
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
                              <>
                                <HotIcon />
                                <Text
                                  style={[styles.popularButtonText, fontBold]}>
                                  인기
                                </Text>
                              </>
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
                            {boardHotPost?.isExist ? <PurpleArrow /> : null}
                          </TouchableOpacity>

                          {/* <TouchableOpacity
                            onPress={() => {
                              if (sortBy === 'createdAt') {
                                setSortBy('likeCount');
                              } else {
                                setSortBy('createdAt');
                              }
                            }}
                            style={[
                              styles.purpleButtonStyle,
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
                          </TouchableOpacity> */}
                        </View>
                      )}

                    {!isLoading &&
                      config?.componentToUse === 'writing_box' &&
                      ![93, 94, 95, 284, 285, 2, 286, 287, 288].includes(
                        route.params.boardId,
                      ) && (
                        <PostWriteBCase
                          navigation={navigation}
                          route={route}
                          contentType={boardInfo?.contentType}
                          hasTitle={boardDetail?.hasTitle}
                        />
                      )}
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
        {config?.componentToUse === 'floating_button' &&
          ![93, 94, 95, 284, 2, 286, 287, 288].includes(route.params.boardId) &&
          (route.params?.boardId !== 285 || route.params?.boardId !== 284) && (
            <FloatingWriteButton
              onPress={async () => {
                await analytics().logEvent('floating_button_click', {
                  component: 'floating_button',
                  boardId: route.params.boardId.toString(),
                });
                console.log('Floating button clicked');
                navigation.navigate('PostWriteScreen', {
                  boardId: route.params.boardId,
                  contentType: boardInfo?.contentType,
                });
              }}
            />
          )}
        {!(
          isHotBoard ||
          ![93, 94, 95, 284, 2, 286, 287, 288].includes(route.params?.boardId)
        ) ||
          (route.params?.boardId === 285 && isAdBoard === true && (
            <FloatingWriteButton
              onPress={() =>
                navigation.navigate(
                  route.params.boardId === 285
                    ? 'AdWriteScreen'
                    : 'PostWriteScreen',
                  {
                    boardId: route.params.boardId,
                    contentType: boardInfo?.contentType,
                  },
                )
              }
            />
          ))}
      </View>
      {/* 하단 네비게이션 */}
      <View
        style={{
          height: Platform.OS === 'ios' ? 112 : 78,
          paddingBottom: Platform.OS === 'ios' ? 34 : 0,
          backgroundColor: 'white',
        }}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate('Home')}>
            <View style={styles.iconContainer}>
              <View style={styles.iconNav}>
                <HomeTabIcon size={24} color="#A055FF" focused={true} />
              </View>
              <Text style={[styles.tabIconText, {color: getTextColor(true)}]}>
                광산
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate('CrystalBall')}>
            <View style={styles.iconContainer}>
              <View style={styles.iconNav}>
                <BoardTabIcon size={24} color="#E2E4E8" focused={false} />
              </View>
              <Text style={[styles.tabIconText, {color: getTextColor(false)}]}>
                수정구
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate('Message')}>
            <View style={styles.iconContainer}>
              <View style={styles.iconNav}>
                <MessageTabIcon size={24} color="#E2E4E8" focused={false} />
              </View>
              <Text style={[styles.tabIconText, {color: getTextColor(false)}]}>
                대화
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate('Alert')}>
            <View style={styles.iconContainer}>
              <View style={styles.iconNav}>
                <AlertTabIcon size={24} color="#E2E4E8" focused={false} />
              </View>
              <Text style={[styles.tabIconText, {color: getTextColor(false)}]}>
                알림
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate('MyPage')}>
            <View style={styles.iconContainer}>
              <View style={styles.iconNav}>
                <MyPageGNB size={24} color="#E2E4E8" focused={false} />
              </View>
              <Text style={[styles.tabIconText, {color: getTextColor(false)}]}>
                MY
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: Platform.OS === 'ios' ? 34 : 0,
            width: '100%',
            backgroundColor: 'white',
          }}
        />
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
    color: '#3A424E',
    fontSize: 12,
    lineHeight: 15,
    marginLeft: 8,
  },
  popularButtonText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#A055FF',
    lineHeight: 15,
  },
  purpleButtonStyle: {
    backgroundColor: '#F6F2FF',
    borderRadius: 4,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 10,
    paddingLeft: 8,
  },
  container: {
    position: 'relative',
    paddingHorizontal: 14,
    borderBottomColor: '#F6F6F6',
    borderStyle: 'solid',
    borderBottomWidth: 4,
    height: 'auto',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    paddingTop: 2,
    paddingLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#3A424E',
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 14,
    color: '#222222',
  },
  textSmall: {
    color: '#9DA4AB',
    fontSize: 13,
  },
  timeStamp: {
    fontSize: 12,
    paddingLeft: 10,
    paddingTop: 2,
    color: '#B9BAC1',
  },
  title: {
    fontSize: 14,
    lineHeight: 19.6,
    fontWeight: '600',
    color: '#222222',
    borderBottomColor: '#EFEFF3',
    borderBottomWidth: 1,
  },
  content: {
    fontSize: 14,
    //marginBottom: 30,
    lineHeight: 19.6,
    fontWeight: '400',
    color: '#222222',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCount: {
    marginLeft: 5,
    marginRight: 12,
    color: '#9DA4AB',
  },
  bottomBar: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: 10,
    //height: 52,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 21,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EFEFF3',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconNav: {
    marginBottom: 15,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: '100%',
  },
  tabIconText: {
    fontFamily: 'pretendard',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    bottom: 10,
  },
});
