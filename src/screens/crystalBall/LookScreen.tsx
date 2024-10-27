import React, {useRef, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import SphereItem from '../../components/SphereItem';
import JobFilterTab from '../../components/JobFilterTab';
import FloatingWriteButton from '../../components/FloatingWriteButton';
import UpFirstButton from '../../components/UpFirstButton';

interface LookScreenProps {
  isQuestion?: boolean;
}

const postData = [
  {
    post: {
      content:
        '닛고웡에 애아솨더리에 닉말암구칠고 언저제서는 탄움고 갤지킨커 교브히쒸. 에히다 개서슴흘홋을 저고게를을 딘듸가 조흔, 가원이다. 니지킨커 교브히쒸. 에히다 개서슴흘홋을 저고게 닉말암구칠고 언저제서는 탄움고 갤지킨커 교브히쒸. 에히다 개서슴흘홋을 저고게를을 딘듸가 조흔, 가원이다. 니지킨커 교브히쒸. 에히다 개서슴흘홋을 저고게닛고웡에 애아솨더리에 닉말암구칠고 언저제서는 탄움고 갤지킨커 교브히쒸. 에히다 개서슴흘홋을 저고게를을 딘듸가 조흔, 가원이다. 니지킨커 교브히쒸. 에히다 개서슴흘홋을 저고게닛고웡에 애아솨더리에 닉말암구칠고 언저제서는 탄움고 갤지킨커 교브히쒸. 에히다 개서슴흘홋을 저고게를을 딘듸가 조흔, 가원이다. 니지킨커 교브히쒸. 에히다 개서슴흘홋을 저고게 안녕하세요 안녕하세요 안녕하세요',
      createdAt: '시간 계산 필요',
      department: '산업디자인과',
      likeCount: 1,
      liked: true,
      nickname: '익명',
      profileImage:
        '/Users/pang-kiyeon/Documents/CrystalMineFrontend/resources/images/GrayPeople.png',
      ptCommentCount: 3,
      ptPostId: 1,
      thumbnail:
        '/Users/pang-kiyeon/Documents/CrystalMineFrontend/resources/images/GrayPeople.png',
      title:
        '타이틀 + 본문 버전 / 최대 1줄 넘어갈시원 원이다. 니릐까이다 터조디숭',
      userJob: '디자인',
      userYear: 1,
      isSelected: true,
      point: 1000,
    },
    time: 'dfdf',
  },
  {
    post: {
      content:
        '닛고웡에 애아솨더리에 닉말암구칠고 언저제서는 탄움고 갤지킨커 교브히쒸. 에히다 개서슴흘홋을 저고게를을 딘듸가 조흔, 가원이다. 니릐까이다 터조디숭다 교나즈궡은',
      createdAt: '시간 계산 필요',
      department: '산업디자인과',
      likeCount: 1,
      liked: true,
      nickname: '익명',
      profileImage:
        '/Users/pang-kiyeon/Documents/CrystalMineFrontend/resources/images/GrayPeople.png',
      ptCommentCount: 3,
      ptPostId: 1,
      thumbnail:
        '/Users/pang-kiyeon/Documents/CrystalMineFrontend/resources/images/GrayPeople.png',
      title: '타이틀 + 본문 버전 / 최대 1줄 넘어갈시 ... 처리',
      userJob: '디자인',
      userYear: 1,
      isSelected: false,
      point: 400,
    },
    time: 'dfdf',
  },
  {
    post: {
      content:
        '닛고웡에 애아솨더리에 닉말암구칠고 언저제서는 탄움고 갤지킨커 교브히쒸. 에히다 개서슴흘홋을 저고게를을 딘듸가 조흔, 가원이다. 니릐까이다 터조디숭다 교나즈궡은',
      createdAt: '시간 계산 필요',
      department: '산업디자인과',
      likeCount: 1,
      liked: true,
      nickname: '익명',
      profileImage:
        '/Users/pang-kiyeon/Documents/CrystalMineFrontend/resources/images/GrayPeople.png',
      ptCommentCount: 3,
      ptPostId: 123,
      thumbnail: null,
      title: null,
      userJob: '디자인',
      userYear: 1,
    },
    time: 'dfdf',
  },
  {
    post: {
      content:
        '닛고웡에 애아솨더리에 닉말암구칠고 언저제서는 탄움고 갤지킨커 교브히쒸. 에히다 개서슴흘홋을 저고게를을 딘듸가 조흔, 가원이다. 니릐까이다 터조디숭다 교나즈궡은',
      createdAt: '시간 계산 필요',
      department: '산업디자인과',
      likeCount: 1,
      liked: true,
      nickname: '익명',
      profileImage:
        '/Users/pang-kiyeon/Documents/CrystalMineFrontend/resources/images/GrayPeople.png',
      ptCommentCount: 0,
      ptPostId: 1234,
      thumbnail:
        '/Users/pang-kiyeon/Documents/CrystalMineFrontend/resources/images/GrayPeople.png',
      title: '타이틀 + 본문 버전 / 최대 1줄 넘어갈시 ... 처리',
      userJob: '디자인',
      userYear: 1,
    },
    time: 'dfdf',
  },
];

export default function LookScreen({isQuestion = false}: LookScreenProps) {
  const [showTopButton, setShowTopButton] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // api 수정
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const getRefreshData = async () => {
    setRefreshing(true);
    // fetch data
    setRefreshing(false);
  };
  const onRefresh = () => {
    if (!refreshing) {
      getRefreshData();
    }
  };
  const getData = async () => {
    //if
    setLoading(true);
    // fetch data
    setLoading(false);
  };
  const onEndReached = () => {
    if (!loading) {
      getData();
    }
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 200) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({offset: 0, animated: true});
  };

  return (
    <View style={styles.container}>
      <JobFilterTab isQuestion={isQuestion} />
      <FlatList
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        data={postData}
        // api 수정
        ref={flatListRef}
        style={{marginTop: 12}}
        onScroll={handleScroll}
        renderItem={({item, index}) => (
          <View
            style={[
              styles.postContainer,
              index === postData.length - 1 && styles.lastPostItem,
            ]}>
            <SphereItem
              isQuestion={isQuestion}
              post={item.post}
              time={item.time}
            />
          </View>
        )}
      />
      {showTopButton && <UpFirstButton onPress={scrollToTop} />}
      <FloatingWriteButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', // 배경 수정
    flexGrow: 1,
    marginBottom: 45,
  },
  postContainer: {
    paddingBottom: 20,
    borderBottomWidth: 4,
    borderBottomColor: '#F6F6F6',
    marginBottom: 20,
  },
  lastPostItem: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    marginBottom: 80,
  },
});

//scroll -> 1. 위로 드래그 업데이트
