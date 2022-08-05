import React from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import PostComment from '../../resources/icon/PostComment';
import PostImage from '../../resources/icon/PostImage';
import PostLike from '../../resources/icon/PostLike';
import PostUnlike from '../../resources/icon/PostUnlike';
import ProfileImage from '../../resources/icon/ProfileImage';
import {PostContent} from '../classes/Search';
import {fontMedium} from '../common/font';

interface Props {
  post: PostContent;
  moveToPost: (postId: number) => void;
}

function PostSearchItem({post, moveToPost}: Props) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => moveToPost(post.postId)}>
        <View style={styles.nameContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {post.profileImage ? (
              <Image
                style={{width: 24, height: 24, borderRadius: 12}}
                source={{uri: post.profileImage}}
              />
            ) : (
              <ProfileImage />
            )}
            <Text style={styles.name}>{post.displayName}</Text>
          </View>
          <Text style={[styles.textSmall, styles.timeStamp]}>
            {post.createdAt}
          </Text>
        </View>
        {post.title ? (
          <Text style={[fontMedium, {fontSize: 17, marginBottom: 5}]}>
            {post.title}
          </Text>
        ) : null}
        <Text
          numberOfLines={post.title ? 2 : 3}
          ellipsizeMode="tail"
          style={[styles.text, styles.content]}>
          {post.content}
        </Text>
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
      </Pressable>
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
  timeStamp: {
    paddingTop: 6,
    color: '#949494',
  },
  content: {
    marginBottom: 16,
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

export default PostSearchItem;
