import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  Dimensions,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Post from '../../components/Post';
import Comment, {Recomment} from '../../components/Comment';
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
import {fontMedium} from '../../common/font';
import Toast from 'react-native-simple-toast';
import {
  RectangleChecked,
  RectangleUnchecked,
} from '../../../resources/icon/CheckBox';
import CommentSendIcon from '../../../resources/icon/CommentSendIcon';

type RootStackParamList = {};
type Props = NativeStackScreenProps<RootStackParamList>;

const PostScreen = ({navigation, route}: Props) => {
  const [post, setPost] = useState<PostDto>();
  const [comments, setComments] = useState<CommentDto[]>();
  const [isRecomment, setIsRecomment] = useState<boolean>(false);
  const [parentId, setParentId] = useState<number>();
  const [newComment, setNewComment] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const commentInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const onSubmit = useCallback(() => {
    console.log('익명여부', isAnonymous);
    if (isRecomment)
      addRecommentFunc(route.params.postId, parentId, newComment, isAnonymous);
    else addCommentFunc(route.params.postId, newComment, isAnonymous);
  }, [newComment]);

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTintColor: '#000000',
      headerTitle: () => <HeaderTitle />,
    });
  }, [navigation, post?.boardName]);

  const HeaderTitle = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={[fontMedium, {fontSize: 17}]} numberOfLines={1}>
          [
          {post && post?.boardName.length <= 5
            ? post?.boardName
            : post?.boardName.substr(0, 5).concat('...')}
          ]의 게시글
        </Text>
      </View>
    );
  };

  // 초기화
  useEffect(() => {
    async function init() {
      const postData = await getPosts(route.params.postId);
      if (postData.code === 'BOARD_ALREADY_BLIND') {
        Toast.show('시스템에 의해 블라인드된 게시판입니다.', Toast.SHORT);
        navigation.goBack();
      } else if (
        postData.code === 'POST_NOT_FOUND' ||
        postData.code === 'POST_ALREADY_DELETED'
      ) {
        Toast.show('작성자에 의해 삭제된 게시글입니다.', Toast.SHORT);
        navigation.goBack();
      } else setPost(postData);
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
    const postData = await getPosts(route.params.postId);
    setPost(postData);
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
      scrollViewRef.current?.scrollToEnd({animated: true})
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
  // 댓글창 포커스
  const focusCommentInput = () => {
    commentInputRef.current?.focus();
  }
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
    const result = await reportComment(recommentId, reasonId, detail);
    const commentData = await getComments(route.params.postId, 0);
    return result;
  };
  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={60}
        behavior={Platform.select({ios: 'padding'})}
        style={{flex: 1}}>
        <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}} ref={scrollViewRef}>
          <Post
            post={post}
            handlePostLike={handlePostLike}
            handlePostScrap={handlePostScrap}
            handlePostDelete={handlePostDelete}
            handlePostReport={handlePostReport}></Post>
          <View style={{flex: 1}}>
            {comments?.map((comment, index) => (
              <View key={index}>
                <Comment
                  comment={comment}
                  setParentId={setParentId}
                  handleCommentLike={handleCommentLike}
                  isRecomment={isRecomment}
                  setIsRecomment={setIsRecomment}
                  handleCommentDelete={handleCommentDelete}
                  handleCommentReport={handleCommentReport}
                  handleFocus={focusCommentInput}
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
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 5,
              paddingBottom: Platform.OS === 'ios' ? 40 : 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: 83,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{marginRight: 5}}>익명</Text>
              <Pressable
                hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
                onPress={() => setIsAnonymous(!isAnonymous)}>
                {isAnonymous ? <RectangleChecked /> : <RectangleUnchecked />}
              </Pressable>
            </View>
            <View
              style={[
                styles.inputBox,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <TextInput
                ref={commentInputRef}
                placeholder="댓글을 입력해 주세요."
                placeholderTextColor="#87919B"
                multiline={true}
                onChangeText={value => {
                  setNewComment(value);
                  if (value.length === 500)
                    Toast.show(
                      '댓글 내용은 500글자까지만 입력 가능합니다.',
                      Toast.SHORT,
                    );
                }}
                value={newComment}
                autoCorrect={false}
                style={[styles.input]}
                maxLength={500}
              />
              <View
                style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
                <Text>
                  {newComment && (
                    <Pressable
                      style={{
                        paddingBottom: Platform.OS === 'ios' ? 3 : 5,
                        bottom: 0,
                      }}
                      onPress={() => {
                        onSubmit();
                      }}>
                      <CommentSendIcon />
                    </Pressable>
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
export default PostScreen;

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: '#F2F2F2',
    width: Dimensions.get('window').width - 90,
    borderRadius: 25,
    paddingLeft: 14,
    paddingRight: 5,
  },
  input: {
    fontSize: 13,
    width: Dimensions.get('window').width - 150,
    paddingVertical: 5,
    paddingTop: Platform.OS == 'ios' ? 13 : 0,
    minHeight: 44,
    maxHeight: 230,
    color: '#222222'
  },
});
