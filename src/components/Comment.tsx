import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import Svg, {Path } from "react-native-svg"
import ProfileImage from '../../resources/icon/ProfileImage';
import EmptyComment from '../../resources/icon/EmptyComment';
import EmptyHeart from '../../resources/icon/EmptyHeart';
import ThreeDots from './ThreeDots';
import Dots from '../../resources/icon/Dots';
const Comment = ()=> {
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));

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
      <View style={{paddingHorizontal: 24}}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <ProfileImage></ProfileImage>
            <Text
              style={{
                fontSize: 16,
                paddingLeft: 8,
                fontWeight: `500`,
              }}>
              수정
            </Text>
          </View>
          <ThreeDots />
        </View>
        <Text>힘내자 아프지말고</Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 18}}>
          <EmptyHeart />
          <Text style={styles.postLike}>00</Text>
          <EmptyComment />
        </View>
      </View>
      <View
        style={{borderWidth: 1, borderColor: '#F4F4F4', marginTop: 22}}></View>
    </>
  );
}
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

export const CommentReply = () => {
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));

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
      <View style={{ paddingHorizontal: 24, backgroundColor: '#F7F7F7', marginLeft: 14, borderRadius: 10, marginVertical: 4 , paddingBottom: 12}}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
            justifyContent: 'space-between',
          }}>
         
          <View style={{ flexDirection: 'row' }}>
            <Reply style={{marginRight: 8}}/>
            <ProfileImage></ProfileImage>
            <Text
              style={{
                fontSize: 16,
                paddingLeft: 8,
                fontWeight: `500`,
              }}>
              수정
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={async () => handleAnimation()}>
            <Animated.View style={animatedStyle}>
              <Dots />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
        <Text>힘내자 아프지말고힘내자 아프지말고힘내자 아프지말고힘내자 아프지말고힘내자 아프지말고힘내자 아프지말고힘내자 아프지말고힘내자 아프지말고힘내자 아프지말고힘내자 아프지말고힘내자 아프지말고힘내자 아프지말고</Text>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 18 }}>
          <EmptyHeart />
          <Text style={styles.postLike}>00</Text>
          
        </View>
        </View>
      <View
        style={{ borderWidth: 1, borderColor: '#F4F4F4'}}></View>
    </>);
}




export const Reply = (props: any) => (
  <Svg
  width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
     d="M11 8.41177L6.6 13L5.55867 11.9141L8.19133 9.17647H0V0H1.46667V7.64706H8.19133L5.55867 4.90941L6.6 3.82353L11 8.41177Z" fill="#6E7882"
    />
  </Svg>
)

