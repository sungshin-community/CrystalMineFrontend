import React from 'react';
import {Text, StyleSheet, Dimensions} from 'react-native';
import {View} from 'react-native-animatable';

const MessageScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.post}>
        <Text style={styles.postTitle}>일상게시판</Text>
        <Text
        ellipsizeMode={'tail'}
        numberOfLines={1} 
        style={styles.postContent}>
          수정이들 빨리 들어와봐 대박이야 안 보면어쩌고저쩌고
        </Text>
      </View>
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  post: {
    paddingHorizontal: 12,
    paddingVertical: 13,
    borderColor: '#CECFD6',
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 24,
    flexDirection: 'row',
  },
  postTitle: {
    color: '#3A424E',
    fontSize: 12,
    fontWeight: '500',
    marginRight: 12,
    lineHeight: 16,
  },
  postContent: {
    width: Dimensions.get('window').width - 170,
    color: '#6E7882',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
});
