import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {
  getMyPostList,
  getMyCommentList,
  getScrapedPostList,
} from '../../common/boardApi';

interface PostItem {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  boardName: string;
  boardId: string | null;
  postId: number;
  thumbnails?: string[];
}
import client from '../../common/client';
type Tab = '광산' | '수정구';
type SubTab = '내가 쓴 글' | '내가 쓴 댓글' | '스크랩한 글';

const MyActivity = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [activeTab, setActiveTab] = useState<Tab>('광산');
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('내가 쓴 글');
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(false);

  const tabs: Tab[] = ['광산', '수정구'];
  const subTabs: SubTab[] = ['내가 쓴 글', '내가 쓴 댓글', '스크랩한 글'];

  useEffect(() => {
    fetchData();
  }, [activeTab, activeSubTab]);

  const transformData = (rawData: any): PostItem[] => {
    if (!Array.isArray(rawData)) {
      console.log('댓글 원본 데이터:', rawData.data.content); // 실제 데이터 구조 확인

      // 수정구 데이터 구조 처리
      if (rawData?.data?.content) {
        if (activeSubTab === '내가 쓴 댓글') {
          // 수정구 댓글 데이터 처리
          return rawData.data.content.map((item: any) => ({
            id: item.ptCommentId?.toString() || '',
            title: item.ptPostContent || '게시글 내용 없음',
            content: item.content || '댓글 내용 없음',
            createdAt: item.createdAt || '시간 정보 없음',
            likeCount: item.likeCount || 0, // 원본 게시글의 좋아요 수
            commentCount: item.ptCommentCount || 0, // 원본 게시글의 댓글 수
            boardName: '수정구',
            boardId: null,
            postId: item.ptPostId?.toString() || '',
            thumbnails: item.thumbnails || [],
          }));
        } else if (activeSubTab === '스크랩한 글') {
          // 스크랩한 글 처리
          return rawData.data.content.map((item: any) => ({
            id: item.ptPostId?.toString() || '',
            title: item.title || '제목 없음',
            content: item.content || '내용 없음',
            createdAt: item.createdAt || '시간 정보 없음',
            likeCount: item.likeCount || 0, // likeCount 필드 명확히
            commentCount: item.ptCommentCount || 0, // ptCommentCount로 변경
            boardName: '수정구',
            boardId: null,
            postId: item.ptPostId,
            thumbnails: item.thumbnails || [],
          }));
        } else {
          // 일반 게시글 데이터 처리
          return rawData.data.content.map((item: any) => ({
            id: item.ptPostId?.toString() || '',
            title: item.title || '제목 없음',
            content: item.content || '내용 없음',
            createdAt: item.createdAt || '시간 정보 없음',
            likeCount: item.likeCount || 0, // likeCount 필드 명확히
            commentCount: item.ptCommentCount || 0, // ptCommentCount로 변경
            boardName: '수정구',
            boardId: null,
            postId: item.ptPostId,
            thumbnails: item.thumbnails || [],
          }));
        }
      }
      return [];
    }
    return rawData.map((item: any, index: number) => ({
      id: item.id || index.toString(),
      content: item.content || '내용 없음',
      title: item.title || '제목 없음',
      createdAt: item.createdAt || '시간 정보 없음',
      likeCount: item.likeCount || 0,
      commentCount: item.commentCount || 0,
      boardName: item.boardName || '게시판 이름 없음',
      boardId: `${item.boardType}_${item.boardContentType}`, // boardId를 문자열로 변환
      postId: item.postId || item.id,
      thumbnails: item.thumbnails || [],
    }));
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      let data;

      if (activeTab === '광산') {
        if (activeSubTab === '내가 쓴 글') {
          data = await getMyPostList(0, 'createdAt');
        } else if (activeSubTab === '내가 쓴 댓글') {
          data = await getMyCommentList(0, 'createdAt');
        } else if (activeSubTab === '스크랩한 글') {
          data = await getScrapedPostList(0);
        }
      } else if (activeTab === '수정구') {
        let response;
        if (activeSubTab === '내가 쓴 글') {
          response = await client.get('/pantheon-common/my/pt-post');
        } else if (activeSubTab === '내가 쓴 댓글') {
          response = await client.get('/pantheon-comments/my/pt-comment');
        } else if (activeSubTab === '스크랩한 글') {
          response = await client.get('/pantheon-common/my/pt-scrap');
        }
        data = response?.data;
        console.log('✅ API 응답 데이터 확인:', JSON.stringify(data, null, 2)); // API 응답 구조 확인
      }

      if (data) {
        const transformedData = transformData(data);
        console.log('✅ 변환된 데이터:', transformedData);
        setPosts(transformedData);
      }
    } catch (error) {
      console.error('❌ 데이터 가져오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPostDetail = (postId: string) => {
    return client.get(`/posts/${postId}`);
  };

  const renderItem = ({item}: {item: PostItem}) => {
    // postData가 undefined일 경우 빈 객체로 처리
    const postData = item || {};

    console.log('postData:', postData); // postData 출력
    if (!item) {
      console.error('item이 존재하지 않습니다.');
      return null; // item이 없을 경우 렌더링하지 않음
    }

    const thumbnails = (postData?.thumbnails ?? []) || [];

    const thumbnailCount = thumbnails.length; // 이제 정상적으로 length를 참조할 수 있음

    console.log('thumbnailCount:', thumbnailCount); // 이제 정상적으로 length를 출력할 수 있음

    // thumbnails가 비어 있으면 길이가 0인 배열로 처리
    if (thumbnails.length === 0) {
      console.log('thumbnails가 비어 있습니다.');
    }
    return (
      <TouchableOpacity
        style={styles.postItem}
        onPress={() => {
          try {
            if (activeTab === '광산') {
              if (!item.boardId) {
                console.error('boardId가 누락되었습니다');
                return;
              }

              const [boardType, boardContentType] = item.boardId.split('_');

              navigation.navigate('PostScreen', {
                postId: Number(item.postId),
                boardType,
                boardContentType,
              });
            } else {
              navigation.navigate('SpherePostScreen', {
                ptPostId: Number(item.postId),
                isQuestion: false, // 기본값 설정
                isFree: true, // 기본값 설정
                isReview: false, // 기본값 설정
              });
            }
          } catch (error) {
            console.error('네비게이션 오류:', error);
          }
        }}>
        <View style={styles.postHeader}>
          <Text style={styles.boardName}>{item.boardName}</Text>
          <Text style={styles.postTime}>{item.createdAt}</Text>
        </View>
        <Text style={styles.postContent}>
          {(activeTab === '광산' && activeSubTab === '내가 쓴 글') ||
          (activeTab === '수정구' && activeSubTab === '스크랩한 글') ||
          (activeTab === '광산' && activeSubTab === '내가 쓴 댓글')
            ? item.content
            : item.title}
        </Text>
        <View style={styles.postFooter}>
          <View style={styles.postStats}>
            <Text>좋아요 {item.likeCount}개</Text>
            <Text style={styles.commentCount}>댓글 {item.commentCount}개</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.subTabContainer}>
        {subTabs.map(subTab => (
          <TouchableOpacity
            key={subTab}
            style={[
              styles.subTab,
              activeSubTab === subTab && styles.activeSubTab,
            ]}
            onPress={() => setActiveSubTab(subTab)}>
            <Text
              style={[
                styles.subTabText,
                activeSubTab === subTab && styles.activeSubTabText,
              ]}>
              {subTab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#A055FF" />
        </View>
      ) : posts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {activeSubTab === '내가 쓴 글'
              ? '작성한 글이 없습니다.'
              : activeSubTab === '내가 쓴 댓글'
              ? '작성한 댓글이 없습니다.'
              : '스크랩한 글이 없습니다.'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          style={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#A055FF',
  },
  tabText: {
    fontSize: 16,
    color: '#888888',
  },
  activeTabText: {
    color: '#A055FF',
    fontWeight: 'bold',
  },
  subTabContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  subTab: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#EEEEEE',
  },
  activeSubTab: {
    backgroundColor: '#A055FF',
  },
  subTabText: {
    color: '#888888',
  },
  activeSubTabText: {
    color: '#FFFFFF',
  },
  list: {
    flex: 1,
  },
  postItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  boardName: {
    fontSize: 15,
    color: '#A055FF',
    marginBottom: 5,
  },
  postTime: {
    fontSize: 12,
    color: '#888888',
  },
  postContent: {
    fontSize: 14,
    marginBottom: 10,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postStats: {
    flexDirection: 'row',
  },
  commentCount: {
    marginLeft: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
  },
});

export default MyActivity;
