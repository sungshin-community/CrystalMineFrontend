import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Pressable,
  TextInput,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import {fontMedium, fontRegular} from '../common/font';
import Toast from 'react-native-simple-toast';
import {
  RectangleChecked,
  RectangleUnchecked,
} from '../../resources/icon/CheckBox';
import PostSend from '../../resources/icon/PostSend';
import PurplePostSend from '../../resources/icon/PurplePostSend';
import {EmojiIcon, ClickedEmojiIcon} from '../../resources/icon/EmojiIcon';
import {getMyEmoticons, getPosts, getComments} from '../common/boardApi';
import {useCallback} from 'react';
import {logout} from '../common/authApi';
import {getHundredsDigit} from '../common/util/statusUtil';
import PostDto from '../classes/PostDto';
import CommentDto from '../classes/CommentDto';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import EmojiPicker from './EmojiPicker';
type RootStackParamList = {
  MessageScreen: {roomId: number};
};
type Props = NativeStackScreenProps<RootStackParamList> & {
  setShowSelectedEmoji: (value: boolean) => void;
  onEmojiSelect: (emoji: string) => void;
  setParentId: (id: number) => void;
  isRecomment: boolean;
  setIsRecomment: (value: boolean) => void;
  parentId: number;
};

interface CommentWriteContainerProps {
  navigation: any;
  route: any;
  addComment: (
    postId: number,
    content: string,
    isAnonymous: boolean,
    emoticonId: number,
  ) => void;
  addRecomment: (
    postId: number,
    parentId: number,
    content: string,
    isAnonymous: boolean,
    emoticonId: number,
  ) => void;
  onEmojiSelect: (emoji: {imageUrl: string; id: number}) => void;
  showSelectedEmoji: boolean;
  setParentId: (id: number) => void;
  isRecomment: boolean;
  setIsRecomment: (value: boolean) => void;
  parentId: number;
  setShowSelectedEmoji: () => void;
}

const CommentWriteContainer: React.FC<CommentWriteContainerProps> = ({
  navigation,
  route,
  refreshComments,
  addComment,
  addRecomment,
  onCommentComplete,
  onEmojiSelect,
  setParentId,
  isRecomment,
  setIsRecomment,
  parentId,
  replyToComment,
  setShowSelectedEmoji,
  dotsModalVisible,
  setDotsModalVisible,
}: Props) => {
  const [post, setPost] = useState<PostDto>();
  const [comments, setComments] = useState<CommentDto[]>();
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const commentInputRef = useRef<TextInput>(null);
  const [newComment, setNewComment] = useState<string>('');
  const [emojiClicked, setEmojiClicked] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [emojiVisible, setEmojiVisible] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const flatListRef = useRef<FlatList>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [isSubmitState, setIsSubmitState] = useState<boolean>(false);
  const [content, setContent] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isPayed, setIsPayed] = useState<boolean>(false);

  const handleEmojiSelect = (emoji: {imageUrl: string; id: number}) => {
    onEmojiSelect(emoji);
    console.log('Selected emoji with id:', emoji.id);
    setSelectedEmoji(emoji.id);
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
      } else {
        setTimeout(function () {
          Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
        }, 100);
      }
    },
    [],
  );

  // 댓글 생성
  const addCommentFunc = useCallback(
    async (
      postId: number,
      newComment: string,
      isAnonymous: boolean,
      emoticonId: number,
    ) => {
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
      } else {
        setTimeout(function () {
          Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
        }, 100);
      }
      setIsLoading(false);
    },
    [refreshComments],
  );

  const handleRecomment = (id: number) => {
    setParentId(id);
    setIsRecomment(true);
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  const onSubmit = useCallback(() => {
    const emojiIdToSend = selectedEmoji ? selectedEmoji : null;
    console.log('emojiIdToSend', emojiIdToSend);
    if (newComment.trim()) {
      if (isRecomment && parentId) {
        addRecommentFunc(
          route.params.postId,
          parentId,
          newComment,
          isAnonymous,
          emojiIdToSend,
        ).then(() => {
          refreshComments();
          onCommentComplete();
          setIsRecomment(false);
          setParentId(null);
          setDotsModalVisible(false);
        });
      } else {
        addCommentFunc(
          route.params.postId,
          newComment,
          isAnonymous,
          emojiIdToSend,
        ).then(() => {
          refreshComments();
          onCommentComplete();
          setDotsModalVisible(false);
        });
      }
      setNewComment('');
      setEmojiClicked(false);
      setShowEmojiPicker(false);
      setShowSelectedEmoji();
    }
  }, [newComment, isRecomment, isAnonymous, selectedEmoji, parentId]);

  const handleEmojiIconPress = async () => {
    try {
      const emoticons = await getMyEmoticons();
      console.log('emoticons', emoticons);
      if (emoticons?.status === 200) {
        if (emoticons?.data.length === 0) {
          setIsPayed(false);
        } else {
          setIsPayed(true);
        }
      }

      setShowEmojiPicker(prev => !prev);
      setEmojiClicked(prev => !prev);
      console.log('showEmojiPickers', emojiClicked);
      console.log('showEmojiPicker', showEmojiPicker);

      if (commentInputRef.current) {
        commentInputRef.current.focus();
      }
      console.log('이모티콘 성공:', emoticons);
    } catch (error) {
      console.error('이모티콘 패치 실패', error);
      Toast.show('이모티콘 패치 실패', Toast.SHORT);
    }
  };

  const handleSubmit = async () => {
    if (isRecomment && replyToComment.parentId) {
      await addRecomment(
        postId,
        replyToComment.parentId,
        commentText,
        isAnonymous,
        selectedEmoticonId,
      );
    } else {
      await addComment(postId, commentText, isAnonymous, selectedEmoticonId);
    }
  };

  return (
    <View
      style={{
        flexDirection: 'column',
      }}>
      <View
        style={{
          flexDirection: 'row',
          // paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? (emojiClicked ? 0 : 20) : 0,
          //alignItems: 'center',
          zIndex: 99999,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            position: 'relative',
            justifyContent: 'flex-end',
            backgroundColor: '#fff',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginRight: 12,
              marginLeft: 12,
              marginVertical: 25,
              backgroundColor: '#fff',
            }}>
            <Text style={[fontRegular, {marginRight: 5}]}>익명</Text>
            <Pressable
              hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
              onPress={() => {
                setIsAnonymous(isAnonymous => !isAnonymous);
              }}>
              {isAnonymous ? <RectangleChecked /> : <RectangleUnchecked />}
            </Pressable>
          </View>
        </View>
        <View
          style={[
            styles.inputBox,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              position: 'relative',
            },
          ]}>
          <TextInput
            ref={commentInputRef}
            placeholder={
              isRecomment ? '대댓글을 입력해 주세요.' : '댓글을 입력해 주세요.'
            }
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
            style={[fontRegular, styles.input]}
            maxLength={500}
            /* onFocus={(e: any) => {
            onInputFocus();
          }} */
            /* onBlur={(e: any) => {
            onInputFocusOut();
            setIsRecomment(false);
          }} */
          />
          <View style={{marginBottom: 10}}>
            <TouchableOpacity onPress={handleEmojiIconPress}>
              {emojiClicked ? <ClickedEmojiIcon /> : <EmojiIcon />}
            </TouchableOpacity>
          </View>

          {/* <View
                  style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
                  <Text>
                    {newComment &&
                      (isSubmitState ? (
                        <></>
                      ) : (
                        <Pressable
                          style={{
                            paddingBottom: Platform.OS === 'ios' ? 3 : 5,
                            bottom: 0,
                          }}
                          onPress={() => {
                            setIsSubmitState(true);
                            console.log(
                              '댓글 작성 버튼 클릭, isSubmitState',
                              isSubmitState,
                            );
                          }}>
                        </Pressable>
                      ))}
                  </Text>
                </View> */}
        </View>
        {/* PostSend 아이콘 */}
        <View
          style={{
            flexDirection: 'row',
            position: 'relative',
            alignItems: 'flex-end',
            marginBottom: 15,
            marginRight: 12,
            marginLeft: 12,
          }}>
          <Text>
            <Pressable
              style={{
                paddingBottom: Platform.OS === 'ios' ? 3 : 5,
                bottom: 0,
              }}
              onPress={onSubmit}>
              {newComment || emojiClicked ? <PurplePostSend /> : <PostSend />}
            </Pressable>
          </Text>
        </View>
      </View>
      {showEmojiPicker && (
        <View style={styles.emojiPickerContainer}>
          <EmojiPicker
            visible={showEmojiPicker}
            onClose={() => setShowEmojiPicker(showEmojiPicker)}
            onEmojiSelect={handleEmojiSelect}
            isPayed={isPayed}
            setIsPayed={setIsPayed}
            navigation={navigation}
          />
        </View>
      )}
    </View>
  );
};
export default CommentWriteContainer;

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: '#f6f6f6',
    width: Dimensions.get('window').width - 125,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    fontSize: 14,
    width: Dimensions.get('window').width - 175,
    paddingBottom: Platform.OS == 'ios' ? 13 : 10,
    lineHeight: 20,
    minHeight: 40,
    maxHeight: 230,
    color: '#222222',
    fontWeight: '400',
  },
  emojiPickerContainer: {
    // position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    /* elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84, */
  },
  replyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
