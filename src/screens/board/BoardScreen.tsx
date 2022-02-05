import React, {useState, useEffect} from 'react';

import {ScrollView, View, Text} from 'react-native';

import BoardList, {
  MenuList,
  CustomBoardList,
  OfficialBoardList,
  OfficialBoardListTest
} from '../../components/BoardList';
import Board from '../../classes/Board';
import {OfficialBoardListContainer, BoardListContainer} from '../../components/HideToggleContainer';
import {
  getCustomBoardList,
  getDepartmentBoardList,
  getOfficialBoardList,
  getPinnedBoardList,
} from '../../common/boardApi';

export default function BoardScreen() {
  const [pinnedBoardList, setPinnedBoardList] = useState<Board[]>([]);
  const [customBoardList, setCustomBoardList] = useState<Board[]>([]);
  const [officialBoardList, setOfficialBoardList] = useState<Board[]>([]);
  const [departmentBoardList, setDepartmentBoardList] = useState<Board[]>([]);

  useEffect(() => {
    // async function getPinnedBoards() {
    //   const list = await getPinnedBoardList();
    //   console.log(list);
    //   setPinnedBoardList(list);
    // }
    // async function getCustomBoards() {
    //   const list = await getCustomBoardList();
    //   console.log(list);
    //   setCustomBoardList(list);
    // }
    // async function getOfficialBoards() {
    //   const list = await getOfficialBoardList();
    //   console.log(list);
    //   setOfficialBoardList(list);
    // }
    async function getBoardList() {
      const pinnedBoardList = await getPinnedBoardList();
      const customBoardList = await getCustomBoardList();
      const officialBoardList = await getOfficialBoardList();
      const departmentBoardList = await getDepartmentBoardList();
      setPinnedBoardList(pinnedBoardList);
      setCustomBoardList(customBoardList);
      setOfficialBoardList(officialBoardList);
      setDepartmentBoardList(departmentBoardList);

    }
    // getOfficialBoards();
    // getCustomBoards();
    // getPinnedBoards();
    getBoardList();
  }, []);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View
        style={{flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 16}}>
        <BoardListContainer boardCategory="모아보기" component={<MenuList />} />
        <BoardListContainer
          boardCategory="고정게시판"
          component={<BoardList items={pinnedBoardList} />}
        />
        {/* <BoardListContainer
          boardCategory="공식게시판"
          component={<OfficialBoardList items={officialBoardList} />}
        /> */}
        <View style={{height: 60, paddingLeft: 25, alignItems: 'center', flexDirection: 'row'}}>
          <Text style={{
            fontSize: 17,
            fontFamily: 'SpoqaHanSansNeo',
            lineHeight: 20,
            flex: 1,
            fontWeight: 'bold',
            color: '#222222'
          }}>
            공식게시판
          </Text>
        </View>
        <OfficialBoardListContainer
          boardCategory="수정광장"
          component={<OfficialBoardListTest items={officialBoardList} />}
        />
        <OfficialBoardListContainer
          defaultFolded={true}
          boardCategory="학과게시판"
          component={<OfficialBoardListTest items={departmentBoardList} />}
        />
        <BoardListContainer
          boardCategory="수정게시판"
          component={<CustomBoardList items={customBoardList} />}
        />
        <View style={{height: 36, backgroundColor: '#FFFFFF'}}></View>
      </View>
    </ScrollView>
  );
}
