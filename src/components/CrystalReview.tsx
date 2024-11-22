import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {getAuthentication} from '../common/homeApi';
import {fontBold, fontRegular} from '../common/font';
import {useNavigation} from '@react-navigation/native';
import RightArrow from '../../resources/icon/Arrow';
import Hot from '../../resources/icon/Hot';
import {getCrystalReview} from '../common/CrystalApi';
import Scrap from '../../resources/icon/Scrap';
import {NoScrap} from '../../resources/icon/Scrap';
import JobFilterTab from './JobFilterTab';
import FloatingWriteButton from './FloatingWriteButton';

const CrystalReview = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState<Authentication | null>(null); // 사용자 정보
  const [hotPost, setHotPost] = useState<any[]>([]); // 인기글 데이터
  const [reviewList, setReviewList] = useState<any[]>([]); // 수정후기 글 목록 데이터
  const [isLoadingReviewList, setIsLoadingReviewList] =
    useState<boolean>(false);

  const [selectedJobList, setSelectedJobList] = useState<string>('all');
  const [sortParam, setSortParam] = useState<string>('');

  // 필터 변경 핸들러
  const handleFilterChange = (filterNames: string) => {
    if (filterNames === '전체') {
      setSelectedJobList('all');
    } else {
      setSelectedJobList(filterNames);
    }

    if (filterNames.includes('인기글')) {
      setSortParam('likeCount');
      setSelectedJobList('all');
    } else {
      setSortParam('');
    }
  };

  useEffect(() => {
    // 사용자 정보를 가져오기
    const fetchUser = async () => {
      try {
        const response = await getAuthentication();
        if (response.status === 200) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error('사용자 정보를 불러오는데 실패', error);
      }
    };

    fetchUser();
  }, []);

  // 테스트 데이터
  useEffect(() => {
    const testData = [
      {
        content: '이것은 첫 번째 테스트 데이터입니다.',
        job: '개발자',
        category: '취업 후기',
        ptCommentCount: 4,
        ptPostId: 1,
        title: '테스트 타이틀 1',
        year: '신입',
        scraped: true,
        scrapCount: 111,
      },
      {
        content: '두 번째 테스트 데이터입니다.',
        job: '디자이너',
        category: '취업 후기',
        ptCommentCount: 2,
        ptPostId: 2,
        title: '테스트 타이틀 2',
        year: '신입',
        scraped: false,
        scrapCount: 2,
      },
      {
        content:
          '안녕하세요. 저는 글로벌 키즈 콘텐츠 기업의 인턴으로 첫 회사생활을 시작하였고, 그 경험을 공유하고 싶어 이렇게 글을 써봅니다. ...',
        job: '마케터',
        category: '취업 후기',
        ptCommentCount: 3,
        ptPostId: 3,
        title: '테스트 타이틀 3',
        year: '경력',
        scraped: true,
        scrapCount: 0,
      },
    ];

    //setHotPost(testData);
    //setReviewList(testData);
  }, []);

  useEffect(() => {
    const fetchHotPosts = async () => {
      try {
        const data = await getCrystalReview('all', 'likeCount');

        const topFivePosts = data.slice(0, 5);
        setHotPost(topFivePosts);
      } catch (error) {
        console.error('Failed to fetch hot posts:', error);
      }
    };

    fetchHotPosts();
  }, []);

  // 인기글
  const renderHotItem = ({item}: {item: any}) => (
    <TouchableOpacity
      onPress={
        () => navigation.navigate('PostScreen', {postId: item.ptPostId}) // 게시글 이동 수정 필요
      }>
      <View style={styles.contentBox}>
        <View style={styles.hotTagBox}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.hotTag}>
              <Hot style={{marginTop: 5}} />
              HOT
            </Text>
            <Text style={styles.yearJob}>{item.category} </Text>
            <Text style={styles.yearJob}>·</Text>
            <Text style={styles.yearJob}>{item.job} </Text>
            <Text style={styles.yearJob}>·</Text>
            <Text style={styles.yearJob}>{item.year} </Text>
          </View>
          <RightArrow />
        </View>
        <Text style={styles.contentTitle}>{item.title}</Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.contentText}>
          {item.content.slice(0, 70)}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}></View>
      </View>
    </TouchableOpacity>
  );

  // 후기 글 목록 API 호출
  useEffect(() => {
    const fetchReviewList = async () => {
      setIsLoadingReviewList(true);
      try {
        const data = await getCrystalReview(selectedJobList, sortParam);
        setReviewList(data);
      } catch (error) {
        console.error('후기 목록 불러오기 실패:', error);
      } finally {
        setIsLoadingReviewList(false);
      }
    };

    fetchReviewList();
  }, [selectedJobList, sortParam]);

  return (
    <>
      <ScrollView>
        <JobFilterTab onFilterChange={handleFilterChange} />
        {user?.isAuthenticated ? (
          hotPost.length === 0 ? (
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
                인기글이 없습니다.
              </Text>
            </View>
          ) : (
            <>
              <FlatList
                data={hotPost}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('SpherePostScreen', {
                        ptPostId: item.ptPostId,
                        isFree: false,
                        isQuestion: false,
                        isReview: true,
                      });
                    }}>
                    <View style={styles.contentBox}>
                      <View style={styles.hotTagBox}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text style={styles.hotTag}>
                            <Hot style={{marginTop: 5}} />
                            HOT
                          </Text>
                          <Text style={styles.yearJob}>{item.category} </Text>
                          <Text style={styles.yearJob}>·</Text>
                          <Text style={styles.yearJob}>{item.job} </Text>
                          <Text style={styles.yearJob}>·</Text>
                          <Text style={styles.yearJob}>{item.year} </Text>
                        </View>
                        <RightArrow />
                      </View>
                      <Text style={styles.contentTitle}>{item.title}</Text>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={styles.contentText}>
                        {item.content}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                horizontal
                pagingEnabled
                keyExtractor={item => item.ptPostId.toString()}
                showsHorizontalScrollIndicator={false}
              />

              <View>
                {isLoadingReviewList ? (
                  <ActivityIndicator size="large" color="#A055FF" />
                ) : (
                  reviewList.map((item, index) => (
                    <View key={index} style={styles.postListContainer}>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('SpherePostScreen', {
                              ptPostId: item.ptPostId,
                              isFree: false,
                              isQuestion: false,
                              isReview: true,
                            });
                          }}>
                          <Text style={styles.contentTitle}>{item.title}</Text>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.contentText}>
                            {item.content}
                          </Text>
                          <View style={styles.hotTagBox}>
                            <View style={styles.yearJobBox}>
                              <Text style={styles.yearJobContent}>
                                {item.category}
                              </Text>
                              <Text style={styles.yearJobContent}>·</Text>
                              <Text style={styles.yearJobContent}>
                                {item.job}{' '}
                              </Text>
                              <Text style={styles.yearJobContent}>·</Text>
                              <Text style={styles.yearJobContent}>
                                {item.year}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.scrapBox}>
                        {item.scraped ? <Scrap /> : <NoScrap />}
                        <Text style={styles.scrapCount}>{item.scrapCount}</Text>
                      </View>
                    </View>
                  ))
                )}
              </View>
            </>
          )
        ) : (
          <ActivityIndicator size="large" color="#A055FF" />
        )}
      </ScrollView>
      <FloatingWriteButton
        onPress={() =>
          navigation.navigate('PostWriteScreen', {
            isPantheon: 'review',
          })
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  contentBox: {
    width: Dimensions.get('window').width - 32,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: '#EFEFF3',
    borderWidth: 1,
    backgroundColor: '#FFF',
    padding: 16,
    marginHorizontal: 16,
  },
  hotTagBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  hotTag: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
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
    fontFamily: 'Pretendard-Bold',
    marginBottom: 4,
  },
  contentText: {
    color: '#6E7882',
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    width: Dimensions.get('window').width - 70,
  },
  boardText: {
    fontFamily: 'Pretendard-Regular',
    color: '#6E7882',
    fontSize: 12,
    marginTop: 6,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#222222',
  },
  content: {
    fontSize: 12,
    lineHeight: 20,
    color: '#89919A',
  },
  yearJobBox: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 16,
  },
  yearJobContent: {
    color: '#89919A',
    marginRight: 8,
    fontSize: 13,
  },
  scrapBox: {
    width: 25,
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    marginTop: 5,
  },
  scrapCount: {
    fontSize: 12,
    marginBottom: 3,
    color: '#6E7882',
  },
  postListContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomColor: '#F6F6F6',
    borderBottomWidth: 4,
    justifyContent: 'space-between',
  },
});

export default CrystalReview;
