import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
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
  getEmoticons,
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
import {fontMedium, fontRegular} from '../../common/font';
import Toast from 'react-native-simple-toast';
import {LogBox} from 'react-native';
import WaterMark from '../../components/WaterMark';
import BackButtonIcon from '../../../resources/icon/BackButtonIcon';
import getCommments from '../../common/CommentApi';
import {ModalBottom} from '../../components/ModalBottom';
import {getHundredsDigit} from '../../common/util/statusUtil';
import {logout} from '../../common/authApi';
import AdMob from '../../components/AdMob';
import CommentWriteContainer from '../../components/CommentWriteContainer';
import CloseIcon from '../../../resources/icon/CloseIcon';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
type RootStackParamList = {
  MessageScreen: {roomId: number};
};
type Props = NativeStackScreenProps<RootStackParamList>;

const PostScreen = ({navigation, route}: Props) => {
  console.reportErrorsAsExceptions = false;
  const [post, setPost] = useState<PostDto>();
  const [comments, setComments] = useState<CommentDto[]>();
  const [isRecomment, setIsRecomment] = useState<boolean>(false);
  const [parentId, setParentId] = useState<number>();
  const [emoticonId, setEmoticonId] = useState<number>();
  const [isContainerVisible, setIsContainerVisible] = useState(false);
  const [newComment, setNewComment] = useState<string>('');
  const [emojiClicked, setEmojiClicked] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const commentInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const flatListRef = useRef<FlatList>(null);
  const [componentModalVisible, setComponentModalVisible] =
    useState<boolean>(false);
  const [isSubmitState, setIsSubmitState] = useState<boolean>(false);
  const [goBackWarning, setGoBackWarning] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [emojiVisible, setEmojiVisible] = useState<boolean>(true);
  const [showSelectedEmoji, setShowSelectedEmoji] = useState(false);
  const [selectedEmojiId, setSelectedEmojiId] = useState<number | null>(null);

  useEffect(() => {
    console.log('isSubmitState', isSubmitState, 'isAnonymous', isAnonymous);
    if (isSubmitState) {
      if (isRecomment)
        addRecommentFunc(
          route.params.postId,
          parentId,
          newComment,
          isAnonymous,
          emoticonId,
        );
      else {
        addCommentFunc(
          route.params.postId,
          newComment,
          isAnonymous,
          emoticonId,
        );
      }
      setIsSubmitState(false);
    }
  }, [isAnonymous, isSubmitState, newComment]);

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'left',
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
          {post && post?.boardName}
          {/* [
          {post && post?.boardName.length <= 5
            ? post?.boardName
            : post?.boardName.substring(0, 5).concat('...')}
          ]의 게시글 */}
        </Text>
      </View>
    );
  };
  const getPostsFunc = async () => {
    const result = await getPosts(route.params.postId);
    if (result.status === 401) {
      setTimeout(function () {
        Toast.show(
          '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
          Toast.SHORT,
        );
      }, 100);
      logout();
      navigation.reset({routes: [{name: 'SplashHome'}]});
    } else if (getHundredsDigit(result.status) === 2) {
      setPost(result.data.data);
    } else if (result.data.code === 'BOARD_ALREADY_BLIND') {
      setTimeout(function () {
        Toast.show('블라인드된 게시판입니다.', Toast.SHORT);
      }, 100);
      navigation.goBack();
    } else if (result.data.code === 'POST_NOT_FOUND') {
      result.data;
      setTimeout(function () {
        Toast.show('삭제되었거나 블라인드된 게시글입니다.', Toast.SHORT);
      }, 100);
      navigation.goBack();
    } else if (result.data.code === 'BOARD_ALREADY_DELETED') {
      setTimeout(function () {
        Toast.show('삭제된 게시판입니다.', Toast.SHORT);
      }, 100);
      navigation.goBack();
    } else if (result.data.code === 'POST_ALREDY_BLOCK') {
      setTimeout(function () {
        Toast.show('숨김처리된 게시글입니다.', Toast.SHORT);
      }, 100);
      navigation.goBack();
    } else {
      setTimeout(function () {
        Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
      }, 100);
      navigation.goBack();
    }
  };

  // 초기화
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      getPostsFunc();
      const commentData = await getComments(route.params.postId);
      setComments(commentData);
      console.log('commentData', commentData);
      setIsLoading(false);
    }
    init();
  }, [componentModalVisible]);

  const handleEmojiIconPress = async () => {
    try {
      const emoticons = await getEmoticons();

      setEmojiVisible(prev => !prev);
      setEmojiClicked(!emojiClicked);
      console.log('emojiClicked', emojiClicked);

      if (commentInputRef.current) {
        commentInputRef.current.focus();
      }
      console.log('이모티콘 성공:', emoticons);
    } catch (error) {
      console.error('이모티콘 패치 실패', error);
      Toast.show('이모티콘 패치 실패', Toast.SHORT);
    }
  };
  // 게시글 공감
  const handlePostLike = async (postId: number) => {
    const result = await setPostLike(postId);
    getPostsFunc();
  };
  // 게시글 스크랩
  const handlePostScrap = async (postId: number) => {
    const result = await setPostScrap(postId);
    console.log('result', result);
    getPostsFunc();
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
    // if (result) return true;
    // else return false;
    return result;
  };
  // 게시글 신고
  const handlePostReport = async (
    postId: number,
    reasonId: number,
    detail?: string,
  ) => {
    const result = await reportPost(postId, reasonId, detail);
    getPostsFunc();
    return result;
  };
  // 댓글 생성
  const addCommentFunc = useCallback(
    async (
      postId: number,
      newComment: string,
      isAnonymous: boolean,
      emoticonId: number,
    ) => {
      const emojiId = selectedEmojiId;
      console.log('selectedEmojiId', selectedEmojiId);
      setIsLoading(true);
      const response = await addComment(
        postId,
        newComment,
        isAnonymous,
        emoticonId,
      );
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
        getPostsFunc();
        const commentData = await getComments(route.params.postId);
        setComments(commentData);
        console.log(commentData);
        scrollViewRef.current?.scrollToEnd({animated: true});
        setComponentModalVisible(false);
      } else {
        setTimeout(function () {
          Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
        }, 100);
      }
      setIsLoading(false);
    },
    [selectedEmojiId],
  );
  // 대댓글 생성
  const addRecommentFunc = useCallback(
    async (
      postId: number,
      parentId: number,
      newComment: string,
      isAnonymous: boolean,
      emoticonId: number,
    ) => {
      setIsLoading(true);
      const response = await addRecomment(
        postId,
        parentId,
        newComment,
        isAnonymous,
        emoticonId,
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
        getPostsFunc();
        const commentData = await getComments(route.params.postId);
        setComments(commentData);
        const index = comments?.findIndex(c => c.id === parentId);
        flatListRef.current?.scrollToIndex({
          index: index,
          animated: true,
          viewPosition: 0,
        });
        setComponentModalVisible(false);
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
    getPostsFunc();
    const commentData = await getComments(route.params.postId);
    setComments(commentData);
  };
  // 댓글, 대댓글 삭제
  const handleCommentDelete = async (commentId: number) => {
    const result = await deleteComment(commentId);
    getPostsFunc();
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
    console.log(result);
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

  const refreshComments = async () => {
    const commentData = await getComments(route.params.postId);
    setComments(commentData);
  };

  const handleEmojiSelect = (emoji: {imageUrl: string; id: number}) => {
    setSelectedEmoji({uri: emoji.imageUrl});
    setSelectedEmojiId(emoji.id);
    setShowSelectedEmoji(true);
    setEmoticonId(emoji.id);
  };

  const handleCloseEmoji = () => {
    setShowSelectedEmoji(false);
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
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
            navigation={navigation}
            post={post}
            handlePostLike={handlePostLike}
            handlePostScrap={handlePostScrap}
            handlePostDelete={handlePostDelete}
            handlePostReport={handlePostReport}
            componentModalVisible={componentModalVisible}
            setComponentModalVisible={setComponentModalVisible}></Post>
          <AdMob />
          <View style={{flex: 1}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{flex: 1}}
              ref={flatListRef}
              data={comments}
              renderItem={({item, index}) => {
                return (
                  <View key={index}>
                    <Comment
                      navigation={navigation}
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
                          navigation={navigation}
                          recomment={recomment}
                          handleCommentLike={handleCommentLike}
                          handleCommentDelete={handleCommentDelete}
                          handleCommentReport={handleCommentReport}
                          componentModalVisible={componentModalVisible}
                          setComponentModalVisible={setComponentModalVisible}
                        />
                      ))}
                  </View>
                );
              }}
              ItemSeparatorComponent={() => <View style={{height: 1}}></View>}
            />
          </View>
        </ScrollView>
        {showSelectedEmoji && selectedEmoji && (
          <View style={styles.selectedEmojiContainer}>
            <Image source={selectedEmoji} style={styles.selectedEmoji} />
            <View style={{position: 'absolute', top: 0, right: 0, margin: 16}}>
              <TouchableOpacity onPress={() => setShowSelectedEmoji(false)}>
                <CloseIcon />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <CommentWriteContainer
          navigation={navigation}
          route={route}
          addComment={addCommentFunc}
          addRecomment={addRecommentFunc}
          onEmojiSelect={handleEmojiSelect}
          showSelectedEmoji={showSelectedEmoji}
          setShowSelectedEmoji={handleCloseEmoji}
          setParentId={setParentId}
          isRecomment={isRecomment}
          setIsRecomment={setIsRecomment}
          parentId={parentId}
        />
      </KeyboardAvoidingView>
      <ModalBottom
        modalVisible={goBackWarning}
        setModalVisible={setGoBackWarning}
        content={`작성한 댓글이 삭제됩니다. 뒤로 가시겠습니까?`}
        isContentCenter={true}
        purpleButtonText="확인"
        purpleButtonFunc={() => {
          setGoBackWarning(!goBackWarning);
          navigation.goBack();
        }}
        /* whiteButtonText="취소"
        whiteButtonFunc={() => {
          setGoBackWarning(!goBackWarning);
        }} */
      />
    </>
  );
};
export default PostScreen;

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: '#F6F6F6',
    width: Dimensions.get('window').width - 125,
    borderRadius: 8,
    paddingHorizontal: 10,
    //paddingVertical: 5,
    marginVertical: 10,
    //paddingRight: 5,
  },
  input: {
    fontSize: 14,
    width: Dimensions.get('window').width - 175,
    //paddingVertical: 5,
    paddingTop: Platform.OS == 'ios' ? 13 : 10,
    lineHeight: 20,
    minHeight: 40,
    maxHeight: 230,
    color: '#222222',
  },
  selectedEmojiContainer: {
    position: 'relative',
    zIndex: 1,
    left: 0,
    right: 0,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  selectedEmoji: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});
