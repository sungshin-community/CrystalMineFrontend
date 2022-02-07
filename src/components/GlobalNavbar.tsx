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
import {Dimensions, Pressable} from 'react-native';
import Toast from 'react-native-simple-toast';
import {checkRegularMember} from '../common/authApi';

const Tab = createBottomTabNavigator();

interface Props {
  size: number;
  color: string;
  focused: boolean;
}
type RootStackParamList = {
  BoardSearch: undefined;
};
type ScreenProps = NativeStackScreenProps<RootStackParamList>;

function GlobalNavbar({navigation}: ScreenProps) {
  const onSearchPress = () => {
    navigation.navigate('BoardSearch');
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          width: Dimensions.get('window').width,
          height: 94,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: -2},
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3,
          paddingHorizontal: 21,
        },
        tabBarIconStyle: {
          justifyContent: 'space-between',
        },
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
            <Pressable onPress={onSearchPress}>
              <SearchIcon style={{marginRight: 19}} />
            </Pressable>
          ),
          tabBarShowLabel: false,
          tabBarInactiveTintColor: '#6E7882',
          tabBarActiveTintColor: '#A055FF',
        }}
      />
      <Tab.Screen
        name="Board"
        component={BoardFragment}
        listeners={({navigation}) => ({
          tabPress: async e => {
            e.preventDefault();
            let isRegularMember: boolean = await checkRegularMember();
            console.log('정회원 인증여부:', isRegularMember);
            if (isRegularMember) navigation.navigate('Board');
            else Toast.show('접근 권한이 없습니다.', Toast.LONG);
          },
        })}
        options={{
          title: '게시판',
          headerTitleAlign: 'center',
          tabBarIcon: ({size, color, focused}: Props) => {
            return <BoardTabIcon size={size} color={color} focused={focused} />;
          },
          headerRight: () => (
            <Pressable onPress={onSearchPress}>
              <SearchIcon style={{marginRight: 19}} />
            </Pressable>
          ),
          tabBarShowLabel: false,
          tabBarInactiveTintColor: '#6E7882',
          tabBarActiveTintColor: '#A055FF',
          headerTitleStyle: {
            fontSize: 17,
            fontFamily: 'SpoqaHanSansNeo-Regular',
          },
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageFragment}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color, focused}: Props) => {
            return (
              <MessageTabIcon size={size} color={color} focused={focused} />
            );
          },
          tabBarShowLabel: false,
          tabBarInactiveTintColor: '#6E7882',
          tabBarActiveTintColor: '#A055FF',
        }}
      />
      <Tab.Screen
        name="Alert"
        component={AlertFragment}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color, focused}: Props) => {
            return <AlertTabIcon size={size} color={color} focused={focused} />;
          },
          tabBarShowLabel: false,
          tabBarInactiveTintColor: '#6E7882',
          tabBarActiveTintColor: '#A055FF',
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageFragment}
        options={{
          title: '마이페이지',
          headerTitleAlign: 'center',
          tabBarIcon: ({size, color, focused}: Props) => {
            return <MyPageGNB size={size} color={color} focused={focused} />;
          },
          tabBarShowLabel: false,
          tabBarInactiveTintColor: '#6E7882',
          tabBarActiveTintColor: '#A055FF',
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: '400',
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default GlobalNavbar;
