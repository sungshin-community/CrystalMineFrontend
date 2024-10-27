import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import SphereItem from '../../components/SphereItem';
import JobFilterTab from '../../components/JobFilterTab';
import FloatingWriteButton from '../../components/FloatingWriteButton';
import UpFirstButton from '../../components/UpFirstButton';
import {getCuriousList} from '../../common/sphereCuriousApi';

interface LookScreenProps {
  isQuestion?: boolean;
}

export default function LookScreen({isQuestion = false}: LookScreenProps) {
  const [showTopButton, setShowTopButton] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const [postData, setPostData] = useState([]);

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

  useEffect(() => {
    const fetchCuriousList = async () => {
      try {
        const data = await getCuriousList();
        setPostData(data);
        console.log('궁금해요 글 목록 조회 성공');
      } catch (error) {
        console.error('궁금해요 글 목록 조회 실패', error);
      }
    };
    fetchCuriousList();
  }, []);

  return (
    <View style={styles.container}>
      <JobFilterTab isQuestion={isQuestion} />
      <FlatList
        data={postData}
        ref={flatListRef}
        style={{marginTop: 12}}
        onScroll={handleScroll}
        renderItem={({item, index}) => (
          <View
            style={[
              styles.postContainer,
              index === postData.length - 1 && styles.lastPostItem,
            ]}>
            <SphereItem isQuestion={isQuestion} post={item.post} />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
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
