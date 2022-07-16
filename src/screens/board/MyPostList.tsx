import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, Pressable, View, FlatList, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MyPostDto from '../../classes/MyPostDto';
import MyPostItem from '../../components/MyPostItem';
import { getMyPostList } from '../../common/boardApi';
import { MyPostContentDto } from '../../classes/board/MyPostDto';
import SpinningThreeDots from '../../components/SpinningThreeDots';
import SettingIcon from '../../../resources/icon/SettingIcon';
import SearchIcon from '../../../resources/icon/SearchIcon';
import TrashIcon from '../../../resources/icon/TrashIcon';
import CancelButton from '../../../resources/icon/Cancel';

type RootStackParamList = {
  PostScreen: {postId: number};
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function MyPostList({navigation, route}: Props) {

  const [myPostList, setMyPostList] = useState<MyPostContentDto[]>([]);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [deleteMode, setDeleteMode] = useState<boolean>(false);

  const moveToPost = (post: MyPostContentDto) => {
    if (deleteMode) {
      const tempList = myPostList.map(p => p.postId === post.postId ? {...p, isChecked: !p.isChecked} : p);
      setMyPostList(tempList);
    } else {
      navigation.navigate('PostScreen', {
        postId: post.postId
      });
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => deleteMode ? 
        <>
          <Text style={{color: '#A055FF'}}>삭제</Text>
          <TouchableOpacity
            onPress={() => {
              setDeleteMode(false);
              const tempList = myPostList.map(p => ({...p, isChecked: false}));
              setMyPostList(tempList);
            }}
          >
            <CancelButton color='#333D4B' style={{marginLeft: 8}} />
          </TouchableOpacity>
          
        </>
        : 
        <SpinningThreeDots
          handleDefaultModeComponent={handleBoardSearchComponent}
          handleOptionModeIsNotMineComponent={handleBoardReportComponent}
        />
      ,
      headerTitleAlign: 'center',
    });
  }, [navigation, deleteMode]);

  useEffect(() => {
    async function init() {
      const postList = await getMyPostList(0, sortBy);
      setMyPostList(postList);
    }
    init();
  }, [sortBy]);

  const handleBoardSearchComponent = (
    <View style={{marginRight: 4}}>
      <Pressable hitSlop={5} onPress={() => console.log('search icon click')}>
        <SearchIcon />
      </Pressable>
    </View>
  );

  const handleBoardReportComponent = (
    <TouchableOpacity
      onPress={() => {
        setDeleteMode(true);
      }}
      hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
      <TrashIcon />
    </TouchableOpacity>
  );

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
        renderItem={({item, index}) => <MyPostItem post={item} moveToPost={moveToPost} deleteMode={deleteMode} />}
        ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#F6F6F6'}}></View>}
      />
    </SafeAreaView>
  );
}

