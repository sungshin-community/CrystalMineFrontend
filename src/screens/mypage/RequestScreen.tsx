import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

function RequestScreen() {
  return (
    <View>
      <Text>문의 내용</Text>
      <Text>2022.02.05.</Text>
      <TextInput placeholder="문의 내용을 입력해주세요." />
      <Text>이미지</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default RequestScreen;
