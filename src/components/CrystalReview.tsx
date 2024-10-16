import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {getAuthentication} from '../common/homeApi';
import {fontBold, fontRegular} from '../common/font';
import {useNavigation} from '@react-navigation/native';
import RightArrow from '../../resources/icon/Arrow';
import Hot from '../../resources/icon/Hot';
const CrystalReview = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState<Authentication | null>(null); // 사용자 정보 상태 추가
  const [hotPost, setHotPost] = useState<any[]>([]); // 인기글 데이터

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
      },
    ];

    setHotPost(testData);
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
  return (
    <View>
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
              생생 수정 후기가 없습니다.
            </Text>
          </View>
        ) : (
          <View>
            <FlatList
              data={hotPost}
              renderItem={renderHotItem}
              horizontal
              pagingEnabled
              keyExtractor={item => item.ptPostId.toString()}
              showsHorizontalScrollIndicator={false}
            />
            <View>
              <Text>저스펙 쌩신입 디자이너 취뽀후기</Text>
              <Text>
                안녕하세요. 저는 글로벌 키즈 콘텐츠 기업의 인턴으로 첫 회사...
              </Text>
              <Text style={styles.yearJob}>"디자인" </Text>
              <Text style={styles.yearJob}>·</Text>
              <Text style={styles.yearJob}>"취업 후기" </Text>
              <Text style={styles.yearJob}>·</Text>
              <Text style={styles.yearJob}>"신입" </Text>
            </View>
          </View>
        )
      ) : (
        <Text style={[fontRegular, styles.boardText]}>
          정회원 인증 후 확인하실 수 있습니다.
        </Text>
      )}
    </View>
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
    marginTop: 16,
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
    marginBottom: 12,
  },
  boardText: {
    fontFamily: 'Pretendard-Regular',
    color: '#6E7882',
    fontSize: 12,
    marginTop: 6,
  },
});

export default CrystalReview;
