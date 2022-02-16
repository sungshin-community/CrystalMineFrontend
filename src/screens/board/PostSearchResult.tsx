import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { ContentPreviewDto } from '../../classes/BoardDetailDto';
import PostItem from '../../components/PostItem';

function PostSearchResult() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView>
        <ScrollView>
          <View>
            {/* <FlatList
              data={dummyData}
              renderItem={({post}: Post) => <PostList post={post} />}
            /> */}
            {dummyData.map((post: ContentPreviewDto, index: number) => (
              <PostItem key={index} post={post} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
});

export default PostSearchResult;

const dummyData: ContentPreviewDto[] = [
  {
    postId: 1,
    profileImage: "",
    isAuthor: true,
    title: "",
    createdAt: "방금",
    isScraped: false,
    scrapCount: 0,
    nickname: '수정',
    content: 'Hey~~~ 오늘 도깨비 방망이 똥 쌌어~ 네모',
    isLiked: true,
    likeCount: 13,
    imageCount: 9,
    commentCount: 7,
  },
  {
    postId: 2,
    profileImage: "",
    isAuthor: true,
    title: "",
    createdAt: "방금",
    isScraped: false,
    scrapCount: 0,
    nickname: '나원',
    content: `힘들어도 괜찮아 거친 정글 속에 뛰어든 건 나니깐 I'm ok...`,
    isLiked: false,
    likeCount: 134,
    imageCount: 9,
    commentCount: 7,
  },
  {
    postId: 3,
    profileImage: "",
    isAuthor: true,
    title: "",
    createdAt: "방금",
    isScraped: false,
    scrapCount: 0,
    nickname: '효은',
    content:
      '에타 공감 누르면 공감하셨습니다 뜨는거 토스트였는데 스낵바로 바꿨네',
    isLiked: true,
    likeCount: 1779,
    imageCount: 9,
    commentCount: 74,
  },
  {
    postId: 4,
    profileImage: "",
    isAuthor: true,
    title: "",
    createdAt: "방금",
    isScraped: false,
    scrapCount: 0,
    nickname: '유진',
    content: '시험 합격 가보자고',
    isLiked: false,
    likeCount: 130,
    imageCount: 0,
    commentCount: 2,
  },
  {
    postId: 5,
    profileImage: "",
    isAuthor: true,
    title: "",
    createdAt: "방금",
    isScraped: false,
    scrapCount: 0,
    nickname: '나원',
    content: `힘들어도 괜찮아 거친 정글 속에 뛰어든 건 나니깐 I'm ok...`,
    isLiked: false,
    likeCount: 134,
    imageCount: 9,
    commentCount: 7,
  },
  {
    postId: 6,
    profileImage: "",
    isAuthor: true,
    title: "",
    createdAt: "방금",
    isScraped: false,
    scrapCount: 0,
    nickname: '효은',
    content:
      '에타 공감 누르면 공감하셨습니다 뜨는거 토스트였는데 스낵바로 바꿨네',
    isLiked: true,
    likeCount: 1779,
    imageCount: 9,
    commentCount: 74,
  },
  {
    postId: 7,
    profileImage: "",
    isAuthor: true,
    title: "",
    createdAt: "방금",
    isScraped: false,
    scrapCount: 0,
    nickname: '유진',
    content: '시험 합격 가보자고',
    isLiked: false,
    likeCount: 130,
    imageCount: 0,
    commentCount: 2,
  },
  {
    postId: 8,
    profileImage: "",
    isAuthor: true,
    title: "",
    createdAt: "방금",
    isScraped: false,
    scrapCount: 0,
    nickname: '본크레페쿠바딸',
    content: '본크레페 먹고 싶다',
    isLiked: false,
    likeCount: 52,
    imageCount: 2,
    commentCount: 12,
  },
];
