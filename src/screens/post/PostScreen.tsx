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
import CommentDto from '../../classes/CommentDto';
type RootStackParamList = {};
type Props = NativeStackScreenProps<RootStackParamList>;
const PostScreen = ({navigation, route}: Props) => {
  const [posts, setPosts] = useState<PostDto>();
  const [comments, setComments] = useState<CommentDto[]>();

  useEffect(() => {
    async function init() {
      const data = await getPosts(route.params.postId);
      setPosts(data);
      const result = await getComments(route.params.postId, 0);
      setComments(result);
    }
    init();
  }, [setComments, setPosts]);

  useEffect(() => {
    navigation.setOptions({
      title: route.params.boardName,
      headerTitleAlign: 'center',
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontSize: 19,
        fontFamily: 'SpoqaHanSansNeo-Medium',
      },
    });
  }, [navigation]);

  const onChangeComments = () => {
    const temp = comments;
    setComments(temp);
    console.log('comment 내용 바뀜');
  };

  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={60}
        behavior={Platform.select({ios: 'padding'})}
        style={{flex: 1}}>
        <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <Post post={posts}></Post>
          <View style={{flex: 1}}>
            {comments?.map((comment, index) => (
              <View key={index}>
                <Comment comment={comment} />
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
          <InputComment
            postId={route.params.postId}
            onChange={onChangeComments}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
export default PostScreen;

const styles = StyleSheet.create({});
