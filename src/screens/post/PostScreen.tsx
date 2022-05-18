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
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Post from '../../components/Post';
import Comment, { CommentReply } from '../../components/Comment';
import InputComment from '../../components/InputComment';
import PostDto from '../../classes/PostDto';
import { getPost } from '../../common/boardApi';
type RootStackParamList = {
};
type Props = NativeStackScreenProps<RootStackParamList>;
const PostScreen = ({navigation, route}: Props) => {
  const [post, setPost] = useState<PostDto>();

  useEffect(() => {
    async function init() {
      const data = await getPost(route.params.postId);
      setPost(data);
    }
    init();
  }, []);
  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={60}
        behavior={Platform.select({ios: 'padding'})}
        style={{flex: 1}}>
        <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <Post post={post}></Post>
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
