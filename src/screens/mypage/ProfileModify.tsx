import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import ProfileModifyIcon from '../../../resources/icon/ProfileModifyIcon';
import {ModalBottom} from '../../components/ModalBottom';
import {MajorRow} from '../../components/MajorRow';
import {getMajorList} from '../../common/authApi';
import Major from '../../classes/Major';
import {getUser, updateProfile} from '../../common/myPageApi';
import User from '../../classes/User';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Description} from '../../components/Top';
import Toast from 'react-native-simple-toast';
import {PurpleRoundButton} from '../../components/Button';
if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('white');
  StatusBar.setBarStyle('dark-content');
}

type RootStackParamList = {
  DirectionAgreeMyPage: {studentId: number};
};

type Props = NativeStackScreenProps<RootStackParamList>;

const ProfileModify: React.FC<Props> = ({navigation}: Props) => {
  const [nickname, setNickname] = useState<string>('');
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [majorList, setMajorList] = useState<Major[]>([]);
  const [selectedMajorId, setSelectedMajorId] = useState<number>(-1);
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getList() {
      try {
        const list = await getMajorList();
        setMajorList(list);
      } catch (error) {
        setTimeout(() => {
          Toast.show('학과 목록을 불러오는데 실패했습니다.', Toast.SHORT);
        }, 100);
      }
    }
    async function getUserInfo() {
      try {
        const response = await getUser();
        if (response?.data?.data) {
          setUser(response.data.data);
          setNickname(response.data.data.nickname || '');
          setSelectedMajorId(response.data.data.departmentId || -1);
        }
      } catch (error) {
        setTimeout(() => {
          Toast.show('사용자 정보를 불러오는데 실패했습니다.', Toast.SHORT);
        }, 100);
      }
    }
    getList();
    getUserInfo();
  }, []);

  const handleSubmit = async () => {
    if (!nickname || selectedMajorId === -1) {
      setTimeout(() => {
        Toast.show('닉네임과 학과를 모두 입력해주세요.', Toast.SHORT);
      }, 100);
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    try {
      const result = await updateProfile({
        departmentId: selectedMajorId,
        nickname: nickname,
      });

      if (result === 'UPDATE_PROFILE_SUCCESS') {
        setTimeout(() => {
          Toast.show('프로필이 성공적으로 수정되었습니다.', Toast.SHORT);
        }, 100);
        navigation.pop();
      } else if (
        result === 'NICKNAME_DUPLICATION' &&
        nickname !== user?.nickname
      ) {
        setIsDuplicate(true);
        setTimeout(() => {
          Toast.show('이미 사용중인 닉네임입니다.', Toast.SHORT);
        }, 100);
      } else if (result === 'DEPARTMENT_NOT_FOUND') {
        setTimeout(() => {
          Toast.show('학과 정보를 찾을 수 없습니다.', Toast.SHORT);
        }, 100);
      } else {
        setTimeout(() => {
          Toast.show('프로필 수정에 실패했습니다.', Toast.SHORT);
        }, 100);
      }
    } catch (error) {
      setTimeout(() => {
        Toast.show('프로필 수정 중 오류가 발생했습니다.', Toast.SHORT);
      }, 100);
    } finally {
      setIsLoading(false);
    }
  };
  const selectMajor = (major: Major) => {
    setSelectedMajorId(major.id);
    setModalVisible(false);
  };

  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputFocusOut = () => {
    setIsFocused(false);
  };

  const getSelectedMajorName = () => {
    const major = majorList.find(m => m.id === selectedMajorId);
    return major ? major.name : '학과 선택하기';
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.content}>
        <ProfileModifyIcon style={styles.icon} />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>닉네임</Text>
          <TextInput
            style={[
              styles.input,
              isFocused && styles.focusedInput,
              isDuplicate && styles.errorInput,
            ]}
            value={nickname}
            onChangeText={(value: string) => {
              setNickname(value.replace(/\s/g, ''));
              setIsDuplicate(false);
            }}
            onFocus={onInputFocus}
            onBlur={onInputFocusOut}
            placeholder="닉네임"
            placeholderTextColor="#A0AAB4"
            maxLength={10}
            editable={!isLoading}
          />
          {isDuplicate && (
            <Text style={styles.errorMessage}>
              사용할 수 없는 닉네임입니다.
            </Text>
          )}
          <Description style={styles.descriptionText}>
            공백 없이 10자 이하로 구성해주세요.
          </Description>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>소속학과</Text>
          <Pressable
            style={[
              styles.departmentButton,
              isLoading && styles.disabledButton,
            ]}
            onPress={() => !isLoading && setModalVisible(true)}>
            <Text style={styles.departmentButtonText}>
              {getSelectedMajorName()}
            </Text>
            <Text style={styles.arrowDown}>▼</Text>
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>학번</Text>
          <View style={styles.studentIdBox}>
            <Text style={styles.studentIdText}>{user?.yearOfEntrance}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            (!nickname || selectedMajorId === -1 || isLoading) &&
              styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={!nickname || selectedMajorId === -1 || isLoading}>
          <Text style={styles.submitButtonText}>
            {isLoading ? '처리중...' : '완료'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <ModalBottom
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="소속 학과 선택"
        content={
          <ScrollView style={styles.majorList}>
            {majorList.map((major, index) => (
              <MajorRow
                key={index}
                major={major}
                selectMajor={selectMajor}
                style={{
                  color: major.id === selectedMajorId ? '#a055ff' : '#000000',
                }}
                selected={major.id === selectedMajorId}
              />
            ))}
          </ScrollView>
        }
        isContentCenter={false}
        purpleButtonText="취소"
        purpleButtonFunc={() => setModalVisible(false)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    marginBottom: 10,
    color: '#B9BAC1',
  },
  input: {
    height: 40,
    borderColor: '#D7DCE6',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    fontSize: 16,
    color: '#222222',
  },
  focusedInput: {
    borderColor: '#A055FF',
  },
  errorInput: {
    borderColor: '#FF0000',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  submitButton: {
    backgroundColor: '#A055FF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
    width: 343,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#D7DCE6',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  departmentButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#FFFFFF',
    borderColor: '#D7DCE6',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  departmentButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  arrowDown: {
    fontSize: 16,
    color: '#000000',
  },
  majorList: {
    maxHeight: 300,
  },
  textDescription: {
    fontSize: 15,
    color: '#87919B',
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  errorMessage: {
    marginTop: 5,
    color: '#FF0000',
    fontSize: 12,
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  descriptionText: {
    marginTop: 8,
    fontSize: 13,
    color: '#87919B',
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  studentIdBox: {
    height: 40,
    backgroundColor: '#FFFFFF',
    borderColor: '#D7DCE6',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  studentIdText: {
    fontSize: 16,
    color: '#222222',
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
});

export default ProfileModify;
