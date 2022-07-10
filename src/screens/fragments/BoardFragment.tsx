import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import BoardList, {
  MenuList,
  CustomBoardList,
  OfficialBoardList
} from '../../components/BoardList';
import Board from '../../classes/Board';
import {OfficialBoardListContainer, BoardListContainer, CustomBoardListContainer} from '../../components/HideToggleContainer';
import {
  getCustomBoardList,
  getDepartmentBoardList,
  getOfficialBoardList,
  getPinnedBoardList,
} from '../../common/boardApi';

type RootStackParamList = {
  MyPostList: undefined;
  ScrapedPostList: undefined;
  PostListScreen: { boardId: number };
  TermAgreeCreateBoard: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function BoardFragment({navigation}: Props) {
  const [pinnedBoardList, setPinnedBoardList] = useState<Board[]>([]);
  const [customBoardList, setCustomBoardList] = useState<Board[]>([]);
  const [officialBoardList, setOfficialBoardList] = useState<Board[]>([]);
  const [departmentBoardList, setDepartmentBoardList] = useState<Board[]>([]);

  const updateOfficialBoardList = async () => {
    const officialBoardList = await getOfficialBoardList();
    const pinnedBoardList = await getPinnedBoardList();
    setOfficialBoardList(officialBoardList);
    setPinnedBoardList(pinnedBoardList);
  }

  const updateCustomBoardList = async () => {
    const customBoardList = await getCustomBoardList();
    const pinnedBoardList = await getPinnedBoardList();
    setCustomBoardList(customBoardList);
    setPinnedBoardList(pinnedBoardList);
  }

  const updateDepartmentBoardList = async () => {
    const departmentBoards = await getDepartmentBoardList();
    const pinnedBoardList = await getPinnedBoardList();
    setDepartmentBoardList(departmentBoards);
    setPinnedBoardList(pinnedBoardList);
  }

  const moveToMyPostList = () => {
    navigation.navigate('MyPostList')
  }

  const moveToScrapedPostList = () => {
    navigation.navigate('ScrapedPostList')
  }

  const moveToBoard = (boardId: number) => {
    navigation.navigate('PostListScreen', {boardId: boardId});
  }

  const moveToCreateBoard = () => {
    navigation.navigate('TermAgreeCreateBoard');
  }


  useEffect(() => {
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
        <BoardListContainer boardCategory="모아보기" component={<MenuList toMyPosting={moveToMyPostList} toScrapedPosting={moveToScrapedPostList} />} />
        <BoardListContainer
          boardCategory="고정게시판"
          component={<BoardList items={pinnedBoardList} moveToBoard={moveToBoard} />}
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
          component={<OfficialBoardList items={officialBoardList} onUpdate={updateOfficialBoardList} moveToBoard={moveToBoard} />}
        />
        <OfficialBoardListContainer
          defaultFolded={true}
          boardCategory="학과게시판"
          component={<OfficialBoardList items={departmentBoardList} onUpdate={updateDepartmentBoardList} moveToBoard={moveToBoard} />}
        />
        <CustomBoardListContainer
          boardCategory="수정게시판"
          component={<CustomBoardList items={customBoardList} onUpdate={updateCustomBoardList} moveToBoard={moveToBoard} />}
          moveToCreateBoard={moveToCreateBoard}
        />
        <View style={{height: 36, backgroundColor: '#FFFFFF'}}></View>
      </View>
    </ScrollView>
  );
}
