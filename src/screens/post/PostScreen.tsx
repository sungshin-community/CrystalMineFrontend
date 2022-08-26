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
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
  KeyboardEvent,
  Keyboard,
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
  setUserMute,
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
import {LogBox} from 'react-native';
import WaterMark from '../../components/WaterMark';
import BackButtonIcon from '../../../resources/icon/BackButtonIcon';
import getCommments from '../../common/CommentApi';
import {ModalBottom} from '../../components/ModalBottom';
import {getHundredsDigit} from '../../common/util/statusUtil';
import {logout} from '../../common/authApi';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
type RootStackParamList = {};
type Props = NativeStackScreenProps<RootStackParamList>;

const PostScreen = ({navigation, route}: Props) => {
  console.reportErrorsAsExceptions = false;
  const [post, setPost] = useState<PostDto>();
  const [comments, setComments] = useState<CommentDto[]>();
  const [isRecomment, setIsRecomment] = useState<boolean>(false);
  const [parentId, setParentId] = useState<number>();
  const [newComment, setNewComment] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const commentInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const flatListRef = useRef<FlatList>(null);
  const [componentModalVisible, setComponentModalVisible] = useState<boolean>(
    false,
  );
  const [isSubmitState, setIsSubmitState] = useState<boolean>(false);
  const [goBackWarning, setGoBackWarning] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onSubmit = useCallback(() => {
    console.log('익명여부', isAnonymous);
    if (isRecomment)
      addRecommentFunc(route.params.postId, parentId, newComment, isAnonymous);
    else addCommentFunc(route.params.postId, newComment, isAnonymous);
    setIsSubmitState(false);
  }, [newComment]);

  useEffect(() => {
    console.log('isSubmitState', isSubmitState, 'isAnonymous', isAnonymous);
    if (isSubmitState) {
      if (isRecomment)
        addRecommentFunc(
          route.params.postId,
          parentId,
          newComment,
          isAnonymous,
        );
      else {
        addCommentFunc(route.params.postId, newComment, isAnonymous);
      }
      setIsSubmitState(false);
    }
  }, [isAnonymous, isSubmitState, newComment]);

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTintColor: '#000000',
      headerTitle: () => <HeaderTitle />,
      headerLeft: () => (
        <TouchableHighlight
          underlayColor="#EEEEEE"
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            if (newComment.length >= 1) setGoBackWarning(true);
            else {
              navigation.goBack();
            }
          }}>
          <BackButtonIcon />
        </TouchableHighlight>
      ),
    });
  }, [navigation, post?.boardName, newComment]);

  const HeaderTitle = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={[fontMedium, {fontSize: 17}]} numberOfLines={1}>
          [
          {post && post?.boardName.length <= 5
            ? post?.boardName
            : post?.boardName.substring(0, 5).concat('...')}
          ]의 게시글
        </Text>
      </View>
    );
  };

  // 초기화
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      const postData = await getPosts(route.params.postId);
      if (postData.code === 'BOARD_ALREADY_BLIND') {
        setTimeout(function () {
          Toast.show('시스템에 의해 블라인드된 게시판입니다.', Toast.SHORT);
        }, 100);
        navigation.goBack();
      } else if (
        postData.code === 'POST_NOT_FOUND' ||
        postData.code === 'POST_ALREADY_DELETED'
      ) {
        setTimeout(function () {
          Toast.show('작성자에 의해 삭제된 게시글입니다.', Toast.SHORT);
        }, 100);
        navigation.goBack();
      } else setPost(postData);
      const commentData = await getComments(route.params.postId);
      setComments(commentData);
      setIsLoading(false);
    }
    init();
  }, [componentModalVisible]);
  // 게시글 공감
  const handlePostLike = async (postId: number) => {
    const result = await setPostLike(postId);
    const postData = await getPosts(route.params.postId);
    setPost(postData);
    // const commentData = await getComments(route.params.postId);
    // setComments(commentData);
  };
  // 게시글 스크랩
  const handlePostScrap = async (postId: number) => {
    const result = await setPostScrap(postId);
    const postData = await getPosts(route.params.postId);
    setPost(postData);
    // const commentData = await getComments(route.params.postId);
    // setComments(commentData);
  };
  // 게시글 삭제
  const handlePostDelete = async (postId: number) => {
    const result = await deletePosts(postId);
    if (result) return true;
    else return false;
  };
  // 이용자 차단, 이용자 뮤트
  const handleMuteUser = async (postId: number) => {
    const result = await setUserMute(postId);
    if (result) return true;
    else return false;
  }
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
      setIsLoading(true);
      const response = await addComment(postId, newComment, isAnonymous);
      if (response.status === 401) {
        setTimeout(function () {
          Toast.show(
            '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
            Toast.SHORT,
          );
        }, 100);
        logout();
        navigation.reset({routes: [{name: 'SplashHome'}]});
      } else if (getHundredsDigit(response.status) === 2) {
        setNewComment('');
        const postData = await getPosts(route.params.postId);
        setPost(postData);
        const commentData = await getComments(route.params.postId);
        setComments(commentData);
        scrollViewRef.current?.scrollToEnd({animated: true});
      } else {
        setTimeout(function () {
          Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
        }, 100);
      }
      setIsLoading(false);
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
      setIsLoading(true);
      const response = await addRecomment(
        postId,
        parentId,
        newComment,
        isAnonymous,
      );
      setIsLoading(false);
      if (response.status === 401) {
        setTimeout(function () {
          Toast.show(
            '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
            Toast.SHORT,
          );
        }, 100);
        logout();
        navigation.reset({routes: [{name: 'SplashHome'}]});
      } else if (getHundredsDigit(response.status) === 2) {
        console.log('대댓글 추가 성공');
        setIsRecomment(false);
        setNewComment('');
        const postData = await getPosts(route.params.postId);
        setPost(postData);
        const commentData = await getComments(route.params.postId);
        setComments(commentData);
        const index = comments?.findIndex(c => c.id === parentId);
        flatListRef.current?.scrollToIndex({
          index: index,
          animated: true,
          viewPosition: 0,
        });
      } else {
        setTimeout(function () {
          Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
        }, 100);
      }
    },
    [],
  );
  // 댓글창 포커스
  const focusCommentInput = () => {
    commentInputRef.current?.focus();
  };
  // 댓글, 대댓글 공감
  const handleCommentLike = async (commentId: number) => {
    const result = await setCommentLike(commentId);
    const postData = await getPosts(route.params.postId);
    setPost(postData);
    const commentData = await getComments(route.params.postId);
    setComments(commentData);
  };
  // 댓글, 대댓글 삭제
  const handleCommentDelete = async (commentId: number) => {
    const result = await deleteComment(commentId);
    const postData = await getPosts(route.params.postId);
    setPost(postData);
    const commentData = await getComments(route.params.postId);
    setComments(commentData);
  };
  // 댓글, 대댓글 신고
  const handleCommentReport = async (
    recommentId: number,
    reasonId: number,
    detail?: string,
  ) => {
    const result = await reportComment(recommentId, reasonId, detail);
    const commentData = await getComments(route.params.postId);
    setComments(commentData);
    return result;
  };

  const onKeyboardDidshow = (e: KeyboardEvent) => {
    setKeyboardHeight(e.endCoordinates.height);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidshow,
    );
    return () => {
      showSubscription.remove();
    };
  }, []);
  const onInputFocus = () => {
    setIsFocused(true);
  };
  const onInputFocusOut = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  return (
    <>
      {componentModalVisible ? (
        <View
          style={{
            position: 'absolute',
            flex: 1,
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 100,
            elevation: 1,
          }}
        />
      ) : null}
      <KeyboardAvoidingView style={{flex: 1}}>
        <WaterMark />
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}>
          <ActivityIndicator
            size="large"
            color={'#A055FF'}
            animating={isLoading}
            style={{zIndex: 100}}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          style={{flex: 1, backgroundColor: '#FFFFFF'}}
          ref={scrollViewRef}>
          <Post
            post={post}
            handlePostLike={handlePostLike}
            handlePostScrap={handlePostScrap}
            handlePostDelete={handlePostDelete}
            handleMuteUser={handleMuteUser}
            handlePostReport={handlePostReport}
            componentModalVisible={componentModalVisible}
            setComponentModalVisible={setComponentModalVisible}></Post>
          <View style={{flex: 1}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{flex: 1}}
              ref={flatListRef}
              data={comments}
              renderItem={({item, index}) => (
                <View key={index}>
                  <Comment
                    comment={item}
                    setParentId={setParentId}
                    handleCommentLike={handleCommentLike}
                    isRecomment={isRecomment}
                    setIsRecomment={setIsRecomment}
                    handleCommentDelete={handleCommentDelete}
                    handleCommentReport={handleCommentReport}
                    handleFocus={focusCommentInput}
                    componentModalVisible={componentModalVisible}
                    setComponentModalVisible={setComponentModalVisible}
                  />
                  {item.recomments &&
                    item.recomments.map((recomment, index) => (
                      <Recomment
                        key={index}
                        recomment={recomment}
                        handleCommentLike={handleCommentLike}
                        handleCommentDelete={handleCommentDelete}
                        handleCommentReport={handleCommentReport}
                        componentModalVisible={componentModalVisible}
                        setComponentModalVisible={setComponentModalVisible}
                      />
                      //recomment 데이터 생긴 후 확인 필요
                    ))}
                </View>
              )}
              ItemSeparatorComponent={() => (
                <View style={{height: 1, backgroundColor: '#F0F0F0'}}></View>
              )}
            />
            {/* {comments?.map((comment, index) => (
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
            ))} */}
          </View>
        </ScrollView>
        <View
          style={{
            backgroundColor: '#fff',
            paddingBottom: isFocused
              ? Platform.OS == 'ios'
                ? keyboardHeight
                : 0
              : Platform.OS === 'ios'
              ? 20
              : 0,
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 5,
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
                onPress={() => {
                  setIsAnonymous(isAnonymous => !isAnonymous);
                }}>
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
                onFocus={(e: any) => {
                  onInputFocus();
                }}
                onBlur={(e: any) => {
                  onInputFocusOut();
                  setIsRecomment(false);
                }}
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
                        setIsSubmitState(true);
                        console.log(isSubmitState);
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
      <ModalBottom
        modalVisible={goBackWarning}
        setModalVisible={setGoBackWarning}
        content={`작성한 댓글이 삭제됩니다.\n뒤로 가시겠습니까?`}
        isContentCenter={true}
        purpleButtonText="확인"
        purpleButtonFunc={() => {
          setGoBackWarning(!goBackWarning);
          navigation.goBack();
        }}
        whiteButtonText="취소"
        whiteButtonFunc={() => {
          setGoBackWarning(!goBackWarning);
        }}
      />
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
    color: '#222222',
  },
});
