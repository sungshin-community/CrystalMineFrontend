import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import PostList from '../../components/PostList';

function PostSearchResult() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView>
        <ScrollView>
          <View>
            {dummyData.map((post: Post, index: number) => (
              <PostList key={index} post={post} />
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

export interface Post {
  nickname: string;
  content: string;
  isLike: boolean;
  likeCount: number;
  imageCount: number;
  commentCount: number;
}

const dummyData: Post[] = [
  {
    nickname: '수정',
    content: 'Hey~~~ 오늘 도깨비 방망이 똥 쌌어~ 네모',
    isLike: true,
    likeCount: 13,
    imageCount: 9,
    commentCount: 7,
  },
  {
    nickname: '나원',
    content: `힘들어도 괜찮아 거친 정글 속에 뛰어든 건 나니깐 I'm ok...`,
    isLike: false,
    likeCount: 134,
    imageCount: 9,
    commentCount: 7,
  },
  {
    nickname: '효은',
    content:
      '에타 공감 누르면 공감하셨습니다 뜨는거 토스트였는데 스낵바로 바꿨네',
    isLike: true,
    likeCount: 1779,
    imageCount: 9,
    commentCount: 74,
  },
  {
    nickname: '유진',
    content: '시험 합격 가보자고',
    isLike: false,
    likeCount: 130,
    imageCount: 0,
    commentCount: 2,
  },
  {
    nickname: '나원',
    content: `힘들어도 괜찮아 거친 정글 속에 뛰어든 건 나니깐 I'm ok...`,
    isLike: false,
    likeCount: 134,
    imageCount: 9,
    commentCount: 7,
  },
  {
    nickname: '효은',
    content:
      '에타 공감 누르면 공감하셨습니다 뜨는거 토스트였는데 스낵바로 바꿨네',
    isLike: true,
    likeCount: 1779,
    imageCount: 9,
    commentCount: 74,
  },
  {
    nickname: '유진',
    content: '시험 합격 가보자고',
    isLike: false,
    likeCount: 130,
    imageCount: 0,
    commentCount: 2,
  },
  {
    nickname: '본크레페쿠바딸',
    content: '본크레페 먹고 싶다',
    isLike: false,
    likeCount: 52,
    imageCount: 2,
    commentCount: 12,
  },
];
