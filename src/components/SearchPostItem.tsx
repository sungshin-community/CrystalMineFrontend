import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import SmallBoard from '../../resources/icon/BoardSmallIcon';
import {PostComment} from '../../resources/icon/PostComment';
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

function SearchPostItem({post, boardId}: Props) {
  console.log('post', post);
  console.log('boardId', boardId);
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
        {/* <View style={styles.nameContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{width: 24, height: 24, borderRadius: 12}}
              source={{uri: post.profileImage}}
            />
            <Text style={styles.name}>{post.displayName}</Text> */}
        {/* boardId가 93, 94, 95인 경우 -> 교내 게시판*/}
        {/* {!(boardId === 93 || boardId === 94 || boardId === 95) &&
              !post.isAnonymous &&
              post.isOwner &&
              (post.boardType === 'PUBLIC' ? (
                <SmallOrangeFlag style={{marginLeft: 5}} />
              ) : (
                <SmallPurpleFlag style={{marginLeft: 5}} />
              ))}
            <Text style={[styles.textSmall, styles.timeStamp]}>
              {post.createdAt}
            </Text>
          </View>
        </View> */}
        {post.hasTitle ? (
          <Text style={[fontMedium, {fontSize: 17, marginBottom: 5}]}>
            {post.title}
          </Text>
        ) : (
          <></>
        )}
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Text
              numberOfLines={post.title ? 2 : 5}
              ellipsizeMode="tail"
              style={[styles.text, styles.content, fontRegular]}>
              {post.content}
            </Text>
          </View>
        </View>
        <View style={styles.icon}>
          {!(boardId === 93 || boardId === 94 || boardId === 95) && (
            <View style={styles.bottomContainer}>
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
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    borderBottomColor: '#F6F6F6',
    borderStyle: 'solid',
    borderBottomWidth: 4,
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
    fontSize: 14,
    color: '#3A424E',
  },
  text: {
    fontSize: 14,
    color: '#222222',
  },
  textSmall: {
    color: '#9DA4AB',
    fontSize: 13,
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  timeStamp: {
    fontSize: 12,
    paddingLeft: 10,
    paddingTop: 2,
    color: '#9DA4AB',
  },
  content: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 22.5,
    color: '#222222',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCount: {
    marginLeft: 5,
    marginRight: 12,
    color: '#9DA4AB',
  },
});

export default SearchPostItem;
