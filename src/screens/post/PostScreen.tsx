import React, {useEffect, useState, useRef} from 'react';
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
import {
  deleteComment,
  deletePosts,
  getComments,
  getPosts,
  reportPost,
  setPostLike,
  setPostScrap,
} from '../../common/boardApi';
import {addComment, addRecomment, reportComment} from '../../common/boardApi';
import CommentDto from '../../classes/CommentDto';
import {useCallback} from 'react';
import {setCommentLike} from '../../common/boardApi';
type RootStackParamList = {};
type Props = NativeStackScreenProps<RootStackParamList>;

const PostScreen = ({navigation, route}: Props) => {
  const [post, setPost] = useState<PostDto>();
  const [comments, setComments] = useState<CommentDto[]>();
  const [isRecomment, setIsRecomment] = useState<boolean>(false);
  const [parentId, setParentId] = useState<number>();
  const [newComment, setNewComment] = useState<string>('');
  const inputRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      title: post?.boardName,
      headerTitleAlign: 'center',
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontSize: 15,
        fontFamily: 'SpoqaHanSansNeo-Medium',
      },
    });
  }, [navigation, post?.boardName]);

  // 초기화
  useEffect(() => {
    async function init() {
      const postData = await getPosts(route.params.postId);
      setPost(postData);
      const commentData = await getComments(route.params.postId, 0);
      setComments(commentData);
    }
    init();
  }, []);
  // 게시글 공감
  const handlePostLike = async (postId: number) => {
    const result = await setPostLike(postId);
    const postData = await getPosts(route.params.postId);
    setPost(postData);
    const commentData = await getComments(route.params.postId, 0);
    setComments(commentData);
  };
  // 게시글 스크랩
  const handlePostScrap = async (postId: number) => {
    const result = await setPostScrap(postId);
    const postData = await getPosts(route.params.postId);
    setPost(postData);
    const commentData = await getComments(route.params.postId, 0);
    setComments(commentData);
  };
  // 게시글 삭제
  const handlePostDelete = async (postId: number) => {
    const result = await deletePosts(postId);
    if (result) return true;
    else return false;
  };
  // 게시글 신고
  const handlePostReport = async (
    postId: number,
    reasonId: number,
    detail?: string,
  ) => {
    const result = await reportPost(postId, reasonId, detail);
    return result;
  };
  // 댓글 생성
  const addCommentFunc = useCallback(
    async (postId: number, newComment: string, isAnonymous: boolean) => {
      const result = await addComment(postId, newComment, isAnonymous);
      if (result) {
        console.log('댓글 추가 성공');
      }
      setNewComment('');
      const postData = await getPosts(route.params.postId);
      setPost(postData);
      const commentData = await getComments(route.params.postId, 0);
      setComments(commentData);
    },
    [],
  );
  // 대댓글 생성
  const addRecommentFunc = useCallback(
    async (
      postId: number,
      parentId: number,
      newComment: string,
      isAnonymous: boolean,
    ) => {
      const result = await addRecomment(
        postId,
        parentId,
        newComment,
        isAnonymous,
      );
      if (result) {
        console.log('대댓글 추가 성공');
      }
      setIsRecomment(false);
      setNewComment('');
      const postData = await getPosts(route.params.postId);
      setPost(postData);
      const commentData = await getComments(route.params.postId, 0);
      setComments(commentData);
    },
    [],
  );
  // 댓글, 대댓글 공감
  const handleCommentLike = async (commentId: number) => {
    const result = await setCommentLike(commentId);
    const postData = await getPosts(route.params.postId);
    setPost(postData);
    const commentData = await getComments(route.params.postId, 0);
    setComments(commentData);
  };
  // 댓글, 대댓글 삭제
  const handleCommentDelete = async (commentId: number) => {
    const result = await deleteComment(commentId);
    const postData = await getPosts(route.params.postId);
    setPost(postData);
    const commentData = await getComments(route.params.postId, 0);
    setComments(commentData);
  };
  // 댓글, 대댓글 신고
  const handleCommentReport = async (
    recommentId: number,
    reasonId: number,
    detail?: string,
  ) => {
    console.log('김횬')
    const result = await reportComment(recommentId, reasonId, detail);
    const commentData = await getComments(route.params.postId, 0);
    setComments(commentData);
    console.log('여긴 하나', result.code);
    return result.code;
  };
  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={60}
        behavior={Platform.select({ios: 'padding'})}
        style={{flex: 1}}>
        <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <Post
            post={post}
            handlePostLike={handlePostLike}
            handlePostScrap={handlePostScrap}
            handlePostDelete={handlePostDelete}
            handlePostReport={handlePostReport}
            boardId={route.params.boardId}></Post>
          <View style={{flex: 1}}>
            {comments?.map((comment, index) => (
              <View key={index}>
                <Comment
                  comment={comment}
                  setParentId={setParentId}
                  handleCommentLike={handleCommentLike}
                  isRecomment={isRecomment}
                  setIsRecomment={setIsRecomment}
                  inputRef={inputRef}
                  handleCommentDelete={handleCommentDelete}
                  handleCommentReport={handleCommentReport}
                />
                {comment.recomments &&
                  comment.recomments.map((recomment, index) => (
                    <Recomment
                      key={index}
                      recomment={recomment}
                      handleCommentLike={handleCommentLike}
                      handleCommentDelete={handleCommentDelete}
                      handleCommentReport={handleCommentReport}
                    />
                    //recomment 데이터 생긴 후 확인 필요
                  ))}
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={{backgroundColor: '#fff'}}>
          <InputComment
            postId={route.params.postId}
            parentId={parentId}
            onClickAddComment={addCommentFunc}
            isRecomment={isRecomment}
            onClickAddRecomment={addRecommentFunc}
            content={newComment}
            setContent={setNewComment}
            inputRef={inputRef}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
export default PostScreen;

const styles = StyleSheet.create({});
