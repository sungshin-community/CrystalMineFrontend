import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import SmallBoard from '../../resources/icon/BoardSmallIcon';
import {PostComment, BigPostComment} from '../../resources/icon/PostComment';
import PostLike from '../../resources/icon/PostLike';
import PostUnlike from '../../resources/icon/PostUnlike';
import {SmallOrangeFlag} from '../../resources/icon/SmallOrangeFlag';
import {SmallPurpleFlag} from '../../resources/icon/SmallPurpleFlag';
import {ContentPreviewDto} from '../classes/BoardDetailDto';
import {fontMedium, fontRegular} from '../common/font';
import CommentArrow from '../../resources/icon/CommentArrow';
import CommentsModal from './CommentsModal';
import HeartIcon from '../../resources/icon/HeartIcon';
import ChatIcon from '../../resources/icon/ChatIcon';

interface Props {
  post: ContentPreviewDto;
  boardId: number;
  navigation: any;
  route: any;
  handlePostLike: (postId: number) => void; // 추가
}

function PostItem({post, boardId, navigation, route, handlePostLike}: Props) {
  //setModalVisible(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleCommentContainerPress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
          <Text style={[styles.timeStamp]}>{post.createdAt}</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          {post.hasTitle ? (
            <Text
              style={{
                fontSize: 16,
                marginBottom: 8,
                fontFamily: 'Pretendard-SemiBold',
                fontWeight: '600',
              }}>
              {post.title}
            </Text>
          ) : (
            <></>
          )}
          <View style={{flex: 1}}>
            <Text
              numberOfLines={post.title ? 2 : 3}
              ellipsizeMode="tail"
              style={[styles.text, styles.content, fontRegular]}>
              {post.content}
            </Text>
          </View>
        </View>
        {post.imageCount > 1 && (
          <Image
            style={{width: 60, height: 60, borderRadius: 8}}
            source={{uri: post.thumbnail}}
          />
        )}
        {post.imageCount > 1 && (
          <Text
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              fontSize: 10,
              paddingHorizontal: 6,
              paddingVertical: 2,
              marginHorizontal: 4,
              marginVertical: 4,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            {`+${post.imageCount - 1}`}
          </Text>
        )}
      </View>
      <View style={styles.icon}>
        {!(boardId === 93 || boardId === 94 || boardId === 95) && (
          <>
            <Pressable
              hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
              onPress={() => handlePostLike(post.postId)}>
              {post.isLiked ? (
                <HeartIcon fill="#FF6376" stroke="#FF6376" />
              ) : (
                <HeartIcon />
              )}
            </Pressable>
            <Text
              style={[
                fontRegular,
                {color: '#9DA4AB', marginRight: 1, marginLeft: 5},
              ]}>
              좋아요
            </Text>
            <Text style={[styles.textSmall, styles.iconCount]}>
              {post.likeCount}
            </Text>
            {/* {post.imageCount > 0 && (
                <>
                  <PostImage />
                  <Text style={[styles.textSmall, styles.iconCount]}>
                    {post.imageCount}
                  </Text>
                </>
              )} */}
            <ChatIcon />
            <Text
              style={[
                fontRegular,
                {color: '#9DA4AB', marginRight: 1, marginLeft: 5},
              ]}>
              댓글달기
            </Text>
            <Text style={[styles.textSmall, styles.iconCount]}>
              {post.commentCount}
            </Text>
          </>
        )}
      </View>

      {post.newCommentAuthor && (
        <View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}>
            <CommentArrow style={{marginRight: 10, marginTop: 20}} />
            <TouchableWithoutFeedback onPress={handleCommentContainerPress}>
              <View style={styles.commentContainer}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: '#3A424E',
                    paddingRight: 12,
                  }}>
                  {post.newCommentAuthor}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{fontSize: 12, color: '#3A424E', fontWeight: '400'}}>
                  {post.newCommentContent?.length > 25
                    ? post.newCommentContent?.substring(0, 25) + '...'
                    : post.newCommentContent}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      )}
      <CommentsModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        navigation={navigation}
        route={route}
        postId={post.postId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomColor: '#F6F6F6',
    borderBottomWidth: 4,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    paddingLeft: 8,
    fontWeight: '600',
    fontSize: 14,
    color: '#3A424E',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222222',
  },
  textSmall: {
    color: '#9DA4AB',
    fontSize: 13,
    fontWeight: '500',
  },
  timeStamp: {
    fontSize: 12,
    paddingLeft: 8,
    color: '#B9BAC1',
  },
  content: {
    fontSize: 14,
    justifyContent: 'flex-start',
    marginBottom: 12,
    lineHeight: 22.5,
    color: '#3a424e',
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
  commentContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F6F6F6',
    height: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginTop: 20,
  },
});

export default PostItem;
