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
} from 'react-native';
import HeartIcon from '../../resources/icon/HeartIcon';
import ChatIcon from '../../resources/icon/ChatIcon';

const replyData = [
  {
    content: '이것은 첫 번째 댓글입니다!',
    authorDepartment: '컴퓨터공학과',
    authorJob: '학생',
    authorYear: 2,
    likeCount: 5,
    liked: true,
    nickname: '댓글 작성자1',
    profileImageUrl: 'https://example.com/profile1.png',
    ptCommentId: 101,
    selected: false,
    replyComments: [
      {
        content: '첫 번째 댓글의 대댓글입니다.',
        authorDepartment: '컴퓨터공학과',
        authorJob: '조교',
        authorYear: 1,
        likeCount: 2,
        liked: false,
        nickname: '대댓글 작성자1',
        profileImageUrl: 'https://example.com/profile_reply1.png',
        ptCommentId: 201,
        selected: false,
      },
      {
        content: '또 다른 대댓글입니다.',
        authorDepartment: '정보통신학과',
        authorJob: '연구원',
        authorYear: 3,
        emoticonUrl: 'https://example.com/emoticon2_reply.png',
        likeCount: 1,
        liked: true,
        nickname: '대댓글 작성자2',
        profileImageUrl: 'https://example.com/profile_reply2.png',
        ptCommentId: 202,
        selected: true,
      },
    ],
  },
  {
    content: '두 번째 댓글 예시입니다.',
    authorDepartment: '정보통신학과',
    authorJob: '학생',
    authorYear: 3,
    likeCount: 8,
    liked: false,
    nickname: '댓글 작성자2',
    profileImageUrl: 'https://example.com/profile2.png',
    ptCommentId: 102,
    selected: true,
    replyComments: [],
  },
  {
    content: '마지막으로 세 번째 댓글입니다.',
    authorDepartment: '소프트웨어학과',
    authorJob: '연구원',
    authorYear: 1,
    emoticonUrl: 'https://example.com/emoticon3.png',
    likeCount: 12,
    liked: true,
    nickname: '댓글 작성자3',
    profileImageUrl: 'https://example.com/profile3.png',
    ptCommentId: 103,
    selected: false,
    replyComments: [
      {
        content: '세 번째 댓글의 대댓글입니다.',
        authorDepartment: '소프트웨어학과',
        authorJob: '학생',
        authorYear: 2,
        likeCount: 3,
        liked: false,
        nickname: '대댓글 작성자3',
        profileImageUrl: 'https://example.com/profile_reply3.png',
        ptCommentId: 203,
        selected: false,
      },
    ],
  },
];

interface ReplySheetProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export default function ReplySheet({visible, setVisible}: ReplySheetProps) {
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
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent>
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
            data={replyData}
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
                            item.nickname === '글쓴이' ? '#A055FF' : '#3A424E',
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
