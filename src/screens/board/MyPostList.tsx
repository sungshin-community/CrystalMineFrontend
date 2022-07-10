import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, Pressable, View, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MyPostDto from '../../classes/MyPostDto';
import MyPostItem from '../../components/MyPostItem';
import { getMyPostList } from '../../common/boardApi';
import { MyPostContentDto } from '../../classes/board/MyPostDto';

type RootStackParamList = {
  PostScreen: {boardId: number; postId: number};
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function MyPostList({navigation, route}: Props) {

  const [myPostList, setMyPostList] = useState<MyPostContentDto[]>([]);

  const moveToPost = (postId: number) => {
    navigation.navigate('PostScreen', {
      boardId: 1, // TODO: 게시판 ID 하드코딩 고치기
      postId: postId
    });
  }

  useEffect(() => {
    async function init() {
      const postList = await getMyPostList(0, "createdAt");
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
        renderItem={({item}) => <MyPostItem post={item} />}
        ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#F6F6F6'}}></View>}
      />
    </SafeAreaView>
  );
}

