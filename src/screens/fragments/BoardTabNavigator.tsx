import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ElectroDisplayTab from '../board/ElectroDisplayTab';
import MyActivityTab from '../board/MyActivityTab';
import BoardTabIcon from '../../../resources/icon/BoardTabIcon';
import HomeTabIcon from '../../../resources/icon/HomeTabIcon';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import BoardFragment from '../../screens/fragments/BoardFragment';

const Tab = createMaterialTopTabNavigator();

const BoardTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        height: 44,
      },
      tabBarShowLabel: true,
      tabBarInactiveTintColor: '#CECFD6',
      tabBarActiveTintColor: '#222222',
      tabBarIndicatorStyle: {
        backgroundColor: '#A055FF',
        height: 3,
      },
      tabBarLabelStyle: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
      },
    }}>
    <Tab.Screen
      name="BoardFragment"
      component={BoardFragment}
      options={{
        tabBarLabel: '게시판',
      }}
    />
    <Tab.Screen
      name="ElectroDisplayTab"
      component={ElectroDisplayTab}
      options={{
        tabBarLabel: '전광판',
      }}
    />
    <Tab.Screen
      name="MyActivityTab"
      component={MyActivityTab}
      options={{
        tabBarLabel: '내 활동',
      }}
    />
  </Tab.Navigator>
);

export default BoardTabNavigator;
