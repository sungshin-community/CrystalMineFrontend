import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styled from 'styled-components';
import ProfileImage from '../../resources/icon/ProfileImage';
import EmptyHeart from '../../resources/icon/EmptyHeart';
import EmptyComment from '../../resources/icon/EmptyComment';
import PostLike from '../../resources/icon/PostLike';
import PostUnlike from '../../resources/icon/PostUnlike';
import PostComment from '../../resources/icon/PostComment';
import ThreeDots from './ThreeDots';
import Scrap, {NoScrap} from '../../resources/icon/Scrap';
import PostItem from './PostItem';
import PostDto from '../classes/PostDto';
import SpinningThreeDots from './SpinningThreeDots';
import {useEffect} from 'react';
interface Props {
  post: any;
  handlePostLike: any;
  handlePostScrap: any;
}

function Post({post, handlePostLike, handlePostScrap}: Props) {
  const data: PostDto = post;
  const handleScrapComponent = (
    <View style={{marginRight: 5}}>
      <TouchableWithoutFeedback onPress={() => handlePostScrap(data.postId)}>
        {data?.isScraped ? <Scrap /> : <NoScrap />}
      </TouchableWithoutFeedback>
    </View>
  );
  return (
    <>
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <View style={{flexDirection: 'row'}}>
            <ProfileImage></ProfileImage>
            <View style={{justifyContent: 'center'}}>
              <Text style={{fontSize: 16, paddingLeft: 8, fontWeight: `500`}}>
                {data?.displayName}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <SpinningThreeDots
              isScrap={true}
              isMine={data?.isAuthor}
              handleScrapComponent={handleScrapComponent}
            />
          </View>
        </View>
        <View style={styles.postBody}>
          <Text>{data?.content}</Text>
        </View>
        <Text style={{color: '#949494', fontSize: 12, marginTop: 12}}>
          {data?.createdAt}
        </Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 22}}>
          <Pressable
            hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
            onPress={() => handlePostLike(data.postId)}>
            {data?.isLiked ? <PostLike /> : <PostUnlike />}
          </Pressable>
          <Text style={styles.postLike}>{data?.likeCount}</Text>
          <PostComment />
          <Text style={styles.postComment}>{data?.commentCount}</Text>
        </View>
      </View>
      <View
        style={{borderWidth: 1, borderColor: '#F4F4F4', marginTop: 28}}></View>
    </>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    paddingHorizontal: 24,
    paddingTop: 18,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postBody: {
    marginTop: 8,
  },
  postLike: {
    fontSize: 13,
    marginLeft: 5,
    marginRight: 5,
    width: 35,
  },
  postComment: {
    fontSize: 13,
    marginLeft: 5,
    width: 35,
  },
});

export default Post;
