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
  isWriting?: boolean;
  isProfileModify?: boolean;
  purpleButtonText?: string;
  purpleButtonFunc?: any;
  purpleButtonText2?: string;
  purpleButtonFunc2?: any;
  whiteButtonText?: string;
  whiteButtonFunc?: any;
  setDim?: boolean;
  setDisableClose?: boolean;
  isLogoutModal?: boolean;
}
export const ModalBottom = ({
  modalVisible,
  setModalVisible,
  title,
  content,
  isContentCenter = true,
  isWriting = false,
  isProfileModify,
  purpleButtonText,
  purpleButtonFunc,
  purpleButtonText2,
  purpleButtonFunc2,
  whiteButtonText,
  whiteButtonFunc,
  setDim = true,
  setDisableClose = false,
  isLogoutModal = false,
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
            <View
              style={[
                styles.modalView,
                {
                  height: isProfileModify ? 375 : 'auto',
                },
              ]}>
              <View style={{alignSelf: 'flex-start'}}>
                {title && <Text style={[styles.title]}>{title}</Text>}

                {content && (
                  <View
                    style={{
                      width: Dimensions.get('window').width,
                      // justifyContent: 'flex-start',
                      // alignContent: 'flex-start',
                    }}>
                    {isProfileModify ? (
                      <>{content}</>
                    ) : (
                      <Text
                        style={[
                          fontRegular,
                          {
                            textAlign: isContentCenter ? 'center' : 'left',
                            fontSize: 14,
                            fontWeight: '400',
                            color: '#3A424E',
                            lineHeight: 20,
                            marginLeft: isContentCenter ? 0 : 16,
                          },
                        ]}>
                        {content}
                      </Text>
                    )}
                  </View>
                )}
              </View>
              {isWriting && (
                <View
                  style={{
                    height: 24,
                  }}
                />
              )}
              <View
                style={[
                  styles.buttonContianer,
                  isLogoutModal && {
                    // 로그아웃 모달일 때만 적용되는 스타일
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 16,
                    paddingHorizontal: 16,
                  },
                ]}>
                {whiteButtonText && whiteButtonText !== 'none' && (
                  <TouchableOpacity
                    style={[
                      styles.secondButton,
                      styles.secondButtonClose,
                      isLogoutModal && {
                        // 로그아웃 모달일 때만 적용되는 스타일
                        width: '49%',
                        marginRight: 0,
                      },
                    ]}
                    onPress={() => whiteButtonFunc()}>
                    <Text style={styles.secondButtonTextStyle}>
                      {whiteButtonText}
                    </Text>
                  </TouchableOpacity>
                )}
                {purpleButtonText && purpleButtonText !== 'none' && (
                  <TouchableOpacity
                    style={[
                      styles.button,
                      styles.buttonClose,
                      isLogoutModal
                        ? {
                            // 로그아웃 모달일 때의 스타일
                            width: '49%',
                            marginLeft: 0,
                            marginTop: 0,
                          }
                        : {
                            // 일반 모달일 때의 스타일
                            width: isWriting ? '49%' : '100%',
                            marginLeft: 4,
                            marginTop: 28,
                          },
                    ]}
                    onPress={() => purpleButtonFunc()}>
                    <Text style={styles.textStyle}>{purpleButtonText}</Text>
                  </TouchableOpacity>
                )}
                {purpleButtonText2 && (
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => purpleButtonFunc2()}>
                    <Text style={styles.textStyle}>{purpleButtonText2}</Text>
                  </TouchableOpacity>
                )}
              </View>
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 24,
    paddingBottom: 45,
    marginBottom: 24,
    //paddingHorizontal: Dimensions.get('window').width * 0.05,
    //paddingHorizontal: 24,
    //alignItems: 'center',
    //shadowColor: '#000',
    /* shadowOffset: {
      width: 0,
      height: 0,
    }, */
    //shadowOpacity: 0.25,
    //shadowRadius: 4,
    //elevation: 5,
  },
  buttonContianer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    // marginTop: 16,
    paddingHorizontal: 16,
    //paddingRight: 32,
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
    width: '49%',
  },
  buttonClose: {
    backgroundColor: '#A055FF',
  },
  secondButtonClose: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EFEFF3',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Pretendard-Bold',
  },
  secondButtonTextStyle: {
    color: '#6E7882',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
  },
  title: {
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 10,
    color: '#222222',
    marginLeft: 16,
    fontWeight: '600',
    fontFamily: 'Pretendard-Bold',
  },
});
