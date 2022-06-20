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
import Comment, {Recomment} from '../../components/Comment';
import InputComment from '../../components/InputComment';
import PostDto from '../../classes/PostDto';
import {getComments, getPosts} from '../../common/boardApi';
import {addComment} from '../../common/boardApi';
import CommentDto from '../../classes/CommentDto';
import {useCallback} from 'react';
import {setCommentLike} from '../../common/boardApi';

type RootStackParamList = {};
type Props = NativeStackScreenProps<RootStackParamList>;

const PostScreen = ({navigation, route}: Props) => {
  const [post, setPost] = useState<PostDto>();
  const [comments, setComments] = useState<CommentDto[]>();

  useEffect(() => {
    navigation.setOptions({
      title: post?.boardName,
      headerTitleAlign: 'center',
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontSize: 19,
        fontFamily: 'SpoqaHanSansNeo-Medium',
      },
    });
  }, [navigation, post?.boardName]);

  const addCommentFunc = useCallback(
    async (postId: number, newComment: string, isAnonymous: boolean) => {
      const result = await addComment(postId, newComment, isAnonymous);
      if (result) {
        console.log('댓글 추가 성공');
      }
      const postData = await getPosts(route.params.postId);
      setPost(postData);
      const commentData = await getComments(route.params.postId, 0);
      setComments(commentData);
    },
    [],
    );

  useEffect(() => {
    async function init() {
      const postData = await getPosts(route.params.postId);
      setPost(postData);
      const commentData = await getComments(route.params.postId, 0);
      setComments(commentData);
    }
    init();
  }, []);

  const handleCommentLike = async (commentId: number) => {
    const result = await setCommentLike(commentId);
    const postData = await getPosts(route.params.postId);
    setPost(postData);
    const commentData = await getComments(route.params.postId, 0);
    setComments(commentData);
  };


  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={60}
        behavior={Platform.select({ios: 'padding'})}
        style={{flex: 1}}>
        <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <Post post={post}></Post>
          <View style={{flex: 1}}>
            {comments?.map((comment, index) => (
              <View key={index}>
                <Comment
                  comment={comment}
                  handleCommentLike={handleCommentLike}
                />
                {comment.recomments &&
                  comment.recomments.map((recomment, index) => (
                    <Recomment key={index} recomment={recomment} />
                    //recomment 데이터 생긴 후 확인 필요
                  ))}
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={{backgroundColor: '#fff'}}>
          <InputComment postId={route.params.postId} onClick={addCommentFunc} />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
export default PostScreen;

const styles = StyleSheet.create({});
