import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, Pressable, View, FlatList, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MyPostItem from '../../components/MyPostItem';
import { getMyCommentList, getMyPostList } from '../../common/boardApi';
import { MyPostContentDto } from '../../classes/board/MyPostDto';
import MyCommentDto from '../../classes/MyCommentDto';
import MyCommentItem from '../../components/MyCommentItem';

type RootStackParamList = {
  PostScreen: {postId: number};
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function MyCommentList({navigation, route}: Props) {

  const [myPostList, setMyPostList] = useState<MyCommentDto[]>([]);
  const [sortBy, setSortBy] = useState<string>('createdAt');

  const moveToPost = (postId: number) => {
    navigation.navigate('PostScreen', {
      postId: postId
    });
  }

  useEffect(() => {
    async function init() {
      const postList = await getMyCommentList(0, sortBy);
      setMyPostList(postList);
    }
    init();
  }, [sortBy]);

  return (
    <SafeAreaView style={{ backgroundColor: '#FFFFFF' }}>
      <TouchableOpacity
        onPress={() => {
          if (sortBy === 'createdAt') {
            setSortBy('likeCount');
          } else {
            setSortBy('createdAt');
          }
        }}
        style={{marginLeft: 24, width: 66, height: 24, backgroundColor: '#f6f6f6', borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Text>
          {sortBy === 'createdAt' ? "최신순" : "공감순"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={myPostList}
        renderItem={({item}) => <MyCommentItem comment={item} moveToPost={moveToPost} />}
        ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#F6F6F6'}}></View>}
      />
    </SafeAreaView>
  );
}

