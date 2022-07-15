import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SmallBoard from '../../resources/icon/BoardSmallIcon';
import PostComment from '../../resources/icon/PostComment';
import PostImage from '../../resources/icon/PostImage';
import PostLike from '../../resources/icon/PostLike';
import PostUnlike from '../../resources/icon/PostUnlike';
import ProfileImage from '../../resources/icon/ProfileImage';
import { MyPostContentDto } from '../classes/board/MyPostDto';

interface Props {
  post: MyPostContentDto;
  moveToPost: (postId: number) => void;
}

export default function MyPostItem({post, moveToPost}: Props) {
  return (
    <TouchableOpacity style={{paddingHorizontal: 14, backgroundColor: '#FFFFFF'}} onPress={() => moveToPost(post.postId)}>
      <View style={{marginTop: 10, height: 28, backgroundColor: '#F7F7F7', flexDirection: 'row', alignItems: 'center'}}>
        <SmallBoard />
        <Text style={{color: '#87919B', marginLeft: 8}}>{post.boardName}</Text>
      </View>
      <View style={styles.nameContainer}>
        <View style={{flexDirection: 'row'}}>
          <ProfileImage />
          <Text style={styles.name}>{post.displayName}</Text>
        </View>
        <Text style={[styles.textSmall, styles.timeStamp]}>{post.createdAt}</Text>
      </View>
      {post.hasTitle && <Text style={styles.titleText}>{post.title}</Text>}
      <Text style={[styles.text, styles.content]}>{post.content}</Text>
      <View style={styles.icon}>
        {post.isLiked ? <PostLike /> : <PostUnlike />}
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
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
  titleText: {
    fontSize: 17,
    fontFamily: 'SpoqaHanSansNeo-Bold',
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
    paddingBottom: 26,
  },
  iconCount: {
    marginLeft: 5,
    marginRight: 14,
  },
});