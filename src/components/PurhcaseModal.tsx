// PurchaseModal.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface PurchaseModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  author: string;
  price: number;
  currentPoints: number;
}
// 네비게이션 파라미터 타입 정의
type RootStackParamList = {
  PointScreen: {
    points: number;
    username: string;
  };
  // 다른 화면들도 필요하다면 여기에 추가
};

// navigation 타입 지정
type NavigationType = NavigationProp<RootStackParamList>;

const PurchaseModal = ({
  visible,
  onClose,
  onConfirm,
  title,
  author,
  price,
  currentPoints,
}: PurchaseModalProps) => {
  const navigation = useNavigation<NavigationType>();
  const handlePointCharge = () => {
    onClose(); // 모달 닫기
    navigation.navigate('PointScreen', {
      points: currentPoints, // 현재 보유 포인트 전달
      username: '', // username도 필요하다면 props로 받아서 전달해야 합니다
    });
  };
  const isInsufficientPoints = currentPoints < price;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View
          style={styles.modalContainer}
          onStartShouldSetResponder={() => true}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>이모티콘 구매하기</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>구매 이후에는 환불이 불가능해요.</Text>

          <View style={styles.itemContainer}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{title}</Text>
              <Text style={styles.itemAuthor}>{author}</Text>
            </View>
            <Text style={styles.itemPrice}>{price.toLocaleString()}P</Text>
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>잔여 포인트</Text>
            <Text
              style={[
                styles.totalAmount,
                isInsufficientPoints && styles.insufficientPoints,
              ]}>
              {currentPoints.toLocaleString()}P
            </Text>
          </View>

          {isInsufficientPoints ? (
            <TouchableOpacity
              style={styles.chargeButton}
              onPress={handlePointCharge}>
              <Text style={styles.chargeButtonText}>포인트 충전하러 가기</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.purchaseButton} onPress={onConfirm}>
              <Text style={styles.purchaseButtonText}>구매하기</Text>
            </TouchableOpacity>
          )}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginBottom: 20,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemAuthor: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '500',
  },
  purchaseButton: {
    backgroundColor: '#A055FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  purchaseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  insufficientPoints: {
    color: '#FF5D5D', // 빨간색으로 변경
  },
  chargeButton: {
    backgroundColor: '#A055FF', // 보라색 배경 유지
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  chargeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PurchaseModal;
