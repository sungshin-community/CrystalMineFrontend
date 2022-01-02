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
import { PurpleFullButton } from './Button';
import SearchIcon from '../../resources/icon/SearchIcon';
import {SmallLogo} from '../../resources/icon/Logo';

const Tab = createBottomTabNavigator();

interface Props {
  size: number;
  color: string;
  focused: boolean;
}

function GlobalNavbar() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{tabBarStyle: {height: 55}}}>
      <Tab.Screen
        name="Home"
        component={HomeFragment}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color, focused}: Props) => {
            return <HomeTabIcon size={size} color={color} focused={focused} />;
          },
          tabBarShowLabel: false,
          tabBarInactiveTintColor: '#6E7882',
          tabBarActiveTintColor: '#A055FF',
        }}
      />
      <Tab.Screen
        name="Board"
        component={BoardFragment}
        options={{
          title: "게시판",
          headerTitleAlign: 'center',
          tabBarIcon: ({size, color, focused}: Props) => {
            return <BoardTabIcon size={size} color={color} focused={focused} />;
          },
          headerRight: () => (
            <SearchIcon style={{marginRight: 19}} />
          ),
          tabBarShowLabel: false,
          tabBarInactiveTintColor: '#6E7882',
          tabBarActiveTintColor: '#A055FF',
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: '400'
          }
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageFragment}
        options={{
          headerTitle: () => <SmallLogo />,
          headerTitleAlign: 'center',
          tabBarIcon: ({size, color, focused}: Props) => {
            return <MessageTabIcon size={size} color={color} focused={focused} />;
          },
          headerRight: () => (
            <SearchIcon style={{marginRight: 19}} />
          ),
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
          headerShown: false,
          tabBarIcon: ({size, color, focused}: Props) => {
            return <MyPageGNB size={size} color={color} focused={focused} />;
          },
          tabBarShowLabel: false,
          tabBarInactiveTintColor: '#6E7882',
          tabBarActiveTintColor: '#A055FF',
        }}
      />
    </Tab.Navigator>
  );
}

export default GlobalNavbar;
