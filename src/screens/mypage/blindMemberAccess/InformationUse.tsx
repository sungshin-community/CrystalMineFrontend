import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dimensions, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Markdown from 'react-native-markdown-display';
import { getAgreements, getDirectionAgreements } from '../../../common/authApi';
import Agreement, { DirectionAgreement } from '../../../classes/Agreement';

const Tab = createMaterialTopTabNavigator();

function InformationUse() {
  const [directionUse, setDirectionUse] = useState<DirectionAgreement[]>();
  const [termService, setTermService] = useState<Agreement[]>();
  const [privacyPolicy, setPrivacyPolicy] = useState<string>('');

  useEffect(() => {
     async function getInfo() {
       const direction = await getDirectionAgreements();
       const term = await getAgreements();
       setDirectionUse(direction);
       setTermService(term);
     }
    getInfo();
  })
  return (
    <Tab.Navigator
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
          marginHorizontal: 53,
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
      initialLayout={{ width: Dimensions.get('window').width }}>
      {/* TODO: 확정나고 변경 */}
      <Tab.Screen
        name="이용 방향"
        children={() => <View style={{ paddingHorizontal: 24, paddingVertical: 20 }}><Text>ㅇㅇ</Text></View>}
      />
      <Tab.Screen
        name="이용약관"
        children={() => <Text>sdfsdf</Text>}
      />
      <Tab.Screen
        name="개인정보 처리방침"
        children={() => <Text>sdfsdf</Text>}
      />
      {/* <Tab.Screen name="태그" component={TagSearchResult} /> */}
    </Tab.Navigator>
  );
}

export default InformationUse;
