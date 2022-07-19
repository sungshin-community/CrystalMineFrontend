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
import { fontBold, fontMedium, fontRegular } from '../common/font';

interface Props {
  modalVisible: boolean;
  setModalVisible: any;
  title?: any;
  content?: any;
  isContentCenter?: boolean;
  purpleButtonText?: string;
  purpleButtonFunc: any;
  whiteButtonText?: string;
  whiteButtonFunc?: any;
}
export const ModalBottom = ({
  modalVisible,
  setModalVisible,
  title,
  content,
  isContentCenter = true,
  purpleButtonText,
  purpleButtonFunc,
  whiteButtonText,
  whiteButtonFunc,
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
                {title && (
                  <Text
                    style={[fontBold,
                      styles.title,
                    ]}>
                    {title}
                  </Text>
                )}
                {content && <Text style={[fontRegular, {textAlign: isContentCenter ? 'center' : 'left', fontSize: 13}]}>{content}</Text>}
              </View>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose, {marginTop: content ? 20 : 0}]}
                onPress={()=>purpleButtonFunc()}>
                <Text style={styles.textStyle}>{purpleButtonText}</Text>
              </TouchableOpacity>
              {whiteButtonText && (
                <TouchableOpacity
                  style={[styles.secondButton, styles.secondButtonClose]}
                  onPress={() => whiteButtonFunc()}>
                  <Text style={styles.secondButtonTextStyle}>
                    {whiteButtonText}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
      </View>
      {/* <Pressable hitSlop={10} onPress={()=>modalButtonFunc()}>
        {modalButton}
      </Pressable> */}
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // justifyContent: 'center',
    // alignItems: 'center',
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
  title: {
    textAlign: 'center',
    fontSize: 17,
    marginBottom: 20,
  },
});
