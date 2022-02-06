import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Post from '../../components/Post';
import Comment, { CommentReply } from '../../components/Comment';
import InputComment from '../../components/InputComment';
import BackButton from '../../components/BackButton';
import {CommonActions} from '@react-navigation/native';

const PostScreen = ({navigation}: any) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: (): React.ReactNode => (
        <BackButton
          onPress={() => navigation.dispatch(CommonActions.goBack())}
        />
      ),
    });
  }, [navigation]);
  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={Platform.select({ios: 'padding'})}
        style={{flex: 1}}>
        <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <Post></Post>
          <View style={{flex: 1}}>
            <Comment></Comment>
            <Comment></Comment>
           <CommentReply></CommentReply>
          </View>
        </ScrollView>
        <View style={{backgroundColor: '#fff'}}>
          <InputComment />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
export default PostScreen;

const styles = StyleSheet.create({});
