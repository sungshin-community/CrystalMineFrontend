import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import HomeScreen from '../home/HomeScreen';
const HomeFragment = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <HomeScreen />
    </SafeAreaView>
  );
};

export default HomeFragment;
