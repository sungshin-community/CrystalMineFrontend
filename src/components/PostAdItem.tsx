import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import SmallBoard from '../../resources/icon/BoardSmallIcon';
import {PostComment, BigPostComment} from '../../resources/icon/PostComment';
import PostImage from '../../resources/icon/PostImage';
import PostLike from '../../resources/icon/PostLike';
import PostUnlike from '../../resources/icon/PostUnlike';
import ProfileImage from '../../resources/icon/ProfileImage';
import {SmallOrangeFlag} from '../../resources/icon/SmallOrangeFlag';
import {SmallPurpleFlag} from '../../resources/icon/SmallPurpleFlag';
import {ContentPreviewDto} from '../classes/BoardDetailDto';
import {fontMedium, fontRegular} from '../common/font';
import CommentArrow from '../../resources/icon/CommentArrow';
import CommentsModal from './CommentsModal';

interface Props {
  post: ContentPreviewDto;
  boardId: number;
  navigation: any;
  route: any;
}

function PostAdItem({post, boardId, navigation, route}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const handleCommentContainerPress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
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
      <View style={styles.imageContainer}>
        {post.thumbnail && (
          <Image
            style={styles.image}
            source={{uri: post.thumbnail}}
            resizeMode="cover"
          />
        )}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.nameContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {post.profileImage && (
              <Image
                style={{width: 24, height: 24, borderRadius: 12}}
                source={{uri: post.profileImage}}
              />
            )}
            <Text style={styles.name}>{post.displayName || '광고'}</Text>
            {/* boardId가 93, 94, 95인 경우 -> 교내 게시판*/}
            {!(boardId === 93 || boardId === 94 || boardId === 95) &&
              !post.isAnonymous &&
              post.isOwner &&
              (post.boardType === 'PUBLIC' ? (
                <SmallOrangeFlag style={{marginLeft: 5}} />
              ) : (
                <SmallPurpleFlag style={{marginLeft: 5}} />
              ))}
            {boardId !== 98 && (
              <Text style={[styles.textSmall, styles.timeStamp]}>
                {post.createdAt}
              </Text>
            )}
          </View>
        </View>

        {post.title && (
          <Text style={[fontMedium, styles.title]}>{post.title}</Text>
        )}

        <View style={styles.contentContainer}>
          {post.content && (
            <Text
              numberOfLines={post.title ? 2 : 3}
              ellipsizeMode="tail"
              style={[styles.text, styles.content, fontRegular]}>
              {post.content}
            </Text>
          )}
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {boardId !== 98 && (
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
              {post.isLiked ? <PostLike /> : <PostUnlike />}
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
              <PostComment />
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
      </View>

      {post.newCommentAuthor && (
        <View style={{marginBottom: 10}}>
          <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
            <CommentArrow style={{marginHorizontal: 10}} />
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
                <Text style={{fontSize: 12, color: '#3A424E'}}>
                  {post.newCommentContent}
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
    paddingVertical: 8,
    width: '100%',
    //backgroundColor: 'red',
  },
  imageContainer: {
    height: 120,
    width: '100%',
    backgroundColor: '#EFEFF3',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderColor: '#EFEFF3',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: '#EFEFF3',
    borderWidth: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    //backgroundColor: 'blue',
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
    color: '#B9BAC1',
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    //marginBottom: 8,
    lineHeight: 22.5,
    color: '#222222',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  iconCount: {
    marginLeft: 5,
    marginRight: 12,
    color: '#9DA4AB',
  },
  commentContainer: {
    backgroundColor: '#F6F6F6',
    width: 343,
    height: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  contentContainer: {
    marginVertical: 8,
  },
});

export default PostAdItem;
