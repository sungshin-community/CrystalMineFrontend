import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

interface Props {
  modalText?: string;
  modalButtonText?: string;
  modalButton?: any;
}
export const ModalBottom = ({
  modalText,
  modalButtonText,
  modalButton,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View
      style={[
        styles.centeredView,
        {backgroundColor: modalVisible ? 'rgba(0,0,0,0.5)' : 'transparent'},
      ]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalText}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>{modalButtonText}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>{modalButton}</Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    //Top 변경예정
    marginTop: 600,
    margin: 2,
    width: 327,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 12,
    height: 42,
  },
  buttonClose: {
    backgroundColor: '#A055FF',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  modalText: {
    marginBottom: 40,
    textAlign: 'center',
  },
});
