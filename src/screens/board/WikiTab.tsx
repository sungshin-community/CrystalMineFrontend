import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dimensions, Pressable, Text, TouchableHighlight} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getBoardInfo, toggleBoardPin} from '../../common/boardApi';
import Board from '../../classes/Board';
import {BigOrangeFlag} from '../../../resources/icon/OrangeFlag';
import {BigGrayFlag} from '../../../resources/icon/GrayFlag';
import {BigGrayPin, BigPurplePin} from '../../../resources/icon/Pin';
import {fontMedium} from '../../common/font';
import SpinningThreeDots from '../../components/SpinningThreeDots';
import SettingIcon from '../../../resources/icon/SettingIcon';
import SearchIcon from '../../../resources/icon/SearchIcon';
import NoReport, {Report} from '../../../resources/icon/Report';
import Toast from 'react-native-simple-toast';
import PostListScreen from '../post/PostListScreen';
import {logout} from '../../common/authApi';
import {getHundredsDigit} from '../../common/util/statusUtil';

type RootStackParamList = {
  PostScreen: {postId: number};
  PostWriteScreen: {boardId: number};
  UpdateBoard: {boardId: number};
  BoardSearch: {boardName: string; boardId: number};
  PostSearch: {boardId: number; boardName: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;

const Tab = createMaterialTopTabNavigator();
var tabWidth = (Dimensions.get('window').width / 4 - 24) / 2; // 한 탭 당 가로 넓이

function WikiTab({navigation, route}: Props) {
  const [boardInfo, setBoardInfo] = useState<Board>();
  const [reportCheckModalVisible, setReportCheckModalVisible] = useState<
    boolean
  >(false);
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
            const response = await toggleBoardPin(route.params.boardId);
            if (response.status === 401) {
              setTimeout(function () {
                Toast.show(
                  '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                  Toast.SHORT,
                );
              }, 100);
              logout();
              navigation.reset({routes: [{name: 'SplashHome'}]});
            } else if (getHundredsDigit(response.status) === 2) {
              const boardUpdate = await getBoardInfo(route.params.boardId);
              setBoardInfo(boardUpdate);
            } else {
              setTimeout(function () {
                Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
              }, 100);
            }
          }}>
          {boardInfo?.isOwner ? (
            boardInfo?.isPinned ? (
              <BigOrangeFlag />
            ) : (
              <BigGrayFlag />
            )
          ) : boardInfo?.isPinned ? (
            <BigPurplePin />
          ) : (
            <BigGrayPin />
          )}
        </Pressable>
        <Text
          style={[
            fontMedium,
            {
              marginLeft: 8,
              fontSize: 19,
            },
          ]}>
          성신 위키
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
        navigation.navigate('PostSearch', {
          boardId: boardInfo?.id,
          boardName: boardInfo?.name,
        })
      }>
      <SearchIcon />
    </TouchableHighlight>
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderIcon />,
      headerRight: () => handleBoardSearchComponent,
      headerTitleAlign: 'center',
    });
  }, [navigation, boardInfo, reportCheckModalVisible, reportModalVisible]);
  return (
    <>
      <Tab.Navigator
        initialRouteName={
          route.params.boardId === 6
            ? '교내 위키'
            : route.params.boardId === 7
            ? '교외 위키'
            : route.params.boardId === 8
            ? '상권 위키'
            : route.params.boardId === 9
            ? '페미 위키'
            : ''
        }
        screenOptions={() => ({
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
        })}
        keyboardDismissMode="on-drag"
        initialLayout={{width: Dimensions.get('window').width}}>
        <Tab.Screen
          name="교내 위키"
          component={PostListScreen}
          initialParams={{boardId: 6}}
        />
        <Tab.Screen
          name="교외 위키"
          component={PostListScreen}
          initialParams={{boardId: 7}}
        />
        <Tab.Screen
          name="상권 위키"
          component={PostListScreen}
          initialParams={{boardId: 8}}
        />
        <Tab.Screen
          name="페미 위키"
          component={PostListScreen}
          initialParams={{boardId: 9}}
        />
      </Tab.Navigator>
    </>
  );
}

export default WikiTab;
