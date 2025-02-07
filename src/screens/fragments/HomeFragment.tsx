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
import FilledHeart from '../../../resources/icon/FilledHeart';
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
import BannerBasicImg from '../../../resources/images/BannerBasicImg.png';
import {ViewToken} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import OnboardingImg from '../../../resources/images/OnboadingImg.png';
import {useFocusEffect} from '@react-navigation/native';

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

  const [showOnboarding, setShowOnboarding] = useState<boolean>(true); // 메인 온보딩

  const viewabilityConfig = useRef({viewAreaCoveragePercentThreshold: 50});

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const onViewRef = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentBannerIndex(viewableItems[0].index);
    }
  });

  // 온보딩 표시 여부 (최초 접속 여부) 판단
  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (!hasLaunched) {
          // 최초 실행 시 온보딩 표시
          setShowOnboarding(true);
          // 이후에는 온보딩을 표시하지 않도록 'hasLaunched' 값을 'true'로 설정
          await AsyncStorage.setItem('hasLaunched', 'true');
        } else {
          // 첫 실행 이후에는 온보딩을 표시하지 않음
          setShowOnboarding(false);
        }
      } catch (error) {
        console.error('Error checking launch status', error);
      }
    };

    checkFirstLaunch();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: !showOnboarding, // 온보딩 중에는 헤더 숨김
    });
  }, [showOnboarding, navigation]);

  // 총학생회 배너 데이터
  const [bannerData, setBannerData] = useState<any[]>([]);
  const [prevAdPostId, setPrevAdPostId] = useState<number | null>(null);

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
  useFocusEffect(
    React.useCallback(() => {
      async function getContents() {
        if (!isInited) {
          setIsLoading(true);
        }

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
                setHotBoardContents(hotBoardData.data.data);
              } else {
                setIsHotBoardError(true);
              }
            }
          } else {
            setBlacklistblindModalVisible(true);
          }
        } else setIsError(true);

        if (!isInited) {
          setIsLoading(false);
          setIsInited(true);
        }
      }

      getContents();
    }, [isFocused, modalBody, blindModalVisible]),
  );
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

  // 방금 올라온 글 데이터 불러오기
  useFocusEffect(
    React.useCallback(() => {
      const fetchNewPosts = async () => {
        setIsLoadingNewPosts(true);
        try {
          const data = await getNewPosts();
          setNewPosts(data);
        } catch (error) {
          console.error(
            '방금 올라온 글 데이터를 불러오는데 실패했습니다.',
            error,
          );
        } finally {
          setIsLoadingNewPosts(false);
        }
      };

      fetchNewPosts();
    }, []), // 의존성 배열을 빈 상태로 유지하여 화면이 포커스될 때마다 실행되도록 설정
  );
  // 총학생회 배너 데이터 불러오기
  const fetchBannerData = async () => {
    try {
      // prevAdPostId를 getBanner 함수에 전달
      const bannerData = await getBanner(prevAdPostId);
      setBannerData(bannerData);

      if (bannerData && bannerData.length > 0) {
        const latestAdPost = bannerData.find(item => item.postId);
        if (latestAdPost) {
          setPrevAdPostId(latestAdPost.postId);
        }
      }
    } catch (error) {
      console.error('베너 데이터 오류: ', error);
    }
  };

  useEffect(() => {
    console.log('베너 데이터!!!!!!!!!!', bannerData);
    fetchBannerData();
  }, [prevAdPostId]);

  //인기있는 글
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
        <Text style={styles.hotPostBoardName}>{item.boardName}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            right: 16,
            bottom: 19,
          }}>
          {item.liked ? <FilledHeart /> : <EmptyHeart />}
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
      {/* 온보딩 이미지 표시 */}
      {showOnboarding && (
        <TouchableOpacity
          style={styles.onboardingContainer}
          onPress={() => setShowOnboarding(false)}>
          <Image
            source={OnboardingImg}
            style={styles.onboardingImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
      {!showOnboarding && (
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
                <View style={{width: '100%'}}>
                  {bannerData.length > 0 ? (
                    <FlatList
                      data={bannerData}
                      horizontal
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => index.toString()}
                      onViewableItemsChanged={onViewRef.current}
                      viewabilityConfig={viewabilityConfig.current}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          style={styles.bannerContainer}
                          onPress={() => {
                            if (item.postId) {
                              navigation.navigate('PostScreen', {
                                postId: item.postId,
                              });
                            }
                            {
                              /*else if (item.postAdId) {
                              navigation.navigate('AdScreen', {
                                postAdId: item.postAdId,
                              });
                            } */
                            }
                          }}>
                          {/* 배너 이미지 */}
                          <Image
                            source={
                              item.imageUrl
                                ? {uri: item.imageUrl}
                                : BannerBasicImg
                            }
                            style={styles.bannerImage}
                            resizeMode="cover"
                          />

                          {/* 그라데이션 레이어 */}
                          <LinearGradient
                            colors={['rgba(74, 74, 74, 0)', '#4A4A4A']}
                            style={styles.gradient}
                          />

                          {/* 총학생회 텍스트 */}
                          <Text style={styles.studenCouncilBox}>
                            {item.postId ? '총학생회' : '광고'}
                          </Text>

                          {/* 배너 텍스트 영역 */}
                          <View style={styles.bannerTextContainer}>
                            <Text style={styles.bannerTitle}>
                              {item.postTitle ?? '제목 없음'}
                            </Text>
                            <Text
                              style={styles.bannerContent}
                              numberOfLines={1}>
                              {item.postContent ?? '내용이 없습니다.'}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  ) : (
                    <ActivityIndicator />
                  )}

                  {/* 오른쪽 하단에 인덱스 표시 */}
                  <View style={styles.pagination}>
                    <Text style={styles.paginationText}>
                      {currentBannerIndex + 1}/{bannerData.length}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    padding: 24,
                  }}>
                  {/* 게시판 글 목록 */}
                  <View style={styles.rowContainer}>
                    {/* 지금 인기있는 글 영역 */}

                    <TouchableWithoutFeedback
                      onPress={() => {
                        {
                          user?.isAuthenticated
                            ? navigation.navigate('PostListScreen', {
                                boardId: 2,
                              })
                            : Toast.show('접근 권한이 없습니다.', Toast.SHORT);
                        }
                      }}>
                      <View style={styles.rowtitleContainer}>
                        <View style={styles.boardTitleContainer}>
                          <HotPost />
                          <Text style={[fontRegular, styles.boardTitle]}>
                            지금 인기있는 글
                          </Text>
                        </View>

                        <RightArrow />
                      </View>
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
                    <TouchableWithoutFeedback
                      onPress={() => {
                        {
                          user?.isAuthenticated
                            ? navigation.navigate('PostListScreen', {
                                boardId: 102,
                              })
                            : Toast.show('접근 권한이 없습니다.', Toast.SHORT);
                        }
                      }}>
                      <View style={styles.rowtitleContainer}>
                        <View style={styles.boardTitleContainer}>
                          <RecentPost />
                          <Text style={[fontRegular, styles.boardTitle]}>
                            방금 올라온 글
                          </Text>
                        </View>

                        <RightArrow />
                      </View>
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
                          navigation.navigate('PostScreen', {
                            postId: item.postId,
                          })
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
                            {item.minute}
                            {' · '}
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
                      <TouchableWithoutFeedback
                        onPress={() => {
                          {
                            user?.isAuthenticated
                              ? navigation.navigate('BoardFragment')
                              : Toast.show(
                                  '접근 권한이 없습니다.',
                                  Toast.SHORT,
                                );
                          }
                        }}>
                        <View style={styles.rowtitleContainer}>
                          <View style={styles.boardTitleContainer}>
                            <PinPost />
                            <Text style={[fontRegular, styles.boardTitle]}>
                              고정한 커뮤니티
                            </Text>
                          </View>

                          <RightArrow />
                        </View>
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
                                  style={[
                                    fontRegular,
                                    styles.postTitleSummary,
                                  ]}>
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
                  openUrl(
                    'https://www.sungshin.ac.kr/main_kor/11095/subview.do',
                  );
                  toggleCafeteriaModal();
                }}>
                <Text style={styles.buttonText}>운캠</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  openUrl(
                    'https://www.sungshin.ac.kr/main_kor/11076/subview.do',
                  );
                  toggleCafeteriaModal();
                }}>
                <Text style={styles.buttonText}>수캠</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      )}
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
    fontWeight: '600',
    lineHeight: 14.32,
    textAlign: 'center',
    marginTop: 8,
    color: '#3A424E',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    alignItems: 'center',
  },
  rowtitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    color: '#222222',
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
    fontSize: 12,
    marginLeft: 4,
    marginRight: 10,
  },
  HOTpostComment: {
    fontSize: 12,
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
    width: Dimensions.get('window').width,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: 200,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    width: Dimensions.get('window').width - 60,
    marginHorizontal: 5,
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
  onboardingContainer: {
    flex: 1,
    width: '100%',
  },
  onboardingImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    right: 16,
    backgroundColor: 'rgba(48, 48, 48, 0.8)',
    borderRadius: 40,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  paginationText: {
    color: '#fff',
    fontSize: 12,
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
