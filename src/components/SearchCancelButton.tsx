import React from 'react';
import {Platform, Pressable, StyleSheet, Text} from 'react-native';
import { fontRegular } from '../common/font';

const styles = StyleSheet.create({
  cancel: {
    fontFamily: 'SpoqaHanSansNeo-Regular',
    fontSize: 17,
    paddingLeft: 15,
    paddingRight: 5,
    marginTop: Platform.OS === 'android' ? 10 : 0,
  },
});

interface Props {
  onPress: () => void;
}

function SearchCancelButton({onPress}: Props) {
  return (
    <Pressable onPress={onPress}>
      <Text style={[fontRegular, styles.cancel]}>닫기</Text>
    </Pressable>
  );
}

export default SearchCancelButton;
