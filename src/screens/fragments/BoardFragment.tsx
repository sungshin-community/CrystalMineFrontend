import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, ActivityIndicator} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { useIsFocused } from "@react-navigation/native";
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { fontRegular } from '../../common/font';

type RootStackParamList = {
  MyPostList: undefined;
  MyCommentList: undefined;
  ScrapedPostList: undefined;
  PostListScreen: { boardId: number };
  TermAgreeCreateBoard: undefined;
  WikiTab: {boardId: number};
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function BoardFragment({navigation}: Props) {
  const [pinnedBoardList, setPinnedBoardList] = useState<Board[]>([]);
  const [customBoardList, setCustomBoardList] = useState<Board[]>([]);
  const [officialBoardList, setOfficialBoardList] = useState<Board[]>([]);
  const [departmentBoardList, setDepartmentBoardList] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const [isInited, setIsInited] = useState<boolean>(false);

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
    if (boardId === 5) {
      navigation.navigate('WikiTab', {boardId: boardId});
    } else {
      navigation.navigate('PostListScreen', {boardId: boardId});
    }
  }

  const moveToCreateBoard = () => {
    navigation.navigate('TermAgreeCreateBoard');
  }

  const moveToMyCommentList = () => {
    navigation.navigate('MyCommentList');
  }

  useEffect(() => {
    async function getBoardList() {
      if (!isInited) {
        setIsLoading(true);
      }
      const pinnedBoardList = await getPinnedBoardList();
      const customBoardList = await getCustomBoardList();
      const officialBoardList = await getOfficialBoardList();
      const departmentBoardList = await getDepartmentBoardList();
      setPinnedBoardList(pinnedBoardList);
      setCustomBoardList(customBoardList);
      setOfficialBoardList(officialBoardList);
      setDepartmentBoardList(departmentBoardList);
      if (!isInited) {
        setIsLoading(false);
        setIsInited(true);
      }
    }
    // getOfficialBoards();
    // getCustomBoards();
    // getPinnedBoards();
    if (isFocused) {
      getBoardList();
    }
  }, [navigation, isFocused]);

  

  return (
    <>
      <View style={{position: 'absolute', alignItems: 'center', justifyContent: 'center', left: 0, right: 0, top: 0, bottom: 0}}>
        <ActivityIndicator size="large" color={'#A055FF'} animating={isLoading} style={{zIndex: 100}} />
      </View>
      <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View
          style={{flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 16}}>
          <BoardListContainer boardCategory="모아보기" component={<MenuList toMyPosting={moveToMyPostList} toMyCommentList={moveToMyCommentList} toScrapedPosting={moveToScrapedPostList} />} />
          <BoardListContainer
            boardCategory="고정게시판"
            component={<BoardList items={pinnedBoardList} moveToBoard={moveToBoard} isInited={isInited} />}
          />
          {/* <BoardListContainer
            boardCategory="공식게시판"
            component={<OfficialBoardList items={officialBoardList} />}
          /> */}
          <View style={{height: 60, paddingLeft: 25, alignItems: 'center', flexDirection: 'row'}}>
            <Text style={[fontRegular,{
              fontSize: 17,
              lineHeight: 20,
              flex: 1,
              fontWeight: 'bold',
              color: '#222222'
            }]}>
              공식게시판
            </Text>
          </View>
          <OfficialBoardListContainer
            boardCategory="수정광장"
            component={<OfficialBoardList items={officialBoardList} onUpdate={updateOfficialBoardList} moveToBoard={moveToBoard} isInited={isInited} />}
          />
          <OfficialBoardListContainer
            defaultFolded={true}
            boardCategory="학과게시판"
            component={<OfficialBoardList items={departmentBoardList} onUpdate={updateDepartmentBoardList} moveToBoard={moveToBoard} isInited={isInited} />}
          />
          <CustomBoardListContainer
            boardCategory="수정게시판"
            component={<CustomBoardList items={customBoardList} onUpdate={updateCustomBoardList} moveToBoard={moveToBoard} isInited={isInited} />}
            moveToCreateBoard={moveToCreateBoard}
          />
          <View style={{height: 36, backgroundColor: '#FFFFFF'}}></View>
        </View>
      </ScrollView>
      </>
  );
}
