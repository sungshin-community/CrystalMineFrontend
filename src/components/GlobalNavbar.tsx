import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/GNB/Home';
import Board from '../screens/GNB/Board';
import Alert from '../screens/GNB/Alert';
import Message from '../screens/GNB/Message';
import MyPage from '../screens/GNB/MyPage';

import HomeGNB from '../../resources/icon/HomeGNB';
import BoardGNB from '../../resources/icon/BoardGNB';
import AlertGNB from '../../resources/icon/AlertGNB';
import MessageGNB from '../../resources/icon/MessageGNB';
import MyPageGNB from '../../resources/icon/MypageGNB';

const Tab = createBottomTabNavigator();

interface Props {
  size: number;
  color: string;
  focused: boolean;
}

function GlobalNavbar() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color, focused}: Props) => {
            return <MessageGNB size={size} color={color} focused={focused} />;
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#A055FF',
        }}
      />
      <Tab.Screen
        name="Board"
        component={Board}
        options={{
          headerShown: false,
          tabBarIcon: ({size}: Props) => {
            return <BoardGNB size={size} />;
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#A055FF',
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({size}: Props) => {
            return <HomeGNB size={size} />;
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#A055FF',
        }}
      />
      <Tab.Screen
        name="Alert"
        component={Alert}
        options={{
          headerShown: false,
          tabBarIcon: ({size}: Props) => {
            return <AlertGNB size={size} />;
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#A055FF',
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          headerShown: false,
          tabBarIcon: ({size}: Props) => {
            return <MyPageGNB size={size} />;
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#A055FF',
        }}
      />
    </Tab.Navigator>
  );
}

export default GlobalNavbar;
