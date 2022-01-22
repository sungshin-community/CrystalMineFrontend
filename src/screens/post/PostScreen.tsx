import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Post from '../../components/Post';
const PostScreen = () => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Post></Post>
    </ScrollView>
  );
};
export default PostScreen;

const styles = StyleSheet.create({});
export interface Post {}
