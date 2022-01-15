import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import PostComment from '../../resources/icon/PostComment';
import PostImage from '../../resources/icon/PostImage';
import PostLike from '../../resources/icon/PostLike';
import PostUnlike from '../../resources/icon/PostUnlike';
import ProfileImage from '../../resources/icon/ProfileImage';

function PostList({post}: any) {
  const [isLike, setIsLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(post.likeCount);
  const likePost = () => {
    setIsLike(!isLike);
    if (isLike) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View style={{flexDirection: 'row'}}>
          <ProfileImage />
          <Text style={styles.name}>{post.nickname}</Text>
        </View>
        <Text style={[styles.text, styles.timeStamp]}>1분 전</Text>
      </View>
      <Text style={[styles.text, styles.content]}>{post.content}</Text>
      <View style={styles.icon}>
        <Pressable onPress={likePost}>
          {isLike ? <PostLike /> : <PostUnlike />}
        </Pressable>
        <Text style={[styles.text, styles.iconCount]}>{likeCount}</Text>
        <PostImage />
        <Text style={[styles.text, styles.iconCount]}>{post.imageCount}</Text>
        <PostComment />
        <Text style={[styles.text, styles.iconCount]}>{post.commentCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 22,
    paddingHorizontal: 24,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    paddingTop: 2,
    paddingLeft: 8,
    fontFamily: 'SpoqaHanSansNeo-Medium',
    fontSize: 16,
  },
  text: {
    fontSize: 12,
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  timeStamp: {
    paddingTop: 6,
    color: '#949494',
  },
  content: {
    marginBottom: 14,
    lineHeight: 18,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCount: {
    marginLeft: 5,
    marginRight: 14,
  },
});

export default PostList;
