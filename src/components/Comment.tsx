import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import ProfileImage from '../../resources/icon/ProfileImage';
import EmptyComment from '../../resources/icon/EmptyComment';
import EmptyHeart from '../../resources/icon/EmptyHeart';
import ThreeDots from './ThreeDots';
import Dots from '../../resources/icon/Dots';
import PostLike from '../../resources/icon/PostLike';
import PostUnlike from '../../resources/icon/PostUnlike';
import PostComment from '../../resources/icon/PostComment';
import CommentDto, {RecommentDto} from '../classes/CommentDto';
const Comment = (comment: any) => {
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
  const [isLiked, setIsLiked] = useState<boolean>();
  const data: CommentDto = comment.comment;

  const handleAnimation = () => {
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      rotateAnimation.setValue(0);
    });
    setRotateAnimation(rotateAnimation);
  };

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
  };
  return (
    <>
      <View
        style={{
          paddingHorizontal: 24,
          backgroundColor: data?.isAuthor ? '#F8F8F8' : '#FFF',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <ProfileImage></ProfileImage>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  paddingLeft: 8,
                  fontWeight: `500`,
                  color: data?.isAuthor ? '#A055FF' : '#000',
                }}>
                {data?.displayName}
              </Text>
            </View>
          </View>
          <ThreeDots />
        </View>
        <Text>{data?.content}</Text>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 18,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Pressable
              hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
              onPress={() => setIsLiked(!isLiked)}>
              {isLiked ? <PostLike /> : <PostUnlike />}
            </Pressable>
            <Text style={styles.postLike}>{data?.likeCount}</Text>
            <PostComment />
          </View>
          <View>
            <Text style={{color: '#949494', fontSize: 13}}>
              {data?.createdAt}
            </Text>
          </View>
        </View>
      </View>
      <View style={{borderWidth: 1, borderColor: '#F4F4F4'}}></View>
    </>
  );
};
export default Comment;
const styles = StyleSheet.create({
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

export const Recomment = (recomment: any) => {
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
  const [isLiked, setIsLiked] = useState<boolean>();
  const data: RecommentDto = recomment.recomment;
  const handleAnimation = () => {
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      rotateAnimation.setValue(0);
    });
    setRotateAnimation(rotateAnimation);
  };

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
  };
  return (
    <>
      <View
        style={{
          paddingHorizontal: 24,
          backgroundColor: data.isAuthor ? '#F8F8F8' : '#FFF',
          paddingBottom: 12,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Reply style={{marginRight: 8}} />
            <ProfileImage></ProfileImage>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  paddingLeft: 8,
                  fontWeight: `500`,
                }}>
                {data.displayName}
              </Text>
            </View>
          </View>
          <TouchableWithoutFeedback onPress={async () => handleAnimation()}>
            <Animated.View style={animatedStyle}>
              <ThreeDots />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
        <Text>{data.content}</Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 18,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Pressable
              hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
              onPress={() => setIsLiked(!isLiked)}>
              {isLiked ? <PostLike /> : <PostUnlike />}
            </Pressable>
            <Text style={styles.postLike}>{data?.likeCount}</Text>
            <PostComment />
          </View>
          <View>
            <Text style={{color: '#949494', fontSize: 13}}>
              {data?.createdAt}
            </Text>
          </View>
        </View>
      </View>
      <View style={{borderWidth: 1, borderColor: '#F4F4F4'}}></View>
    </>
  );
};

export const Reply = (props: any) => (
  <Svg
    width="11"
    height="13"
    viewBox="0 0 11 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M11 8.41177L6.6 13L5.55867 11.9141L8.19133 9.17647H0V0H1.46667V7.64706H8.19133L5.55867 4.90941L6.6 3.82353L11 8.41177Z"
      fill="#6E7882"
    />
  </Svg>
);
