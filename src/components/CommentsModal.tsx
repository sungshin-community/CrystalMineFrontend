import React, {useRef, useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  PanResponder,
  FlatList,
  Image,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import CommentWriteContainer from './CommentWriteContainer';
import Comment, {Recomment} from './Comment';
import CommentDto from '../classes/CommentDto';
import {
  getComments,
  addComment,
  addRecomment,
  deleteComment,
  setCommentLike,
  reportComment,
} from '../common/boardApi';
import Toast from 'react-native-simple-toast';
import {logout} from '../common/authApi';
import {getHundredsDigit} from '../common/util/statusUtil';
import CloseIcon from '../../resources/icon/CloseIcon';

interface CommentsModalProps {
  modalVisible: boolean;
  closeModal: () => void;
  navigation: any;
  route: any;
  postId: number;
}

const CommentsModal: React.FC<CommentsModalProps> = ({
  modalVisible,
  closeModal,
  navigation,
  route,
  postId,
}) => {
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [focusCommentId, setFocusCommentId] = useState<number | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const commentInputRef = useRef<TextInput>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [parentId, setParentId] = useState<number | null>(null);
  const [isRecomment, setIsRecomment] = useState<boolean>(false);
  const [showSelectedEmoji, setShowSelectedEmoji] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [selectedEmojiId, setSelectedEmojiId] = useState<number | null>(null);
  const [componentModalVisible, setComponentModalVisible] =
    useState<boolean>(false);
  const [replyToComment, setReplyToComment] = useState<{
    parentId: number | null;
  }>({parentId: null});
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Bottom Sheet 설정
  const screenHeight = Dimensions.get('screen').height;
  const bottomSheetHeight = screenHeight * 0.8;
  const maxSheetHeight = screenHeight * 0.95;
  const dragThreshold = 0;

  const panY = useRef(new Animated.Value(screenHeight)).current;
  const lastPanY = useRef(screenHeight - bottomSheetHeight);

  const translateY = panY.interpolate({
    inputRange: [0, screenHeight],
    outputRange: [0, screenHeight],
    extrapolate: 'clamp',
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: screenHeight - bottomSheetHeight,
    useNativeDriver: true,
    duration: 300,
  });

  const expandBottomSheet = Animated.timing(panY, {
    toValue: screenHeight - maxSheetHeight,
    useNativeDriver: true,
    duration: 300,
  });

  // Pan Responder 설정
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const newPanY = lastPanY.current + gestureState.dy;
        if (newPanY > screenHeight - maxSheetHeight && newPanY < screenHeight) {
          panY.setValue(newPanY);
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy < -dragThreshold) {
          expandBottomSheet.start(() => {
            lastPanY.current = screenHeight - maxSheetHeight;
          });
        } else if (gestureState.dy > dragThreshold) {
          if (lastPanY.current === screenHeight - maxSheetHeight) {
            resetBottomSheet.start(() => {
              lastPanY.current = screenHeight - bottomSheetHeight;
            });
          } else if (gestureState.dy > 100) {
            closeModal();
          } else {
            resetBottomSheet.start(() => {
              lastPanY.current = screenHeight - bottomSheetHeight;
            });
          }
        } else {
          resetBottomSheet.start(() => {
            lastPanY.current = screenHeight - bottomSheetHeight;
          });
        }
      },
    }),
  ).current;

  // 키보드 이벤트 리스너
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // 댓글 데이터 가져오기
  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const commentsData = await getComments(postId);
      setComments(commentsData || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
      setSelectedEmoji(null);
      setSelectedEmojiId(null);
      setShowSelectedEmoji(false);
    }
  };

  useEffect(() => {
    if (modalVisible) {
      fetchComments();
      resetBottomSheet.start();
    }
  }, [modalVisible, postId]);

  // 댓글 입력창 포커스
  const handleFocus = () => {
    commentInputRef.current?.focus();
  };

  // 댓글 클릭 처리
  const handleCommentClick = (commentId: number, index: number) => {
    setFocusCommentId(commentId);
    handleFocus();
    setParentId(commentId);
    setIsRecomment(true);
    setReplyToComment({parentId: commentId});

    if (comments.length > index) {
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
      });
    }
  };

  // 댓글 생성
  const addCommentFunc = useCallback(
    async (
      postId: number,
      content: string,
      isAnonymous: boolean,
      emoticonId: number,
    ) => {
      setIsLoading(true);
      try {
        const response = await addComment(
          postId,
          content,
          isAnonymous,
          emoticonId,
        );

        if (response.status === 401) {
          Toast.show(
            '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
            Toast.SHORT,
          );
          logout();
          navigation.reset({routes: [{name: 'SplashHome'}]});
        } else if (getHundredsDigit(response.status) === 2) {
          await fetchComments();
        } else {
          Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
        }
      } catch (error) {
        console.error('Error adding comment:', error);
        Toast.show('댓글 작성 중 오류가 발생했습니다.', Toast.SHORT);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  // 대댓글 생성
  const addRecommentFunc = useCallback(
    async (
      postId: number,
      parentId: number,
      content: string,
      isAnonymous: boolean,
      emoticonId: number,
    ) => {
      if (!parentId) {
        Toast.show('답글을 작성할 댓글을 찾을 수 없습니다.', Toast.SHORT);
        return;
      }

      setIsLoading(true);
      try {
        const response = await addRecomment(
          postId,
          parentId,
          content,
          isAnonymous,
          emoticonId,
        );

        if (response.status === 401) {
          Toast.show(
            '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
            Toast.SHORT,
          );
          logout();
          navigation.reset({routes: [{name: 'SplashHome'}]});
        } else if (getHundredsDigit(response.status) === 2) {
          await fetchComments();
          setIsRecomment(false);
          setReplyToComment({parentId: null});
        } else {
          Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
        }
      } catch (error) {
        console.error('Error adding recomment:', error);
        Toast.show('댓글 작성 중 오류가 발생했습니다.', Toast.SHORT);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedEmojiId],
  );

  // 댓글 좋아요
  const handleCommentLike = async (commentId: number) => {
    try {
      await setCommentLike(commentId);
      await fetchComments();
    } catch (error) {
      console.error('Error handling comment like:', error);
    }
  };

  // 댓글 삭제
  const handleCommentDelete = async (commentId: number) => {
    try {
      setComments(prevComments =>
        prevComments.map(comment => {
          if (comment.id === commentId) {
            return {...comment, isDeleted: true};
          }

          if (comment.recomments) {
            return {
              ...comment,
              recomments: comment.recomments.map(recomment =>
                recomment.id === commentId
                  ? {...recomment, isDeleted: true}
                  : recomment,
              ),
            };
          }
          return comment;
        }),
      );

      const result = await deleteComment(commentId);
      if (getHundredsDigit(result.status) === 2) {
        Toast.show('댓글이 삭제되었습니다.', Toast.SHORT);
      } else {
        await fetchComments();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      Toast.show('댓글 삭제 중 오류가 발생했습니다.', Toast.SHORT);
      // 에러 시 원상복구
      await fetchComments();
    }
  };

  // 댓글 신고
  const handleCommentReport = async (
    commentId: number,
    reasonId: number,
    detail?: string,
  ) => {
    try {
      const result = await reportComment(commentId, reasonId, detail);
      await fetchComments();
      return result;
    } catch (error) {
      console.error('Error reporting comment:', error);
      return null;
    }
  };

  const handleEmojiSelect = (emoji: {imageUrl: string; id: number}) => {
    setSelectedEmoji({uri: emoji.imageUrl});
    setSelectedEmojiId(emoji.id);
    setShowSelectedEmoji(true);
  };

  return (
    <Modal isVisible={modalVisible} style={styles.modal}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <Pressable style={styles.overlay} onPress={closeModal}>
          <TouchableWithoutFeedback onPress={() => {}} style={{flex: 1}}>
            <Animated.View
              style={[
                styles.bottomSheetContainer,
                {transform: [{translateY}]},
              ]}>
              <View {...panResponder.panHandlers} style={{width: '100%'}}>
                <View style={styles.homeIndicator} />
              </View>

              <View
                style={{
                  flex: 1,
                  marginBottom: Platform.OS === 'ios' ? 160 : 180,
                }}>
                <FlatList
                  style={{width: '100%', flex: 1}}
                  showsVerticalScrollIndicator={true}
                  keyboardShouldPersistTaps="handled"
                  ref={flatListRef}
                  data={comments}
                  renderItem={({item, index}) => (
                    <View onStartShouldSetResponder={() => true}>
                      <View
                        style={[
                          styles.commentContainer,
                          item.id === focusCommentId && styles.focusedComment,
                        ]}>
                        <Comment
                          navigation={navigation}
                          comment={item}
                          setParentId={() => handleCommentClick(item.id, index)}
                          handleCommentLike={handleCommentLike}
                          isRecomment={isRecomment}
                          setIsRecomment={setIsRecomment}
                          handleCommentDelete={handleCommentDelete}
                          handleCommentReport={handleCommentReport}
                          handleFocus={handleFocus}
                          componentModalVisible={componentModalVisible}
                          setComponentModalVisible={setComponentModalVisible}
                          onEmojiSelect={handleEmojiSelect}
                        />
                      </View>
                      {item.recomments?.map((recomment, rIndex) => (
                        <Recomment
                          key={rIndex}
                          navigation={navigation}
                          recomment={recomment}
                          handleCommentLike={handleCommentLike}
                          handleCommentDelete={handleCommentDelete}
                          handleCommentReport={handleCommentReport}
                          componentModalVisible={componentModalVisible}
                          setComponentModalVisible={setComponentModalVisible}
                          onEmojiSelect={handleEmojiSelect}
                          selectedEmoji={selectedEmoji}
                          showSelectedEmoji={showSelectedEmoji}
                        />
                      ))}
                    </View>
                  )}
                />
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Pressable>

        {showSelectedEmoji && selectedEmoji && (
          <View style={styles.selectedEmojiContainer}>
            <Image source={selectedEmoji} style={styles.selectedEmoji} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowSelectedEmoji(false)}>
              <CloseIcon />
            </TouchableOpacity>
          </View>
        )}

        <CommentWriteContainer
          navigation={navigation}
          route={{params: {postId}}}
          refreshComments={fetchComments}
          addComment={addCommentFunc}
          addRecomment={addRecommentFunc}
          selectedEmoji={selectedEmoji}
          setShowSelectedEmoji={setShowSelectedEmoji}
          onEmojiSelect={handleEmojiSelect}
          isRecomment={isRecomment}
          parentId={parentId}
          setParentId={setParentId}
          setIsRecomment={setIsRecomment}
          replyToComment={replyToComment}
          onCancelReply={() => {
            setIsRecomment(false);
            setParentId(null);
            setReplyToComment({parentId: null});
          }}
          selectedEmojiId={selectedEmojiId}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CommentsModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1,
  },
  overlay: {
    flex: 1,
    // backgroundColor: 'transparent',
  },
  bottomSheetContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    flexDirection: 'column',
  },
  homeIndicator: {
    width: 40,
    height: 5,
    borderRadius: 100,
    backgroundColor: '#CECFD6',
    marginVertical: 12,
    alignSelf: 'center',
  },
  commentContainer: {
    // padding: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#EFEFF3',
    // backgroundColor: 'blue',
  },
  focusedComment: {
    // backgroundColor: '#f6f6f6',
  },
  selectedEmojiContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(206, 207, 214, 0.4)',
    zIndex: 10000,
    padding: 10,
  },
  selectedEmoji: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 16,
  },
  commentWriteWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    // borderTopWidth: 1,
    // borderTopColor: '#EFEFF3',
    zIndex: 999,
    paddingBottom: 20,
  },
  footerText: {
    marginLeft: 4,
    fontWeight: '500',
    fontSize: 13,
    color: '#9DA4AB',
    marginRight: 12,
  },
});
