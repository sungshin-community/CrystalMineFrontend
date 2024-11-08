import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const OnboardingScreen = ({navigation}) => {
  // 현재 페이지 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);

  const contentList = [
    {
      title: 'WELCOME!',
      description: '궁금했던, 궁금한, 궁금할 모든 것. \n수정구에 물어봐!',
      image: require('../../../resources/images/CrystalOnboadingImg.png'),
      imageStyle: {marginTop: 40},
    },
    {
      title: '', // 2페이지: 제목 없음
      description:
        '취준, 스펙, 직장 토크?\n커리어와 관련된 모든 이야기\n수정이들과 도란도란 나누며\n묻고 답할 수도 있어요',
      image: require('../../../resources/images/Onboading1.png'),
      imageStyle: {width: '100%'},
    },
    {
      title: '', // 3페이지: 제목 없음
      description:
        '궁금했던 활동들의 생생후기\n수정이들이 작성한 실제 후기를 통해\n궁금했던 정보를 얻어요',
      image: require('../../../resources/images/Onboading2.png'),
      imageStyle: {width: '100%'},
    },
    {
      title: '', // 4페이지: 제목 없음
      description:
        '수정이들과 함께하고 싶다면?\n채팅방에 입장해\n스터디나 모임, 사이드 프로젝트를\n만들어 모두와 진행해봐요',
      image: require('../../../resources/images/Onboading3.png'),
      imageStyle: {width: '100%'},
    },
  ];

  // 다음 버튼 클릭 시 컨텐츠 변경
  const handleNext = () => {
    if (currentIndex < contentList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('ProfileSetup'); // 프로필 설정 페이지로 이동
    }
  };

  // 건너뛰기 버튼 클릭 시 바로 프로필 설정 페이지로 이동
  const handleSkip = () => {
    navigation.navigate('ProfileSetup'); // 프로필 설정 페이지로 이동
  };

  return (
    <View style={styles.container}>
      {/* 이미지 */}
      <Image
        source={contentList[currentIndex].image}
        style={[styles.image, contentList[currentIndex].imageStyle]}
      />

      {/* 제목이 있을 때만 렌더링 */}
      {contentList[currentIndex].title ? (
        <Text style={styles.welcomeText}>
          {contentList[currentIndex].title}
        </Text>
      ) : null}

      {/* 설명 */}
      <Text style={styles.subheadingText}>
        {contentList[currentIndex].description}
      </Text>

      {/* 하단 네비게이션 버튼 */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipButton}>건너뛰기</Text>
        </TouchableOpacity>
        <View style={styles.pagination}>
          {/* 페이지 표시 */}
          {contentList.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.nextButton}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  image: {
    width: 300,
  },
  welcomeText: {
    fontFamily: 'Montserrat-VariableFont',
    color: '#A055FF',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28,
    textAlign: 'center',
    marginTop: 20,
  },
  subheadingText: {
    fontFamily: 'Pretendard',
    fontSize: 20,
    color: '#222222',
    fontWeight: '100',
    lineHeight: 35,
    textAlign: 'center',
    marginTop: 10,
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  skipButton: {
    fontSize: 16,
    color: '#A055FF',
  },
  nextButton: {
    fontSize: 16,
    color: '#A055FF',
  },
  pagination: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#A055FF',
    width: 12,
  },
  inactiveDot: {
    backgroundColor: '#CCCCCC',
  },
});

export default OnboardingScreen;
