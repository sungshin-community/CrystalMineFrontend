import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FixDevelop from '../../../resources/icon/FixDevelop';

export default function DevelopScreen() {
  return (
    <View style={styles.container}>
      <FixDevelop />
      <Text style={styles.text}>
        수정광산 팀이{'\n'}열심히 기능을 개발하는 중이에요!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // 배경 색깔 재확인
  container: {
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#CECFD6',
  },
});
