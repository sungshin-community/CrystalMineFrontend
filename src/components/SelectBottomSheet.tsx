import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import CloseIcon from '../../resources/icon/CloseIcon';
import {pantheonComment} from '../classes/Pantheon';

interface SelectBottomSheetProps {
  sheetVisible: boolean;
  setSheetVisible: (value: boolean) => void;
  onSelect: () => void;
  reply: pantheonComment;
}

export default function SelectBottomSheet({
  sheetVisible,
  setSheetVisible,
  reply,
  onSelect,
}: SelectBottomSheetProps) {
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (sheetVisible) {
      resetBottomSheet.start();
    }
  }, [sheetVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setSheetVisible(false);
    });
  };

  return (
    <Modal
      visible={sheetVisible}
      animationType={'fade'}
      transparent
      statusBarTranslucent>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={{flex: 1}} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            transform: [{translateY: translateY}],
          }}
          {...panResponders.panHandlers}>
          <View style={{paddingHorizontal: 16}}>
            <View style={styles.titleContainer}>
              <View>
                <Text
                  style={{fontSize: 16, fontWeight: '600', color: '#222222'}}>
                  채택하실 답변이 맞나요?
                </Text>
                <Text style={styles.subTitle}>
                  채택 이후에는 댓글을 삭제할 수 없어요.
                </Text>
              </View>
              <TouchableOpacity onPress={closeModal}>
                <CloseIcon width={24} height={24} />
              </TouchableOpacity>
            </View>
            <View style={styles.commentBox}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{uri: reply?.profileImageUrl}}
                  style={{
                    borderRadius: 12,
                    marginRight: 8,
                    width: 24,
                    height: 24,
                  }}
                  resizeMode="cover"
                />
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 2,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        marginRight: 6,
                        fontWeight: '600',
                        color: '#3A424E',
                      }}>
                      {reply?.displayName}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#B9BAC1',
                        fontWeight: '500',
                      }}>
                      {reply?.createdAt}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: '#89919A',
                    }}>
                    {reply?.isBlind
                      ? '비공개'
                      : `${reply?.authorDepartment} · ${reply?.authorJob} · ${
                          reply?.authorYear === 0
                            ? '신입'
                            : `${reply?.authorYear}년`
                        }`}
                  </Text>
                </View>
              </View>

              {typeof reply?.emoticonUrl === 'string' && (
                <Image
                  source={{uri: reply?.emoticonUrl}}
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
                {reply?.content}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 16,
                marginBottom: Platform.OS === 'ios' ? 46 : 30,
              }}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeModal}>
                <Text
                  style={{fontSize: 14, color: '#6E7882', fontWeight: '400'}}>
                  아니에요.
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.slectButton} onPress={onSelect}>
                <Text
                  style={{fontSize: 14, color: '#FFFFFF', fontWeight: '700'}}>
                  네, 채택할게요.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(34, 34, 34, 0.5)',
  },
  bottomSheetContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 20,
  },
  subTitle: {
    color: '#9DA4AB',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 5,
  },
  commentBox: {
    padding: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#EFEFF3',
    backgroundColor: '#FBFBFB',
  },
  cancelButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#EFEFF3',
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    paddingVertical: 12,
  },
  slectButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#A055FF',
    backgroundColor: '#A055FF',
    paddingVertical: 12,
  },
});
