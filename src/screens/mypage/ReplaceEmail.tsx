import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import DeleteIcon from '../../../resources/icon/DeleteIcon';
import {PurpleRoundButton} from '../../components/Button';

export default function ReplaceEmail(navigation) {
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <View style={styles.title}>
          <Text style={styles.purple}>현재 등록된 이메일</Text>
          <TouchableOpacity>
            <DeleteIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.email}>
          <Text>crystal124@naver.com</Text>
        </View>
        <View style={styles.guide}>
          <Text style={styles.purple}>대체 이메일 등록 이용 안내</Text>
          <Text style={{
              color: '#89919A',
              fontSize: 14,
              marginTop: 15,
            }}>
            대체 이메일이 등록되어 있을 경우,{'\n'}
            수정 광산의 공식 메일이 대체 이메일로 전송됩니다.{'\n'}
            {'\n'}
            반드시 성신 지메일을 이용할 수 없는 경우에만{'\n'}
            대체 이메일을 등록해주세요.
          </Text>
        </View>
      </View>
      <View style={styles.btn}>
        <PurpleRoundButton
          onClick={() => {
            navigation.navigate('#');
          }}
          text="대체 이메일 등록하기"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  wrap: {
    flex: 1,
    width: '100%',
    padding: 24,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  email: {
    borderWidth: 1.5,
    borderColor: '#CECFD6',
    borderRadius: 10,
    marginBottom: 70,
    padding: 20,
  },
  guide: {bottom: 34},
  purple: {
    fontSize: 16,
    color: '#A055FF',
  },
  btn: {
    bottom: 34,
  },
});
