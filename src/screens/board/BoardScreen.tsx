import React, { useState } from 'react';

import {
  ScrollView,
  FlatList,
  View,
  Text
} from 'react-native';

import BoardList from '../../components/BoardList';
import { Board } from '../../classes/Board';
import { BoardListContainer } from '../../components/HideToggleContainer';

export default function BoardScreen() {
  let menuList: Board[] = [
    {id: 1, title: "HOT 게시판", isPinned: true, isOfficial: true},
    {id: 2, title: "비밀게시판", isPinned: true, isOfficial: true},
    {id: 3, title: "졸업생게시판", isPinned: true, isOfficial: false},
    {id: 4, title: "새내기게시판", isPinned: false, isOfficial: true}



    
  ];

  return (
    <>
        <View style={{flex: 1}}>
          <BoardListContainer boardCategory="고정게시판" component={<BoardList items={menuList}/>} />
          <BoardListContainer boardCategory="공식게시판" component={<BoardList items={menuList}/>} />
        </View>
    </>
  )
}