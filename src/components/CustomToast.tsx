import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

interface CustomToastProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

const CustomToast = ({visible, message, onClose}: CustomToastProps) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.toast}>
          <Text style={styles.text}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 90,
  },
  toast: {
    backgroundColor: '#222222',
    padding: 15,
    borderRadius: 8,
    width: 343,
    height: 48,
    //maxWidth: Dimensions.get('window').width * 0.8,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
  closeButton: {
    paddingLeft: 10,
  },
  closeText: {
    color: '#B881FF',
    fontSize: 12,
  },
});

export default CustomToast;
