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
  content: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  boardName: string;
  boardId: string | null;
  postId: string;
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
      // 수정구 데이터 구조 처리
      if (rawData?.data?.content) {
        return rawData.data.content.map((item: any) => ({
          id: item.ptPostId?.toString() || '',
          content: item.content || '내용 없음',
          createdAt: item.createdAt || '시간 정보 없음',
          likeCount: item.likeCount || 0,
          commentCount: item.commentCount || 0,
          boardName: '수정구',
          boardId: null,
          postId: item.ptPostId?.toString() || '',
        }));
      }
      return [];
    }
    return rawData.map((item: any, index: number) => ({
      id: item.id || index.toString(),
      content: item.content || '내용 없음',
      createdAt: item.createdAt || '시간 정보 없음',
      likeCount: item.likeCount || 0,
      commentCount: item.commentCount || 0,
      boardName: item.boardName || '게시판 이름 없음',
      boardId: item.boardId || null,
      postId: item.postId || item.id,
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
          data = response.data;
        } else if (activeSubTab === '내가 쓴 댓글') {
          response = await client.get('/pantheon-comments/my/pt-comment');
          data = response.data;
        } else if (activeSubTab === '스크랩한 글') {
          response = await client.get('/pantheon-common/my/pt-scrap');
          data = response.data;
        }
        console.log('수정구 응답:', response?.data);
      }

      if (data) {
        const transformedData = transformData(data);
        console.log('변환된 데이터:', {
          activeTab,
          activeSubTab,
          dataLength: transformedData.length,
          firstItem: transformedData[0],
        });
        setPosts(transformedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({item}: {item: PostItem}) => (
    <TouchableOpacity
      style={styles.postItem}
      onPress={() =>
        navigation.navigate('PostDetail', {
          postId: item.postId,
          boardId: item.boardId,
        })
      }>
      {/* 게시판 이름과 작성 시간 */}
      <View style={styles.postHeader}>
        <Text style={styles.boardName}>{item.boardName}</Text>
        <Text style={styles.postTime}>{item.createdAt}</Text>
      </View>
      {/* 게시글 내용 */}
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.postFooter}>
        <View style={styles.postStats}>
          <Text>좋아요 {item.likeCount}개</Text>
          <Text style={styles.commentCount}>댓글 {item.commentCount}개</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
        <ActivityIndicator size="large" color="#A055FF" />
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
});

export default MyActivity;
