import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
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
import { getContractGuide } from '../../../common/contractApi';

const Tab = createMaterialTopTabNavigator();

function InformationUse() {
  const [agreements, setAgreements] = useState<AgreementAll>();
  const [directionUse, setDirectionUse] = useState<string>('');
  const [termService, setTermService] = useState<string>('');
  const [privacyPolicy, setPrivacyPolicy] = useState<string>('');

  useEffect(() => {
    async function getInfo() {
      const agreements = await getContractGuide();
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
        name={`수정광산\n이용 방향`}
        children={() => (
          <ScrollView style={{paddingHorizontal: 24, paddingVertical: 20, flex: 1, backgroundColor: '#fff' }}>
            <Markdown>{agreements ? agreements?.direction.content : ''}</Markdown>
            <View style={{paddingVertical: 30}}/>
          </ScrollView>
        )}
      />
      <Tab.Screen
        name={`서비스\n이용약관`}
        children={() => (
          <ScrollView style={{paddingHorizontal: 24, paddingVertical: 20, flex: 1, backgroundColor: '#fff' }}>
            <Markdown>{agreements ? agreements?.agreement.content : ''}</Markdown>
            <View style={{paddingVertical: 30}}/>
          </ScrollView>
        )}
      />
      <Tab.Screen
        name={`개인정보\n처리방침`}
        children={() => (
          <ScrollView style={{ paddingHorizontal: 24, paddingVertical: 20, flex: 1, backgroundColor: '#fff' }}>
            <Markdown>{agreements ? agreements?.policy.content : ''}</Markdown>
            <View style={{paddingVertical: 30}}/>
          </ScrollView>
        )}
      />
      {/* <Tab.Screen name="태그" component={TagSearchResult} /> */}
    </Tab.Navigator>
  );
}

export default InformationUse;
