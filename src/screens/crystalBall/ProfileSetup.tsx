import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Picker} from 'react-native';
import {postPantheonOnboarding} from '../../common/CrystalApi';
import Toast from 'react-native-simple-toast';

const ProfileSetup = ({navigation}) => {
  const [page, setPage] = useState(1); // 페이지 상태 관리
  const [yearExperience, setYearExperience] = useState(''); // 경력 선택
  const [selectedButton, setSelectedButton] = useState(null); // 선택된 버튼 상태 관리
  const [ptJob, setPtJob] = useState('');
  const [graduate, setGraduate] = useState(false); // 졸업 여부 상태 관리
  const [isPickerEnabled, setIsPickerEnabled] = useState(true); // Picker 활성화 상태 관리

  const nextPage = async () => {
    if (page < 3) {
      setPage(prevPage => prevPage + 1);

      if (page === 1) {
        setSelectedButton(null);
      }
      if (page === 2) {
        setSelectedButton(null);
      }
    } else if (page === 3) {
      const experienceYears = yearExperience || 0;

      try {
        const response = await postPantheonOnboarding(
          experienceYears,
          graduate,
          ptJob,
        );

        // 요청이 성공한 경우 (예: 201 Created)
        if (response && response.status === 201) {
          navigation.navigate('ProfileCompleteScreen');
        } else {
          // 예상치 못한 상태 코드 처리
          Toast.show(
            `요청이 실패했습니다: ${response?.status || '알 수 없는 오류'}`,
            Toast.LONG,
          );
        }
      } catch (error) {
        console.error('온보딩 API 에러: ', error);

        // 에러 객체에 response가 있는 경우 처리
        if (error.response) {
          const {status, data} = error.response;
          switch (status) {
            case 409:
              if (data?.code === 'PANTHEON_ACCOUNT_DUPLICATION') {
                Toast.show(
                  '이미 판테온 계정이 존재하는 사용자입니다.',
                  Toast.LONG,
                );
              } else {
                Toast.show(
                  `충돌 오류 발생: ${data?.detail || '상세 정보 없음'}`,
                  Toast.LONG,
                );
              }
              break;
            case 404:
              Toast.show('존재하지 않는 직무입니다.', Toast.LONG);
              break;
            case 401:
              Toast.show(
                '인증에 실패했습니다. 다시 로그인해주세요.',
                Toast.LONG,
              );
              break;
            case 403:
              Toast.show('접근이 금지되었습니다.', Toast.LONG);
              break;
            default:
              Toast.show(
                `오류 발생: ${data?.detail || '알 수 없는 오류'}`,
                Toast.LONG,
              );
              break;
          }
        } else {
          // 네트워크 오류 또는 기타 예외 처리
          Toast.show(
            '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
            Toast.LONG,
          );
        }
      }
    }
  };

  const handleButtonPress = buttonValue => {
    setSelectedButton(buttonValue);
    if (buttonValue === 'student') {
      setGraduate(false);
    } else if (buttonValue === 'graduate') {
      setGraduate(true);
    }
    if (buttonValue === 'noJob') {
      setPtJob('직군 없음'); // '아직 고민중이에요'를 선택할 경우 기본값
    }
    if (buttonValue === 'noExperience') {
      setYearExperience(0);
      setIsPickerEnabled(false); // Picker 비활성화
    } else if (buttonValue === 'experience') {
      setYearExperience(''); // 초기화
      setIsPickerEnabled(true); // Picker 활성화
    }
  };
  const renderPageContent = () => {
    switch (page) {
      case 1:
        return (
          <>
            <Text style={styles.title}>
              수정구를 문지르기 전,{'\n'}수정이에 대해 물어볼게요.
            </Text>
            <Text style={styles.description}>
              수집된 정보는 수정구 버전 프로필에 사용돼요.
            </Text>
            <Text style={styles.question}>
              재학생이신가요? <Text style={{color: '#A055FF'}}>*</Text>
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedButton === 'student' && styles.buttonSelected,
                ]}
                onPress={() => handleButtonPress('student')}>
                <Text
                  style={[
                    styles.buttonText,
                    selectedButton === 'student' && styles.textSelected,
                  ]}>
                  네, 재학생이에요
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedButton === 'graduate' && styles.buttonSelected,
                ]}
                onPress={() => handleButtonPress('graduate')}>
                <Text
                  style={[
                    styles.buttonText,
                    selectedButton === 'graduate' && styles.textSelected,
                  ]}>
                  아니요, 졸업했어요
                </Text>
              </TouchableOpacity>
            </View>
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.title}>거의 다 됐어요.</Text>
            <Text style={styles.description}>
              수집된 정보는 수정구 버전 프로필에 사용돼요.
            </Text>
            <Text style={styles.question}>
              경력이 있으신가요? <Text style={{color: '#A055FF'}}>*</Text>
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedButton === 'experience' && styles.buttonSelected,
                ]}
                onPress={() => handleButtonPress('experience')}>
                <Text
                  style={[
                    styles.buttonText,
                    selectedButton === 'experience' && styles.textSelected,
                  ]}>
                  네, 경력이 있어요
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedButton === 'noExperience' && styles.buttonSelected,
                ]}
                onPress={() => handleButtonPress('noExperience')}>
                <Text
                  style={[
                    styles.buttonText,
                    selectedButton === 'noExperience' && styles.textSelected,
                  ]}>
                  아니요, 신입이에요
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.question, {marginTop: 40}]}>
              몇 년차 신가요?
            </Text>
            <Picker
              selectedValue={yearExperience}
              style={styles.picker}
              enabled={isPickerEnabled} // Picker 활성화 상태
              onValueChange={itemValue => setYearExperience(itemValue)}>
              <Picker.Item label="년차를 선택해주세요." value="" />
              <Picker.Item label="1년차" value="1" />
              <Picker.Item label="2년차" value="2" />
              <Picker.Item label="3년차" value="3" />
              <Picker.Item label="4년차 이상" value="4+" />
            </Picker>
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.title}>마지막이에요.</Text>
            <Text style={styles.description}>
              수집된 정보는 수정구 버전 프로필에 사용돼요.
            </Text>
            <Text style={styles.question}>
              대표 직군(개발, 디자인, 기획 등)이 있으신가요?{' '}
              <Text style={{color: '#A055FF'}}>*</Text>
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedButton === 'chosenJob' && styles.buttonSelected,
                ]}
                onPress={() => handleButtonPress('chosenJob')}>
                <Text
                  style={[
                    styles.buttonText,
                    selectedButton === 'chosenJob' && styles.textSelected,
                  ]}>
                  선택한 직군이 있어요.
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedButton === 'noJob' && styles.buttonSelected,
                ]}
                onPress={() => handleButtonPress('noJob')}>
                <Text
                  style={[
                    styles.buttonText,
                    selectedButton === 'noJob' && styles.textSelected,
                  ]}>
                  아직 고민중이에요.
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.question, {marginTop: 40, marginBottom: 4}]}>
              직군을 선택해주세요 <Text style={{color: '#A055FF'}}>*</Text>
            </Text>
            <Text style={styles.note}>
              아직 결정한 직군이 없다면 ‘직군 없음’을 선택해주세요!
            </Text>
            <Picker
              selectedValue={ptJob}
              style={styles.picker}
              onValueChange={itemValue => setPtJob(itemValue)}>
              <Picker.Item label="직군을 선택해주세요." value="" />
              <Picker.Item label="직군 없음" value="직군 없음" />
              <Picker.Item label="개발" value="개발" />
              <Picker.Item label="경영/비즈니스" value="경영/비즈니스" />
              <Picker.Item label="디자인" value="디자인" />
              <Picker.Item label="마케팅/광고" value="마케팅/광고" />
              <Picker.Item label="영업" value="영업" />
              <Picker.Item
                label="고객 서비스/리테일"
                value="고객 서비스/리테일"
              />
              <Picker.Item label="미디어" value="미디어" />
              <Picker.Item label="교육" value="교육" />
              <Picker.Item label="엔지니어링/설계" value="엔지니어링/설계" />
              <Picker.Item label="게임" value="게임" />
              <Picker.Item label="제조/생산" value="제조/생산" />
              <Picker.Item label="의료/제약" value="의료/제약" />
              <Picker.Item label="물류/무역" value="물류/무역" />
              <Picker.Item label="법률" value="법률" />
              <Picker.Item label="식/음료" value="식/음료" />
              <Picker.Item label="건설/시설" value="건설/시설" />
              <Picker.Item label="공공/복지" value="공공/복지" />
              <Picker.Item label="금융" value="금융" />
            </Picker>
          </>
        );
      default:
        return null;
    }
  };
  // "다음으로" 버튼 비활성화 조건 설정
  const isNextButtonDisabled =
    (page === 1 && !selectedButton) ||
    (page === 2 &&
      (!selectedButton || // 선택된 버튼 없음
        (selectedButton === 'experience' && !yearExperience))) || // 경력 선택 필요
    (page === 3 && !ptJob); // 직군 선택 필요

  return (
    <View style={styles.container}>
      {renderPageContent()}
      {page <= 3 && (
        <TouchableOpacity
          style={[
            styles.nextButton,
            isNextButtonDisabled && styles.nextButtonDisabled,
          ]}
          onPress={nextPage}
          disabled={isNextButtonDisabled}>
          <Text style={styles.nextButtonText}>
            {page === 3 ? '완료' : '다음으로'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 70,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 56,
    color: '#9DA4AB',
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  note: {
    fontSize: 12,
    color: '#A055FF',
    marginBottom: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#E2E4E8',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    width: '42%',
  },
  buttonSelected: {
    borderColor: '#A055FF',
  },
  buttonText: {
    color: '#E2E4E8',
  },
  textSelected: {
    color: '#A055FF',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E2E4E8',
    color: '#6E7882',
  },
  nextButton: {
    display: 'flex',
    width: '95%',
    backgroundColor: '#A055FF',
    color: '#FFFFFF',
    padding: 12,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  nextButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default ProfileSetup;
