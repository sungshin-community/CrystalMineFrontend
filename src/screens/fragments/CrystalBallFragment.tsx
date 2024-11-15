import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useIsFocused} from '@react-navigation/native';
import Board from '../../classes/Board';
import {
  getCustomBoardList,
  getDepartmentBoardList,
  getOfficialBoardList,
  getPinnedDepartmentBoardList,
  getPinnedOfficialBoardList,
  getPinnedPublicBoardList,
} from '../../common/boardApi';
import {getHundredsDigit} from '../../common/util/statusUtil';
import WaterMark from '../../components/WaterMark';
import Error from '../../components/Error';
import {logout} from '../../common/authApi';
import Toast from 'react-native-simple-toast';
import Lounge from '../../components/Lounge';
import CrystalReview from '../../components/CrystalReview';
import SphereTabNav from '../../components/SphereTabNav';
import DevelopScreen from '../developScreen/DevelopScreen';
import LookScreen from '../crystalBall/LookScreen';
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

export default function CrystalBallFragment({navigation}: Props) {
  const [pinnedBoardList, setPinnedBoardList] = useState<Board[]>([]);
  const [customBoardList, setCustomBoardList] = useState<Board[]>([]);
  const [officialBoardList, setOfficialBoardList] = useState<Board[]>([]);
  const [departmentBoardList, setDepartmentBoardList] = useState<Board[]>([]);
  const [teamBoardList, setTeamBoardList] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const [isInited, setIsInited] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorStatus, setErrorStatus] = useState<number>();
  const [activeTab, setActiveTab] = useState<'lounge' | 'explore'>('lounge'); // 선택된 탭

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

  const [tabIndex, setTabIndex] = useState(0);

  const renderContent = () => {
    switch (tabIndex) {
      case 0:
        return <LookScreen isFree={false} isQuestion={false} />;
      case 1:
        return <LookScreen isFree={true} isQuestion={false} />;
      case 2:
        return <LookScreen isQuestion={true} isFree={false} />;
      case 3:
        return <CrystalReview />;
      case 4:
        return <DevelopScreen />;
    }
  };

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
          <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
            {/* 1px height와 색상이 #EFEFF3인 구분선 */}
            <View style={styles.divider} />
            {/* 선택 탭 (라운지, 살펴보기) */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'lounge' && styles.activeTabButton,
                ]}
                onPress={() => setActiveTab('lounge')}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'lounge' && styles.activeTabText,
                  ]}>
                  라운지
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'explore' && styles.activeTabButton,
                ]}
                onPress={() => setActiveTab('explore')}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'explore' && styles.activeTabText,
                  ]}>
                  살펴보기
                </Text>
              </TouchableOpacity>
            </View>

            {/* 선택된 탭에 맞는 컴포넌트 렌더링 */}
            {activeTab === 'lounge' ? (
              <View>
                <Lounge />
              </View>
            ) : (
              <View style={{flex: 1}}>
                <SphereTabNav
                  onTabPress={index => setTabIndex(index)}
                  activeTabIndex={tabIndex}
                />
                <View style={{flex: 1}}>{renderContent()}</View>
              </View>
            )}
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#EFEFF3',
    alignItems: 'center',
  },
  tabContainer: {
    paddingTop: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 12,
  },
  activeTabButton: {
    borderBottomWidth: 3,
    borderBottomColor: '#A055FF',
  },
  tabText: {
    color: '#CECFD6',
    fontSize: 16,
  },
  activeTabText: {
    color: '#222222',
    fontWeight: 'bold',
  },
});
