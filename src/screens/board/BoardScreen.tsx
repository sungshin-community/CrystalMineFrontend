import React, { useState, useEffect } from 'react';

import {
  ScrollView,
  FlatList,
  View,
  Text
} from 'react-native';

import BoardList from '../../components/BoardList';
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
    <ScrollView style={{marginBottom: 36}}>
        <View style={{flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 16}}>
          <BoardListContainer boardCategory="고정게시판" component={<BoardList items={pinnedBoardList}/>} />
          <BoardListContainer boardCategory="공식게시판" component={<BoardList items={officialBoardList}/>} />
          <BoardListContainer boardCategory="수정게시판" component={<BoardList items={customBoardList}/>} />
        </View>
        <View style={{height: 36, backgroundColor: "#FFFFFF"}}></View>
    </ScrollView>
  )
}