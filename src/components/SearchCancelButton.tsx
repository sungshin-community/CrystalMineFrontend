import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  cancel: {
    fontFamily: 'SpoqaHanSansNeo-Regular',
    fontSize: 17,
    marginLeft: 15,
    marginRight: 5,
  },
});

interface Props {
  onPress: () => void;
}

function SearchCancelButton({onPress}: Props) {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.cancel}>닫기</Text>
    </Pressable>
  );
}

export default SearchCancelButton;
