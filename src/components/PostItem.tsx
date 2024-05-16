import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import SmallBoard from '../../resources/icon/BoardSmallIcon';
import PostComment from '../../resources/icon/PostComment';
import PostImage from '../../resources/icon/PostImage';
import PostLike from '../../resources/icon/PostLike';
import PostUnlike from '../../resources/icon/PostUnlike';
import ProfileImage from '../../resources/icon/ProfileImage';
import {SmallOrangeFlag} from '../../resources/icon/SmallOrangeFlag';
import {SmallPurpleFlag} from '../../resources/icon/SmallPurpleFlag';
import {ContentPreviewDto} from '../classes/BoardDetailDto';
import {fontMedium, fontRegular} from '../common/font';

interface Props {
  post: ContentPreviewDto;
  boardId: number;
}

function PostItem({post, boardId}: Props) {
  return (
    <View style={styles.container}>
      {boardId === 2 && (
        <View
          style={{
            marginTop: 10,
            height: 28,
            backgroundColor: '#F7F7F7',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <SmallBoard style={{marginLeft: 11}} />
          <Text
            style={[
              {color: '#87919B', marginLeft: 8, fontSize: 14},
              fontRegular,
            ]}>
            {post.boardName}
          </Text>
        </View>
      )}
      <View style={{paddingHorizontal: 10, paddingVertical: 17}}>
        <View style={styles.nameContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{width: 24, height: 24, borderRadius: 12}}
              source={{uri: post.profileImage}}
            />
            <Text style={styles.name}>{post.displayName}</Text>
            {/* boardId가 93, 94, 95인 경우 -> 교내 게시판*/}
            {!(boardId === 93 || boardId === 94 || boardId === 95) &&
              !post.isAnonymous &&
              post.isOwner &&
              (post.boardType === 'PUBLIC' ? (
                <SmallOrangeFlag style={{marginLeft: 5}} />
              ) : (
                <SmallPurpleFlag style={{marginLeft: 5}} />
              ))}
          </View>
          <Text style={[styles.textSmall, styles.timeStamp]}>
            {post.createdAt}
          </Text>
        </View>
        {post.hasTitle ? (
          <Text style={[fontMedium, {fontSize: 17, marginBottom: 5}]}>
            {post.title}
          </Text>
        ) : (
          <></>
        )}
        <Text
          numberOfLines={post.title ? 2 : 5}
          ellipsizeMode="tail"
          style={[styles.text, styles.content, fontRegular]}>
          {post.content}
        </Text>
        <View style={styles.icon}>
          {!(boardId === 93 || boardId === 94 || boardId === 95) && (
            <>
              {post.isLiked ? <PostLike /> : <PostUnlike />}
              <Text style={[styles.textSmall, styles.iconCount]}>
                {post.likeCount}
              </Text>
              {post.imageCount > 0 && (
                <>
                  <PostImage />
                  <Text style={[styles.textSmall, styles.iconCount]}>
                    {post.imageCount}
                  </Text>
                </>
              )}
              <PostComment />
              <Text style={[styles.textSmall, styles.iconCount]}>
                {post.commentCount}
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
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
  },
  iconCount: {
    marginLeft: 5,
    marginRight: 14,
  },
});

export default PostItem;
