import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PostComment from '../../resources/icon/PostComment';
import PostImage from '../../resources/icon/PostImage';
import PostLike from '../../resources/icon/PostLike';
import PostUnlike from '../../resources/icon/PostUnlike';
import ProfileImage from '../../resources/icon/ProfileImage';

function PostList({post}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View style={{flexDirection: 'row'}}>
          <ProfileImage />
          <Text style={styles.name}>{post.nickname}</Text>
        </View>
        <Text style={[styles.textSmall, styles.timeStamp]}>1분 전</Text>
      </View>
      <Text style={[styles.text, styles.content]}>{post.content}</Text>
      <View style={styles.icon}>
        {post.isLike ? <PostLike /> : <PostUnlike />}
        <Text style={[styles.textSmall, styles.iconCount]}>
          {post.likeCount}
        </Text>
        <PostImage />
        <Text style={[styles.textSmall, styles.iconCount]}>
          {post.imageCount}
        </Text>
        <PostComment />
        <Text style={[styles.textSmall, styles.iconCount]}>
          {post.commentCount}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 24,
    borderBottomColor: '#f4f4f4',
    borderStyle: 'solid',
    borderBottomWidth: 1,
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
    fontSize: 15,
  },
  text: {
    fontSize: 15,
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  textSmall: {
    fontSize: 13,
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  timeStamp: {
    paddingTop: 6,
    color: '#949494',
  },
  content: {
    marginBottom: 14,
    lineHeight: 22.5,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 22,
  },
  iconCount: {
    marginLeft: 5,
    marginRight: 14,
  },
});

export default PostList;
