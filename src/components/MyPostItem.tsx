import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import SmallBoard from '../../resources/icon/BoardSmallIcon';
import {
  RectangleChecked,
  RectangleUnchecked,
} from '../../resources/icon/CheckBox';
import PostComment from '../../resources/icon/PostComment';
import PostImage from '../../resources/icon/PostImage';
import PostLike from '../../resources/icon/PostLike';
import PostUnlike from '../../resources/icon/PostUnlike';
import {MyPostContentDto} from '../classes/board/MyPostDto';
import {fontMedium, fontRegular} from '../common/font';

interface Props {
  post: MyPostContentDto;
  moveToPost: (post: MyPostContentDto) => void;
  deleteMode: boolean;
}

export default function MyPostItem({post, moveToPost, deleteMode}: Props) {
  const adminBoard = [
    '국제교류팀 공식 게시판',
    '창업지원팀 공식 게시판',
    '현장실습팀 공식 게시판',
  ];
  return (
    <TouchableOpacity
      style={{paddingHorizontal: 14, backgroundColor: '#FFFFFF'}}
      onPress={() => moveToPost(post)}>
      <View
        style={{
          marginTop: 10,
          height: 23,
          //backgroundColor: '#F7F7F7',
          //backgroundColor: 'red',
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        {/* <SmallBoard style={{marginLeft: 11}} /> */}
        <Text
          style={[
            {color: '#A055FF', marginLeft: 8, fontSize: 14, fontWeight: '500'},
            fontRegular,
          ]}>
          {post.boardName}
        </Text>
        {deleteMode && (
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingRight: 13,
            }}>
            {post.isChecked ? <RectangleChecked /> : <RectangleUnchecked />}
          </View>
        )}
      </View>
      <View style={{paddingHorizontal: 10}}>
        <View style={styles.nameContainer}>
          {/* <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 24, height: 24, borderRadius: 12}}
              source={{uri: post.profileImage}}
            />
            <Text style={styles.name}>{post.displayName}</Text>
          </View> */}
        </View>
        {post.hasTitle && (
          <Text style={[fontMedium, styles.titleText]}>{post.title}</Text>
        )}
        <Text
          numberOfLines={post.title ? 2 : 5}
          ellipsizeMode="tail"
          style={[styles.text, styles.content, fontRegular]}>
          {post.content}
        </Text>
        {!adminBoard.includes(post.boardName) && (
          <View style={styles.iconContainer}>
            <View style={styles.icon}>
              {post.isLiked ? <PostLike /> : <PostUnlike />}
              <Text
                style={[
                  fontRegular,
                  {color: '#9DA4AB', marginRight: 1, marginLeft: 5},
                ]}>
                좋아요
              </Text>
              <Text style={[styles.textSmall, styles.iconCount]}>
                {post.likeCount} 개
              </Text>
              <PostComment />
              <Text
                style={[
                  fontRegular,
                  {color: '#9DA4AB', marginRight: 1, marginLeft: 5},
                ]}>
                댓글
              </Text>
              <Text style={[styles.textSmall, styles.iconCount]}>
                {post.commentCount} 개
              </Text>
              {post.imageCount > 0 && (
                <>
                  <PostImage />
                  <Text style={[styles.textSmall, styles.iconCount]}>
                    {post.imageCount}
                  </Text>
                </>
              )}
            </View>
            <Text style={[styles.textSmall, styles.timeStamp]}>
              {post.createdAt}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    borderBottomColor: '#f4f4f4',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    paddingTop: 2,
    paddingLeft: 8,
    fontFamily: 'SpoqaHanSansNeo-Medium',
    fontSize: 15,
  },
  text: {
    fontSize: 14,
  },
  textSmall: {
    fontSize: 13,
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 5,
  },
  timeStamp: {
    color: '#9DA4AB',
  },
  content: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 14,
    lineHeight: 22.5,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCount: {
    color: '#9DA4AB',
    marginLeft: 5,
    marginRight: 14,
  },
});
