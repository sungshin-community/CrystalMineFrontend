import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, Pressable, View, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MyPostItem from '../../components/MyPostItem';
import { getMyCommentList, getMyPostList } from '../../common/boardApi';
import { MyPostContentDto } from '../../classes/board/MyPostDto';
import MyCommentDto from '../../classes/MyCommentDto';
import MyCommentItem from '../../components/MyCommentItem';

type RootStackParamList = {
  PostScreen: {boardId: number; postId: number};
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function MyCommentList({navigation, route}: Props) {

  const [myPostList, setMyPostList] = useState<MyCommentDto[]>([]);

  useEffect(() => {
    async function init() {
      const postList = await getMyCommentList(0, "createdAt");
      setMyPostList(postList);
    }
    init();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#EEEEEE' }}>
      <View>
        <Text>
          최신순
        </Text>
      </View>
      <FlatList
        data={myPostList}
        renderItem={({item}) => <MyCommentItem comment={item} />}
        ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#F6F6F6'}}></View>}
      />
    </SafeAreaView>
  );
}

