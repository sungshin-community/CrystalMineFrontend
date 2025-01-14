import React, {useRef, useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Animated,
  PanResponder,
  FlatList,
  Platform,
} from 'react-native';
import Filter from '../../resources/icon/Filter';
import CheckIcon from '../../resources/icon/CheckIcon';

interface JobFilterModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  selectedFilters: number[];
  onApplyFilters: (selectedFilters: number[]) => void;
}

const filterOptions = [
  '전체',
  '개발',
  '경영/비즈니스',
  '디자인',
  '마케팅/광고',
  '영업',
  '고객 서비스/리테일',
  '미디어',
  '교육',
  '엔지니어링/설계',
  '게임',
  '제조/생산',
  '의료/제약',
  '물류/무역',
  '법률',
  '식음료',
  '건설',
  '공공/복지',
  '금융',
];

export default function JobFilterModal({
  visible,
  setVisible,
  selectedFilters,
  onApplyFilters,
}: JobFilterModalProps) {
  const [selected, setSelected] = useState<number[]>([]);

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

  const handleChipPress = (index: number) => {
    if (index === 0) {
      setSelected(prevSelected =>
        prevSelected.includes(index) ? [] : [index],
      );
    } else {
      setSelected(prevSelected => {
        const newSelected = prevSelected.includes(index)
          ? prevSelected.filter(i => i !== index)
          : [...prevSelected, index];

        const filteredSelected = newSelected.includes(0)
          ? newSelected.filter(i => i !== 0)
          : newSelected;

        return filteredSelected.length === 0 ? [0] : filteredSelected;
      });
    }
  };

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
    if (visible) {
      resetBottomSheet.start();
      setSelected(selectedFilters);
    }
  }, [visible, selectedFilters]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setVisible(false);
    });
  };

  const handleApply = () => {
    onApplyFilters(selected);
    closeModal();
  };

  return (
    <Modal
      visible={visible}
      animationType={'fade'}
      transparent
      statusBarTranslucent>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            transform: [{translateY: translateY}],
          }}
          {...panResponders.panHandlers}>
          <View style={styles.homeIndicator} />
          <View style={styles.titleBox}>
            <Text style={styles.title}>필터 및 정렬</Text>
          </View>
          <View style={styles.filterBox}>
            <View style={styles.smallTitleBox}>
              <Filter />
              <Text style={styles.samllTitle}>직군 / 직무</Text>
            </View>
            <FlatList
              data={filterOptions}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={[
                    styles.chip,
                    selected.includes(index) && {borderColor: '#A055FF'},
                  ]}
                  onPress={() => handleChipPress(index)}>
                  {selected.includes(index) && <CheckIcon />}
                  <Text
                    style={[
                      styles.chipText,
                      selected.includes(index) && styles.selectChipText,
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              numColumns={3}
            />
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.calcelButton}
                onPress={closeModal}>
                <Text style={styles.cancelText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApply}>
                <Text style={styles.applyText}>
                  {selected.includes(0)
                    ? '전체 적용하기'
                    : `${selected.length}건 적용하기`}
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
    paddingBottom: Platform.OS == 'ios' ? 30 : 16,
  },
  homeIndicator: {
    width: 40,
    height: 5,
    borderRadius: 100,
    backgroundColor: '#CECFD6',
    marginTop: 12,
  },
  titleBox: {
    width: '100%',
    justifyContent: 'flex-start',
    paddingLeft: 17,
    paddingVertical: 20,
    borderBottomColor: '#F6F6F6',
    borderBottomWidth: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
  },
  samllTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222222',
    marginLeft: 4,
  },
  smallTitleBox: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterBox: {
    width: '100%',
    paddingTop: 18,
    paddingBottom: 4,
    paddingHorizontal: 16,
  },
  chip: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#E2E4E8',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 8,
    marginBottom: 12,
    flexDirection: 'row',
  },
  chipText: {
    fontSize: 14,
    color: '#3A424E',
    fontWeight: '400',
  },
  selectChipText: {
    color: '#A055FF',
    fontWeight: '600',
    marginLeft: 4,
  },
  calcelButton: {
    width: '49%',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#EFEFF3',
    marginRight: '2%',
  },
  cancelText: {
    color: '#6E7882',
    fontSize: 14,
    fontWeight: '400',
  },
  applyButton: {
    width: '49%',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#A055FF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#A055FF',
  },
  applyText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
});
