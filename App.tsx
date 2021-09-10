import React from 'react';
import styled from 'styled-components/native';
import {BigOneLineText, BigTwoLineText, NormalOneLineText, Description} from './src/components/top';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Button,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  StatusBar.setBackgroundColor("white");
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
     
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>
          <BigOneLineText>정회원 인증을 {"\n"}이어서 진행하시겠어요?</BigOneLineText>
          <Description>가입 후 24시간 이내에 인증하지 않을 시{"\n"}
            보안을 위해 계정 정보가 삭제됩니다.</Description>
          </Text>
          
 
    
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
