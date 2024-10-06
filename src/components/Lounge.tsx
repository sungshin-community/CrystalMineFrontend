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
import {getSaengSaeng, getQuestionCrystalball} from '../common/CrystalApi';
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
      onPress={
        () => navigation.navigate('PostScreen', {postId: item.ptPostId}) // 게시글 이동 수정 필요
      }>
      <View style={styles.contentBox}>
        <View style={styles.hotTagBox}>
          <Text style={styles.hotTag}>HOT</Text>
          <Text style={styles.yearJob}>{item.job} </Text>
          <Text style={styles.yearJob}>·</Text>
          <Text style={styles.yearJob}>{item.year} </Text>
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

  // 방금 올라온 글 데이터 불러오기
  useEffect(() => {
    const fetchNewPosts = async () => {
      setIsLoadingNewPosts(true);
      const data = await getSaengSaeng();
      // setSaengSaeng(data);
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

    setSaengSaeng(testData);
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

  function getMinutesAgo(createdAt) {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffInMilliseconds = now - createdDate;
    const diffInMinutes = Math.floor(diffInMilliseconds / 1000 / 60);
    return diffInMinutes;
  }

  return (
    <ScrollView>
      <View style={styles.bannerContainer}>
        <Image
          source={
            BannerBasicImg // 기본 이미지 사용
          }
          style={styles.bannerImage}
          resizeMode="cover"
        />

        {/* 그라데이션 레이어 */}
        <LinearGradient
          colors={['rgba(74, 74, 74, 0)', '#4A4A4A']} // 위는 투명, 아래는 #4A4A4A
          style={styles.gradient}
        />
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.boardContainer}>
          <View style={styles.boardTitleContainer}>
            <SaengSaeng style={{marginTop: 2}} />
            <Text style={[fontRegular, styles.boardTitle]}>생생 수정 후기</Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              user?.isAuthenticated
                ? navigation.navigate('PostListScreen', {boardId: 2}) // 이동할 페이지 수정하기
                : Toast.show('접근 권한이 없습니다.', Toast.SHORT);
            }}>
            <RightArrow />
          </TouchableWithoutFeedback>
        </View>
        <Text style={[fontRegular, styles.boardText]}>
          찐 수정이들이 들려주는 이야기들을 살펴보세요!
        </Text>
        {user?.isAuthenticated ? (
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
            marginBottom: 44,
          }}>
          <View style={styles.boardContainer}>
            <View style={styles.boardTitleContainer}>
              <Loudspeaker style={{marginTop: 2}} />
              <Text style={[fontRegular, styles.boardTitle]}>
                수정이들은 지금...
              </Text>
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                user?.isAuthenticated
                  ? navigation.navigate('PostListScreen', {boardId: 2}) // 이동할 페이지 수정하기
                  : Toast.show('접근 권한이 없습니다.', Toast.SHORT);
              }}>
              <RightArrow />
            </TouchableWithoutFeedback>
          </View>
          <Text style={[fontRegular, styles.boardText]}>
            인원 모집 중인 교내 활동 및 동아리들을 살펴보세요!
          </Text>
          <View style={styles.nowBox}></View>
        </View>
        <View style={styles.boardContainer}>
          <View style={styles.boardTitleContainer}>
            <CrystalBall style={{marginTop: 2}} />
            <Text style={[fontRegular, styles.boardTitle]}>
              수정구에 물어봐
            </Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              user?.isAuthenticated
                ? navigation.navigate('PostListScreen', {boardId: 2}) // 이동할 페이지 수정하기
                : Toast.show('접근 권한이 없습니다.', Toast.SHORT);
            }}>
            <RightArrow />
          </TouchableWithoutFeedback>
        </View>
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
                onPress={
                  () => navigation.navigate('PostScreen', {postId: item.postId}) // 이동할 페이지 변경 필요
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
                          color: '#3A424E',
                        },
                      ]}>
                      {item.title.slice(0, 30)}
                    </Text>
                  </View>
                  <Text style={styles.newPostTime}>
                    {getMinutesAgo(item.createdAt)}분전 ·{' '}
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
    width: Dimensions.get('window').width - 32,
    borderRadius: 10,
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
  },
  hotTag: {
    width: 42,
    height: 23,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#A055FF',
    backgroundColor: '#F3E9FF',
    borderRadius: 4,
    fontWeight: 'bold',
    marginBottom: 10,
    marginRight: 10,
  },
  yearJob: {
    color: '#A055FF',
    marginRight: 5,
  },
  contentTitle: {
    color: '#222',
    fontSize: 16,
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
  },
  HOTpostComment: {
    fontSize: 12,
    marginLeft: 4,
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
  bannerImage: {
    width: '100%',
  },
  bannerContainer: {
    width: '100%',
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
    height: 258,
    borderColor: '#EFEFF3',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 16,
  },
});

export default Lounge;
