import React, {useEffect} from 'react';
import Svg, {Path} from 'react-native-svg';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fontBold, fontMedium, fontRegular} from '../../common/font';
import {
  FoldBlackButton,
  SpreadBlackButton,
} from '../../../resources/icon/Button';
import {useState} from 'react';
import {
  getQuestionList,
  getQuestion,
  deleteQuestions,
} from '../../common/myPageApi';
import QuestionListDto, {QuestionDto} from '../../classes/mypage/Question';
import Markdown from 'react-native-markdown-display';
import FloatingWriteButton from '../../components/FloatingWriteButton';
import {useIsFocused} from '@react-navigation/native';
import {
  RectangleChecked,
  RectangleUnchecked,
} from '../../../resources/icon/CheckBox';
import TrashIcon from '../../../resources/icon/TrashIcon';
import CancelButton from '../../../resources/icon/Cancel';
import SpinningThreeDots from '../../components/SpinningThreeDots';
import {ModalBottom} from '../../components/ModalBottom';
import Toast from 'react-native-simple-toast';
import PostItem from '../../components/PostItem';
import ImageViewer from 'react-native-image-zoom-viewer';
import {useNavigation} from '@react-navigation/native';
import WaterMark from '../../components/WaterMark';

type RootStackParamList = {
  QuestionWriteScreen: undefined;
  // ImageViewerScreen: {imageUrls: any, index: number};
};
type Props = NativeStackScreenProps<RootStackParamList>;
function QuestionList({navigation, route}: Props) {
  const [questionList, setQuestionList] = useState<QuestionListDto[]>([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [deleteButtonEnabled, setDeleteButtonEnabled] = useState<boolean>(
    false,
  );
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const isFocused = useIsFocused();
  const handleDeleteComponent = (
    <View style={{marginRight: 10}}>
      <TouchableHighlight
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        underlayColor="#EEEEEE"
        onPress={() => {
          setDeleteMode(true);
        }}>
        <TrashIcon />
      </TouchableHighlight>
    </View>
  );
  const moveToPost = (question: QuestionListDto) => {
    if (deleteMode) {
      const tempList = questionList.map(p =>
        p.id === question.id ? {...p, isChecked: !p.isChecked} : p,
      );
      setQuestionList(tempList);
    } else {
      console.log('음 여기서 뭘할까');
    }
  };
  useEffect(() => {
    async function getList() {
      setIsLoading(true);
      const list = await getQuestionList(0);
      setQuestionList(list);
      setIsLoading(false);
    }
    if (isFocused) {
      getList();
    }
  }, [isFocused]);
  useEffect(() => {
    const checkedCount = questionList?.filter(p => p.isChecked).length;
    if (checkedCount > 0) {
      setDeleteButtonEnabled(true);
    } else {
      setDeleteButtonEnabled(false);
    }
    const isAllChecked = questionList?.filter(c => !c.isChecked).length === 0;
    setIsCheckedAll(isAllChecked);
  }, [questionList]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        deleteMode ? (
          <>
            <TouchableOpacity
              onPress={() => {
                deleteButtonEnabled && setDeleteModalVisible(true);
              }}
              hitSlop={{top: 5, bottom: 5, left: 10, right: 10}}>
              <Text
                style={[
                  fontRegular, {
                  color: '#FF6060',
                  opacity: deleteButtonEnabled ? 1 : 0.3,
                  fontSize: 17,
                }]}>
                삭제
              </Text>
            </TouchableOpacity>
            <TouchableHighlight
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              underlayColor="#EEEEEE"
              onPress={() => {
                setDeleteMode(false);
                const tempList = questionList?.map(p => ({
                  ...p,
                  isChecked: false,
                }));
                setQuestionList(tempList);
              }}>
              <CancelButton color="#333D4B" />
            </TouchableHighlight>
          </>
        ) : (
          <SpinningThreeDots
            handleOptionModeIsNotMineComponent={handleDeleteComponent}
          />
        ),
    });
  }, [navigation, deleteMode, deleteButtonEnabled]);

  const handleRefresh = async () => {
    if (!deleteMode) {
      const postList = await getQuestionList(0);
      setCurrentPage(0);
      setQuestionList(postList);
      setIsCheckedAll(false);
    }
  };

  const fetchNextPage = async () => {
    setIsNextPageLoading(true);
    let thisPagePostList: QuestionListDto[] = await getQuestionList(
      currentPage + 1,
    );
    setQuestionList(questionList.concat(thisPagePostList));
    if (thisPagePostList.length > 0) {
      setCurrentPage(currentPage + 1);
    }
    setIsNextPageLoading(false);
  };

  return (
    <>
      <WaterMark/>
      <View style={{flex: 1}}>
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
        {questionList?.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#F6F6F6',
            }}>
            <Text
              style={[
                fontRegular, {
                color: '#6E7882',
                fontSize: 15,
                fontFamily: 'SpoqaHanSansNeo-Regular',
                textAlign: 'center',
                lineHeight: 22.5,
                marginTop: 20,
              }]}>
              {isLoading
                ? ''
                : '아직 작성된 문의사항이 없습니다.\n첫 문의사항을 작성해주세요.'}
            </Text>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {deleteMode && (
                <TouchableOpacity
                  onPress={() => {
                    setIsCheckedAll(!isCheckedAll);
                    const tempList = questionList?.map(p => ({
                      ...p,
                      isChecked: !isCheckedAll,
                    }));
                    setQuestionList(tempList);
                  }}
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingRight: 27,
                    backgroundColor: '#fff',
                    paddingBottom: 10,
                  }}>
                  <Text
                      style={[
                      fontRegular, {
                      marginRight: 9,
                      fontSize: 13,
                      fontFamily: 'SpoqaHanSansNeo-Medium',
                    }]}>
                    {`${questionList?.filter(c => c.isChecked).length}/${
                      questionList?.length
                    }`}
                  </Text>
                  {isCheckedAll ? <RectangleChecked /> : <RectangleUnchecked />}
                </TouchableOpacity>
              )}
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={questionList}
              renderItem={({item, index}) => (
                <SpreadList
                  key={index}
                  questionItem={item}
                  deleteMode={deleteMode}
                  moveToPost={moveToPost}></SpreadList>
              )}
              ItemSeparatorComponent={() => (
                <View style={{height: 1, backgroundColor: '#F6F6F6'}}></View>
              )}
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handleRefresh}
                  colors={['#A055FF']} // for android
                  tintColor={'#A055FF'} // for ios
                />
              }
              onEndReached={fetchNextPage}
              onEndReachedThreshold={0.8}
            />
            <View>
              {isNextPageLoading && (
                <ActivityIndicator
                  size="large"
                  color={'#A055FF'}
                  animating={isNextPageLoading}
                  style={{zIndex: 100}}
                />
              )}
            </View>
          </View>
        )}
        {!deleteMode && (
          <FloatingWriteButton
            onPress={() => navigation.navigate('QuestionWriteScreen')}
          />
        )}
      </View>
      <ModalBottom
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        content="선택하신 문의를 삭제하시겠습니까?"
        purpleButtonText="삭제"
        whiteButtonText="취소"
        purpleButtonFunc={async () => {
          setIsLoading(true);
          console.log(questionList);
          await deleteQuestions(
            questionList.filter(p => p.isChecked).map(p => p.id),
          );
          const qList = await getQuestionList(currentPage);
          setQuestionList(qList);
          setDeleteModalVisible(false);
          setTimeout(function () {
            Toast.show('문의가 성공적으로 삭제되었습니다', Toast.SHORT);
          }, 100);
          setIsLoading(false);
          setDeleteMode(false);
        }}
        whiteButtonFunc={() => {
          setDeleteModalVisible(false);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    paddingVertical: 15,
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
  menuIcon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  menu: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  menuText: {
    fontSize: 15,
    color: '#222222',
    width: Dimensions.get('window').width - 150,
  },
  status: {
    width: 67,
    height: 24,
    borderRadius: 20,
    justifyContent: 'center',
    marginRight: 12,
  },
  date: {
    fontSize: 13,
    color: '#ADB3BC',
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default QuestionList;
export function SpreadList({questionItem, deleteMode, moveToPost}: any) {
  const [isSpread, setIsSpread] = useState<boolean>(false);
  const [data, setData] = useState<QuestionDto>();
  const [isPhotoVisible, setIsPhotoVisible] = useState<boolean>(false);
  const getQuestionFunc = async (id: number) => {
    const result: QuestionDto = await getQuestion(id);
    setData(result);
  };
  const closePhotoModal = () => {
    if (isPhotoVisible) {
      setIsPhotoVisible(false);
    }
  };
  const navigation = useNavigation();

  const imgUrlCoverting = (arr: string[]) => {
    const array = arr.map(url => {
      return {url: url};
    });
    return array;
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsSpread(!isSpread);
          getQuestionFunc(questionItem.id);
        }}>
        <View style={[styles.menuContainer]}>
          <View style={styles.menu}>
            <View
              style={[
                styles.status,
                {backgroundColor: questionItem.status ? '#F1E7FF' : '#F6F6F6'},
              ]}>
              <Text
                style={[
                  fontRegular, {
                  color: questionItem.status ? '#A055FF' : '#6E7882',
                  fontSize: 13,
                  textAlign: 'center',
                }]}>
                {questionItem.status ? '답변 완료' : '답변 대기'}
              </Text>
            </View>
            <Text
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={[fontMedium, styles.menuText]}>
              {questionItem.title}
            </Text>
            <View style={styles.menuIcon}>
              {!deleteMode &&
                (isSpread ? <FoldBlackButton /> : <SpreadBlackButton />)}
            </View>
            {deleteMode &&
              (questionItem.status ? (
                <View style={{marginLeft: 30}} />
              ) : (
                <Pressable
                  onPress={() => {
                    moveToPost(questionItem);
                  }}>
                  <View style={{marginRight: 2.5}}>
                    {questionItem.isChecked ? (
                      <RectangleChecked />
                    ) : (
                      <RectangleUnchecked />
                    )}
                  </View>
                </Pressable>
              ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
      {!deleteMode && isSpread && (
        <>
          <ScrollView
            style={{
              height: 'auto',
              backgroundColor: '#FBFBFB',
              paddingHorizontal: 24,
              paddingVertical: 16,
            }}>
            <Text style={[fontMedium, {fontSize: 15, marginBottom: 10}]}>
              {data?.title}
            </Text>
            <Text style={[fontRegular, {marginBottom: 10}]}>
              {data?.content}
            </Text>
            <Text style={[fontRegular, styles.date, {marginTop: 5}]}>{data?.createdAt}</Text>

            {data?.images.length !== 0 && (
              <View style={{flexDirection: 'row', marginTop: 16}}>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}>
                  {data?.thumbnails.map((url, index) => (
                    <Pressable
                      key={index}
                      onPress={() =>
                        navigation.navigate('ImageViewerScreen', {
                          imageUrls: imgUrlCoverting(data.images),
                          index: index,
                        })
                      }>
                      <Image
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 10,
                          marginRight: 8,
                        }}
                        source={{uri: url}}
                      />
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}
            {data?.answer && (
              <>
                <View
                  style={{
                    borderBottomColor: '#F6F6F6',
                    borderBottomWidth: 1,
                    marginVertical: 16,
                  }}
                />
                <View style={{flexDirection: 'row'}}>
                  <Arrow />
                  <Text style={[fontMedium, {fontSize: 15, marginLeft: 12}]}>
                    운영진
                  </Text>
                </View>
                <View style={[{marginTop: 8, marginLeft: 30, marginBottom: 10}]}>
                  <Text style={fontRegular}>{data?.answer.content}</Text>
                </View>
                <Text style={[fontRegular, styles.date, {marginLeft: 30}]}>
                  {data?.answer.createdAt}
                </Text>
                {data?.images.length !== 0 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 16,
                      marginLeft: 30,
                    }}>
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}>
                      {data?.thumbnails.map((url, index) => (
                        <Pressable
                          key={index}
                          onPress={() =>
                            navigation.navigate('ImageViewerScreen', {
                              imageUrls: imgUrlCoverting(data.images),
                              index: index,
                            })
                          }>
                          <Image
                            style={{
                              width: 70,
                              height: 70,
                              borderRadius: 10,
                              marginRight: 8,
                            }}
                            source={{uri: url}}
                          />
                        </Pressable>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </>
            )}
          </ScrollView>
        </>
      )}
    </>
  );
}

const Arrow = (props: any) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M14.25 11.25L9.75 15.75L8.685 14.685L11.3775 12H3V3H4.5V10.5H11.3775L8.685 7.815L9.75 6.75L14.25 11.25Z"
      fill="black"
    />
  </Svg>
);
