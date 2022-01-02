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
import { PurpleFullButton } from './Button';
import SearchIcon from '../../resources/icon/SearchIcon';

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
        name="Message"
        component={Message}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color, focused}: Props) => {
            return <MessageGNB size={size} color={color} focused={focused} />;
          },
          tabBarShowLabel: false,
          tabBarInactiveTintColor: '#000000',
          tabBarActiveTintColor: '#A055FF',
        }}
      />
      <Tab.Screen
        name="Board"
        component={Board}
        options={{
          title: "게시판",
          headerTitleAlign: 'center',
          tabBarIcon: ({size, color, focused}: Props) => {
            return <BoardGNB size={size} color={color} focused={focused} />;
          },
          headerRight: () => (
            <SearchIcon style={{marginRight: 19}} />
          ),
          tabBarShowLabel: false,
          tabBarInactiveTintColor: '#000000',
          tabBarActiveTintColor: '#A055FF',
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: '400'
          }
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color, focused}: Props) => {
            return <HomeGNB size={size} color={color} focused={focused} />;
          },
          tabBarShowLabel: false,
          tabBarInactiveTintColor: '#000000',
          tabBarActiveTintColor: '#A055FF',
        }}
      />
      <Tab.Screen
        name="Alert"
        component={Alert}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color, focused}: Props) => {
            return <AlertGNB size={size} color={color} focused={focused} />;
          },
          tabBarShowLabel: false,
          tabBarInactiveTintColor: '#000000',
          tabBarActiveTintColor: '#A055FF',
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color, focused}: Props) => {
            return <MyPageGNB size={size} color={color} focused={focused} />;
          },
          tabBarShowLabel: false,
          tabBarInactiveTintColor: '#000000',
          tabBarActiveTintColor: '#A055FF',
        }}
      />
    </Tab.Navigator>
  );
}

export default GlobalNavbar;
