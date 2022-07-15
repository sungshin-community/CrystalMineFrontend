import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, Pressable, View, FlatList, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MyPostDto from '../../classes/MyPostDto';
import MyPostItem from '../../components/MyPostItem';
import { getMyPostList } from '../../common/boardApi';
import { MyPostContentDto } from '../../classes/board/MyPostDto';

type RootStackParamList = {
  PostScreen: {postId: number};
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function MyPostList({navigation, route}: Props) {

  const [myPostList, setMyPostList] = useState<MyPostContentDto[]>([]);
  const [sortBy, setSortBy] = useState<string>('createdAt');

  const moveToPost = (postId: number) => {
    navigation.navigate('PostScreen', {
      postId: postId
    });
  }

  useEffect(() => {
    async function init() {
      const postList = await getMyPostList(0, sortBy);
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
        renderItem={({item}) => <MyPostItem post={item} moveToPost={moveToPost} />}
        ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#F6F6F6'}}></View>}
      />
    </SafeAreaView>
  );
}

