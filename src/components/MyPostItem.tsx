import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import SmallBoard from '../../resources/icon/BoardSmallIcon';
import { RectangleChecked, RectangleUnchecked } from '../../resources/icon/CheckBox';
import PostComment from '../../resources/icon/PostComment';
import PostImage from '../../resources/icon/PostImage';
import PostLike from '../../resources/icon/PostLike';
import PostUnlike from '../../resources/icon/PostUnlike';
import { MyPostContentDto } from '../classes/board/MyPostDto';
import { fontRegular } from '../common/font';

interface Props {
  post: MyPostContentDto;
  moveToPost: (post: MyPostContentDto) => void;
  deleteMode: boolean;
}

export default function MyPostItem({post, moveToPost, deleteMode}: Props) {
  return (
    <TouchableOpacity style={{paddingHorizontal: 14, backgroundColor: '#FFFFFF'}} onPress={() => moveToPost(post)}>
      <View>
        <View style={{marginTop: 10, height: 28, backgroundColor: '#F7F7F7', flexDirection: 'row', alignItems: 'center', borderRadius: 10}}>
          <SmallBoard style={{marginLeft: 11}} />
          <Text style={[{color: '#87919B', marginLeft: 8, fontSize: 14}, fontRegular]}>{post.boardName}</Text>
          {deleteMode && (
            <View style={{flexDirection: 'row',
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingRight: 13}}>
              {post.isChecked ? <RectangleChecked /> : <RectangleUnchecked />}
            </View>
            )
          }
        </View>
      <View style={styles.nameContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image style={{width: 24, height: 24, borderRadius: 12, marginLeft: 10}} source={{uri: post.profileImage}} />
          <Text style={styles.name}>{post.displayName}</Text>
        </View>
        <Text style={[styles.textSmall, styles.timeStamp]}>{post.createdAt}</Text>
      </View>
      {post.hasTitle && <Text style={styles.titleText}>{post.title}</Text>}
      <Text numberOfLines={post.title ? 2 : 5} ellipsizeMode="tail" style={[styles.text, styles.content, fontRegular]}>{post.content}</Text>
      <View style={styles.icon}>
        {post.isLiked ? <PostLike /> : <PostUnlike />}
        <Text style={[styles.textSmall, styles.iconCount]}>
          {post.likeCount}
        </Text>
        <PostImage />
        <Text style={[styles.textSmall, styles.iconCount]}>
          {post.imageCount}
        </Text>
        <PostComment />
        <Text style={[styles.textSmall, styles.iconCount]}>
          {post.commentCount}
        </Text>
      </View>
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
    marginLeft: 10
  },
  timeStamp: {
    paddingTop: 6,
    color: '#949494',
  },
  content: {
    marginBottom: 14,
    marginLeft: 10,
    lineHeight: 22.5,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 24,
    marginLeft: 10
  },
  iconCount: {
    marginLeft: 5,
    marginRight: 14,
  },
});