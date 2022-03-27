import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
} from 'react-native';

interface Props {
  modalText?: string;
  modalButtonText?: string;
  modalButton?: any;
  modalBody?: React.ReactNode;
  setModalVisible: any;
  modalVisible: boolean;
  modalButtonFunc: any;
  fontSize: number;
}
export const ModalBottom = ({
  modalText,
  modalButtonText,
  modalButton,
  modalBody = '',
  setModalVisible,
  modalVisible,
  modalButtonFunc = () => setModalVisible(!modalVisible),
  fontSize,
}: Props) => {
  return (
    <>
      <View style={[styles.centeredView]}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <Pressable
            style={{flex: 1}}
            onPress={() => setModalVisible(!modalVisible)}
          />
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{alignItems: 'center'}}>
                <Text style={[styles.modalText, {fontSize: fontSize}]}>
                  {modalText}
                </Text>
                <View>{modalBody}</View>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={modalButtonFunc}>
                <Text style={styles.textStyle}>{modalButtonText}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <Pressable hitSlop={10} onPress={modalButtonFunc}>
        {modalButton}
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 45,
    left: '50%',
    transform: [{translateX: -Dimensions.get('window').width * 0.445}],
  },
  modalView: {
    margin: 2,
    width: Dimensions.get('window').width - 48,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 24,
    // alignItems: 'center',
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
    marginTop: 20,
  },
  buttonClose: {
    backgroundColor: '#A055FF',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  modalText: {
    textAlign: 'center',
    fontFamily: 'SpoqaHanSansNeo-Regular',
    marginBottom: 20,
  },
});
