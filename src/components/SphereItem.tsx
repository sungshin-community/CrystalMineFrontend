import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import HeartIcon from '../../resources/icon/HeartIcon';
import ChatIcon from '../../resources/icon/ChatIcon';
import ReplyIcon from '../../resources/icon/ReplyIcon';
import ReplySheet from './ReplySheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {pantheonList} from '../classes/Pantheon';

interface SphereItemProps {
  isQuestion?: boolean;
  isFree?: boolean;
  isReview?: boolean;
  post: pantheonList;
}

type RootStackParamList = {
  SpherePostScreen: {
    ptPostId: number;
    isFree: boolean;
    isQuestion: boolean;
    isReview: boolean;
  };
};

export default function SphereItem({
  isQuestion = false,
  isFree = false,
  isReview = false,
  post,
}: SphereItemProps) {
  const navigation =
    useNavigation<NativeStackScreenProps<RootStackParamList>['navigation']>();
  const [replyVisible, setReplyVisible] = useState(false);
  const [isQuestionState, setIsQuestionState] = useState(isQuestion);
  const [isFreeState, setIsFreeState] = useState(isFree);
  const [isReviewState, setIsReviewState] = useState(isReview);

  useEffect(() => {
    if (post.ptPostType === 'QUESTION') {
      setIsQuestionState(true);
    }
    if (post.ptPostType === 'GENERAL') {
      setIsFreeState(true);
    }
    if (post.ptPostType === 'REVIEW') {
      setIsReviewState(true);
    }
  }, [post.ptPostType]);

  return (
    <View style={{paddingHorizontal: 16}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SpherePostScreen', {
            ptPostId: post.ptPostId,
            isFree: isFreeState,
            isQuestion: isQuestionState,
            isReview: isReviewState,
          });
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 12,
            }}>
            <Image
              source={{uri: post.profileImage}}
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                marginRight: 10,
              }}
              resizeMode="cover"
            />
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 2,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    marginRight: 6,
                    fontWeight: '600',
                    color: '#3A424E',
                  }}>
                  {post.displayName}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#B9BAC1',
                    fontWeight: '500',
                  }}>
                  {post.createdAt}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: '#89919A',
                }}>
                {post.isBlind
                  ? '비공개'
                  : `${post.department} · ${post.userJob} · ${
                      post.userYear === 0 ? '신입' : `${post.userYear}년`
                    }`}
              </Text>
            </View>
          </View>
          {isQuestion && (
            <View style={{flexDirection: 'row'}}>
              <View style={styles.pointView}>
                <Text
                  style={{fontSize: 12, fontWeight: '700', color: '#89919A'}}>
                  {post.point}P
                </Text>
              </View>
              <View
                style={[
                  {
                    paddingVertical: 6,
                    paddingHorizontal: 8,
                    borderRadius: 4,
                  },
                  {
                    backgroundColor: post.isSelected ? '#F3E9FF' : '#EFEFF3',
                  },
                ]}>
                <Text
                  style={[
                    {fontSize: 12, fontWeight: '700'},
                    {
                      color: post.isSelected ? '#A055FF' : '#89919A',
                    },
                  ]}>
                  {post.isSelected ? '채택완료' : '답변대기'}
                </Text>
              </View>
            </View>
          )}
        </View>

        {typeof post.title === 'string' && post.title !== '' && (
          <Text
            style={{
              color: '#222222',
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 8,
              marginTop: 4,
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {post.title}
          </Text>
        )}

        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: '#222222',
            lineHeight: 20,
          }}>
          {post.content.length > 100 ? (
            <>
              {post.content.slice(0, 94)}...
              <Text style={{color: '#9DA4AB'}}> 더보기</Text>
            </>
          ) : (
            post.content
          )}
        </Text>

        {typeof post.thumbnail === 'string' && (
          <Image
            source={{uri: post.thumbnail}}
            style={{
              marginTop: 12,
              height: 160,
              borderRadius: 8,
            }}
            resizeMode="cover"
          />
        )}

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 12}}>
          <HeartIcon
            fill={post.isLiked ? '#FF6376' : 'white'}
            stroke={post.isLiked ? '#FF6376' : '#9DA4AB'}
          />
          <Text style={styles.footerText}>좋아요 {post.likeCount}</Text>
          <ChatIcon />
          <Text style={styles.footerText}>댓글달기 {post.ptCommentCount}</Text>
        </View>
      </TouchableOpacity>
      {post.ptCommentCount > 0 &&
        ((isQuestion === false && isFree === true) ||
          (isQuestion === false &&
            isFree === false &&
            post.ptPostType === 'GENERAL')) && (
          <>
            <TouchableOpacity
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}
              onPress={() => setReplyVisible(true)}>
              <ReplyIcon />
              <View style={styles.commentBox}>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 12,
                      color: '#3A424E',
                      marginRight: 8,
                      flexShrink: 0,
                    }}>
                    {post.newCommentAuthor}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 12,
                      color: '#3A424E',
                      flexShrink: 1,
                      marginRight: 1,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {post.newCommentContent}
                  </Text>
                </View>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 12,
                    color: '#9DA4AB',
                    textDecorationLine: 'underline',
                  }}>
                  댓글 {post.ptCommentCount - 1}개 +
                </Text>
              </View>
            </TouchableOpacity>
            <ReplySheet
              visible={replyVisible}
              setVisible={setReplyVisible}
              ptPostId={post.ptPostId}
            />
          </>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  footerText: {
    marginLeft: 4,
    fontWeight: '500',
    fontSize: 13,
    color: '#9DA4AB',
    marginRight: 12,
  },
  pointView: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: '#EFEFF3',
    borderRadius: 4,
    marginRight: 4,
  },
  commentBox: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    marginLeft: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
});
