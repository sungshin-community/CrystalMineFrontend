import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dimensions, Pressable, TouchableHighlight} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import PostSearchResult from './PostSearchResult';
import FloatingWriteButton from '../../components/FloatingWriteButton';
import {getBoardInfo, toggleBoardPin} from '../../common/boardApi';
import {ContentPreviewDto} from '../../classes/BoardDetailDto';
import Board from '../../classes/Board';
import {BigOrangeFlag} from '../../../resources/icon/OrangeFlag';
import {BigGrayFlag} from '../../../resources/icon/GrayFlag';
import {
  BigGrayPin,
  BigOrangePin,
  BigPurplePin,
} from '../../../resources/icon/Pin';
import {fontMedium} from '../../common/font';
import {Text} from 'react-native-svg';
import SpinningThreeDots from '../../components/SpinningThreeDots';
import SettingIcon from '../../../resources/icon/SettingIcon';
import SearchIcon from '../../../resources/icon/SearchIcon';
import NoReport, {Report} from '../../../resources/icon/Report';
import Toast from 'react-native-simple-toast';

type RootStackParamList = {
  PostScreen: {postId: number};
  PostWriteScreen: {boardId: number};
  UpdateBoard: {boardId: number};
  BoardSearch: {boardName: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;

const Tab = createMaterialTopTabNavigator();
var tabWidth = (Dimensions.get('window').width / 4 - 24) / 2; // 한 탭 당 가로 넓이

function WikiTab({navigation, route}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [boardDetail, setBoardDetail] = useState<ContentPreviewDto[]>([]);
  const [boardInfo, setBoardInfo] = useState<Board>();
  const [reportCheckModalVisible, setReportCheckModalVisible] = useState<boolean>(false);
  const [reportModalVisible, setReportModalVisible] = useState<boolean>(false);

  const HeaderIcon = () => {
    return (
      <>
        <Pressable
          onPress={async () => {
            const result = await toggleBoardPin(route.params.boardId);
            const boardInfo = await getBoardInfo(route.params.boardId);
            setBoardInfo(boardInfo);
          }}>
          {boardInfo?.isOwner ? (
            boardInfo?.isPinned ? (
              <BigOrangeFlag />
            ) : (
              <BigGrayFlag />
            )
          ) : boardInfo?.isPinned ? (
            boardInfo?.type === 1 || boardInfo?.type === 2 ? (
              <BigPurplePin />
            ) : (
              <BigOrangePin />
            )
          ) : (
            <BigGrayPin />
          )}
        </Pressable>
        <Text
          style={[
            fontMedium,
            {
              marginLeft: 8,
              fontSize: boardInfo && boardInfo.name.length <= 10 ? 19 : 17,
              maxWidth: 180,
            },
          ]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {boardInfo ? boardInfo?.name : ''}
        </Text>
      </>
    );
  };

  const handleBoardSearchComponent = (
    <TouchableHighlight
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      underlayColor="#EEEEEE"
      // onPress={() =>
      //   navigation.navigate('BoardSearch', {boardName: boardInfo.name})
      // }
      >
      <SearchIcon />
    </TouchableHighlight>
  );

  const handleBoardSettingComponent = (
    <TouchableHighlight
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      underlayColor="#EEEEEE"
      onPress={() =>
        navigation.navigate('UpdateBoard', {boardId: route.params.boardId})
      }>
      <SettingIcon />
    </TouchableHighlight>
  );

  const handleBoardReportComponent = (
    <>
      {boardInfo?.isReported ? (
        <TouchableHighlight
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          underlayColor="#EEEEEE"
          onPress={() => {
            Toast.show('이미 신고한 게시판입니다.', Toast.SHORT);
          }}>
          <Report />
        </TouchableHighlight>
      ) : (
        <TouchableHighlight
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          underlayColor="#EEEEEE"
          onPress={() => {
            setReportCheckModalVisible(true);
            console.log(reportCheckModalVisible);
          }}>
          <NoReport />
        </TouchableHighlight>
      )}
    </>
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '성신위키',
      headerRight: () => (
        <>
          {boardInfo?.type !== 1 && (
            <SpinningThreeDots
              handleDefaultModeComponent={handleBoardSearchComponent}
              isMine={boardInfo?.isOwner}
              handleOptionModeIsMineComponent={handleBoardSettingComponent}
              handleOptionModeIsNotMineComponent={handleBoardReportComponent}
            />
          )}
          {boardInfo?.type === 1 && handleBoardSearchComponent}
        </>
      ),
      headerTitleAlign: 'center',
    });
  }, [navigation, boardInfo, reportCheckModalVisible, reportModalVisible]);

  // useEffect(() => {
  //   async function init() {
  //     setIsLoading(true);
  //     const boardDetail = await getBoardDetail(route.params.boardId, 0, sortBy);
  //      if (boardDetail.code === 'BOARD_ALREADY_BLIND') {
  //       Toast.show('시스템에 의해 블라인드된 게시판입니다.', Toast.SHORT);
  //       navigation.goBack();
  //     } else if (
  //       boardDetail.code === 'BOARD_NOT_FOUND' ||
  //       boardDetail.code === 'BOARD_ALREADY_DELETED'
  //     ) {
  //       Toast.show('삭제된 게시판입니다.', Toast.SHORT);
  //       navigation.goBack();
  //     } else  setBoardDetail(boardDetail);
  //     const boardInfo = await getBoardInfo(route.params.boardId);
  //     setBoardInfo(boardInfo);
  //     setIsLoading(false);
  //     if(boardDetail?.length === 0) setIsEmpty(true)
  //   }
  //   if (isFocused) init();
  // }, [isFocused, sortBy]);

  return (
    <Tab.Navigator
      initialRouteName="WikiTab"
      screenOptions={{
        tabBarStyle: {
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 5},
          shadowRadius: 20,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#A055FF',
          height: 8,
          width: 24,
          bottom: -4,
          borderRadius: 10,
          marginHorizontal: tabWidth,
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: 'SpoqaHanSansNeo-Regular',
          fontSize: 14,
          marginTop: 14,
          marginBottom: 6,
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#717171',
      }}
      keyboardDismissMode="on-drag"
      initialLayout={{width: Dimensions.get('window').width}}>
      <Tab.Screen
        name="교내 위키"
        children={() => <PostSearchResult data={[]} />}
      />
      <Tab.Screen
        name="교외 위키"
        children={() => <PostSearchResult data={[]} />}
      />
      <Tab.Screen
        name="상권 위키"
        children={() => <PostSearchResult data={[]} />}
      />
      <Tab.Screen
        name="페미 위키"
        children={() => <PostSearchResult data={[]} />}
      />
    </Tab.Navigator>
  );
}

export default WikiTab;
