import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  AppState,
  Platform,
  Linking,
  Image,
  FlatList,
} from 'react-native';
import AdMob from '../../components/AdMob';
import {fontBold, fontRegular} from '../../common/font';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyComment from '../../../resources/icon/EmptyComment';
import EmptyHeart from '../../../resources/icon/EmptyHeart';
import {PinBoardDto, HotBoardDto, HomeNotification} from '../../classes/Home';
import {
  getAuthentication,
  getHotBoardContents,
  getPinBoardContents,
  getUnreadNotification,
  getNewPosts,
  getBanner,
} from '../../common/homeApi';
import {ModalBottom} from '../../components/ModalBottom';
import Modal from 'react-native-modal';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {Authentication} from '../../classes/Authentication';
import WaterMark from '../../components/WaterMark';
import {getHundredsDigit} from '../../common/util/statusUtil';
import {logout} from '../../common/authApi';
import Error from '../../components/Error';
import messaging from '@react-native-firebase/messaging';
import {
  pushTokenLogic,
  topicTokenLogic,
} from '../../common/util/pushRegisterUtil';
import {request, PERMISSIONS} from 'react-native-permissions';
import SungshinPortal from '../../../resources/icon/SungshinPortal';
import Notice from '../../../resources/icon/Notice';
import Calendar from '../../../resources/icon/Calendar';
import StudentCafeteria from '../../../resources/icon/StudentCafeteria';
import SchoolBus from '../../../resources/SchoolBus';
import HotPost from '../../../resources/icon/HotPost';
import RecentPost from '../../../resources/icon/RecentPost';
import PinPost from '../../../resources/icon/PinPost';
import RightArrow from '../../../resources/icon/Arrow';
import NewPost from '../../../resources/icon/NewPost';
import {ViewToken} from 'react-native';

type RootStackParamList = {
  PostListScreen: {boardId: number};
  MyPage: undefined;
  PostScreen: {postId: number};
  RegularMemberAuthMyPage: undefined;
  TermsOfService: undefined;
  Board: undefined;
  InformationUse: undefined;
  DirectionAgreeScreen: undefined;
  ExpiredMember: undefined;
  CertifiedMember: undefined;
  UncertifiedMember: undefined;
  ErrorScreen: {status: number; code: string};
  SplashHome: undefined;
  Notice: {noticeId: number};
};
type notiItemDto = {
  notiItem: HomeNotification;
};
type Props = NativeStackScreenProps<RootStackParamList>;

interface HotPostItem {
  commentCount: number;
  likeCount: number;
  postContent: string;
  postId: number;
}

const HomeFragment = ({navigation}: Props) => {
  const [pinBoardContents, setPinBoardContents] = useState<PinBoardDto[]>([]);
  const [hotBoardContents, setHotBoardContents] = useState<HotBoardDto>();
  const [blacklistblindModalVisible, setBlacklistblindModalVisible] =
    useState<boolean>(false);
  const [isCafeteriaModalVisible, setIsCafeteriaModalVisible] =
    useState<boolean>(false); // 학식 운캠/수캠 선택 모달
  const [blindModalVisible, setBlindModalVisible] = useState<boolean>(false);
  const [modalBody, setModalBody] = useState<JSX.Element>();
  const [user, setUser] = useState<Authentication>();
  const [noti, setNoti] = useState<HomeNotification[]>([]);
  const numOfBoardTitle = 19; // 고정 게시판 내용
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInited, setIsInited] = useState<boolean>(false);
  const [isHomeAlertError, setIsHomeAlertError] = useState<boolean>(false);
  const [isPinBoardError, setIsPinBoardError] = useState<boolean>(false);
  const [isHotBoardError, setIsHotBoardError] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [newPosts, setNewPosts] = useState<any[]>([]); // 방금 올라온 글 데이터
  const [isLoadingNewPosts, setIsLoadingNewPosts] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewabilityConfig = useRef({viewAreaCoveragePercentThreshold: 50});
  // 총학생회 배너 데이터
  const [bannerData, setBannerData] = useState<{
    imageUrl: string;
    postTitle: string;
    postContent: string;
  } | null>(null);

  // 학식 운캠/수캠 선택 토글
  const toggleCafeteriaModal = () => {
    console.log('눌려요');
    setIsCafeteriaModalVisible(prev => !prev);
  };

  const openUrl = (url: string) => {
    Linking.openURL(url).catch(err =>
      console.error('링크 이동 시 오류 발생: ', err),
    );
  };

  const blacklistModalContent = (
    <>
      {user?.blacklist && (
        <View style={{width: Dimensions.get('window').width - 100}}>
          <Text style={[fontRegular, {fontSize: 13, color: '#222'}]}>
            안녕하세요. {user?.nickname}님. {`\n`}
            해당 계정은 수정광산 서비스 운영정책 위반으로 서비스의 이용이
            제한되었음을 알려드립니다. 운영정책 위반에 대한 상세 내용은 하단을
            참고 부탁드리며, 이후 해당 계정에 대한 로그인과 모든 서비스 이용이
            불가능합니다. {`\n`}
            이용 제한 처리일로 부터 7일 후, 서비스에서 자동으로 로그아웃 되며
            아래 이용 제한 계정으로도 관련 내용을 보내드리고 있으니 확인
            바랍니다.
            {`\n`}
            {`\n`}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={[fontBold, {width: 88, marginRight: 7}]}>
              이용 제한 계정
            </Text>
            <Text style={fontRegular}>{user?.blacklist.username}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[fontBold, {width: 88, marginRight: 7}]}>
              이용 제한 날짜
            </Text>
            <Text style={fontRegular}>{user?.blacklist.createdAt}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[fontBold, {width: 88, marginRight: 7}]}>
              이용 제한 사유
            </Text>
            <Text style={fontRegular}>{user?.blacklist.reason}</Text>
          </View>
        </View>
      )}
    </>
  );
  useEffect(() => {
    async function getContents() {
      if (!isInited) {
        setIsLoading(true);
      }
      // await AsyncStorage.removeItem('messagePermission');
      const response = await getAuthentication();
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
        setUser(response.data.data);
        const messagePermission = await AsyncStorage.getItem(
          'messagePermission',
        );
        const enabled = await messaging().hasPermission();
        if (messagePermission === null && enabled) {
          await pushTokenLogic();
          if (messagePermission === null) {
            await topicTokenLogic();
          }
        }

        if (!response.data.data?.blacklist) {
          const notification = await getUnreadNotification();
          if (notification.status === 401) {
            setTimeout(function () {
              Toast.show(
                '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                Toast.SHORT,
              );
            }, 100);
            logout();
            navigation.reset({routes: [{name: 'SplashHome'}]});
          } else if (getHundredsDigit(notification.status) === 2) {
            console.log('notification.data.data', notification.data.data);
            setNoti(notification.data.data);
          } else {
            setIsHomeAlertError(true);
          }

          if (response.data.data.isAuthenticated) {
            const pinBoardData = await getPinBoardContents();
            const hotBoardData = await getHotBoardContents();

            if (pinBoardData.status === 401) {
              setTimeout(function () {
                Toast.show(
                  '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                  Toast.SHORT,
                );
              }, 100);
              logout();
              navigation.reset({routes: [{name: 'SplashHome'}]});
            } else if (getHundredsDigit(pinBoardData.status) === 2) {
              setPinBoardContents(pinBoardData.data.data);
            } else {
              setIsPinBoardError(true);
            }
            if (hotBoardData.status === 401) {
              setTimeout(function () {
                Toast.show(
                  '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                  Toast.SHORT,
                );
              }, 100);
              logout();
              navigation.reset({routes: [{name: 'SplashHome'}]});
            } else if (getHundredsDigit(hotBoardData.status) === 2) {
              // setHotBoardContents(hotBoardData.data.data);
            } else {
              setIsHotBoardError(true);
            }
          }
        } else {
          // 이용제한
          setBlacklistblindModalVisible(true);
        }
      } else setIsError(true);

      if (!isInited) {
        setIsLoading(false);
        setIsInited(true);
      }
    }
    if (isFocused) {
      getContents();
    }
  }, [isFocused, modalBody, blindModalVisible]);
  // console.log(pinBoardContents);
  useEffect(() => {
    const listener = AppState.addEventListener('change', status => {
      if (Platform.OS === 'ios' && status === 'active') {
        request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
          .then(result => console.warn(result))
          .catch(error => console.warn(error));
      }
    });

    return () => {
      listener.remove();
    };
  }, []);

  // 인기있는 게시글 테스트
  useEffect(() => {
    const testData = {
      boardId: 0,
      boardName: 'string',
      hotPosts: [
        {
          commentCount: 2,
          likeCount: 3,
          postContent: '지금 인기있는 게시글입니당',
          postId: 0,
        },
        {
          commentCount: 2,
          likeCount: 3,
          postContent: '지금 인기있는 게시글입니당222',
          postId: 1,
        },
        {
          commentCount: 22,
          likeCount: 31,
          postContent:
            '내가 진짜 대박인거 알려줄까? 나 취준생일 때 알바하던 곳 사장님이 인사팀 부장이셨단 말이야. 그래서 그 당시에 자소서 쓰면 사장님한테 보여드리기도 했었는데 부장이셨단 말이야. 부장이셨단 말이야. 부장이셨단 말이야. 부장이셨단 말이야. 부장이셨단 말이야. 부장이셨단 말이야. .',
          postId: 2,
        },
        {
          commentCount: 44,
          likeCount: 4,
          postContent: '지금 인기있는 게시글입니당',
          postId: 3,
        },
      ],
    };

    // 테스트 데이터를 설정합니다.
    setHotBoardContents(testData);
  }, []);

  // 방금 올라온 글 데이터 불러오기
  useEffect(() => {
    const fetchNewPosts = async () => {
      setIsLoadingNewPosts(true);
      const data = await getNewPosts();
      setNewPosts(data);
      setIsLoadingNewPosts(false);
    };

    fetchNewPosts();
  }, []);

  // 총학생회 배너 데이터 불러오기
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const bannerData = await getBanner();
        setBannerData(bannerData);
      } catch (error) {
        console.error('베너 데이터 오류: ', error);
      }
    };

    fetchBannerData();
  }, []);

  // 인기있는 글
  const renderHotPostItem = ({item}: {item: HotPostItem}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PostScreen', {postId: item.postId})}>
      <View style={styles.slideContainer}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.hotPostSummary}>
          {item.postContent.slice(0, 30)}
        </Text>
        <Text style={styles.hotPostBoardName}>게시판 이름</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            right: 16,
            bottom: 19,
          }}>
          <EmptyHeart />
          <Text style={styles.HOTpostLike}>{item.likeCount}</Text>
          <EmptyComment />
          <Text style={styles.HOTpostComment}>{item.commentCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  // 인기있는 글 하단 인덱스 조정
  const handleViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index || 0);
      }
    },
  );

  return (
    <>
      <WaterMark />
      {isError ? (
        <Error status={500} code={'H001'} />
      ) : (
        <>
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
          <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
            <View style={styles.portalContainer}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() =>
                  Linking.openURL('https://portal.sungshin.ac.kr/portal')
                }>
                <SungshinPortal />
                <Text style={styles.iconLabel}>성신 포탈</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() =>
                  Linking.openURL(
                    'https://portal.sungshin.ac.kr/portal/ssu/menu/notice/ssuboard02.page',
                  )
                }>
                <Notice />
                <Text style={styles.iconLabel}>학사 공지</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() =>
                  Linking.openURL(
                    'https://www.sungshin.ac.kr/main_kor/11000/subview.do',
                  )
                }>
                <Calendar />
                <Text style={styles.iconLabel}>학사 일정</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconContainer}
                onPress={toggleCafeteriaModal}>
                <StudentCafeteria />
                <Text style={styles.iconLabel}>학식</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() =>
                  Linking.openURL(
                    'https://www.sungshin.ac.kr/main_kor/10963/subview.do',
                  )
                }>
                <SchoolBus />
                <Text style={styles.iconLabel}>셔틀버스</Text>
              </TouchableOpacity>
            </View>
            {/* 배너 영역 */}
            {bannerData && (
              <View style={styles.bannerContainer}>
                <Image
                  source={
                    bannerData.imageUrl ? {uri: bannerData.imageUrl} : null
                  }
                  style={styles.bannerImage}
                  resizeMode="cover"
                />
                {!bannerData.imageUrl && (
                  <View style={styles.bannerPlaceholder} />
                )}
                <Text style={styles.studenCouncilBox}>총학생회</Text>
                <View style={styles.bannerTextContainer}>
                  <Text style={styles.bannerTitle}>{bannerData.postTitle}</Text>
                  <Text style={styles.bannerContent}>
                    {bannerData.postContent}
                  </Text>
                </View>
              </View>
            )}
            <View
              style={{
                padding: 24,
              }}>
              {/* 게시판 글 목록 */}
              <View style={styles.rowContainer}>
                {/* 지금 인기있는 글 영역 */}
                <View style={styles.boardTitleContainer}>
                  <HotPost />
                  <Text style={[fontRegular, styles.boardTitle]}>
                    지금 인기있는 글
                  </Text>
                </View>
                <TouchableWithoutFeedback
                  onPress={() => {
                    {
                      user?.isAuthenticated
                        ? navigation.navigate('PostListScreen', {boardId: 2})
                        : Toast.show('접근 권한이 없습니다.', Toast.SHORT);
                    }
                  }}>
                  <RightArrow />
                </TouchableWithoutFeedback>
              </View>
              {!isInited ? (
                skeletonComponent
              ) : user?.isAuthenticated ? (
                hotBoardContents?.hotPosts.length === 0 ? (
                  <View
                    style={{
                      backgroundColor: '#F7F7F7',
                      paddingVertical: 27,
                      borderRadius: 20,
                    }}>
                    <Text
                      style={[
                        fontRegular,
                        {
                          textAlign: 'center',
                          fontSize: 15,
                          color: '#6E7882',
                        },
                      ]}>
                      공감을 10개 이상 받은 게시글이 없습니다.
                    </Text>
                  </View>
                ) : (
                  <View>
                    <FlatList
                      data={hotBoardContents?.hotPosts}
                      renderItem={renderHotPostItem}
                      horizontal
                      pagingEnabled
                      keyExtractor={item => item.postId.toString()}
                      showsHorizontalScrollIndicator={false}
                      onViewableItemsChanged={
                        handleViewableItemsChanged.current
                      }
                      viewabilityConfig={viewabilityConfig.current}
                    />
                    <View style={styles.paginationContainer}>
                      {hotBoardContents?.hotPosts.map((_, index) => (
                        <View
                          key={index}
                          style={[
                            styles.paginationDot,
                            index === currentIndex
                              ? styles.activeDot
                              : styles.inactiveDot,
                          ]}
                        />
                      ))}
                    </View>
                  </View>
                )
              ) : (
                <View
                  style={{
                    backgroundColor: '#F7F7F7',
                    paddingVertical: 27,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={[
                      fontRegular,
                      {
                        textAlign: 'center',
                        fontSize: 15,
                        color: '#6E7882',
                      },
                    ]}>
                    정회원 인증 후 확인하실 수 있습니다.
                  </Text>
                </View>
              )}
              {/* 방금 올라온 글 목록 */}
              <View style={styles.rowNewPostContainer}>
                <View style={styles.boardTitleContainer}>
                  <RecentPost />
                  <Text style={[fontRegular, styles.boardTitle]}>
                    방금 올라온 글
                  </Text>
                </View>
                <TouchableWithoutFeedback
                  onPress={() => {
                    {
                      user?.isAuthenticated
                        ? navigation.navigate('PostListScreen', {boardId: 2})
                        : Toast.show('접근 권한이 없습니다.', Toast.SHORT);
                    }
                  }}>
                  <RightArrow />
                </TouchableWithoutFeedback>
              </View>
              {isLoadingNewPosts ? (
                <ActivityIndicator size="large" color="#A055FF" />
              ) : newPosts.length === 0 ? (
                <View
                  style={{
                    backgroundColor: '#F7F7F7',
                    paddingVertical: 27,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={[
                      fontRegular,
                      {
                        textAlign: 'center',
                        fontSize: 15,
                        color: '#6E7882',
                      },
                    ]}>
                    방금 올라온 글이 없습니다.
                  </Text>
                </View>
              ) : (
                newPosts.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate('PostScreen', {postId: item.postId})
                    }>
                    <View style={styles.newPostContainer}>
                      <View style={styles.hotPostContainer}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={[
                            styles.newPostTitle,
                            {
                              width: Dimensions.get('window').width - 150,
                              color: '#000',
                            },
                          ]}>
                          {item.postContent.slice(0, 30)}
                        </Text>
                      </View>
                      <Text style={styles.newPostTime}>
                        {item.minute}분전 ·{' '}
                        <Text style={styles.newPostBoard}>
                          {item.boardName}
                        </Text>
                      </Text>
                      <Image
                        source={{uri: item.imageUrl}}
                        style={styles.newPostImage}
                      />
                    </View>
                  </TouchableOpacity>
                ))
              )}
              {/* 고정된 커뮤니티 */}
              <View style={{marginVertical: 20}}>
                <View style={styles.rowContainer}>
                  <View style={styles.boardTitleContainer}>
                    <PinPost />
                    <Text style={[fontRegular, styles.boardTitle]}>
                      고정한 커뮤니티
                    </Text>
                  </View>

                  <TouchableWithoutFeedback
                    onPress={() => {
                      {
                        user?.isAuthenticated
                          ? navigation.navigate('Board')
                          : Toast.show('접근 권한이 없습니다.', Toast.SHORT);
                      }
                    }}>
                    <RightArrow />
                  </TouchableWithoutFeedback>
                </View>
                {/* 게시판 글 목록 */}
                {!isInited ? (
                  // true?
                  skeletonComponent
                ) : user?.isAuthenticated ? (
                  pinBoardContents?.length === 0 ? (
                    <View
                      style={{
                        backgroundColor: '#F7F7F7',
                        paddingVertical: 27,
                        borderRadius: 20,
                      }}>
                      <Text
                        style={[
                          fontRegular,
                          {
                            textAlign: 'center',
                            fontSize: 15,
                            color: '#6E7882',
                          },
                        ]}>
                        고정된 게시판이 없습니다.
                      </Text>
                    </View>
                  ) : (
                    pinBoardContents?.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          if (
                            item.boardId === 5 ||
                            item.boardId === 6 ||
                            item.boardId === 7 ||
                            item.boardId === 8 ||
                            item.boardId === 9
                          ) {
                            navigation.navigate('WikiTab', {
                              boardId: item.boardId,
                            });
                          } else
                            navigation.navigate('PostListScreen', {
                              boardId: item.boardId,
                            });
                        }}>
                        <View style={styles.pinBoardContainer}>
                          <View style={styles.postTitleSummaryContainer}>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={[fontRegular, styles.postTitleSummary]}>
                              {item.boardName.slice(0, numOfBoardTitle)}
                            </Text>
                          </View>
                          <View style={styles.postSummaryContainer}>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={[
                                fontRegular,
                                styles.postSummary,
                                {
                                  color: item.recentPostContent
                                    ? '#6E7882'
                                    : '#CBD0D8',
                                },
                              ]}>
                              {item.recentPostContent
                                ? item.recentPostContent
                                : '아직 작성된 글이 없습니다!'}
                            </Text>
                          </View>
                          <View style={styles.postNewLabelContainer}>
                            {item.todayNewPost ? <NewPost /> : <></>}
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))
                  )
                ) : (
                  <View
                    style={{
                      backgroundColor: '#F7F7F7',
                      paddingVertical: 27,
                      borderRadius: 20,
                    }}>
                    <Text
                      style={[
                        fontRegular,
                        {
                          textAlign: 'center',
                          fontSize: 15,
                          color: '#6E7882',
                        },
                      ]}>
                      정회원 인증 후 확인하실 수 있습니다.
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <AdMob />
          </ScrollView>
          <ModalBottom
            modalVisible={blacklistblindModalVisible}
            setModalVisible={setBlacklistblindModalVisible}
            title={'서비스 이용 제한 안내'}
            content={blacklistModalContent}
            isContentCenter={false}
            purpleButtonText="서비스 이용 방향 보기"
            purpleButtonFunc={() => {
              setBlacklistblindModalVisible(false);
              navigation.navigate('InformationUse');
            }}
            whiteButtonText="확인 후 로그아웃"
            whiteButtonFunc={async () => {
              await logout();
              navigation.reset({routes: [{name: 'SplashHome'}]});
              setBlacklistblindModalVisible(false);
            }}
            setDisableClose={true}
          />
          <ModalBottom
            modalVisible={blindModalVisible}
            setModalVisible={setBlindModalVisible}
            title="블라인드 안내"
            content={modalBody}
            isContentCenter={false}
            purpleButtonText="수정광산 이용 방향 보기"
            purpleButtonFunc={() => {
              setBlindModalVisible(!blindModalVisible);
              navigation.navigate('DirectionAgreeScreen');
            }}
            whiteButtonText="확인"
            whiteButtonFunc={() => {
              setBlindModalVisible(!blindModalVisible);
            }}
          />
        </>
      )}
      <Modal
        isVisible={isCafeteriaModalVisible}
        onBackdropPress={toggleCafeteriaModal}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              openUrl('https://www.sungshin.ac.kr/main_kor/11095/subview.do');
              toggleCafeteriaModal();
            }}>
            <Text style={styles.buttonText}>운캠</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              openUrl('https://www.sungshin.ac.kr/main_kor/11076/subview.do');
              toggleCafeteriaModal();
            }}>
            <Text style={styles.buttonText}>수캠</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default HomeFragment;

const styles = StyleSheet.create({
  portalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 15,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconLabel: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14.32,
    textAlign: 'center',
    marginTop: 8,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    alignItems: 'center',
  },
  rowNewPostContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 5,
  },
  boardTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  boardTitle: {
    fontFamily: 'Pretendard',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 8,
  },
  more: {
    fontSize: 13,
    color: '#A055FF',
    textDecorationLine: 'underline',
  },
  pinBoardContainer: {
    marginVertical: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  hotPostContainer: {
    marginVertical: 8,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postTitleSummary: {
    fontSize: 13,
    marginRight: 16,
    maxWidth: 180,
  },
  postSummary: {
    fontSize: 13,
  },
  hotPostSummary: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Pretendard',
    marginBottom: 25,
  },
  postNewLabel: {
    color: '#FF6060',
    fontSize: 12,
    fontWeight: 'bold',
    width: 10,
    marginLeft: 12,
  },
  postSummaryContainer: {
    alignItems: 'stretch',
    flex: 1,
  },
  HOTpostLike: {
    fontSize: 9,
    marginLeft: 4,
    marginRight: 10,
  },
  HOTpostComment: {
    fontSize: 9,
    marginLeft: 4,
  },
  hotPostBoardName: {
    lineHeight: 14.32,
    color: '#6E7882',
    fontSize: 12,
    fontFamily: 'Pretendard',
    position: 'absolute',
    left: 20,
    bottom: 20,
  },
  newsContainer: {
    flexWrap: 'wrap',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    backgroundColor: '#FFF',
  },
  newsTitle: {
    fontSize: 15,
    marginLeft: 10,
  },
  newsMore: {
    color: '#707A82',
    fontSize: 13,
    marginLeft: 10,
    marginTop: 4,
  },
  newPostContainer: {
    marginVertical: 8,
    justifyContent: 'center',
  },
  newPostTitle: {
    fontSize: 14,
    fontFamily: 'Pretendard',
  },
  newPostTime: {
    fontSize: 12,
    fontFamily: 'Pretendard',
  },
  newPostBoard: {
    fontSize: 12,
    fontFamily: 'Pretendard',
    color: '#89919A',
  },
  newPostImage: {
    width: 44,
    height: 44,
    position: 'absolute',
    right: 16,
    borderRadius: 6,
  },
  skeletonRow: {
    flexDirection: 'row',
    height: 32,
  },
  skeletonBoardName: {
    width: 87,
    height: 12,
    backgroundColor: '#E1E4EA',
  },
  skeletonBoardContent: {
    height: 12,
    backgroundColor: '#E1E4EA',
    marginLeft: 16,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 10,
    alignItems: 'center',
  },
  button: {
    fontFamily: 'Pretendard',
    backgroundColor: '#A055FF',
    borderRadius: 20,
    padding: 15,
    marginVertical: 5,
    width: Dimensions.get('window').width * 0.8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // 배너
  bannerContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
    marginTop: 20,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerPlaceholder: {
    backgroundColor: '#b4b4b4',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bannerTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
  },
  bannerTitle: {
    fontFamily: 'Pretendard',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bannerContent: {
    fontFamily: 'Pretendard',
    color: '#fff',
    fontSize: 12,
    fontWeight: '400',
  },
  studenCouncilBox: {
    fontFamily: 'Pretendard',
    position: 'absolute',
    paddingVertical: 5,
    paddingHorizontal: 9,
    top: 16,
    left: 16,
    borderRadius: 6,
    color: '#fff',
    fontSize: 12,
    borderWidth: 1,
    borderColor: 'white',
    borderStyle: 'solid',
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  slideContainer: {
    width: Dimensions.get('window').width - 50,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  paginationDot: {
    height: 6,
    width: 6,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#A055FF',
    width: 12,
  },
  inactiveDot: {
    backgroundColor: '#E1E4EA',
  },
});

const skeletonComponent = (
  <View>
    <View style={styles.skeletonRow}>
      <View style={styles.skeletonBoardName}></View>
      <View style={[styles.skeletonBoardContent, {width: 164}]}></View>
    </View>
    <View style={styles.skeletonRow}>
      <View style={styles.skeletonBoardName}></View>
      <View style={[styles.skeletonBoardContent, {width: 185}]}></View>
    </View>
    <View style={styles.skeletonRow}>
      <View style={styles.skeletonBoardName}></View>
      <View style={[styles.skeletonBoardContent, {width: 148}]}></View>
    </View>
    <View style={styles.skeletonRow}>
      <View style={styles.skeletonBoardName}></View>
      <View style={[styles.skeletonBoardContent, {width: 136}]}></View>
    </View>
    <View style={styles.skeletonRow}>
      <View style={styles.skeletonBoardName}></View>
      <View style={[styles.skeletonBoardContent, {width: 170}]}></View>
    </View>
    <View style={styles.skeletonRow}>
      <View style={styles.skeletonBoardName}></View>
      <View style={[styles.skeletonBoardContent, {width: 185}]}></View>
    </View>
    <View style={styles.skeletonRow}>
      <View style={styles.skeletonBoardName}></View>
      <View style={[styles.skeletonBoardContent, {width: 148}]}></View>
    </View>
    <View style={styles.skeletonRow}>
      <View style={styles.skeletonBoardName}></View>
      <View style={[styles.skeletonBoardContent, {width: 164}]}></View>
    </View>
  </View>
);
