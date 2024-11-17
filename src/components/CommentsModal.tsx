import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  KeyboardEvent,
  Keyboard,
  Dimensions,
  Image,
  TouchableOpacity,
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
  const flatListRef = useRef<FlatList>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newComment, setNewComment] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null);
  const [isRecomment, setIsRecomment] = useState<boolean>(false);
  const commentInputRef = useRef<TextInput>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [parentId, setParentId] = useState<number | null>(null); // null로 초기화
  const [componentModalVisible, setComponentModalVisible] =
    useState<boolean>(false);
  const [newCommentAdded, setNewCommentAdded] = useState<boolean>(false);
  const [isCommentAdded, setIsCommentAdded] = useState(false);
  const [showSelectedEmoji, setShowSelectedEmoji] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [replyToComment, setReplyToComment] = useState<{
    parentId: number | null;
  }>({parentId: null});
  const [selectedEmojiId, setSelectedEmojiId] = useState<number | null>(null);

  useEffect(() => {
    if (modalVisible && postId) {
      console.log('Fetching comments for postId:', postId);
      fetchComments(postId);
    }
  }, [modalVisible, postId, newCommentAdded]);

  useEffect(() => {}, [comments]);
  // 초기화
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      const commentData = await getComments(route.params.postId);
      setComments(commentData);
      setIsLoading(false);
    }
    init();
  }, [componentModalVisible]);

  // 댓글 작성 완료 핸들러
  const handleCommentComplete = () => {
    setIsCommentAdded(true);
    refreshComments();
  };

  // 댓글 목록 갱신

  const fetchComments = async (postId: number) => {
    try {
      const commentsData = await getComments(postId);
      setComments(commentsData || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const refreshComments = async () => {
    const commentData = await getComments(route.params.postId);
    setComments(commentData);
  };

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
        selectedEmojiId,
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
        // 새 댓글을 바로 추가
        const newCommentData = await getComments(postId);
        setComments(newCommentData);
        setNewComment('');
        setNewCommentAdded(prev => !prev);
        scrollViewRef.current?.scrollToEnd({animated: true});
      } else {
        setTimeout(function () {
          Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
        }, 100);
      }
      setIsLoading(false);
    },
    [selectedEmojiId],
  );

  // 대댓글 모드 설정 함수 추가
  const handleReplyMode = (commentId: number) => {
    setParentId(commentId);
    setIsRecomment(true);
    setReplyToComment({
      parentId: commentId,
    });
    focusCommentInput();
  };

  // 대댓글 생성
  const addRecommentFunc = useCallback(
    async (
      postId: number,
      parentId: number,
      newComment: string,
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
          newComment,
          isAnonymous,
          selectedEmojiId,
        );

        if (response.status === 401) {
          Toast.show(
            '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
            Toast.SHORT,
          );
          logout();
          navigation.reset({routes: [{name: 'SplashHome'}]});
        } else if (getHundredsDigit(response.status) === 2) {
          const newCommentData = await getComments(postId);
          setComments(newCommentData);
          setNewComment('');
          setIsRecomment(false);
          setReplyToComment({parentId: null});

          // 부모 댓글로 스크롤
          const index = newCommentData?.findIndex(c => c.id === parentId);
          if (index !== -1) {
            flatListRef.current?.scrollToIndex({
              index,
              animated: true,
              viewPosition: 0.5,
            });
          }
        } else {
          Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
        }
      } catch (error) {
        console.error('Error adding recomment:', error);
        Toast.show('댓글 작성 중 오류가 발생했습니다.', Toast.SHORT);
      }
      setIsLoading(false);
    },
    [selectedEmojiId],
  );

  // 댓글창 포커스
  const focusCommentInput = () => {
    commentInputRef.current?.focus();
  };
  // 댓글, 대댓글 공감
  const handleCommentLike = async (commentId: number) => {
    const result = await setCommentLike(commentId);
    const commentData = await getComments(route.params.postId);
    console.log('commentData', commentData);
    setComments(commentData);
  };
  // 댓글, 대댓글 삭제
  const handleCommentDelete = async (commentId: number) => {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment.id === commentId) {
          return {...comment, isDeleted: true, content: '삭제된 댓글입니다.'};
        }
        return {
          ...comment,
          recomments: comment.recomments?.map(recomment => {
            if (recomment.id === commentId) {
              return {
                ...recomment,
                isDeleted: true,
                content: '삭제된 댓글입니다.',
              };
            }
            return recomment;
          }),
        };
      });
    });

    setTimeout(function () {
      Toast.show('작성하신 댓글이 성공적으로 삭제되었습니다.', Toast.SHORT);
    }, 100);

    try {
      const result = await deleteComment(commentId);
      if (getHundredsDigit(result.status) !== 2) {
        const commentData = await getComments(route.params.postId);
        setComments(commentData);
        Toast.show('댓글 삭제에 실패했습니다.', Toast.SHORT);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      const commentData = await getComments(route.params.postId);
      setComments(commentData);
      Toast.show('댓글 삭제 중 오류가 발생했습니다.', Toast.SHORT);
    }
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

  useEffect(() => {
    if (isCommentAdded) {
      const fetchComments = async () => {
        const commentData = await getComments(postId);
        setComments(commentData);
      };
      fetchComments();
    }
  }, [postId]);

  const handleEmojiSelect = (emoji: {imageUrl: string; id: number}) => {
    setSelectedEmoji({uri: emoji.imageUrl});
    setSelectedEmojiId(emoji.id);
    setShowSelectedEmoji(true);
  };

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={closeModal}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriverForBackdrop={true}
      backdropOpacity={0.5}>
      <View style={styles.modalContent}>
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
                    setParentId={id => handleReplyMode(id)}
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
            ItemSeparatorComponent={() => <View style={{height: 1}} />}
          />
        </View>
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
          route={{params: {postId}}}
          refreshComments={refreshComments}
          addComment={addCommentFunc}
          addRecomment={addRecommentFunc}
          onCommentComplete={handleCommentComplete}
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
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    paddingTop: 20,
    borderRadius: 18,
    height: Dimensions.get('window').height * 0.8,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedEmojiContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 10000,
    padding: 10,
  },
  selectedEmoji: {
    width: 80,
    height: 80,
  },
});

export default CommentsModal;
