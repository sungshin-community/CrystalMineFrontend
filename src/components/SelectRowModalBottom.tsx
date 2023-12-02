import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';

import RadioButtonUnChecked, {
  RadioButtonChecked,
} from '../../resources/icon/RadioButton';
import {getAuthentication} from '../common/homeApi';
import {getHundredsDigit} from '../common/util/statusUtil';
import {logout} from '../common/authApi';

interface Props {
  modalVisible: boolean;
  setModalVisible: any;
  isContentCenter?: boolean;
  purpleButtonText?: string;
  purpleButtonFunc: any;
  setDim?: boolean;
  setDisableClose?: boolean;
  anonymous: boolean;
}

export const MessageModalBottom = ({
  modalVisible,
  setModalVisible,
  isContentCenter = true,
  purpleButtonFunc,
  setDim = true,
  setDisableClose = false,
  anonymous,
}: Props) => {
  const navigation = useNavigation();
  const [isAnonymous, setIsAnonymos] = useState<boolean>(true);
  const [nickname, setNickname] = useState<string>('');

  useEffect(() => {
    async function init() {
      const response = await getAuthentication();
      if (response.status === 401) {
        setTimeout(function () {
          Toast.show(
            '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
            Toast.SHORT,
          );
        }, 100);
        logout();
        navigation.reset({routes: [{name: 'SplashHome'}]});
      } else if (getHundredsDigit(response.status) === 2) {
        setNickname(response.data.data.nickname);
      }
    }
    init();
  });
  console.log(anonymous, 'anonymous');
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
              style={{flex: 1}}
              onPress={() => setModalVisible(!modalVisible)}
            />
          )}
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.title}>쪽지 보낼 방식을 선택해주세요.</Text>
                <Text
                  style={[
                    {
                      textAlign: isContentCenter ? 'center' : 'left',
                      fontSize: 12,
                      marginBottom: 20,
                    },
                  ]}>
                  한 번 선택하면 해당 대화방에서는 더이상 변경할 수 없습니다.
                  익명의 상대에게는 익명으로만 쪽지를 보낼 수 있습니다.
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: Dimensions.get('window').width * 0.53,
                  }}>
                  <Pressable
                    style={{flexDirection: 'row'}}
                    onPress={() => {
                      setIsAnonymos(true);
                    }}>
                    {isAnonymous ? (
                      <RadioButtonChecked style={{marginRight: 10}} />
                    ) : (
                      <RadioButtonUnChecked style={{marginRight: 10}} />
                    )}
                    <Text>익명</Text>
                  </Pressable>
                  <Pressable
                    style={{flexDirection: 'row'}}
                    onPress={() => {
                      anonymous
                        ? Toast.show(
                            '익명으로만 쪽지를 보낼 수 있습니다.',
                            Toast.SHORT,
                          )
                        : setIsAnonymos(false);
                    }}>
                    {!isAnonymous ? (
                      <RadioButtonChecked style={{marginRight: 10}} />
                    ) : (
                      <RadioButtonUnChecked style={{marginRight: 10}} />
                    )}
                    <Text>닉네임({nickname})</Text>
                  </Pressable>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose, {marginTop: 20}]}
                onPress={() => {
                  purpleButtonFunc(isAnonymous);
                }}>
                <Text style={styles.textStyle}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    bottom: Dimensions.get('window').width * 0.15,
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
    marginBottom: 10,
  },
});
