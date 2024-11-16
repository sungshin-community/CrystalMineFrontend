import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PtContentDto} from '../../../classes/board/MyPostDto';
import {searchPtAll} from '../../../common/SearchApi';
import {useNavigation, useRoute} from '@react-navigation/native';
import WaterMark from '../../../components/WaterMark';
import {fontRegular} from '../../../common/font';
import PostLike from '../../../../resources/icon/PostLike';
import PostUnlike from '../../../../resources/icon/PostUnlike';
import {PostComment} from '../../../../resources/icon/PostComment';

interface Props {
  searchWord: string;
}

type RootStackParamList = {
  PostScreen: {postId: number};
};

type NavigateProps = NativeStackScreenProps<RootStackParamList>;

export default function CrystalSearchResult({searchWord}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [myPostList, setMyPostList] = useState<PtContentDto[]>([]); // 전체 데이터
  const [filteredData, setFilteredData] = useState<PtContentDto[]>([]); // 필터링된 데이터
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError404, setIsError404] = useState<boolean>(false);
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const [activeButton, setActiveButton] = useState<number>(0);
  const route = useRoute();

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      try {
        const response = await searchPtAll(searchWord);
        if (response.status === 404) {
          setMyPostList([]);
          setFilteredData([]);
          setIsError404(true);
        } else {
          setMyPostList(response.data.content);
          setFilteredData(response.data.content || []);
          setIsError404(false);
        }
      } catch (error) {
        console.error('수정구 검색 에러:', error);
        setIsError404(true);
      }
      setIsLoading(false);
    }
    init();
  }, [searchWord]);

  const moveToPtPost = (post: PtContentDto) => {
    const isQuestion = post.ptPostType === 'QUESTION';
    navigation.navigate('SpherePostScreen', {
      ptPostId: 1,
      isQuestion: isQuestion,
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const response = await searchPtAll(searchWord);
    setCurrentPage(0);
    setMyPostList(response.data.content);
    setFilteredData(response.data.content);
    setIsRefreshing(false);
    setActiveButton(0);
  };

  const fetchNextPage = async () => {
    setIsNextPageLoading(true);
    const response = await searchPtAll(searchWord);
    const nextPagePosts: PtContentDto[] = response.data.content;

    const filteredPosts = nextPagePosts.filter(
      post =>
        !myPostList.some(
          existingPost => existingPost.ptPostId === post.ptPostId,
        ),
    );

    if (filteredPosts.length > 0) {
      setMyPostList(prevPosts => [...prevPosts, ...filteredPosts]);
      setFilteredData(prevData => [...prevData, ...filteredPosts]);
      setCurrentPage(prevPage => prevPage + 1);
    }

    setIsNextPageLoading(false);
  };

  const ButtonGroup = () => {
    const buttonLabels = ['전체', '자유', '궁금해요', '수정후기'];

    const filterData = (index: number) => {
      setActiveButton(index);
      let filteredData = [];
      let isQuestion = false;
      switch (index) {
        case 0:
          filteredData = myPostList; // 전체
          break;
        case 1:
          filteredData = myPostList.filter(
            post => post.ptPostType === 'GENERAL',
          );
          break;
        case 2:
          filteredData = myPostList.filter(
            post => post.ptPostType === 'QUESTION',
            (isQuestion = true),
          );
          break;
        case 3:
          filteredData = myPostList.filter(
            post => post.ptPostType === 'REVIEW',
          );
          break;
      }
      setFilteredData(filteredData);
      filteredData.forEach(post => {
        post.isQuestion = isQuestion;
      });
    };

    return (
      <View style={styles.container}>
        {buttonLabels.map((label, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              activeButton === index
                ? styles.selectedButton
                : styles.unselectedButton,
            ]}
            onPress={() => filterData(index)}>
            <Text
              style={[
                styles.text,
                activeButton === index
                  ? styles.selectedText
                  : styles.unselectedText,
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <WaterMark />
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}>
        <ActivityIndicator
          size="large"
          color={'#A055FF'}
          animating={isLoading}
          style={{zIndex: 100}}
        />
      </View>
      {!isLoading && !isError404 ? <ButtonGroup /> : <></>}
      {filteredData.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F6F6F6',
          }}>
          <Text
            style={{
              color: '#6E7882',
              fontSize: 15,
              fontFamily: 'SpoqaHanSansNeo-Regular',
              textAlign: 'center',
              lineHeight: 22.5,
              marginTop: 20,
            }}>
            {!isLoading &&
              !isError404 &&
              '요청하신 검색어에 대한 결과가 없습니다.'}
            {isError404 && '수정구 프로필 생성 시 검색 가능합니다.'}
          </Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredData} // 필터링된 데이터만 사용
            renderItem={({item}) => (
              <TouchableOpacity
                //style={{paddingHorizontal: 14, backgroundColor: 'red'}}
                onPress={() => moveToPtPost(item)}>
                <View
                  style={{
                    marginTop: 10,
                    marginBottom: 4,
                    height: 23,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 10,
                    paddingHorizontal: 12,
                  }}>
                  <Text
                    style={[
                      {
                        color: '#A055FF',
                        marginLeft: 10,
                        fontSize: 14,
                        fontWeight: '500',
                      },
                      fontRegular,
                    ]}>
                    {item.ptPostType === 'GENERAL'
                      ? '자유'
                      : item.ptPostType === 'QUESTION'
                      ? '궁금해요'
                      : item.ptPostType === 'REVIEW'
                      ? '수정후기'
                      : item.ptPostType}
                  </Text>
                </View>
                <View style={{paddingHorizontal: 12}}>
                  {item.hasTitle && (
                    <Text style={styles.titleText}>{item.title}</Text>
                  )}
                  <Text
                    numberOfLines={item.title ? 2 : 5}
                    ellipsizeMode="tail"
                    style={[styles.text, styles.content, fontRegular]}>
                    {item.content}
                  </Text>
                  <View style={styles.iconContainer}>
                    <View style={styles.icon}>
                      {item.isLiked ? <PostLike /> : <PostUnlike />}
                      <Text
                        style={[
                          fontRegular,
                          {color: '#9DA4AB', marginRight: 1, marginLeft: 5},
                        ]}>
                        좋아요
                      </Text>
                      <Text style={[styles.textSmall, styles.iconCount]}>
                        {item.likeCount} 개
                      </Text>
                      <PostComment />
                      <Text style={[styles.textSmall, styles.iconCount]}>
                        {item.commentCount} 개
                      </Text>
                    </View>
                    <Text style={[styles.textSmall, styles.timeStamp]}>
                      {item.createdAt}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#F6F6F6',
                    height: 4,
                    paddingHorizontal: 0,
                  }}
                />
              </TouchableOpacity>
            )}
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.1}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  button: {
    paddingHorizontal: 12,
    height: 28,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginRight: 8,
    justifyContent: 'center',
  },
  text: {
    color: '#3A424E',
    fontSize: 12,
    fontWeight: '400',
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  unselectedText: {
    color: '#3A424E',
    fontWeight: '400',
  },
  selectedButton: {
    backgroundColor: '#A055FF',
    borderColor: '#A055FF',
    fontWeight: '600',
  },
  unselectedButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E4E8',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    paddingTop: 2,
    paddingLeft: 8,
    fontFamily: 'SpoqaHanSansNeo-Medium',
    fontSize: 15,
  },
  textSmall: {
    fontSize: 13,
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 5,
    paddingHorizontal: 12,
  },
  timeStamp: {
    color: '#9DA4AB',
  },
  content: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 14,
    lineHeight: 22.5,
    paddingHorizontal: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    paddingHorizontal: 12,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCount: {
    color: '#9DA4AB',
    marginLeft: 5,
    marginRight: 14,
  },
});
