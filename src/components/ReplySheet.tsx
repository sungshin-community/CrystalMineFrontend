import React, {useRef, useEffect, useState} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  PanResponder,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import HeartIcon from '../../resources/icon/HeartIcon';
import ChatIcon from '../../resources/icon/ChatIcon';
import {
  deleltePantheonCommentLike,
  getPantheonFreeComment,
  postPantheonComment,
  postPantheonCommentLike,
  postPantheonReComment,
} from '../common/pantheonApi';
import {pantheonComment} from '../classes/Pantheon';
import SphereCommentInput, {SphereCommentInputRef} from './SphereCommentInput';

interface ReplySheetProps {
  ptPostId: number;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const screenHeight = Dimensions.get('screen').height;

export default function ReplySheet({
  visible,
  setVisible,
  ptPostId,
}: ReplySheetProps) {
  const [comments, setComments] = useState<pantheonComment[]>([]);

  const fetchCommentData = async () => {
    try {
      let data = [];
      data = await getPantheonFreeComment(ptPostId);
      setComments(data);
      console.log('댓글 조회 성공');
    } catch (error) {
      console.error('댓글 조회 실패', error);
    }
  };

  useEffect(() => {
    fetchCommentData();
  }, [ptPostId]);

  const bottomSheetHeight = screenHeight * 0.8;
  const maxSheetHeight = screenHeight * 0.95;
  const dragThreshold = 0;

  const panY = useRef(new Animated.Value(screenHeight)).current;
  const lastPanY = useRef(screenHeight - bottomSheetHeight); // 마지막 위치 기록

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

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const expandBottomSheet = Animated.timing(panY, {
    toValue: screenHeight - maxSheetHeight,
    useNativeDriver: true,
    duration: 300,
  });

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

  useEffect(() => {
    if (visible) {
      resetBottomSheet.start();
    }
  }, [visible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setVisible(false);
      Keyboard.dismiss();
    });
  };

  const handleCommentLike = async (isLiked: boolean, commentId: number) => {
    try {
      if (isLiked) {
        await deleltePantheonCommentLike(commentId);
      } else {
        await postPantheonCommentLike(commentId);
      }
      await fetchCommentData();
      console.log('좋아요 상태 변경 성공');
    } catch (error) {
      console.error('좋아요 상태 변경 실패:', error);
    }
  };

  const [focusCommentId, setFocusCommentId] = useState<number | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const commentInputRef = useRef<SphereCommentInputRef>(null);

  const handleFocus = () => {
    commentInputRef.current?.focusInput();
  };
  const [parentId, setParentId] = useState<number | null>(null);
  const [isRecomment, setIsRecomment] = useState<boolean>(false);

  const handleCommentClick = (ptCommentId: number, index: number) => {
    setFocusCommentId(ptCommentId);
    handleFocus();
    setParentId(ptCommentId);
    setIsRecomment(true);

    if (comments.length > index) {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: index,
          animated: true,
        });
      }
    }
  };

  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setFocusCommentId(null);
    });
    return () => {
      keyboardHideListener.remove();
    };
  }, []);

  const handlePostComment = async (
    content: string,
    isAnonymous: boolean,
    emoticonId: number | null,
  ) => {
    try {
      await postPantheonComment(content, isAnonymous, ptPostId, emoticonId);
      await fetchCommentData();
      console.log('댓글 생성 성공');
    } catch (error) {
      console.error('댓글 생성 실패:', error);
    }
  };

  const handlePostReComment = async (
    content: string,
    isAnonymous: boolean,
    emoticonId: number | null,
  ) => {
    try {
      if (parentId !== null) {
        await postPantheonReComment(
          parentId,
          content,
          isAnonymous,
          ptPostId,
          emoticonId,
        );
      }
      await fetchCommentData();
      console.log('대댓글 생성 성공');
    } catch (error) {
      console.error('대댓글 생성 실패:', error);
    }
  };

  const postComment = async (
    content: string,
    isAnonymous: boolean,
    emoticonId: number | null,
  ) => {
    if (isRecomment) {
      handlePostReComment(content, isAnonymous, emoticonId);
      console.log('대댓글 생성');
    } else {
      handlePostComment(content, isAnonymous, emoticonId);
      console.log('댓글 생성');
    }
    setIsRecomment(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.background} />
          </TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.bottomSheetContainer,
              {transform: [{translateY: translateY}]},
            ]}
            {...panResponder.panHandlers}>
            <View style={styles.homeIndicator} />
            <FlatList
              style={{width: '100%', flex: 1}}
              contentContainerStyle={{paddingBottom: 0}}
              keyboardShouldPersistTaps="handled"
              ref={flatListRef}
              data={comments}
              renderItem={({item, index}) => (
                <View>
                  <View
                    style={[
                      {flexDirection: 'row', padding: 16},
                      item.ptCommentId === focusCommentId && {
                        backgroundColor: '#f6f6f6',
                      },
                    ]}>
                    <Image
                      source={{uri: item.profileImageUrl}}
                      style={{
                        borderRadius: 14,
                        marginRight: 10,
                        width: 28,
                        height: 28,
                      }}
                      resizeMode="cover"
                    />
                    <View style={{flex: 1}}>
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 2,
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              marginRight: 6,
                              fontWeight: '600',
                              color: item.displayName.includes('글쓴이')
                                ? '#A055FF'
                                : '#3A424E',
                            }}>
                            {item.displayName}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#B9BAC1',
                              fontWeight: '500',
                            }}>
                            {item.createdAt}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color: '#89919A',
                          }}>
                          {item.isBlind
                            ? '비공개'
                            : `${item.authorDepartment} · ${item.authorJob} · ${
                                item.authorYear === 0
                                  ? '신입'
                                  : `${item.authorYear}년`
                              }`}
                        </Text>
                      </View>

                      {item.emoticonUrl && (
                        <Image
                          source={{uri: item.emoticonUrl}}
                          style={{
                            marginTop: 10,
                            width: 100,
                            height: 100,
                          }}
                          resizeMode="cover"
                        />
                      )}

                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '400',
                          color: '#222222',
                          marginTop: 10,
                        }}>
                        {item.content}
                      </Text>

                      <View style={{flexDirection: 'row', marginTop: 12}}>
                        <TouchableOpacity
                          style={{flexDirection: 'row', alignItems: 'center'}}
                          onPress={() =>
                            handleCommentLike(item.isLiked, item.ptCommentId)
                          }>
                          <HeartIcon
                            fill={item.isLiked ? '#FF6376' : 'white'}
                            stroke={item.isLiked ? '#FF6376' : '#9DA4AB'}
                          />
                          <Text style={styles.footerText}>
                            좋아요 {item.likeCount}개
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{flexDirection: 'row', alignItems: 'center'}}
                          onPress={() =>
                            handleCommentClick(item.ptCommentId, index)
                          }>
                          <ChatIcon />
                          <Text style={styles.footerText}>
                            댓글달기 {item.reComments.length}개
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  {item.reComments && item.reComments.length > 0 && (
                    <View style={{marginTop: 24}}>
                      {item.reComments.map(
                        (reComment: pantheonComment, idx: number) => (
                          <View
                            style={[
                              {
                                marginBottom: 20,
                              },
                              idx === item.reComments.length - 1 && {
                                marginBottom: 0,
                              },
                            ]}>
                            <View
                              style={{flexDirection: 'row', marginLeft: 48}}>
                              <Image
                                source={{uri: reComment.profileImageUrl}}
                                style={{
                                  borderRadius: 10,
                                  marginRight: 10,
                                  width: 24,
                                  height: 24,
                                }}
                                resizeMode="cover"
                              />
                              <View style={{flex: 1}}>
                                <View>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      marginBottom: 2,
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        marginRight: 6,
                                        fontWeight: '600',
                                        color: reComment.displayName.includes(
                                          '글쓴이',
                                        )
                                          ? '#A055FF'
                                          : '#3A424E',
                                      }}>
                                      {reComment.displayName}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        color: '#B9BAC1',
                                        fontWeight: '500',
                                      }}>
                                      {reComment.createdAt}
                                    </Text>
                                  </View>
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      fontWeight: '500',
                                      color: '#89919A',
                                    }}>
                                    {reComment.isBlind
                                      ? '비공개'
                                      : `${reComment.authorDepartment} · ${
                                          item.authorJob
                                        } · ${
                                          reComment.authorYear === 0
                                            ? '신입'
                                            : `${reComment.authorYear}년`
                                        }`}
                                  </Text>
                                </View>

                                {reComment.emoticonUrl && (
                                  <Image
                                    source={{uri: reComment.emoticonUrl}}
                                    style={{
                                      marginTop: 10,
                                      width: 100,
                                      height: 100,
                                    }}
                                    resizeMode="cover"
                                  />
                                )}

                                <Text
                                  style={{
                                    fontSize: 14,
                                    fontWeight: '400',
                                    color: '#222222',
                                    marginTop: 10,
                                  }}>
                                  {reComment.content}
                                </Text>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    marginTop: 12,
                                  }}>
                                  <TouchableOpacity
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}
                                    onPress={() =>
                                      handleCommentLike(
                                        reComment.isLiked,
                                        reComment.ptCommentId,
                                      )
                                    }>
                                    <HeartIcon
                                      fill={
                                        reComment.isLiked ? '#FF6376' : 'white'
                                      }
                                      stroke={
                                        reComment.isLiked
                                          ? '#FF6376'
                                          : '#9DA4AB'
                                      }
                                    />
                                    <Text style={styles.footerText}>
                                      좋아요 {reComment.likeCount}개
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          </View>
                        ),
                      )}
                    </View>
                  )}
                </View>
              )}
            />
          </Animated.View>
        </View>
        <SphereCommentInput
          ref={commentInputRef}
          onSubmit={postComment}
          onNewFocus={() => {
            setIsRecomment(false);
            setParentId(null);
          }}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    height: screenHeight * 0.95,
    paddingBottom: 50,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  homeIndicator: {
    width: 40,
    height: 5,
    borderRadius: 100,
    backgroundColor: '#CECFD6',
    marginTop: 12,
    alignSelf: 'center',
  },
  footerText: {
    marginLeft: 4,
    fontWeight: '500',
    fontSize: 13,
    color: '#9DA4AB',
    marginRight: 12,
  },
});
