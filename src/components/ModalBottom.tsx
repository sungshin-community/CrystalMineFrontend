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
import {fontBold, fontMedium, fontRegular} from '../common/font';

interface Props {
  modalVisible: boolean;
  setModalVisible: any;
  title?: any;
  content?: any;
  isContentCenter?: boolean;
  purpleButtonText?: string;
  purpleButtonFunc?: any;
  purpleButtonText2?: string;
  purpleButtonFunc2?: any;
  whiteButtonText?: string;
  whiteButtonFunc?: any;
  setDim?: boolean;
  setDisableClose?: boolean;
}
export const ModalBottom = ({
  modalVisible,
  setModalVisible,
  title,
  content,
  isContentCenter = true,
  purpleButtonText,
  purpleButtonFunc,
  purpleButtonText2,
  purpleButtonFunc2,
  whiteButtonText,
  whiteButtonFunc,
  setDim = true,
  setDisableClose = false,
}: Props) => {
  return (
    <>
      {setDim && modalVisible ? (
        <View
          style={{
            position: 'absolute',
            flex: 1,
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 100,
            elevation: 1,
          }}
        />
      ) : null}
      <View style={[styles.centeredView]}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          {!setDisableClose && (
            <Pressable
              style={{flex: 1, backgroundColor: 'rgba(34, 34, 34, 0.5)'}}
              onPress={() => setModalVisible(!modalVisible)}
            />
          )}
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{alignSelf: 'flex-start'}}>
                {title && <Text style={[fontBold, styles.title]}>{title}</Text>}
                {content && (
                  <Text
                    style={[
                      fontRegular,
                      {
                        textAlign: isContentCenter ? 'center' : 'left',
                        fontSize: 14,
                        color: '#89919A',
                      },
                    ]}>
                    {content}
                  </Text>
                )}
              </View>
              {purpleButtonText && purpleButtonText !== 'none' && (
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.buttonClose,
                    {marginTop: content ? 20 : 0},
                  ]}
                  onPress={() => purpleButtonFunc()}>
                  <Text style={styles.textStyle}>{purpleButtonText}</Text>
                </TouchableOpacity>
              )}
              {purpleButtonText2 && (
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.buttonClose,
                    {marginTop: content ? 20 : 0},
                  ]}
                  onPress={() => purpleButtonFunc2()}>
                  <Text style={styles.textStyle}>{purpleButtonText2}</Text>
                </TouchableOpacity>
              )}
              {whiteButtonText && whiteButtonText !== 'none' && (
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
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: Dimensions.get('window').width * 0.15,
    //left: '50%',
    //transform: [{translateX: -Dimensions.get('window').width * 0.445}],
    transform: [{translateY: Dimensions.get('window').height * 0.1}],
  },
  modalView: {
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 24,
    marginBottom: 20,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    //paddingHorizontal: 24,
    // alignItems: 'center',
    //shadowColor: '#000',
    /* shadowOffset: {
      width: 0,
      height: 0,
    }, */
    //shadowOpacity: 0.25,
    //shadowRadius: 4,
    //elevation: 5,
  },
  button: {
    borderRadius: 4,
    padding: 12,
    height: 44,
  },
  secondButton: {
    borderRadius: 4,
    padding: 12,
    height: 44,
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
    fontWeight: '700',
  },
  secondButtonTextStyle: {
    color: '#6E7882',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
});
