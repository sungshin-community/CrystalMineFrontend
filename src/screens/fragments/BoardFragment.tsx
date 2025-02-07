import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
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
import HomeTabIcon from '../../../resources/icon/HomeTabIcon';
import BoardTabIcon from '../../../resources/icon/BoardTabIcon';
import AlertTabIcon from '../../../resources/icon/AlertTabIcon';
import MessageTabIcon from '../../../resources/icon/MessageTabIcon';
import MyPageGNB from '../../../resources/icon/MypageTabIcon';

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

  const getTextColor = (focused: boolean) => {
    return focused ? '#A055FF' : '#6E7882';
  };

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
            {/* Header 아래 선 제거 */}
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
                    items={officialBoardList}
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
              <OfficialBoardListContainer
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
                marginHorizontal: 16,
                marginBottom: 40,
                marginTop: 20,
              }}>
              <>
                <PlusIcon
                  style={{
                    marginLeft: 12,
                    marginRight: 12,
                    marginTop: 11,
                    marginBottom: 11,
                  }}
                />
                <Text
                  style={[
                    fontRegular,
                    {
                      color: '#89919A',
                      fontSize: 14,
                    },
                  ]}>
                  새 게시판 만들기
                </Text>
              </>
            </TouchableHighlight>
          </ScrollView>
          {/* 하단 네비게이션 */}
          <View
            style={{
              height: Platform.OS === 'ios' ? 112 : 78,
              paddingBottom: Platform.OS === 'ios' ? 34 : 0,
            }}>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => navigation.navigate('Home')}>
                <View style={styles.iconContainer}>
                  <View style={styles.icon}>
                    <HomeTabIcon size={24} color="#A055FF" focused={true} />
                  </View>
                  <Text
                    style={[styles.tabIconText, {color: getTextColor(true)}]}>
                    광산
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => navigation.navigate('CrystalBall')}>
                <View style={styles.iconContainer}>
                  <View style={styles.icon}>
                    <BoardTabIcon size={24} color="#E2E4E8" focused={false} />
                  </View>
                  <Text
                    style={[styles.tabIconText, {color: getTextColor(false)}]}>
                    수정구
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => navigation.navigate('Message')}>
                <View style={styles.iconContainer}>
                  <View style={styles.icon}>
                    <MessageTabIcon size={24} color="#E2E4E8" focused={false} />
                  </View>
                  <Text
                    style={[styles.tabIconText, {color: getTextColor(false)}]}>
                    대화
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => navigation.navigate('Alert')}>
                <View style={styles.iconContainer}>
                  <View style={styles.icon}>
                    <AlertTabIcon size={24} color="#E2E4E8" focused={false} />
                  </View>
                  <Text
                    style={[styles.tabIconText, {color: getTextColor(false)}]}>
                    알림
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => navigation.navigate('MyPage')}>
                <View style={styles.iconContainer}>
                  <View style={styles.icon}>
                    <MyPageGNB size={24} color="#E2E4E8" focused={false} />
                  </View>
                  <Text
                    style={[styles.tabIconText, {color: getTextColor(false)}]}>
                    MY
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: Platform.OS === 'ios' ? 34 : 0,
                width: '100%',
                backgroundColor: 'white',
              }}
            />
          </View>
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 21,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EFEFF3',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 15,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: '100%',
  },
  tabIconText: {
    fontFamily: 'pretendard',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    bottom: 10,
  },
});
