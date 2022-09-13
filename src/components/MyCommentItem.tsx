import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import SmallBoard from '../../resources/icon/BoardSmallIcon';
import { RectangleChecked, RectangleUnchecked } from '../../resources/icon/CheckBox';
import PostLike from '../../resources/icon/PostLike';
import PostUnlike from '../../resources/icon/PostUnlike';
import MyCommentDto from '../classes/MyCommentDto';
import { fontRegular } from '../common/font';

interface Props {
  comment: MyCommentDto;
  moveToPost: (comment: MyCommentDto) => void;
  deleteMode: boolean;
}

export default function MyCommentItem({comment, moveToPost, deleteMode}: Props) {
  return (
    <TouchableOpacity
      onPress={() => moveToPost(comment)}
      style={{paddingHorizontal: 14, backgroundColor: '#FFFFFF'}}>
      <View style={{marginTop: 10, height: 28, backgroundColor: '#F7F7F7', flexDirection: 'row', alignItems: 'center', borderRadius: 10}}>
        <SmallBoard style={{marginLeft: 11}} />
        <Text style={[fontRegular, {color: '#87919B', marginLeft: 8}]}>{comment.boardName}</Text>
        {deleteMode && (
          <View style={{flexDirection: 'row',
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingRight: 13}}>
              {comment.isChecked ? <RectangleChecked /> : <RectangleUnchecked />}
            </View>
            )
          }
      </View>
      <View style={{paddingHorizontal: 10}}>
      <View style={styles.nameContainer}>
        <View style={{flexDirection: 'row'}}>
        <Image style={{width: 24, height: 24, borderRadius: 12}} source={{uri: comment.profileImage}} />
          <Text style={styles.name}>{comment.displayName}</Text>
        </View>
        <Text style={[styles.textSmall, styles.timeStamp]}>{comment.createdAt}</Text>
      </View>
      <Text numberOfLines={3} ellipsizeMode="tail" style={[styles.text, styles.content, fontRegular]}>{comment.content}</Text>
      <View style={styles.icon}>
        {comment.isLiked ? <PostLike /> : <PostUnlike />}
        <Text style={[styles.textSmall, styles.iconCount]}>
          {comment.likeCount}
        </Text>
      </View>
      <Text
        style={[{color: "#A0A8B0", fontSize: 13, marginBottom: 16, marginRight: 10}, fontRegular]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >{(comment.isPostDeleted ? '' : '게시글 내용: ') + comment.postContent}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 24,
    borderBottomColor: '#f4f4f4',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 12
  },
  name: {
    paddingTop: 2,
    paddingLeft: 8,
    fontFamily: 'SpoqaHanSansNeo-Medium',
    fontSize: 15,
  },
  text: {
    fontSize: 14
  },
  textSmall: {
    fontSize: 13,
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  titleText: {
    fontSize: 17,
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  timeStamp: {
    paddingTop: 6,
    color: '#949494',
  },
  content: {
    marginBottom: 14,
    lineHeight: 22.5,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
  },
  iconCount: {
    marginLeft: 5,
    marginRight: 14,
  },
});