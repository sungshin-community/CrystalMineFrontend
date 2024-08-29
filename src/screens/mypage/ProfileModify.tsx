import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import ProfileModifyIcon from '../../../resources/icon/ProfileModifyIcon';

const ProfileModify: React.FC = () => {
  const [nickname, setNickname] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ProfileModifyIcon style={styles.icon} />

        {/* 닉네임 입력창 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>닉네임</Text>
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
          />
        </View>

        {/* 소속학과 입력창 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>소속학과</Text>
          <TextInput
            style={styles.input}
            value={department}
            onChangeText={setDepartment}
          />
        </View>

        {/* 재학상태 입력창 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>재학상태</Text>
          <TextInput
            style={styles.input}
            value={status}
            onChangeText={setStatus}
          />
        </View>

        {/* 학번 입력창 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>학번</Text>
          <TextInput
            style={styles.input}
            value={status}
            onChangeText={setStatus}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    alignItems: 'center',
    paddingTop: 20,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    marginBottom: 10,
    color: '#B9BAC1',
  },
  input: {
    height: 40,
    borderColor: '#B9BAC1',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  icon: {
    marginBottom: 30,
  },
});

export default ProfileModify;
