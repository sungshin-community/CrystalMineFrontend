import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StyleSheet} from 'react-native';
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
import MenuIcon from '../../resources/icon/MenuIcon';
import {SmallLogo} from '../../resources/icon/Logo';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Platform, TouchableHighlight} from 'react-native';
import Toast from 'react-native-simple-toast';
import {checkRole, logout} from '../common/authApi';
import {useState, useEffect} from 'react';
import {getHundredsDigit} from '../common/util/statusUtil';
import messaging from '@react-native-firebase/messaging';
import {AlertData} from '../classes/AlertDto';
import {readNotificationOnPush} from '../common/pushApi';
import {getPostByComment} from '../common/boardApi';
import {CommonActions} from '@react-navigation/native';
import BackButtonIcon from '../../resources/icon/BackButtonIcon';
import {pretendard} from '../common/font';
const Tab = createBottomTabNavigator();

interface Props {
  size: number;
  color: string;
  focused: boolean;
}
type RootStackParamList = {
  BoardSearch: undefined;
  TotalSearch: undefined;
  BoardScreen: undefined;
  SplashHome: undefined;
  ErrorScreen: undefined;
  PostScreen: {postId: number};
  MessageScreen: {roomId: number};
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
    } else if (data.type === 'CHAT') {
      navigation.navigate('MessageScreen', {roomId: Number(data.contentId)});
    }
    if (
      data.type !== 'BEFORE_EXPIRE' &&
      data.type !== 'EXPIRE' &&
      data.type !== 'NOT_AUTHENTICATED'
    ) {
      const response = await readNotificationOnPush(data);
      console.log(response);
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

  const onMenuIcon = async () => {
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
        navigation.navigate('BoardScreen');
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

  // 글씨 색상 결정 함수
  const getTextColor = (color: string) => {
    if (color === '#E2E4E8') {
      return '#6E7882'; // 비활성 색상일 때 글씨 색상
    }
    return color; // 활성 색상일 때 글씨 색상
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: Platform.OS === 'android' ? 78 : 112,
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
        tabBarInactiveTintColor: '#E2E4E8',
        tabBarActiveTintColor: '#A055FF',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeFragment}
        options={{
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              <SmallLogo />
              <Text
                style={
                  (pretendard,
                  {
                    marginLeft: 10,
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'left',
                    color: '#A055FF',
                  })
                }>
                수정광산
              </Text>
            </View>
          ),
          headerTitleAlign: 'left',
          tabBarIcon: ({size, color, focused}: Props) => {
            return (
              <View style={styles.iconContainer}>
                <View style={styles.icon}>
                  <HomeTabIcon size={size} color={color} focused={focused} />
                </View>
                <Text
                  style={[styles.tabIconText, {color: getTextColor(color)}]}>
                  광산
                </Text>
              </View>
            );
          },
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 11,
              }}>
              <TouchableHighlight
                style={{
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                underlayColor="#EEEEEE"
                onPress={onSearchPress}>
                <SearchIcon />
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                  marginRight: 13,
                }}
                underlayColor="#EEEEEE"
                onPress={onMenuIcon}>
                <MenuIcon />
              </TouchableHighlight>
            </View>
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
            return (
              <View style={styles.iconContainer}>
                <View style={styles.icon}>
                  <BoardTabIcon size={size} color={color} focused={focused} />
                </View>
                <Text
                  style={[styles.tabIconText, {color: getTextColor(color)}]}>
                  수정구
                </Text>
              </View>
            );
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
              <View style={styles.iconContainer}>
                <View style={styles.icon}>
                  <MessageTabIcon size={size} color={color} focused={focused} />
                </View>
                <Text
                  style={[styles.tabIconText, {color: getTextColor(color)}]}>
                  대화
                </Text>
              </View>
            );
          },
          headerLeft: () => (
            <TouchableHighlight
              underlayColor="#EEEEEE"
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => navigation.dispatch(CommonActions.goBack())}>
              <BackButtonIcon />
            </TouchableHighlight>
          ),
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
            return (
              <View style={styles.iconContainer}>
                <View style={styles.icon}>
                  <AlertTabIcon size={size} color={color} focused={focused} />
                </View>
                <Text
                  style={[styles.tabIconText, {color: getTextColor(color)}]}>
                  알림
                </Text>
              </View>
            );
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
            return (
              <View style={styles.iconContainer}>
                <View style={styles.icon}>
                  <MyPageGNB size={size} color={color} focused={focused} />
                </View>
                <Text
                  style={[styles.tabIconText, {color: getTextColor(color)}]}>
                  MY
                </Text>
              </View>
            );
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

const styles = StyleSheet.create({
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
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    bottom: 10,
  },
});

export default GlobalNavbar;
