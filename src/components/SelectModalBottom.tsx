import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {fontMedium} from '../common/font';

interface Props {
  modalText?: any;
  modalButtonText?: string;
  modalButton?: any;
  modalBody?: any;
  setModalVisible: any;
  modalVisible: boolean;
  modalButtonFunc: any;
  isSecondButton?: boolean;
  modalSecondButtonText?: string;
  modalSecondButtonFunc?: any;
  fontSize?: number;
}
export const SelectModalBottom = ({
  modalText,
  modalButtonText,
  modalButton,
  setModalVisible,
  modalVisible,
  modalButtonFunc,
  isSecondButton = false,
  modalSecondButtonText,
  modalSecondButtonFunc,
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
                <Text style={[fontMedium, {fontSize: 17, marginBottom: 15}]}>
                  {modalText}
                </Text>
                <Text
                  style={{
                    color: '#CCCCCC',
                    textAlign: 'center',
                    fontSize: 12,
                    marginBottom: 25,
                  }}>
                  신고 사유에 대한 자세한 내용은 {`\n`} 마이페이지 > 수정광산
                  이용방향을 참고하여 주세요.
                </Text>
                <Text>TODO: 이용 방향 정해지면 채우기</Text>
              </View>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={modalButtonFunc}>
                <Text style={styles.textStyle}>{modalButtonText}</Text>
              </TouchableOpacity>
              {isSecondButton && (
                <TouchableOpacity
                  style={[styles.secondButton, styles.secondButtonClose]}
                  onPress={() => modalSecondButtonFunc()}>
                  <Text style={styles.secondButtonTextStyle}>
                    {modalSecondButtonText}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
      </View>
      <Pressable hitSlop={10} onPress={()=>modalButtonFunc()}>
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
      height: 0,
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
  secondButton: {
    borderRadius: 10,
    padding: 12,
    height: 42,
    marginTop: 8,
  },
  buttonClose: {
    backgroundColor: '#A055FF',
  },
  secondButtonClose: {
    backgroundColor: '#fff',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  secondButtonTextStyle: {
    color: '#222222',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  modalText: {
    textAlign: 'center',
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
});
