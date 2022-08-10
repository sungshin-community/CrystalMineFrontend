import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dimensions, Pressable, TouchableHighlight, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getBoardInfo, toggleBoardPin} from '../../common/boardApi';
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
import WikiList from './WikiList';

type RootStackParamList = {
  PostScreen: {postId: number};
  PostWriteScreen: {boardId: number};
  UpdateBoard: {boardId: number};
  BoardSearch: {boardName: string; boardId: number};
};
type Props = NativeStackScreenProps<RootStackParamList>;

const Tab = createMaterialTopTabNavigator();
var tabWidth = (Dimensions.get('window').width / 4 - 24) / 2; // 한 탭 당 가로 넓이

function WikiTab({navigation, route}: Props) {
  const [boardInfo, setBoardInfo] = useState<Board>();
  const [reportCheckModalVisible, setReportCheckModalVisible] =
    useState<boolean>(false);
  const [reportModalVisible, setReportModalVisible] = useState<boolean>(false);

  useEffect(() => {
    async function init() {
      const boardData = await getBoardInfo(route.params.boardId);
      setBoardInfo(boardData);
    }
    init();
  }, []);

  const HeaderIcon = () => {
    return (
      <>
        <Pressable
          onPress={async () => {
            await toggleBoardPin(route.params.boardId);
            const boardUpdate = await getBoardInfo(route.params.boardId);
            setBoardInfo(boardUpdate);
          }}>
          {boardInfo?.isOwner ? (
            boardInfo?.isPinned ? (
              <BigOrangeFlag />
            ) : (
              <BigGrayFlag />
            )
          ) : boardInfo?.isPinned ? (
            boardInfo?.type === 'PUBLIC' || boardInfo?.type === 'DEPARTMENT' ? (
              <BigOrangePin />
            ) : (
              <BigPurplePin />
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
          {console.log('WikiTab 84', boardInfo?.name)}
          {boardInfo?.name ? boardInfo.name : ''}
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
      onPress={() =>
        navigation.navigate('BoardSearch', {
          boardName: boardInfo.name,
          boardId: boardInfo.id,
        })
      }>
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
        navigation.navigate('UpdateBoard', {boardId: boardInfo.id})
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
          }}>
          <NoReport />
        </TouchableHighlight>
      )}
    </>
  );

  useEffect(() => {
    console.log('WikiTab 165', boardInfo);
    navigation.setOptions({
      headerTitle: () => <HeaderIcon />,
      headerRight: () => (
        <SpinningThreeDots
          handleDefaultModeComponent={handleBoardSearchComponent}
          isMine={boardInfo?.isOwner}
          handleOptionModeIsMineComponent={handleBoardSettingComponent}
          handleOptionModeIsNotMineComponent={handleBoardReportComponent}
        />
      ),
      headerTitleAlign: 'center',
    });
  }, [navigation, boardInfo, reportCheckModalVisible, reportModalVisible]);

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
        children={() => <WikiList boardId={boardInfo?.id + 1} />}
      />
      <Tab.Screen
        name="교외 위키"
        children={() => <WikiList boardId={boardInfo?.id + 2} />}
      />
      <Tab.Screen
        name="상권 위키"
        children={() => <WikiList boardId={boardInfo?.id + 3} />}
      />
      <Tab.Screen
        name="페미 위키"
        children={() => <WikiList boardId={boardInfo?.id + 4} />}
      />
    </Tab.Navigator>
  );
}

export default WikiTab;
