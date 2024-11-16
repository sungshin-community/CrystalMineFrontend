import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import SphereItem from '../../components/SphereItem';
import JobFilterTab from '../../components/JobFilterTab';
import FloatingWriteButton from '../../components/FloatingWriteButton';
import UpFirstButton from '../../components/UpFirstButton';

import {
  getAllList,
  getCuriousList,
  getFreeList,
} from '../../common/pantheonApi';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface LookScreenProps {
  isQuestion: boolean;
  isFree: boolean;
}

export default function LookScreen({isQuestion, isFree}: LookScreenProps) {
  const navigation = useNavigation<NativeStackScreenProps<any>['navigation']>();
  const [showTopButton, setShowTopButton] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [filters, setFilters] = useState<string>('all');
  const [isNextCursorLoading, setIsNextCursorLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [hasMoreData, setHasMoreData] = useState(true);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowTopButton(offsetY > 200);
  };

  const pantheonType = isQuestion ? 'question' : 'free';

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({offset: 0, animated: true});
  };

  const fetchPostList = async (newCursor = 0, isLoadMore = false) => {
    if (isLoading || isNextCursorLoading) return;

    isLoadMore ? setIsNextCursorLoading(true) : setIsLoading(true);
    try {
      let data: any[] = [];
      if (isQuestion) {
        data = await getCuriousList(newCursor, filters, sortBy);
        console.log('data', data);
      } else if (isFree) {
        data = await getFreeList(newCursor, filters, sortBy);
        console.log('data', data);
      } else if (isQuestion === false && isFree === false) {
        data = await getAllList(newCursor, filters, sortBy);
        console.log('data', data);
      }
      if (data.length === 0) {
        setHasMoreData(false);
      } else {
        setPostData(prevData => [
          ...prevData,
          ...data.filter(
            item => !prevData.some(prevItem => prevItem.id === item.id),
          ),
        ]);
        setCursor(newCursor);
      }
    } catch (error) {
      console.error('데이터 조회 실패', error);
    } finally {
      isLoadMore ? setIsNextCursorLoading(false) : setIsLoading(false);
    }
  };

  useEffect(() => {
    setCursor(0);
    setHasMoreData(true);
    setPostData([]);
    fetchPostList(0);
  }, [filters, isFree, isQuestion, sortBy]);

  const handleRefresh = async () => {
    setHasMoreData(true);
    setIsRefreshing(true);
    await fetchPostList(0);
    setIsRefreshing(false);
  };

  const fetchNextPage = async () => {
    if (hasMoreData) {
      await fetchPostList(cursor + 1, true);
    }
  };

  const handleFilterChange = (selectedFilter: string) => {
    if (selectedFilter === '전체') {
      setFilters('all');
    } else if (selectedFilter === '인기글') {
      setFilters('all');
      setSortBy('likeCount');
    } else {
      setFilters(selectedFilter);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={'#A055FF'}
            animating={isLoading}
            style={{zIndex: 100}}
          />
        </View>
      )}
      <JobFilterTab
        isQuestion={isQuestion}
        onFilterChange={handleFilterChange}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={['#A055FF']} // for android
            tintColor={'#A055FF'} // for ios
          />
        }
        onEndReached={() => hasMoreData && fetchNextPage()}
        onEndReachedThreshold={0.8}
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
            <SphereItem isQuestion={isQuestion} post={item} isFree={isFree} />
          </View>
        )}
      />
      <View style={{backgroundColor: '#FFFFFF'}}>
        {isNextCursorLoading && (
          <ActivityIndicator
            size="large"
            color={'#A055FF'}
            animating={isNextCursorLoading}
            style={{zIndex: 100}}
          />
        )}
      </View>
      {showTopButton && <UpFirstButton onPress={scrollToTop} />}
      <FloatingWriteButton
        onPress={() =>
          navigation.navigate('PostWriteScreen', {isPantheon: pantheonType})
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', // 배경 수정
    flexGrow: 1,
    marginBottom: 45,
  },
  loadingContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
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
