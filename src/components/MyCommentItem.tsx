import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SmallBoard from '../../resources/icon/BoardSmallIcon';
import PostComment from '../../resources/icon/PostComment';
import PostImage from '../../resources/icon/PostImage';
import PostLike from '../../resources/icon/PostLike';
import PostUnlike from '../../resources/icon/PostUnlike';
import ProfileImage from '../../resources/icon/ProfileImage';
import { MyPostContentDto } from '../classes/board/MyPostDto';
import MyCommentDto from '../classes/MyCommentDto';

interface Props {
  comment: MyCommentDto
}

export default function MyCommentItem({comment}: Props) {
  return (
    <View style={{paddingHorizontal: 14, backgroundColor: '#FFFFFF'}}>
      <View style={{marginTop: 10, height: 28, backgroundColor: '#F7F7F7', flexDirection: 'row', alignItems: 'center'}}>
        <SmallBoard />
        <Text style={{color: '#87919B', marginLeft: 8}}>{comment.boardName}</Text>
      </View>
      <View style={styles.nameContainer}>
        <View style={{flexDirection: 'row'}}>
          <ProfileImage />
          <Text style={styles.name}>{comment.displayName}</Text>
        </View>
        <Text style={[styles.textSmall, styles.timeStamp]}>{comment.createdAt}</Text>
      </View>
      <Text style={[styles.text, styles.content]}>{comment.content}</Text>
      <View style={styles.icon}>
        {comment.isLiked ? <PostLike /> : <PostUnlike />}
        <Text style={[styles.textSmall, styles.iconCount]}>
          {comment.likeCount}
        </Text>
        <PostImage />
        <Text style={[styles.textSmall, styles.iconCount]}>
          {comment.imageCount}
        </Text>
        <PostComment />
        <Text style={[styles.textSmall, styles.iconCount]}>
          {comment.commentCount}
        </Text>
      </View>
      <Text style={{color: "#A0A8B0", fontSize: 13}}>게시글 내용: {comment.postContent}</Text>
    </View>
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