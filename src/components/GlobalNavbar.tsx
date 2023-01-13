import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeFragment from '../screens/fragments/HomeFragment';
import BoardFragment from '../screens/fragments/BoardFragment';
import AlertFragment from '../screens/fragments/AlertFragment';
import MessageFragment from '../screens/fragments/MessageFragment';
import MyPageFragment from '../screens/fragments/MyPageFragment';

import HomeTabIcon from '../../resources/icon/HomeTabIcon';
import BoardTabIcon from '../../resources/icon/BoardTabIcon';
import AlertTabIcon from '../../resources/icon/AlertTabIcon';
import MessageTabIcon from '../../resources/icon/MessageTabIcon';
import MyPageGNB from '../../resources/icon/MypageTabIcon';
import SearchIcon from '../../resources/icon/SearchIcon';
import {SmallLogo} from '../../resources/icon/Logo';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Platform, Pressable, TouchableHighlight} from 'react-native';
import Toast from 'react-native-simple-toast';
import {checkRole, logout} from '../common/authApi';
import {useState, useEffect} from 'react';
import {Authentication} from '../classes/Authentication';
import {getHundredsDigit} from '../common/util/statusUtil';
import messaging from '@react-native-firebase/messaging';
import {AlertData} from '../classes/AlertDto';
import {readNotificationOnPush} from '../common/pushApi';
import {getPostByComment} from '../common/boardApi';

const Tab = createBottomTabNavigator();

interface Props {
  size: number;
  color: string;
  focused: boolean;
}
type RootStackParamList = {
  BoardSearch: undefined;
  TotalSearch: undefined;
  SplashHome: undefined;
  ErrorScreen: undefined;
  PostScreen: {postId: number};
  Notice: {noticeId: number};
  MyPage: undefined;
  CertifiedMember: undefined;
  ExpiredMember: undefined;
  UncertifiedMember: undefined;
};
type ScreenProps = NativeStackScreenProps<RootStackParamList>;

function GlobalNavbar({navigation}: ScreenProps) {
  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        //처리 로직
        console.log('data :::::::::::::: ', remoteMessage.data);
        onNotificationPress(remoteMessage.data);
      }
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          //처리 로직
          console.log('data ;;;;;;;;;;;;;;;;;;; ', remoteMessage.data);
          onNotificationPress(remoteMessage.data);
        }
      });
  }, []);

  const onNotificationPress = async (data: AlertData) => {
    const response = await readNotificationOnPush(data);
    console.log(response);
    if (data.type === 'COMMENT' || data.type === 'RECOMMENT') {
      const content = await getPostByComment(Number(data.contentId));
      navigation.navigate('PostScreen', {postId: content?.postId});
    } else if (data.type === 'HOT_POST') {
      navigation.navigate('PostScreen', {postId: Number(data.contentId)});
    } else if (data.type === 'NOTICE') {
      navigation.navigate('Notice', {noticeId: Number(data.contentId)});
    } else if (data.type === 'BEFORE_EXPIRE') {
      navigation.navigate('CertifiedMember');
    } else if (data.type === 'EXPIRE') {
      navigation.navigate('ExpiredMember');
    } else if (data.type === 'NOT_AUTHENTICATED') {
      navigation.navigate('UncertifiedMember');
    } else if (data.type === 'WELCOME') {
      navigation.navigate('MyPage');
    }
  };

  const onSearchPress = async () => {
    const response = await checkRole();
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
      const user = response.data.data;
      if (user?.isAuthenticated && !user?.blacklist) {
        navigation.navigate('TotalSearch');
      } else {
        setTimeout(function () {
          Toast.show('접근 권한이 없습니다.', Toast.SHORT);
        }, 100);
      }
    } else {
      logout();
      navigation.reset({
        routes: [
          {
            name: 'ErrorScreen',
            params: {status: response.status, code: 'G001'},
          },
        ],
      });
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: Platform.OS === 'android' ? 60 : 94,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: -2},
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 5,
          paddingHorizontal: 21,
        },
        tabBarIconStyle: {
          justifyContent: 'space-between',
        },
        tabBarShowLabel: false,
        tabBarInactiveTintColor: '#6E7882',
        tabBarActiveTintColor: '#A055FF',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeFragment}
        options={{
          headerTitle: () => <SmallLogo />,
          headerTitleAlign: 'center',
          tabBarIcon: ({size, color, focused}: Props) => {
            return <HomeTabIcon size={size} color={color} focused={focused} />;
          },
          headerRight: () => (
            <TouchableHighlight
              style={{
                marginRight: 11,
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              underlayColor="#EEEEEE"
              onPress={onSearchPress}>
              <SearchIcon />
            </TouchableHighlight>
          ),
        }}
      />
      <Tab.Screen
        name="Board"
        component={BoardFragment}
        listeners={({navigation}) => ({
          tabPress: async e => {
            e.preventDefault();
            const response = await checkRole();
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
              const user = response.data.data;
              if (user?.isAuthenticated && !user?.blacklist) {
                navigation.navigate('Board');
              } else
                setTimeout(function () {
                  Toast.show('접근 권한이 없습니다.', Toast.SHORT);
                }, 100);
            } else {
              logout();
              navigation.reset({
                routes: [
                  {
                    name: 'ErrorScreen',
                    params: {status: response.status, code: 'G001'},
                  },
                ],
              });
            }
          },
        })}
        options={{
          title: '게시판',
          headerTitleAlign: 'center',
          tabBarIcon: ({size, color, focused}: Props) => {
            return <BoardTabIcon size={size} color={color} focused={focused} />;
          },
          headerRight: () => (
            <TouchableHighlight
              style={{
                marginRight: 11,
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              underlayColor="#EEEEEE"
              onPress={onSearchPress}>
              <SearchIcon />
            </TouchableHighlight>
          ),
          headerTitleStyle: {
            fontSize: 19,
            fontFamily: 'SpoqaHanSansNeo-Regular',
          },
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageFragment}
        listeners={({navigation}) => ({
          tabPress: async e => {
            e.preventDefault();

            const response = await checkRole();
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
              const user = response.data.data;
              if (user?.isAuthenticated && !user?.blacklist)
                navigation.navigate('Message');
              else {
                setTimeout(function () {
                  Toast.show('접근 권한이 없습니다.', Toast.SHORT);
                }, 100);
              }
            } else {
              logout();
              navigation.reset({
                routes: [
                  {
                    name: 'ErrorScreen',
                    params: {status: response.status, code: 'G001'},
                  },
                ],
              });
            }
          },
        })}
        options={{
          title: '쪽지',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 19,
            fontFamily: 'SpoqaHanSansNeo-Regular',
          },
          tabBarIcon: ({size, color, focused}: Props) => {
            return (
              <MessageTabIcon size={size} color={color} focused={focused} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Alert"
        component={AlertFragment}
        listeners={({navigation}) => ({
          tabPress: async e => {
            e.preventDefault();
            const response = await checkRole();
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
              const user = response.data.data;
              if (!user?.blacklist) {
                navigation.navigate('Alert');
              } else {
                setTimeout(function () {
                  Toast.show('접근 권한이 없습니다.', Toast.SHORT);
                }, 100);
              }
            } else {
              logout();
              navigation.reset({
                routes: [
                  {
                    name: 'ErrorScreen',
                    params: {status: response.status, code: 'G001'},
                  },
                ],
              });
            }
          },
        })}
        options={{
          title: '알림',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 19,
            fontFamily: 'SpoqaHanSansNeo-Regular',
          },
          tabBarIcon: ({size, color, focused}: Props) => {
            return <AlertTabIcon size={size} color={color} focused={focused} />;
          },
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageFragment}
        listeners={({navigation}) => ({
          tabPress: async e => {
            e.preventDefault();

            const response = await checkRole();
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
              const user = response.data.data;
              if (!user?.blacklist) {
                navigation.navigate('MyPage');
              } else {
                setTimeout(function () {
                  Toast.show('접근 권한이 없습니다.', Toast.SHORT);
                }, 100);
              }
            } else {
              logout();
              navigation.reset({
                routes: [
                  {
                    name: 'ErrorScreen',
                    params: {status: response.status, code: 'G001'},
                  },
                ],
              });
            }
          },
        })}
        options={{
          title: '마이페이지',
          headerTitleAlign: 'center',
          tabBarIcon: ({size, color, focused}: Props) => {
            return <MyPageGNB size={size} color={color} focused={focused} />;
          },
          headerTitleStyle: {
            fontSize: 19,
            fontFamily: 'SpoqaHanSansNeo-Regular',
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default GlobalNavbar;
