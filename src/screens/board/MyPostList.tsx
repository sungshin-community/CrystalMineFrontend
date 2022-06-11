import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, Pressable, View, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MyPostDto from '../../classes/MyPostDto';
import MyPostItem from '../../components/MyPostItem';

type RootStackParamList = {

};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function MyPostList({navigation}: Props) {

  let list: MyPostDto[] = [
    {
      postId : 1,
      boardName : "일상게시판",
      profileImage : "",
      displayName : "수정 (나)",
      title : "좋은 글귀 하나 공유합니다",
      content : "testContent",
      createdAt : "방금",
      hasTitle : true,
      isOwner : false,
      isAnonymous : true,
      isLiked : true,
      likeCount : 3,
      imageCount : 2,
      commentCount : 2
    },
    {
      postId : 2,
      boardName : "졸업생게시판",
      profileImage : "",
      displayName : "수정 (나)",
      title : "",
      content : "testContent",
      createdAt : "5분 전",
      hasTitle : false,
      isOwner : false,
      isAnonymous : true,
      isLiked : false,
      likeCount : 0,
      imageCount : 0,
      commentCount : 0
    }
  ]

  return (
    <SafeAreaView style={{ backgroundColor: '#EEEEEE' }}>
      <View>
        <Text>
          최신순
        </Text>
      </View>
      <FlatList
        data={list}
        renderItem={({item}) => <MyPostItem post={item} />}
        ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#F6F6F6'}}></View>}
      />
    </SafeAreaView>
  );
}

