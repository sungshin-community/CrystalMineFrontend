import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import FloatingWriteButton from '../../../resources/icon/FloatingWriteButton';
import PostList from '../../components/PostList';
import BackButton from '../../components/BackButton';
import {CommonActions} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  PostListScreen: {boardId: number};
};
type Props = NativeStackScreenProps<RootStackParamList>;

const PostListScreen = ({navigation, route}: Props) => {

  useEffect(() => {
    console.log("props로 받은 게시판 ID는", route.params.boardId);
    navigation.setOptions({
      headerLeft: (): React.ReactNode => (
        <BackButton
          onPress={() => navigation.dispatch(CommonActions.goBack())}
        />
      ),
    });
  }, [navigation]);

  const SampleFunction = () => {
    Alert.alert('플로팅 버튼 눌림!');
  };

  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View>
          {dummyData.map((post: Post, index: number) => (
            <PostList key={index} post={post} />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={SampleFunction}
        style={styles.touchableOpacityStyle}>
        <FloatingWriteButton style={styles.floatingButtonStyle} />
      </TouchableOpacity>
    </>
  );
};
export default PostListScreen;

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  floatingButtonStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
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
