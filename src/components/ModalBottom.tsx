import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

interface Props {
  modalText?: string;
  modalButtonText?: string;
  modalButton?: any;
  modalBody?: React.ReactNode;
  setModalVisible: any;
  modalVisible: boolean;
  modalButtonFunc: any;
}
export const ModalBottom = ({
  modalText,
  modalButtonText,
  modalButton,
  modalBody = '',
  setModalVisible,
  modalVisible,
  modalButtonFunc = () => setModalVisible(!modalVisible),
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
          <Pressable style={{flex:1,backgroundColor:'transparent',}} onPress={()=>setModalVisible(!modalVisible)}/>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{modalText}</Text>
              <View style={{marginHorizontal: 20}}>
                <Text style={styles.modalBody}>{modalBody}</Text>
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
      <Pressable onPress={modalButtonFunc}>{modalButton}</Pressable>
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
    // width: 327,
    width: Dimensions.get('window').width - 48,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 30,
    paddingBottom: 24,
    paddingHorizontal: 24,
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
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'SpoqaHanSansNeo-Regular',
    lineHeight: 18,
    marginBottom: 20,
  },
  modalBody: {
    marginBottom: 20,
    fontSize: 13,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    textAlign: 'left',
    lineHeight: 25,
  },
});
