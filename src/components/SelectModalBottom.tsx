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
} from 'react-native';
import {Checked} from '../../resources/icon/CheckBox';
import RadioButtonUnChecked, {
  RadioButtonChecked,
} from '../../resources/icon/RadioButton';
import {getReportReason} from '../common/boardApi';
import {fontBold, fontMedium, fontRegular} from '../common/font';
import Toast from 'react-native-simple-toast';

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
}
export const SelectModalBottom = ({
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
}: Props) => {
  const [reason, setReason] = useState<Reason[]>([]);
  const [isCheckedReportNum, setIsCheckedReportNum] = useState<number>(1);
  const [detail, setDetail] = useState<string>('');
  useEffect(() => {
    async function init() {
      const result = await getReportReason();
      setReason(result);
    }
    init();
  }, []);
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
                {title && <Text style={[fontBold, styles.title]}>{title}</Text>}
                <Text
                  style={[
                    {
                      color: '#CCCCCC',
                      textAlign: 'center',
                      fontSize: 12,
                      marginBottom: 20,
                    },
                    fontRegular,
                  ]}>
                  신고 사유에 대한 자세한 내용은 {`\n`} 마이페이지 > 수정광산
                  이용방향을 참고하여 주세요.
                </Text>
              </View>
              <ReportItem
                list={reason}
                isCheckedReportNum={isCheckedReportNum}
                setIsCheckedReportNum={setIsCheckedReportNum}
                detail={detail}
                setDetail={setDetail}
              />
              <TouchableOpacity
                style={[styles.button, styles.buttonClose, {marginTop: 28}]}
                onPress={async () => {
                  const result = await reportFunc(
                    reportId,
                    isCheckedReportNum,
                    detail,
                  );
                  Toast.show(result.detail, Toast.LONG);
                  setModalVisible(false);
                }}>
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
    </>
  );
};
interface ReportItemProps {
  list: Reason[];
  isCheckedReportNum: number;
  setIsCheckedReportNum: any;
  detail?: string;
  setDetail?: any;
}
export const ReportItem = ({
  list,
  isCheckedReportNum,
  setIsCheckedReportNum,
  detail,
  setDetail,
}: ReportItemProps) => {
  const inputRef = useRef(null);

  return (
    <>
      {list.map(item => (
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 6,
            alignItems: 'center',
          }}
          key={item.id}>
          <Pressable onPress={() => setIsCheckedReportNum(item.id)}>
            {isCheckedReportNum === item.id ? (
              <RadioButtonChecked style={{marginRight: 10}} />
            ) : (
              <RadioButtonUnChecked style={{marginRight: 10}} />
            )}
          </Pressable>
          <Text style={[fontRegular]}>
            {item.num} {item.reason}
          </Text>
        </View>
      ))}
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 4,
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() => {
            setIsCheckedReportNum(list.length + 1);
            // inputRef.current.focus();
            setDetail(null)
          }}>
          {isCheckedReportNum === list.length + 1 ? (
            <RadioButtonChecked style={{marginRight: 10}} />
          ) : (
            <RadioButtonUnChecked style={{marginRight: 10}} />
          )}
        </Pressable>
        <Text>기타</Text>
        {isCheckedReportNum !== list.length + 1 ? (
          <View
            style={{
              width: 240,
              marginLeft: 5,
              height: 24,
              backgroundColor: '#F6F6F6',
              borderRadius: 10,
            }}></View>
        ) : (
          <View style={{width: 240, marginLeft: 5, height: 24}}>
            <TextInput
              ref={inputRef}
              value={detail}
              onChangeText={value => {
                setDetail(value);
              }}
              editable={isCheckedReportNum === list.length + 1 ? true : false}
              style={{
                backgroundColor: '#F6F6F6',
                fontSize: 13,
                borderRadius: 10,
                padding: 0,
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
  title: {
    textAlign: 'center',
    fontSize: 17,
    marginBottom: 16,
  },
});
