import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {fontBold, fontRegular} from '../common/font';
import RightArrow from '../../resources/icon/Arrow';
import SaengSaeng from '../../resources/icon/SaengSaeng';
import Loudspeaker from '../../resources/icon/Loudspeaker';
import CrystalBall from '../../resources/icon/CrystalBall';
import BannerBasicImg from '../../resources/images/BannerBasicImg.png';
import {Authentication} from '../classes/Authentication';
import {getAuthentication} from '../common/homeApi';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import EmptyHeart from '../../resources/icon/EmptyHeart';
import FilledHeart from '../../resources/icon/FilledHeart';
import EmptyComment from '../../resources/icon/EmptyComment';
import {
  getSaengSaeng,
  getQuestionCrystalball,
  geRecruiting,
  getArticle,
} from '../common/CrystalApi';
import LinearGradient from 'react-native-linear-gradient';
const Lounge = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<Authentication | null>(null); // 사용자 정보 상태 추가
  const [currentIndex, setCurrentIndex] = useState(0);
  const [saengSaeng, setSaengSaeng] = useState<any[]>([]); // 생생 수정 후기 데이터
  const [isLoadingNewPosts, setIsLoadingNewPosts] = useState<boolean>(true);
  const viewabilityConfig = useRef({viewAreaCoveragePercentThreshold: 50});
  const [isLoadingQuestion, setIsLoadingQuestion] = useState<boolean>(true);
  const [questionCrystalball, setQuestionCrystalball] = useState<any[]>([]); // 수정구에게 물어봐 데이터
  const [recruitingData, setRecruitingData] = useState<any[]>([]); // 수정구에게 물어봐 데이터
  const [isLoadingRecruiting, setIsLoadingRecruiting] = useState<boolean>(true);
  const [articleData, setArticleData] = useState<any[]>([]);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const viewabilityArticleConfig = {viewAreaCoveragePercentThreshold: 50}; // 50% 이상 보이면 해당 페이지로 간주

  // onViewableItemsChanged를 useRef로 선언
  const onViewRef = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentArticleIndex(viewableItems[0].index); // 현재 보여지는 아이템의 인덱스 업데이트
    }
  });

  useEffect(() => {
    // 사용자 정보를 가져오는 함수 정의
    const fetchUser = async () => {
      try {
        const response = await getAuthentication(); // 인증 API 호출
        if (response.status === 200) {
          setUser(response.data.data); // 성공적으로 받아온 사용자 정보를 상태에 저장
        }
      } catch (error) {
        console.error('사용자 정보를 불러오는데 실패', error);
      }
    };

    fetchUser(); // 컴포넌트가 렌더링될 때 사용자 정보를 가져옴
  }, []);

  // 생생 수정 후기
  const renderSaengSaengtItem = ({item}: {item: any}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SpherePostScreen', {
          ptPostId: item.ptPostId,
          isFree: false,
          isQuestion: false,
          isReview: true,
          isArticle: false,
        });
      }}>
      <View style={styles.contentBox}>
        <View style={styles.hotTagBox}>
          <Text style={styles.hotTag}>{item.tag}</Text>
          <Text style={styles.yearJob}>{item.userJob} </Text>
          <Text style={styles.yearJob}>·</Text>
          <Text style={styles.yearJob}>{item.userYear} </Text>
        </View>
        <Text style={styles.contentTitle}>{item.title}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.contentText}>
          {item.content.slice(0, 30)}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {item.liked ? <FilledHeart /> : <EmptyHeart />}
          <Text style={styles.HOTpostLike}>{item.likeCount}</Text>
          <EmptyComment />
          <Text style={styles.HOTpostComment}>{item.ptCommentCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // 생생 수정 후기 하단 인덱스 조정
  const handleViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: any[]}) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index || 0);
      }
    },
  );

  // 수정이들은 지금
  const renderRecruitingtItem = ({item}) => (
    <TouchableOpacity
      style={styles.nowBox}
      onPress={() => navigation.navigate('PostScreen', {postId: item.postId})}>
      <View style={styles.thumbnailImgContainer}>
        <Image
          source={{uri: item.thumbnail}}
          style={styles.thumbnailImg}
          resizeMode="cover"
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImgContainer}>
            <Image
              source={{uri: item.profileImage}}
              style={styles.profileImg}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.nickName}>{item.displayName}</Text>
        </View>
        <Text
          style={styles.recruitingTitle}
          numberOfLines={2}
          ellipsizeMode="tail">
          {item.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {item.isLiked ? <FilledHeart /> : <EmptyHeart />}
          <Text style={styles.HOTpostLike}>좋아요 {item.likeCount} </Text>
          <EmptyComment />
          <Text style={styles.HOTpostComment}>{item.commentCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // 방금 올라온 글 데이터 불러오기
  useEffect(() => {
    const fetchNewPosts = async () => {
      setIsLoadingNewPosts(true);
      const data = await getSaengSaeng();
      setSaengSaeng(data);
      setIsLoadingNewPosts(false);
    };

    fetchNewPosts();
  }, []);

  // 수정구에게 물어봐 데이터 불러오기
  useEffect(() => {
    const fetchQuestionCrystalball = async () => {
      setIsLoadingQuestion(true);
      const data = await getQuestionCrystalball();
      setQuestionCrystalball(data);
      setIsLoadingQuestion(false);
    };

    fetchQuestionCrystalball();
  }, []);

  // 수정이들은 지금 데이터 불러오기
  useEffect(() => {
    const fetcRecruiting = async () => {
      setIsLoadingRecruiting(true);
      const data = await geRecruiting();
      setRecruitingData(data);
      setIsLoadingRecruiting(false);
    };

    fetcRecruiting();
  }, []);

  // 아티클 데이터  데이터 불러오기
  useEffect(() => {
    const fetchArticles = async () => {
      //setIsLoadingRecruiting(true);
      const data = await getArticle();
      setArticleData(data);
      //setIsLoadingRecruiting(false);
    };

    fetchArticles();
  }, []);

  // 테스트 데이터
  useEffect(() => {
    const testData = [
      {
        commentCount: 5,
        content: '수정구에 대한 궁금증을 풀어보세요!',
        displayName: 'Crystal Guide',
        issuedMonth: 11,
        likeCount: 23,
        title: '수정구의 매력, 수정광산의 이야기',
        thumnnail: null,
      },
      {
        commentCount: 2,
        content: '이번 달 주요 업데이트와 새로운 소식을 확인하세요.',
        displayName: 'Admin',
        issuedMonth: 11,
        likeCount: 15,
        title: '11월 수정광산 업데이트 안내',
        thumnnail: null,
      },
      {
        commentCount: 10,
        content: '참여하고 특별한 경험을 만들어보세요.',
        displayName: 'Event Team',
        issuedMonth: 11,
        likeCount: 42,
        title: '11월 수정광산 이벤트 안내',
        thumnnail: null,
      },
    ];
    //setArticleData(testData);
  }, []);

  // 테스트 데이터
  useEffect(() => {
    const testData = [
      {
        content: '이것은 첫 번째 테스트 데이터입니다.',
        job: '개발자',
        likeCount: 12,
        liked: true,
        ptCommentCount: 4,
        ptPostId: 1,
        title: '테스트 타이틀 1',
        year: '신입',
      },
      {
        content: '두 번째 테스트 데이터입니다.',
        job: '디자이너',
        likeCount: 5,
        liked: false,
        ptCommentCount: 2,
        ptPostId: 2,
        title: '테스트 타이틀 2',
        year: '신입',
      },
      {
        content: '세 번째 테스트 데이터를 넣습니다.',
        job: '마케터',
        likeCount: 7,
        liked: true,
        ptCommentCount: 3,
        ptPostId: 3,
        title: '테스트 타이틀 3',
        year: '경력',
      },
    ];

    // setSaengSaeng(testData);
  }, []);

  // 테스트 데이터
  useEffect(() => {
    const testData = [
      {
        createdAt: '2024-10-06T13:58:24.743Z',
        ptPostId: 1,
        thumbnail: 'https://example.com/image1.jpg',
        title: '첫 번째 테스트 타이틀',
        userJob: '개발자',
        userYear: 2023,
      },
      {
        createdAt: '2024-10-05T09:15:10.321Z',
        ptPostId: 2,
        thumbnail: 'https://example.com/image2.jpg',
        title: '두 번째 테스트 타이틀',
        userJob: '디자이너',
        userYear: 2022,
      },
      {
        createdAt: '2024-10-04T16:45:50.123Z',
        ptPostId: 3,
        thumbnail: 'https://example.com/image3.jpg',
        title: '세 번째 테스트 타이틀',
        userJob: '마케터',
        userYear: 2021,
      },
    ];

    // setQuestionCrystalball(testData);
  }, []);

  // 테스트 데이터
  useEffect(() => {
    const testData = [
      {
        commentCount: 12,
        displayName: '수정광산',
        isLiked: true,
        likeCount: 35,
        postId: 1,
        profileImage: 'https://example.com/profile1.jpg',
        thumbnail: 'https://example.com/thumbnail1.jpg',
        title: '어플리케이션 서비스 수정광산 2기 팀원 모집',
      },
      {
        commentCount: 8,
        displayName: '나래필름',
        isLiked: false,
        likeCount: 20,
        postId: 2,
        profileImage: 'https://example.com/profile2.jpg',
        thumbnail: 'https://example.com/thumbnail2.jpg',
        title: '미디어 프로덕션 크루 ‘나래필름’의 새로운 날...',
      },
      {
        commentCount: 5,
        displayName: '안녕',
        isLiked: true,
        likeCount: 50,
        postId: 3,
        profileImage: 'https://example.com/profile3.jpg',
        thumbnail: 'https://example.com/thumbnail3.jpg',
        title: '제목어쩌구저쩌구',
      },
    ];

    //setRecruitingData(testData);
  }, []);

  function getMinutesAgo(createdAt) {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffInMilliseconds = now - createdDate;
    const diffInMinutes = Math.floor(diffInMilliseconds / 1000 / 60);
    return diffInMinutes;
  }
  console.log('articleData', articleData);
  return (
    <ScrollView style={{marginBottom: 30}}>
      <View style={{width: '100%'}}>
        {articleData.length > 0 ? (
          <FlatList
            data={articleData}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            onViewableItemsChanged={onViewRef.current} // useRef로 전달
            viewabilityConfig={viewabilityArticleConfig}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.bannerContainer}
                onPress={() => navigation.navigate('SphereArticleListScreen')}>
                {/* 배너 이미지 */}
                <Image
                  source={
                    item.thumbnail ? {uri: item.thumbnail} : BannerBasicImg
                  }
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />

                {/* 그라데이션 레이어 */}
                <LinearGradient
                  colors={['rgba(74, 74, 74, 0)', '#4A4A4A']}
                  style={styles.gradient}
                />

                {/* 텍스트 정보 */}
                <Text style={styles.studenCouncilBox}>
                  수정 아티클 {item?.issuedMonth ?? 'N/A'}월호
                </Text>
                <View style={styles.bannerTextContainer}>
                  <Text style={styles.bannerTitle}>
                    {item?.title ?? '제목 없음'}
                  </Text>
                  <Text style={styles.bannerContent} numberOfLines={1}>
                    {item?.content ?? '내용이 없습니다.'}
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
            {currentArticleIndex + 1}/{articleData.length}
          </Text>
        </View>
      </View>

      <View style={styles.rowContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (user?.isAuthenticated) {
              navigation.navigate('CrystalBall', {
                tabIndex: 3, // 수정후기로 이동
                activeTab: 'explore', // '살펴보기'
              });
            } else {
              Toast.show('접근 권한이 없습니다.', Toast.SHORT);
            }
          }}>
          <View style={styles.boardContainer}>
            <View style={styles.boardTitleContainer}>
              <SaengSaeng style={{marginTop: 2}} />
              <Text style={[fontRegular, styles.boardTitle]}>
                생생 수정 후기
              </Text>
            </View>

            <RightArrow />
          </View>
        </TouchableWithoutFeedback>

        <Text style={[fontRegular, styles.boardText]}>
          찐 수정이들이 들려주는 이야기들을 살펴보세요!
        </Text>
        {isLoadingNewPosts ? (
          <ActivityIndicator size="large" color="#A055FF" />
        ) : user?.isAuthenticated ? (
          saengSaeng.length === 0 ? (
            <View style={styles.contentBox}>
              <Text
                style={[
                  fontRegular,
                  {
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#6E7882',
                    marginVertical: 15,
                  },
                ]}>
                생생 수정 후기가 없습니다.
              </Text>
            </View>
          ) : (
            <View>
              <FlatList
                data={saengSaeng}
                renderItem={renderSaengSaengtItem}
                horizontal
                pagingEnabled
                keyExtractor={item => item.ptPostId.toString()}
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={handleViewableItemsChanged.current}
                viewabilityConfig={viewabilityConfig.current}
              />
              <View style={styles.paginationContainer}>
                {saengSaeng.map((_, index) => (
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
          <Text style={[fontRegular, styles.boardText]}>
            정회원 인증 후 확인하실 수 있습니다.
          </Text>
        )}
        <View
          style={{
            marginBottom: 24,
          }}>
          <View>
            <TouchableWithoutFeedback
              onPress={() => {
                user?.isAuthenticated
                  ? navigation.navigate('PostListScreen', {boardId: 4}) // 홍보 게시판으로 이동
                  : Toast.show('접근 권한이 없습니다.', Toast.SHORT);
              }}>
              <View style={styles.boardContainer}>
                <View style={styles.boardTitleContainer}>
                  <Loudspeaker style={{marginTop: 2}} />
                  <Text style={[fontRegular, styles.boardTitle]}>
                    수정이들은 지금...
                  </Text>
                </View>

                <RightArrow />
              </View>
            </TouchableWithoutFeedback>

            <Text style={[fontRegular, styles.boardText]}>
              인원 모집 중인 교내 활동 및 동아리들을 살펴보세요!
            </Text>
            {isLoadingRecruiting ? (
              <ActivityIndicator size="large" color="#A055FF" />
            ) : recruitingData.length === 0 ? (
              <Text
                style={{textAlign: 'center', marginTop: 50, color: '#6E7882'}}>
                교내활동 / 동아리 정보가 없습니다
              </Text>
            ) : (
              <FlatList
                data={recruitingData}
                renderItem={renderRecruitingtItem}
                keyExtractor={item => item.postId.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.flatList}
              />
            )}
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            if (user?.isAuthenticated) {
              navigation.navigate('CrystalBall', {
                tabIndex: 2, // 궁금해요로 이동
                activeTab: 'explore', // '살펴보기'
              });
            } else {
              Toast.show('접근 권한이 없습니다.', Toast.SHORT);
            }
          }}>
          <View style={styles.boardContainer}>
            <View style={styles.boardTitleContainer}>
              <CrystalBall style={{marginTop: 2}} />
              <Text style={[fontRegular, styles.boardTitle]}>
                수정구에 물어봐
              </Text>
            </View>

            <RightArrow />
          </View>
        </TouchableWithoutFeedback>

        <Text style={[fontRegular, styles.boardText]}>
          답변을 기다리고 있는 질문들이에요.
        </Text>
        <View
          style={{
            marginBottom: 36,
          }}>
          {isLoadingQuestion ? (
            <ActivityIndicator size="large" color="#A055FF" />
          ) : questionCrystalball.length === 0 ? (
            <View
              style={{
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
                궁금해요 글이 존재하지 않습니다.
              </Text>
            </View>
          ) : (
            questionCrystalball.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate('SpherePostScreen', {
                    ptPostId: item.ptPostId,
                    isFree: false,
                    isQuestion: true,
                    isReview: false,
                  });
                }}>
                <View style={styles.newPostContainer}>
                  <View style={styles.hotPostContainer}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={[
                        styles.newPostTitle,
                        {
                          width: Dimensions.get('window').width - 150,
                          color: '#3A424E',
                        },
                      ]}>
                      {item.title.slice(0, 30)}
                    </Text>
                  </View>
                  <Text style={styles.newPostTime}>
                    {item.createdAt}
                    {' · '}
                    <Text style={styles.newPostBoard}>{item.userJob}</Text>

                    <Text style={styles.newPostBoard}>{item.year}</Text>
                  </Text>
                  <Image
                    source={{uri: item.imageUrl}}
                    style={styles.newPostImage}
                  />
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  rowContainer: {
    backgroundColor: '#FBFBFB',
    paddingHorizontal: 16,
  },
  boardTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  boardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28,
  },
  boardTitle: {
    fontFamily: 'Pretendard-Bold',
    color: '#222222',
    fontSize: 18,
    marginLeft: 8,
  },
  boardText: {
    fontFamily: 'Pretendard-Regular',
    color: '#6E7882',
    fontSize: 12,
    marginTop: 6,
  },
  contentBox: {
    width: Dimensions.get('window').width - 42,
    borderRadius: 10,
    marginHorizontal: 5,
    borderStyle: 'solid',
    borderColor: '#EFEFF3',
    borderWidth: 1,
    backgroundColor: '#FFF',
    padding: 16,
    marginTop: 16,
  },
  hotTagBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  hotTag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#A055FF',
    backgroundColor: '#F3E9FF',
    borderRadius: 4,
    fontWeight: 'bold',
    marginRight: 10,
  },
  yearJob: {
    color: '#A055FF',
    marginRight: 5,
  },
  contentTitle: {
    color: '#222',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'Pretendard-Bold',
  },
  contentText: {
    color: '#6E7882',
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    marginBottom: 16,
  },

  HOTpostLike: {
    fontSize: 12,
    marginLeft: 4,
    marginRight: 10,
    color: '#9DA4AB',
  },
  HOTpostComment: {
    fontSize: 12,
    marginLeft: 4,
    color: '#9DA4AB',
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
  bannerContainer: {
    width: Dimensions.get('window').width,
    height: 200,
    position: 'relative',
  },

  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    color: '#6E7882',
  },
  newPostBoard: {
    fontSize: 12,
    fontFamily: 'Pretendard',
    color: '#6E7882',
  },
  newPostImage: {
    width: 44,
    height: 44,
    position: 'absolute',
    right: 16,
    borderRadius: 6,
  },
  hotPostContainer: {
    marginVertical: 8,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nowBox: {
    width: 160,
    borderColor: '#EFEFF3',
    marginRight: 8,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 16,
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
  },
  thumbnailImgContainer: {
    width: '100%',
    height: 140,
    overflow: 'hidden',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  contentContainer: {
    padding: 12,
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
  },
  profileImgContainer: {
    width: 16,
    height: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  nickName: {
    color: '#3A424E',
    fontSize: 12,
    marginLeft: 6,
  },
  recruitingTitle: {
    color: '#222222',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 16,
    height: 45,
  },
  flatList: {},
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

export default Lounge;
