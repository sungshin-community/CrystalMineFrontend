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
  getPantheonCuriousComment,
  getPantheonFreeComment,
} from '../common/pantheonApi';
import CommentInputBox from '../screens/crystalBall/imshi';

interface ReplySheetProps {
  ptPostId: number;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export default function ReplySheet({
  visible,
  setVisible,
  ptPostId,
}: ReplySheetProps) {
  interface Comment {
    content: string;
    authorDepartment: string;
    authorJob: string;
    authorYear: number;
    emoticonUrl?: string | null;
    likeCount: number;
    liked: boolean;
    nickname: string;
    profileImageUrl: string;
    ptCommentId: number;
    selected?: boolean;
    reComments: Comment[];
  }
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchCommentData = async () => {
    try {
      let data = [];
      data = await getPantheonFreeComment(ptPostId);
      if (!data) {
        data = await getPantheonCuriousComment(ptPostId);
      }
      setComments(data);
      console.log('댓글 조회 성공');
    } catch (error) {
      console.error('댓글 조회 실패', error);
    }
  };

  useEffect(() => {
    fetchCommentData();
  }, [ptPostId]);

  const screenHeight = Dimensions.get('screen').height;
  const bottomSheetHeight = screenHeight * 0.75; // 초기 높이 75%
  const maxSheetHeight = screenHeight * 0.95; // 최대 높이 95%
  const dragThreshold = 30; // 드래그 임계값 설정

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
          // panY 값을 실시간으로 업데이트하여 드래그가 자연스럽게 따라오게 함
          panY.setValue(newPanY);
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy < -dragThreshold) {
          // 위로 드래그했을 때 50px 이상일 경우 확장
          expandBottomSheet.start(() => {
            lastPanY.current = screenHeight - maxSheetHeight; // 최종 위치를 최대 높이로 업데이트
          });
        } else if (gestureState.dy > dragThreshold) {
          if (lastPanY.current === screenHeight - maxSheetHeight) {
            // 95% 상태에서 아래로 내렸을 때 75%로 이동
            resetBottomSheet.start(() => {
              lastPanY.current = screenHeight - bottomSheetHeight; // 최종 위치를 75%로 업데이트
            });
          } else if (gestureState.dy > 100) {
            // 아래로 드래그했을 때 100px 이상일 경우 모달 닫기
            closeModal();
          } else {
            resetBottomSheet.start(() => {
              lastPanY.current = screenHeight - bottomSheetHeight; // 최종 위치를 75%로 업데이트
            });
          }
        } else {
          // 작은 움직임은 75%로 되돌리기
          resetBottomSheet.start(() => {
            lastPanY.current = screenHeight - bottomSheetHeight; // 최종 위치를 75%로 업데이트
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

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="padding" // iOS에서는 padding, Android에서는 height 사용
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}>
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
            <View></View>
            <FlatList
              style={{width: '100%', flex: 1}}
              data={comments}
              renderItem={({item, index}) => (
                <View style={{flexDirection: 'row', padding: 16}}>
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
                            color:
                              item.nickname === '글쓴이'
                                ? '#A055FF'
                                : '#3A424E',
                          }}>
                          {item.nickname}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#B9BAC1',
                            fontWeight: '500',
                          }}>
                          // time 함수 필요
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '500',
                          color: '#89919A',
                        }}>
                        {item.authorDepartment} · {item.authorJob} ·{' '}
                        {item.authorYear}
                        // 비공개 함수 처리
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
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <HeartIcon
                          fill={item.liked ? '#FF6376' : 'white'}
                          stroke={item.liked ? '#FF6376' : '#9DA4AB'}
                        />
                        <Text style={styles.footerText}>
                          좋아요 {item.likeCount}개
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <ChatIcon />
                        <Text style={styles.footerText}>댓글달기 3개</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          </Animated.View>
        </View>
        <CommentInputBox
          onSubmit={function (comment: string, isAnonymous: boolean): void {
            throw new Error('Function not implemented.');
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
    height: '95%',
    paddingBottom: 50,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
  },
  homeIndicator: {
    width: 40,
    height: 5,
    borderRadius: 100,
    backgroundColor: '#CECFD6',
    marginTop: 12,
  },
  footerText: {
    marginLeft: 4,
    fontWeight: '500',
    fontSize: 13,
    color: '#9DA4AB',
    marginRight: 12,
  },
});
