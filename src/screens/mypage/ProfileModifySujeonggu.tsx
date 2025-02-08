import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileModifyIcon from '../../../resources/icon/ProfileModifyIcon';
import {ModalBottom} from '../../components/ModalBottom';
import {MajorRow} from '../../components/MajorRow';
import {getMajorList} from '../../common/authApi';
import Major from '../../classes/Major';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  setDefaultProfileImage,
  getUser,
  uploadProfileImage,
} from '../../common/myPageApi';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import ArrowDownIcon from '../../../resources/icon/ArrowDown';
// Create new axios instance with baseURL
const customAxios = axios.create({
  baseURL: 'http://15.165.252.35:8080/',
});

// Add request interceptor to add auth token
customAxios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

type Props = NativeStackScreenProps<any>;

const ProfileModifySujeonggu: React.FC = ({navigation}: Props) => {
  const [nickname, setNickname] = useState<string>('');
  const [majorList, setMajorList] = useState<Major[]>([]);
  const [selectedMajorId, setSelectedMajorId] = useState<number>(-1);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [jobModalVisible, setJobModalVisible] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [careerModalVisible, setCareerModalVisible] = useState<boolean>(false);
  const [yearsModalVisible, setYearsModalVisible] = useState<boolean>(false);
  const [selectedCareer, setSelectedCareer] = useState<string>('');
  const [selectedYears, setSelectedYears] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const jobList = [
    '개발',
    '경영/비즈니스',
    '디자인',
    '마케팅/광고',
    '영업',
    '고객 서비스/리테일',
    '미디어',
    '교육',
    '엔지니어링/설계',
    '게임',
    '제조/생산',
    '의료/제약',
    '물류/무역',
    '법률',
    '식음료',
    '건설',
    '공공/복지',
    '금융',
  ];

  const careerTypes = ['신입', '경력'];
  const yearsList = ['1년차', '2년차', '3년차', '4년차', '5년차 이상'];

  useEffect(() => {
    async function fetchInitialData() {
      try {
        setIsLoading(true);
        // 사용자 데이터와 학과 리스트를 병렬로 가져오기
        const [userDto, majorListData] = await Promise.all([
          getUser(),
          getMajorList(),
        ]);

        setMajorList(majorListData);

        if (userDto.status === 200) {
          const userData = userDto.data.data;
          setUser(userData);
          setNickname(userData.nickname);

          // 학과 ID 설정
          const majorId = majorListData.find(
            m => m.name === userData.department,
          )?.id;
          if (majorId) {
            setSelectedMajorId(majorId);
          }
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
        Toast.show('데이터를 불러오는데 실패했습니다.', Toast.SHORT);
      } finally {
        setIsLoading(false);
      }
    }

    fetchInitialData();
  }, []);

  const selectJob = (job: string) => {
    setSelectedJob(job);
    setJobModalVisible(false);
  };

  const selectCareer = (career: string) => {
    setSelectedCareer(career);
    setCareerModalVisible(false);
    if (career === '경력') {
      setYearsModalVisible(true);
    } else {
      setSelectedYears('');
    }
  };

  const selectYears = (years: string) => {
    setSelectedYears(years);
    setYearsModalVisible(false);
  };

  const getSelectedMajorName = () => {
    const major = majorList.find(m => m.id === selectedMajorId);
    return major ? major.name : '학과 선택하기';
  };

  const getYearsNumber = (years: string): number => {
    if (!years) return 0;
    const match = years.match(/\d+/);
    if (match) {
      const number = parseInt(match[0]);
      return years.includes('이상') ? 5 : number;
    }
    return 0;
  };

  const handleSubmit = async () => {
    if (!selectedJob || !selectedCareer) {
      Toast.show('직무와 경력을 모두 선택해주세요.', Toast.SHORT);
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const experienceYears =
        selectedCareer === '신입' ? 0 : getYearsNumber(selectedYears);

      console.log('Request payload:', {
        experienceYears,
        ptJob: selectedJob,
      });

      const response = await customAxios.patch('/pantheon/profile/my', {
        experienceYears,
        ptJob: selectedJob,
      });

      if (response.status === 200) {
        Toast.show('프로필이 성공적으로 수정되었습니다.', Toast.SHORT);
        navigation.pop();
      } else {
        Toast.show('프로필 수정에 실패했습니다.', Toast.SHORT);
      }
    } catch (error: any) {
      console.error('Error updating profile:', error);
      Toast.show('프로필 수정 중 오류가 발생했습니다.', Toast.SHORT);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A055FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <ProfileModifyIcon style={styles.icon} />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>닉네임</Text>
          <View style={styles.departmentButton}>
            <Text style={styles.departmentButtonText}>{nickname}</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>소속학과</Text>
          <View style={styles.departmentButton}>
            <Text style={styles.departmentButtonText}>
              {getSelectedMajorName()}
            </Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>직무</Text>
          <Pressable
            style={styles.departmentButton}
            onPress={() => setJobModalVisible(true)}>
            <Text style={styles.departmentButtonText}>
              {selectedJob || '직무 선택하기'}
            </Text>
            <ArrowDownIcon />
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>경력</Text>
          <Pressable
            style={styles.departmentButton}
            onPress={() => setCareerModalVisible(true)}>
            <Text style={styles.departmentButtonText}>
              {selectedCareer
                ? selectedCareer === '경력'
                  ? `${selectedCareer} ${selectedYears}`
                  : selectedCareer
                : '경력 선택하기'}
            </Text>
            <ArrowDownIcon />
          </Pressable>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            (!selectedJob || !selectedCareer || isSubmitting) &&
              styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={!selectedJob || !selectedCareer || isSubmitting}>
          <Text style={styles.submitButtonText}>
            {isSubmitting ? '처리중...' : '완료'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <ModalBottom
        modalVisible={jobModalVisible}
        setModalVisible={setJobModalVisible}
        title="직무 선택"
        content={
          <View style={styles.modalContentContainer}>
            <ScrollView
              style={styles.majorList}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.scrollContent}>
              {jobList.map((job, index) => (
                <Pressable
                  key={index}
                  style={styles.jobRow}
                  onPress={() => selectJob(job)}>
                  <Text
                    style={[
                      styles.jobText,
                      selectedJob === job && styles.selectedText,
                    ]}>
                    {job}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        }
        isContentCenter={false}
        purpleButtonText="취소"
        purpleButtonFunc={() => setJobModalVisible(false)}
      />

      <ModalBottom
        modalVisible={careerModalVisible}
        setModalVisible={setCareerModalVisible}
        title="경력 선택"
        content={
          <View style={styles.modalContentContainer}>
            <ScrollView
              style={styles.majorList}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.scrollContent}>
              {careerTypes.map((career, index) => (
                <Pressable
                  key={index}
                  style={styles.jobRow}
                  onPress={() => selectCareer(career)}>
                  <Text
                    style={[
                      styles.jobText,
                      selectedCareer === career && styles.selectedText,
                    ]}>
                    {career}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        }
        isContentCenter={false}
        purpleButtonText="취소"
        purpleButtonFunc={() => setCareerModalVisible(false)}
      />

      <ModalBottom
        modalVisible={yearsModalVisible}
        setModalVisible={setYearsModalVisible}
        title="연차 선택"
        content={
          <View style={styles.modalContentContainer}>
            <ScrollView
              style={styles.majorList}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.scrollContent}>
              {yearsList.map((years, index) => (
                <Pressable
                  key={index}
                  style={styles.jobRow}
                  onPress={() => selectYears(years)}>
                  <Text
                    style={[
                      styles.jobText,
                      selectedYears === years && styles.selectedText,
                    ]}>
                    {years}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        }
        isContentCenter={false}
        purpleButtonText="취소"
        purpleButtonFunc={() => setYearsModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 44,
    borderColor: '#D7DCE6',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#222222',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  departmentButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
    backgroundColor: '#FFFFFF',
    borderColor: '#D7DCE6',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  departmentButtonText: {
    color: '#000000',
    fontSize: 16,
  },
  arrowDown: {
    fontSize: 16,
    color: '#000000',
  },
  majorList: {
    maxHeight: 300,
    paddingLeft: 0,
    paddingRight: 160,
    width: '100%',
  },
  majorRowContainer: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 0,
    paddingVertical: 12,
  },
  modalContentContainer: {
    width: '100%',
    position: 'relative',
  },
  jobRow: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  jobText: {
    fontSize: 16,
    color: '#000000',
  },
  selectedText: {
    color: '#a055ff',
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    paddingRight: 20,
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
});

export default ProfileModifySujeonggu;
