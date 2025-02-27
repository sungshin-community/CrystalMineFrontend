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
import PostLike from '../../resources/icon/PostLike';
import PostUnlike from '../../resources/icon/PostUnlike';
import {SmallOrangeFlag} from '../../resources/icon/SmallOrangeFlag';
import {SmallPurpleFlag} from '../../resources/icon/SmallPurpleFlag';
import {ContentPreviewDto} from '../classes/BoardDetailDto';
import {fontMedium, fontRegular} from '../common/font';
import CommentArrow from '../../resources/icon/CommentArrow';
import CommentsModal from './CommentsModal';
import AdIcon from '../../resources/icon/AdIcon';

interface Props {
  post: ContentPreviewDto;
  boardId: number;
  navigation: any;
  route: any;
}

function PostAdMid({post, boardId, navigation, route}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const handleCommentContainerPress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 10, paddingVertical: 17}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flex: 1, marginRight: post.imageCount > 1 ? 12 : 0}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.title, fontMedium]}>
              {post.title}
            </Text>
            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={[styles.text, styles.content, fontRegular]}>
              {post.content}
            </Text>
            <View style={styles.adContainer}>
              <AdIcon />
              <Text style={[styles.adText]}>{post.storeName}</Text>
            </View>
          </View>

          {post.imageCount > 1 && (
            <View style={{width: 60}}>
              <Image
                style={{width: 60, height: 60, borderRadius: 8}}
                source={{uri: post.thumbnail}}
              />
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
            </View>
          )}
        </View>
        <View style={styles.icon}></View>
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
    color: '#B9BAC1',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 22.5,
    color: '#222222',
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
    backgroundColor: '#F6F6F6',
    width: 343,
    height: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  adContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9DA4AB',
    marginLeft: 4,
  },
});

export default PostAdMid;
