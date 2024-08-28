import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useIsFocused} from '@react-navigation/native';
import BoardList, {
  MenuList,
  CustomBoardList,
  OfficialBoardList,
  TeamBoardList,
} from '../../components/BoardList';
import Board from '../../classes/Board';
import {
  OfficialBoardListContainer,
  BoardListContainer,
  CustomBoardListContainer,
} from '../../components/HideToggleContainer';
import {
  getCustomBoardList,
  getDepartmentBoardList,
  getOfficialBoardList,
  getPinnedDepartmentBoardList,
  getPinnedOfficialBoardList,
  getPinnedPublicBoardList,
} from '../../common/boardApi';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fontRegular} from '../../common/font';
import {getHundredsDigit} from '../../common/util/statusUtil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WaterMark from '../../components/WaterMark';
import Error from '../../components/Error';
import {logout} from '../../common/authApi';
import Toast from 'react-native-simple-toast';
import PlusIcon from '../../../resources/icon/PlusIcon';

type RootStackParamList = {
  MyPostList: undefined;
  MyCommentList: undefined;
  ScrapedPostList: undefined;
  PostListScreen: {boardId: number};
  TermAgreeCreateBoard: undefined;
  WikiTab: {boardId: number};
  SplashHome: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function BoardFragment({navigation}: Props) {
  const [pinnedBoardList, setPinnedBoardList] = useState<Board[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [customBoardList, setCustomBoardList] = useState<Board[]>([]);
  const [officialBoardList, setOfficialBoardList] = useState<Board[]>([]);
  const [departmentBoardList, setDepartmentBoardList] = useState<Board[]>([]);
  const [teamBoardList, setTeamBoardList] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const [isInited, setIsInited] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorStatus, setErrorStatus] = useState<number>();

  const getPinnedBoardList = async () => {
    let boardList: Board[] = [];
    const pinnedOfficialResponse = await getPinnedOfficialBoardList();
    if (pinnedOfficialResponse.status === 401) {
      setTimeout(function () {
        Toast.show(
          '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
          Toast.SHORT,
        );
      }, 100);
      logout();
      navigation.reset({routes: [{name: 'SplashHome'}]});
    } else if (getHundredsDigit(pinnedOfficialResponse.status) === 2) {
      boardList = boardList.concat(pinnedOfficialResponse.data.data);
    } else {
      setErrorStatus(pinnedOfficialResponse.status);
      setIsError(true);
      return;
    }
    const pinnedDepartmentResponse = await getPinnedDepartmentBoardList();
    if (pinnedDepartmentResponse.status === 401) {
      setTimeout(function () {
        Toast.show(
          '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
          Toast.SHORT,
        );
      }, 100);
      logout();
      navigation.reset({routes: [{name: 'SplashHome'}]});
    } else if (getHundredsDigit(pinnedDepartmentResponse.status) === 2) {
      boardList = boardList.concat(pinnedDepartmentResponse.data.data);
    } else {
      setErrorStatus(pinnedDepartmentResponse.status);
      setIsError(true);
      return;
    }
    const pinnedPublicResponse = await getPinnedPublicBoardList();
    if (pinnedPublicResponse.status === 401) {
      setTimeout(function () {
        Toast.show(
          '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
          Toast.SHORT,
        );
      }, 100);
      logout();
      navigation.reset({routes: [{name: 'SplashHome'}]});
    } else if (getHundredsDigit(pinnedPublicResponse.status) === 2) {
      boardList = boardList.concat(pinnedPublicResponse.data.data);
      setPinnedBoardList(boardList);
    } else {
      setErrorStatus(pinnedPublicResponse.status);
      setIsError(true);
      return;
    }
  };

  const getOfficialBoards = async () => {
    const officialResponse = await getOfficialBoardList();
    if (officialResponse.status === 401) {
      setTimeout(function () {
        Toast.show(
          '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
          Toast.SHORT,
        );
      }, 100);
      logout();
      navigation.reset({routes: [{name: 'SplashHome'}]});
    } else if (getHundredsDigit(officialResponse.status) === 2) {
      console.log(officialResponse.data);
      setOfficialBoardList(officialResponse.data.data);
    } else {
      setErrorStatus(officialResponse.status);
      setIsError(true);
    }
  };

  const getPublicBoards = async () => {
    const publicResponse = await getCustomBoardList();
    if (publicResponse.status === 401) {
      setTimeout(function () {
        Toast.show(
          '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
          Toast.SHORT,
        );
      }, 100);
      logout();
      navigation.reset({routes: [{name: 'SplashHome'}]});
    } else if (getHundredsDigit(publicResponse.status) === 2) {
      setCustomBoardList(publicResponse.data.data);
    } else {
      setErrorStatus(publicResponse.status);
      setIsError(true);
    }
  };

  const getDepartmentBoards = async () => {
    const departmentResponse = await getDepartmentBoardList();
    if (departmentResponse.status === 401) {
      setTimeout(function () {
        Toast.show(
          '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
          Toast.SHORT,
        );
      }, 100);
      logout();
      navigation.reset({routes: [{name: 'SplashHome'}]});
    } else if (getHundredsDigit(departmentResponse.status) === 2) {
      setDepartmentBoardList(departmentResponse.data.data);
    } else {
      setErrorStatus(departmentResponse.status);
      setIsError(true);
    }
  };

  const getTeamBoards = async () => {
    const allBoardsResponse = await getOfficialBoardList();
    if (allBoardsResponse.status === 401) {
      setTimeout(function () {
        Toast.show(
          '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
          Toast.SHORT,
        );
      }, 100);
      logout();
      navigation.reset({routes: [{name: 'SplashHome'}]});
    } else if (getHundredsDigit(allBoardsResponse.status) === 2) {
      const teamBoardIds = [93, 94, 95];
      console.log(allBoardsResponse.data.data);
      const teamBoards = allBoardsResponse.data.data.filter(board =>
        teamBoardIds.includes(board.id),
      );
      setTeamBoardList(teamBoards);
    } else {
      setErrorStatus(allBoardsResponse.status);
      setIsError(true);
    }
  };

  const updateOfficialBoardList = async () => {
    getOfficialBoards();
    getPinnedBoardList();
  };

  const updatePinnedBoardList = async () => {
    getPinnedBoardList();
    getPublicBoards();
    getOfficialBoards();
    getDepartmentBoards();
  };

  const updateCustomBoardList = async () => {
    getPublicBoards();
    getPinnedBoardList();
  };

  const updateDepartmentBoardList = async () => {
    getDepartmentBoards();
    getPinnedBoardList();
  };

  const updateTeamBoardList = async () => {
    getTeamBoards();
    getPinnedBoardList();
  };

  const moveToMyPostList = () => {
    navigation.navigate('MyPostList');
  };

  const moveToScrapedPostList = () => {
    navigation.navigate('ScrapedPostList');
  };

  const moveToBoard = (boardId: number) => {
    if (boardId === 5) {
      navigation.navigate('WikiTab', {boardId: boardId});
    } else {
      navigation.navigate('PostListScreen', {boardId: boardId});
    }
  };

  const moveToCreateBoard = () => {
    navigation.navigate('TermAgreeCreateBoard');
  };

  const moveToMyCommentList = () => {
    navigation.navigate('MyCommentList');
  };

  useEffect(() => {
    async function init() {
      if (!isInited) {
        setIsLoading(true);
      }
      await getPinnedBoardList();
      await getOfficialBoards();
      await getPublicBoards();
      await getDepartmentBoards();
      await getTeamBoards();

      if (!isInited) {
        setIsLoading(false);
        setIsInited(true);
      }
    }
    if (isFocused) {
      init();
    }
  }, [navigation, isFocused]);

  return (
    <>
      <WaterMark />
      {isError ? (
        <Error status={errorStatus} code={'B001'} />
      ) : (
        <>
          <View
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}>
            <ActivityIndicator
              size="large"
              color={'#A055FF'}
              animating={isLoading}
              style={{zIndex: 100}}
            />
          </View>
          <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
            {/* Header 아래 선 */}
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#EFEFF3',
              }}
            />
            <View
              style={{
                flex: 1,
                /* backgroundColor: '#FFFFFF',
                paddingHorizontal: 16, */
              }}>
              <CustomBoardListContainer
                boardCategory="전체 게시판"
                defaultFolded={false}
                component={
                  <CustomBoardList
                    items={customBoardList}
                    onUpdate={updateCustomBoardList}
                    moveToBoard={moveToBoard}
                    isInited={isInited}
                  />
                }
                moveToCreateBoard={moveToCreateBoard}
              />
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#EFEFF3',
                  marginLeft: 16,
                  marginRight: 16,
                }}
              />
              {/* <BoardListContainer
                boardCategory="모아보기"
                component={
                  <MenuList
                    toMyPosting={moveToMyPostList}
                    toMyCommentList={moveToMyCommentList}
                    toScrapedPosting={moveToScrapedPostList}
                  />
                }
              /> */}
              <BoardListContainer
                boardCategory="공식 게시판"
                defaultFolded={false}
                component={
                  <OfficialBoardList
                    items={pinnedBoardList}
                    moveToBoard={moveToBoard}
                    isInited={isInited}
                    onUpdate={updatePinnedBoardList}
                  />
                }
              />
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#EFEFF3',
                  marginLeft: 16,
                  marginRight: 16,
                }}
              />
              {/* <BoardListContainer
            boardCategory="공식게시판"
            component={<OfficialBoardList items={officialBoardList} />}
          /> */}
              <CustomBoardListContainer
                boardCategory="학과 게시판"
                defaultFolded={false}
                component={
                  <OfficialBoardList
                    items={departmentBoardList}
                    onUpdate={updateDepartmentBoardList}
                    moveToBoard={moveToBoard}
                    isInited={isInited}
                  />
                }
                moveToCreateBoard={moveToCreateBoard}
              />
              {/* <OfficialBoardListContainer
                defaultFolded={true}
                boardCategory="교내게시판"
                component={
                  <OfficialBoardList
                    items={teamBoardList}
                    moveToBoard={moveToBoard}
                    onUpdate={updateTeamBoardList}
                    isInited={isInited}
                  />
                }
              /> */}
              {/* <CustomBoardListContainer
                boardCategory="수정게시판"
                component={
                  <CustomBoardList
                    items={customBoardList}
                    onUpdate={updateCustomBoardList}
                    moveToBoard={moveToBoard}
                    isInited={isInited}
                  />
                }
                moveToCreateBoard={moveToCreateBoard}
              /> */}
              {/* <View style={{height: 36, backgroundColor: '#FFFFFF'}}></View> */}
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#EFEFF3',
                marginLeft: 16,
                marginRight: 16,
              }}
            />
            <TouchableHighlight
              underlayColor="#EEEEEE"
              onPress={() => moveToCreateBoard()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#F6F6F6',
                height: 46,
                borderRadius: 8,
                margin: 16,
              }}>
              <>
                <PlusIcon style={{marginLeft: 18, marginRight: 12}} />
                <Text
                  style={{
                    color: '#89919A',
                    fontSize: 14,
                    fontFamily: 'SpoqaHanSansNeo-Regular',
                  }}>
                  새 게시판 만들기
                </Text>
              </>
            </TouchableHighlight>
          </ScrollView>
        </>
      )}
    </>
  );
}
