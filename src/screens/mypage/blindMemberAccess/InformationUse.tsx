import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Markdown, {renderRules} from 'react-native-markdown-display';
import {
  getAgreements,
  getAllAgreements,
  getDirectionAgreements,
} from '../../../common/authApi';
import Agreement, {
  AgreementAll,
  DirectionAgreement,
} from '../../../classes/Agreement';
import { fontRegular } from '../../../common/font';

const Tab = createMaterialTopTabNavigator();

function InformationUse() {
  const [agreements, setAgreements] = useState<AgreementAll>();
  const [directionUse, setDirectionUse] = useState<string>('');
  const [termService, setTermService] = useState<string>('');
  const [privacyPolicy, setPrivacyPolicy] = useState<string>('');

  useEffect(() => {
    async function getInfo() {
      const agreements = await getAllAgreements();
      setAgreements(agreements);
    }
    getInfo();
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 5},
          shadowRadius: 20,
          margin: 0
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
      initialLayout={{width: Dimensions.get('window').width}}>
      {/* TODO: 확정나고 변경 */}
      <Tab.Screen
        name="이용 방향"
        children={() => (
          <View style={{paddingHorizontal: 24, paddingVertical: 20, flex: 1, backgroundColor: '#fff' }}>
            <Markdown>{agreements ? agreements?.direction[0].content: ''}</Markdown>
          </View>
        )}
      />
      <Tab.Screen
        name="이용약관"
        children={() => (
          <View style={{paddingHorizontal: 24, paddingVertical: 20, flex: 1, backgroundColor: '#fff' }}>
            <Markdown>{agreements ? agreements?.agreement[0].content: ''}</Markdown>
          </View>
        )}
      />
      <Tab.Screen
        name={`개인정보\n처리방침`}
        children={() => (
          <View style={{ paddingHorizontal: 24, paddingVertical: 20, flex: 1, backgroundColor: '#fff' }}>
              <Markdown>{agreements ? agreements?.agreement[1].content: ''}</Markdown>
          </View>
        )}
      />
      {/* <Tab.Screen name="태그" component={TagSearchResult} /> */}
    </Tab.Navigator>
  );
}

export default InformationUse;
