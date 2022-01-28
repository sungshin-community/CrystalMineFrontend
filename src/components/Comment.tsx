import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import ProfileImage from '../../resources/icon/ProfileImage';
import EmptyComment from '../../resources/icon/EmptyComment';
import EmptyHeart from '../../resources/icon/EmptyHeart';
import ThreeDots from './ThreeDots';

function Comment() {
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
