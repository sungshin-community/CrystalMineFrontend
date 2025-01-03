import React, {useEffect, useState, useRef} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardEvent,
  Keyboard,
} from 'react-native';
import {Checked} from '../../resources/icon/CheckBox';
import RadioButtonUnChecked, {
  RadioButtonChecked,
} from '../../resources/icon/RadioButton';
import {getReportReason, getSecondReportReason} from '../common/boardApi';
import {fontBold, fontMedium, fontRegular} from '../common/font';
import Toast from 'react-native-simple-toast';
import CancelButton from '../../resources/icon/Cancel';
import {ReportCheckModal} from './ReportCheckModal';

interface Reason {
  id: number;
  num: string;
  reason: string;
}
interface Props {
  modalVisible: boolean;
  setModalVisible: any;
  title?: any;
  content?: any;
  isContentCenter?: boolean;
  purpleButtonText?: string;
  reportId?: number;
  reportFunc?: any;
  whiteButtonText?: string;
  whiteButtonFunc?: any;
  setDim?: boolean;
  modalType?: string;
}
export const ReportModalBottom = ({
  modalVisible,
  setModalVisible,
  title,
  content,
  isContentCenter = true,
  purpleButtonText,
  reportId,
  reportFunc,
  whiteButtonText,
  whiteButtonFunc,
  setDim = true,
  modalType = '게시글',
}: Props) => {
  const [reason, setReason] = useState<Reason[]>([]);
  const [isCheckedReportNum, setIsCheckedReportNum] = useState<number>(1);
  const [detail, setDetail] = useState<string>('');
  const inputRef = useRef(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [checkModalVisible, setCheckModalVisible] = useState(false);

  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputFocusOut = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const onKeyboardDidshow = (e: KeyboardEvent) => {
    setKeyboardHeight(e.endCoordinates.height);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidshow,
    );
    return () => {
      showSubscription.remove();
    };
  }, []);
  useEffect(() => {
    async function init() {
      const result = await getReportReason();
      const resultTwo = await getSecondReportReason();
      setReason(result.data);
      console.log('reason', reason);
      console.log('resultTwo', resultTwo.data);
    }
    init();
  }, []);
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
      <View
        style={[
          styles.centeredView,
          {
            bottom:
              Platform.OS == 'ios'
                ? isFocused
                  ? keyboardHeight + 120
                  : Dimensions.get('window').width * 0.15
                : Dimensions.get('window').width * 0.15,
          },
        ]}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <Pressable
            style={{flex: 1, backgroundColor: 'rgba(34, 34, 34, 0.5)'}}
            onPress={() => setModalVisible(!modalVisible)}
          />
          <View
            style={[
              styles.centeredView,
              {
                bottom:
                  Platform.OS == 'ios'
                    ? isFocused
                      ? keyboardHeight + 120
                      : Dimensions.get('window').width * 0.15
                    : Dimensions.get('window').width * 0.15,
              },
            ]}>
            <View style={[styles.modalView]}>
              <View style={{alignSelf: 'flex-start'}}>
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  {title && <Text style={[styles.title]}>{title}</Text>}
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}>
                    <CancelButton />
                  </TouchableOpacity>
                </View>
                <Text
                  style={[
                    fontRegular,
                    {color: '#89919A', fontSize: 12, fontWeight: '400'},
                  ]}>
                  {`수정광산 팀이 검토 후 제재합니다.`}
                </Text>
                <Text
                  style={[
                    fontRegular,
                    {color: '#89919A', fontSize: 12, marginBottom: 20},
                  ]}>
                  {`신고 사유에 대한 자세한 내용은 수정광산 이용방향을 참고해 주세요.`}
                </Text>
                <ReportItem
                  list={reason}
                  isCheckedReportNum={isCheckedReportNum}
                  setIsCheckedReportNum={setIsCheckedReportNum}
                  detail={detail}
                  setDetail={setDetail}
                  onInputFocus={onInputFocus}
                  onInputFocusOut={onInputFocusOut}
                />
                {/* <Text
                  style={[
                    {
                      color: '#CCCCCC',
                      fontSize: 12,
                      marginBottom: 10,
                      marginTop: 20,
                    },
                    fontRegular,
                  ]}>
                  신고 사유에 대한 자세한 내용은 {`\n`} 마이페이지 > 수정광산
                  이용방향을 참고하여 주세요.
                </Text> */}
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginBottom: 28,
                  //backgroundColor: '#000',
                }}>
                {whiteButtonText && (
                  <TouchableOpacity
                    style={[styles.secondButton, styles.secondButtonClose]}
                    onPress={() => whiteButtonFunc()}>
                    <Text style={styles.secondButtonTextStyle}>
                      {whiteButtonText}
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setCheckModalVisible(true);
                    setModalVisible(false);
                  }}>
                  <Text style={styles.textStyle}>{purpleButtonText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <ReportCheckModal
        modalVisible={checkModalVisible}
        setModalVisible={setCheckModalVisible}
        isCheckedReportNum={isCheckedReportNum}
        detail={detail}
        reportFunc={reportFunc}
        reportId={reportId}
        modalType={modalType}
      />
    </>
  );
};
interface ReportItemProps {
  list: Reason[];
  isCheckedReportNum: number;
  setIsCheckedReportNum: any;
  detail?: string;
  setDetail?: any;
  inputRef?: any;
  onInputFocus?: any;
  onInputFocusOut?: any;
}
export const ReportItem = ({
  list,
  isCheckedReportNum,
  setIsCheckedReportNum,
  detail,
  setDetail,
  inputRef,
  onInputFocus,
  onInputFocusOut,
}: ReportItemProps) => {
  const numofETC = 10; // 기타 사유 id
  return (
    <>
      {list.slice(0, list.length).map(item => (
        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 12,
            alignItems: 'center',
          }}
          key={item.id}>
          <Pressable
            style={{flexDirection: 'row'}}
            onPress={() => setIsCheckedReportNum(item.id)}>
            {isCheckedReportNum === item.id ? (
              <RadioButtonChecked style={{marginRight: 12}} />
            ) : (
              <RadioButtonUnChecked style={{marginRight: 12}} />
            )}
            <Text
              style={[
                fontRegular,
                {
                  marginRight: 12,
                  fontFamily: 'Pretendard-Medium',
                  fontWeight: '500',
                  fontSize: 14,
                },
              ]}>
              {item.num}
            </Text>
            <Text style={[fontRegular, {fontSize: 14}]}>{item.reason}</Text>
          </Pressable>
        </View>
      ))}
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 4,
          alignItems: 'center',
          marginBottom: 28,
        }}>
        <Pressable
          style={{flexDirection: 'row'}}
          onPress={() => {
            setIsCheckedReportNum(numofETC);
            setDetail(null);
          }}>
          {isCheckedReportNum === numofETC ? (
            <RadioButtonChecked style={{marginRight: 12}} />
          ) : (
            <RadioButtonUnChecked style={{marginRight: 12}} />
          )}
          <Text style={fontMedium}>기타</Text>
        </Pressable>
        {isCheckedReportNum !== numofETC ? (
          <View
            style={{
              width: Dimensions.get('window').width - 200,
              marginLeft: 12,
              height: 24,
              backgroundColor: '#F6F6F6',
              borderRadius: 4,
            }}></View>
        ) : (
          <View
            style={{
              width: Dimensions.get('window').width - 200,
              marginLeft: 12,
              height: 24,
            }}>
            <TextInput
              ref={inputRef}
              value={detail}
              onChangeText={value => {
                setDetail(value);
              }}
              maxLength={50}
              editable={isCheckedReportNum === numofETC ? true : false}
              style={[
                fontRegular,
                {
                  backgroundColor: '#F6F6F6',
                  fontSize: 13,
                  borderRadius: 4,
                  padding: 8,
                  width: Dimensions.get('window').width - 200,
                  paddingVertical: Platform.OS == 'ios' ? 5 : 0,
                },
              ]}
              onFocus={(e: any) => {
                onInputFocus();
              }}
              onBlur={(e: any) => {
                onInputFocusOut();
              }}
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    //left: '50%',
    //transform: [{translateX: -Dimensions.get('window').width * 0.445}],
    transform: [{translateY: Dimensions.get('window').height * 0.1}],
    // bottom: 15
  },
  modalView: {
    //margin: 2,
    width: Dimensions.get('window').width,
    height: 474,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    // alignSelf: 'center',
    //shadowColor: '#000',
    /* shadowOffset: {
      //width: 0,
      //height: 0,
    }, */
    //shadowOpacity: 0.25,
    //shadowRadius: 4,
    //elevation: 5,
  },
  button: {
    width: '48%',
    height: 44,
    borderRadius: 4,
    padding: 12,
    //marginTop: 20,
  },
  secondButton: {
    width: '48%',
    height: 44,
    borderRadius: 4,
    padding: 12,
    //marginTop: 8,
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
    fontWeight: '600',
  },
});
