import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import TestBlindIcon from '../../resources/icon/TestBlindIcon';
import TestCheckIcon from '../../resources/icon/TestCheckIcon';
import TestArrowIcon from '../../resources/icon/TestArrowIcon';

type TestAlertItemProps = {
  onPressNotification: (message: string) => void;
};

const TestAlertItem = ({onPressNotification} : TestAlertItemProps) => {
  const alertMessages = [{message: '등업 알림 테스트', detail: '등업 세부 내용 테스트', backgroundColor:'#E5D2FC', icon: 'levelUp'},
                        {message: '웰컴포인트 알림 테스트', detail: '웰컴포인트 세부 내용 테스트', backgroundColor:'#FFFFFF', icon: 'welcome'},
                        {message: '블라인드 알림 테스트', detail: '블라인드 세부 내용 테스트', backgroundColor:'#F6F6F6', icon: 'warning'}];
  const [selectedAlertIndex, setSelectedAlertIndex] = useState<number | null>(null);
    return (
      <>
        <View>
          {alertMessages.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.alertItem, {backgroundColor: selectedAlertIndex === index ? 'rgba(0, 0, 0, 0.2)' : item.backgroundColor}]}
              onPress={() => {
                onPressNotification(item.message);
                setSelectedAlertIndex(index);
              }}>
            {item.icon === 'levelUp' && <TestArrowIcon style={styles.iconPosition}/>}
            {item.icon === 'welcome' && <TestCheckIcon style={styles.iconPosition}/>}
            {item.icon === 'warning' && <TestBlindIcon style={styles.iconPosition}/>}
            <Text style={styles.alertMessage}>{item.message}</Text>
            <Text style={styles.alertMsgDetail}>{item.detail}</Text>
            </TouchableOpacity>
              ))}
          </View>
      </>
    );
};

const styles = StyleSheet.create({
  alertItem: {
    flexDirection: 'column',
    height: '21%',
  },
  alertMessage: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    lineHeight: 22.5,
    marginLeft: 80,
    marginTop: 25,
  },
  alertMsgDetail: {
    color: '#6E7882',
    fontSize: 15,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    lineHeight: 22.5,
    marginLeft: 80,
  },
  iconPosition: {
    position: 'absolute',
    marginTop: 20,
    marginLeft: 20,
    paddingLeft: 50,
    paddingTop: 50,

  }
});

export default TestAlertItem;
