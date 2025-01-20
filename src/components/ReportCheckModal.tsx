import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {fontBold, fontMedium, fontRegular} from '../common/font';
import Toast from 'react-native-simple-toast';

interface ConfirmModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  isCheckedReportNum: number;
  detail: string;
  reportFunc: (
    reportId: number,
    reasonId: number,
    detail: string,
  ) => Promise<any>;
  reportId: number;
  modalType: string;
}

export const ReportCheckModal = ({
  modalVisible,
  setModalVisible,
  isCheckedReportNum,
  detail,
  reportFunc,
  reportId,
  modalType,
}: ConfirmModalProps) => {
  const handleConfirm = async () => {
    try {
      const result = await reportFunc(reportId, isCheckedReportNum, detail);
      if (
        result.code === 'CREATE_BOARD_REPORT_SUCCESS' ||
        result.code === 'CREATE_POST_REPORT_SUCCESS' ||
        result.code === 'CREATE_COMMENT_REPORT_SUCCESS'
      ) {
        setModalVisible(false);
        setTimeout(() => {
          Toast.show('신고하신 내용이 정상적으로 접수되었습니다.', Toast.SHORT);
        }, 100);
      } else if (
        result.code === 'BOARD_REPORT_FAIL_POINT_NOT_ENOUGH' ||
        result.code === 'POST_REPORT_FAIL_POINT_NOT_ENOUGH' ||
        result.code === 'COMMENT_REPORT_FAIL_POINT_NOT_ENOUGH'
      ) {
        setModalVisible(false);
        setTimeout(() => {
          Toast.show(
            '보유 포인트가 부족하여 신고가 불가능합니다.',
            Toast.SHORT,
          );
        }, 100);
      } else if (
        result.code === 'BOARD_REPORT_DUPLICATION' ||
        result.code === 'POST_REPORT_DUPLICATION' ||
        result.code === 'COMMENT_REPORT_DUPLICATION'
      ) {
        setModalVisible(false);
        setTimeout(() => {
          Toast.show('이미 신고한 {modalType}입니다.', Toast.SHORT);
        }, 100);
      } else if (result.code === 'REPORT_FAIL_REASON_DETAIL_NECESSARY') {
        setModalVisible(false);
        setTimeout(() => {
          Toast.show('기타 사유에 대한 내용이 필요합니다', Toast.SHORT);
        }, 100);
      } else {
        setModalVisible(false);
      }
    } catch (error) {
      setModalVisible(false);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={confirmStyles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={confirmStyles.modalView}>
              <View>
                <Text style={[fontBold, confirmStyles.modalText]}>
                  해당 {modalType}을 신고하시겠어요?
                </Text>
              </View>
              <View>
                <Text style={[fontRegular, {color: '#89919A', fontSize: 14}]}>
                  {`• 신고 후에는 내용을 수정할 수 없습니다.`}
                </Text>
                <Text style={[fontRegular, {color: '#89919A', fontSize: 14}]}>
                  {`• 무분별한 신고를 방지하기 위해 신고 1회당 10포인트가\n   차감됩니다.`}
                </Text>
              </View>
              <View style={confirmStyles.buttonContainer}>
                {/* <TouchableOpacity
                  style={[confirmStyles.button, confirmStyles.buttonClose]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={[confirmStyles.textStyle, {color: '#6E7882'}]}>
                    아니요.
                  </Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={[confirmStyles.button, confirmStyles.buttonConfirm]}
                  onPress={handleConfirm}>
                  <Text
                    style={[
                      confirmStyles.textStyle,
                      fontBold,
                      {color: 'white'},
                    ]}>
                    확인했어요.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const confirmStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: Dimensions.get('window').width,
    height: 210,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 28,
    // width: Dimensions.get('window').width * 0.9,
  },
  button: {
    height: 44,
    borderRadius: 4,
    padding: 12,
    justifyContent: 'center',
  },
  buttonClose: {
    width: 169,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#EFEFF3',
  },
  buttonConfirm: {
    width: 'auto',
    backgroundColor: '#A055FF',
  },
  textStyle: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 14,
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '600',
  },
});
