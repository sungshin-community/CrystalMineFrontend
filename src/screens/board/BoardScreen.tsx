import React, { useState, useEffect } from 'react';

import {
  ScrollView,
  FlatList,
  View,
  Text
} from 'react-native';

import BoardList, { MenuList, CustomBoardList, OfficialBoardList } from '../../components/BoardList';
import Board from '../../classes/Board';
import { BoardListContainer } from '../../components/HideToggleContainer';
import { getCustomBoardList, getOfficialBoardList, getPinnedBoardList } from '../../common/boardApi';

export default function BoardScreen() {
  const [pinnedBoardList, setPinnedBoardList] = useState<Board[]>([]);
  const [customBoardList, setCustomBoardList] = useState<Board[]>([]);
  const [officialBoardList, setOfficialBoardList] = useState<Board[]>([]);

  useEffect(() => {
    async function getPinnedBoards() {
      const list = await getPinnedBoardList();
      console.log(list);
      setPinnedBoardList(list);
    }
    async function getCustomBoards() {
      const list = await getCustomBoardList();
      console.log(list);
      setCustomBoardList(list);
    }
    async function getOfficialBoards() {
      const list = await getOfficialBoardList();
      console.log(list);
      setOfficialBoardList(list);
    }
    getOfficialBoards();
    getCustomBoards();
    getPinnedBoards();
    // console.log(majorList);
  //  signUp(signUpDto);
    
  }, []);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View style={{flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 16}}>
          <BoardListContainer boardCategory="모아보기" component={<MenuList />} />
          <BoardListContainer boardCategory="고정게시판" component={<BoardList items={pinnedBoardList}/>} />
          <BoardListContainer boardCategory="공식게시판" component={<OfficialBoardList items={officialBoardList}/>} />
          <BoardListContainer boardCategory="수정게시판" component={<CustomBoardList items={customBoardList}/>} />
          <View style={{height: 36, backgroundColor: "#FFFFFF"}}></View>
        </View>
    </ScrollView>
  )
}