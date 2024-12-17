/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  NativeModules,
  ActivityIndicator,
  KeyboardEvent,
  SafeAreaView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fontMedium, fontRegular} from '../../common/font';
import ImageIcon from '../../../resources/icon/ImageIcon';
import PostVoteIcon from '../../../resources/icon/PostVoteIcon';
import PhotoIcon from '../../../resources/icon/PhotoIcon';
import {
  RectangleChecked,
  RectangleUnchecked,
  Checked,
} from '../../../resources/icon/CheckBox';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import {getWritePostInfo, postWritePost} from '../../common/boardApi';
import ProfileImage from '../../../resources/icon/ProfileImage';
import {PostWriteInfoDto} from '../../classes/PostDto';
import {OrangeFlag} from '../../../resources/icon/OrangeFlag';
import BackButtonIcon from '../../../resources/icon/BackButtonIcon';
import {ModalBottom} from '../../components/ModalBottom';
import {DeleteImageIcon} from '../../components/ImageDelete';
import {getHundredsDigit} from '../../common/util/statusUtil';
import {logout} from '../../common/authApi';
import {getUser} from '../../common/myPageApi';
import {
  postPantheonFree,
  postPantheonQurious,
  postPantheonReview,
} from '../../common/pantheonApi';
import ReviewPostWriteSelect from '../../components/ReviewPostWrteSelect';
import ReviewJobDetail from '../../components/ReviewJobDetail';
const {StatusBarManager} = NativeModules;

type RootStackParamList = {
  PostListScreen: {boardId: number; contentType: string};
  WikiTab: {boardId: number};
  DirectionAgreeScreen: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

interface ImageResponse {
  fileName: string;
  fileSize: number;
  height: number;
  type: string;
  uri: string;
  width: number;
}

interface Direction {
  content: string[];
  id: number;
  title: string;
}

interface PostWriteScreenProps {
  isPantheon?: 'free' | 'question' | 'false';
}
/* boardId 전달 필요(제목 유/무) */

function PostWriteScreen({navigation, route}: PostWriteScreenProps & Props) {
  const formData = new FormData();
  const [boardId, setBoardId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [point, setPoint] = useState<string>('');
  const [myPoint, setMyPoint] = useState<number>(0);
  const [content, setContent] = useState<string>('');
  const [images, setImages] = useState<Asset[]>([]);
  const [info, setInfo] = useState<PostWriteInfoDto>();
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [goBackWarning, setGoBackWarning] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [isSubmitState, setIsSubmitState] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [contentType, setContentType] = useState<string>('TYPE1');
  const isType1 = contentType === 'TYPE1';
  const isType2 = contentType === 'TYPE2';
  const isType3 = contentType === 'TYPE3';
  const isType4 = contentType === 'TYPE4';
  const isPantheon = route.params.isPantheon ?? 'false';
  const [isSelecting, setIsSelecting] = useState<boolean>(
    isPantheon === 'review',
  ); // 직무 정보 선택 화면 표시 여부 (수정후기)
  const [job, setJob] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);

  useEffect(() => {
    const userInfo = async () => {
      if (route.params.boardId) {
        setBoardId(route.params.boardId);
        let result = await getWritePostInfo(route.params.boardId);
        if (result) {
          setInfo(result);
        }
      }
    };

    const userPoint = async () => {
      if (isPantheon === 'question') {
        const user = await getUser();
        if (user) {
          setMyPoint(user.data.data.point);
        }
      }
    };
    userPoint();
    userInfo();
  }, []);

  useEffect(() => {
    if (route.params?.contentType) {
      setContentType(route.params.contentType);
    }
  }, [route.params?.contentType]);

  const onFocus = () => {
    setIsFocus(true);
  };

  const onFocusOut = () => {
    setIsFocus(false);
    Keyboard.dismiss();
  };

  const onSubmitPress = async () => {
    setIsLoading(true);
    const response = await postWritePost(
      boardId,
      title,
      content,
      isAnonymous,
      images,
    );
    if (response.status === 401) {
      setTimeout(function () {
        Toast.show(
          '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
          Toast.SHORT,
        );
      }, 100);
      logout();
      navigation.reset({routes: [{name: 'SplashHome'}]});
    } else if (getHundredsDigit(response.status) === 2) {
      if (boardId >= 5 && boardId < 10) {
        navigation.pop();
        navigation.pop();
        navigation.navigate('WikiTab', {boardId: boardId});
      } else {
        navigation.pop();
        navigation.pop();
        navigation.navigate('PostListScreen', {boardId: boardId});
      }
      setTimeout(function () {
        Toast.show('게시글이 등록되었습니다.', Toast.SHORT);
      }, 100);
    } else {
      setTimeout(function () {
        Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
      }, 100);
    }
    setIsLoading(false);
  };

  const onSubmitFreePress = async () => {
    setIsLoading(true);
    await postPantheonFree(content, isAnonymous, images, title);
    navigation.goBack();
    setIsLoading(false);
  };

  const onSubmitQuriousPress = async () => {
    if (!Number.isInteger(Number(point))) {
      setTimeout(function () {
        Toast.show('포인트는 숫자만 가능합니다.', Toast.SHORT);
      }, 100);
      return;
    }

    if (Number(point) > myPoint) {
      setTimeout(function () {
        Toast.show('현재 포인트보다 큰 값을 설정할 수 없습니다.', Toast.SHORT);
      }, 100);
      return;
    }

    if (Number(point) === 0) {
      setTimeout(function () {
        Toast.show(
          '궁금해요 글을 작성하려면 최소 1 포인트가 필요합니다.',
          Toast.SHORT,
        );
      }, 100);
      return;
    }

    setIsLoading(true);
    await postPantheonQurious(
      content,
      Number(point),
      isAnonymous,
      title,
      images,
    );
    navigation.goBack();
    setIsLoading(false);
  };

  const onSubmitReviewPress = async () => {
    if (!job || !category || !size || !year || !title || !content) {
      setTimeout(() => {
        Toast.show('모든 항목을 입력해주세요.', Toast.SHORT);
      }, 100);
      return;
    }

    setIsLoading(true);

    try {
      await postPantheonReview(
        category,
        content,
        isAnonymous,
        job,
        size,
        title,
        year,
        images,
      );

      setTimeout(() => {
        Toast.show('게시글이 성공적으로 등록되었습니다.', Toast.SHORT);
      }, 100);

      navigation.goBack();
    } catch (error) {
      console.error('판테온 수정후기 게시물 작성 에러', error);
      setTimeout(() => {
        Toast.show('게시글 등록에 실패하였습니다.', Toast.SHORT);
      }, 100);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: (): React.ReactNode => (
        <Pressable
          onPress={() => {
            if (isSelecting) {
              // '다음' 버튼 동작
              if (job && category && size && year) {
                setIsSelecting(false); // 작성 페이지로 이동
              } else {
                Toast.show('모든 항목을 선택해주세요.', Toast.SHORT);
              }
            } else {
              // '완료' 버튼 동작
              if (isPantheon === 'review') {
                setIsSubmitState(
                  !!(title && content && job && category && size && year),
                );
              } else if (info?.hasTitle) {
                setIsSubmitState(!!title);
              } else if (isPantheon === 'question') {
                setIsSubmitState(!!content && !!point);
              } else {
                setIsSubmitState(!!content);
              }
            }
          }}>
          <Text
            style={[
              styles.submit,
              fontRegular,
              {
                color: isSelecting
                  ? '#A055FF' // '다음' 버튼 활성화 색상
                  : info?.hasTitle
                  ? title
                    ? '#A055FF'
                    : '#d8b9ff'
                  : isPantheon === 'question'
                  ? content && point
                    ? '#A055FF'
                    : '#d8b9ff'
                  : content
                  ? '#A055FF'
                  : '#d8b9ff',
              },
            ]}>
            {isSelecting ? '다음' : '완료'}
          </Text>
        </Pressable>
      ),
      headerLeft: () => (
        <TouchableHighlight
          underlayColor="#EEEEEE"
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            if (
              title.length >= 1 ||
              content.length >= 1 ||
              images.length >= 1
            ) {
              setGoBackWarning(true);
            } else {
              navigation.goBack();
            }
          }}>
          <BackButtonIcon />
        </TouchableHighlight>
      ),
    });
  }, [
    navigation,
    title,
    content,
    images,
    point,
    isSelecting,
    job,
    category,
    size,
    year,
  ]);

  useEffect(() => {
    if (isSubmitState) {
      if (isPantheon === 'false') {
        onSubmitPress();
      } else if (isPantheon === 'question') {
        onSubmitQuriousPress();
      } else if (isPantheon === 'free') {
        onSubmitFreePress();
      } else if (isPantheon === 'review') {
        onSubmitReviewPress();
      }
    }
  }, [isAnonymous, isSubmitState, images]);

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 15000,
        maxHeight: 15000,
        selectionLimit: 10,
      },
      res => {
        if (res.didCancel) {
          return;
        }
        let tempImages: Asset[] = [...images, ...res.assets];
        if (tempImages.length > 10) {
          setTimeout(function () {
            Toast.show('이미지는 최대 10개까지 첨부 가능합니다.', Toast.SHORT);
          }, 100);
          setImages(tempImages?.slice(0, 10));
        } else {
          setImages(tempImages);
        }
      },
    );
  };

  const deleteImage = (imageUri: string) => {
    setImages(images.filter(item => item.uri !== imageUri));
    console.log('>>>', images);
  };

  const renderImages = () => {
    return images.map(image => (
      <View key={image.uri} style={{position: 'relative', margin: 5}}>
        <Image
          source={{uri: image.uri}}
          style={{
            width: 90,
            height: 90,
            borderRadius: 8,
          }}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            margin: 5,
          }}
          onPress={() => deleteImage(image.uri)}>
          <DeleteImageIcon />
        </TouchableOpacity>
      </View>
    ));
  };

  useEffect(() => {
    Platform.OS == 'ios'
      ? StatusBarManager.getHeight((statusBarFrameData: any) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputFocusOut = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const onKeyboardDidshow = (e: KeyboardEvent) => {
    setKeyboardHeight(e.endCoordinates.height);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidshow,
    );
    return () => {
      showSubscription.remove();
    };
  }, []);
  if (isSelecting) {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ReviewPostWriteSelect
          setJob={setJob}
          setCategory={setCategory}
          setSize={setSize}
          setYear={setYear}
        />
      </View>
    );
  }

  return (
    <>
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
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#EFEFF3',
        }}
      />
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#fff'}}>
        {/* <Image
            style={{width: 24, height: 24, borderRadius: 12}}
            source={{
              uri: isAnonymous ? info?.defaultProfileImage : info?.profileImage,
            }}
          /> */}
        {/* <Text
              style={{
                fontSize: 16,
                paddingLeft: 8,
                paddingRight: 6,
                fontWeight: '500',
              }}>
              {isAnonymous ? '수정' : info?.nickname}
            </Text> */}
        {/* {info?.isOwner && !isAnonymous && <OrangeFlag />} */}
        <View style={[styles.container]}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1, // ScrollView 내용이 길어지면 버튼도 같이 내려가게 합니다
              //backgroundColor: 'green',
              justifyContent: 'space-between', // 내용과 버튼 사이에 공간을 둡니다
            }}
            style={{
              flex: 1,
            }}>
            {isPantheon === 'question' && (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    paddingHorizontal: 24,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: '#B9BAC1',
                      marginRight: 8,
                    }}>
                    채택포인트
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: '#A055FF',
                    }}>
                    사용 가능 포인트 {myPoint}P
                  </Text>
                </View>
                <TextInput
                  placeholder="채택 답변에 제공될 포인트를 작성해주세요."
                  placeholderTextColor="#D5DBE1"
                  value={point}
                  onChangeText={value => {
                    setPoint(value);
                  }}
                  keyboardType="numeric"
                  style={[fontMedium, styles.title]}
                />
                <View
                  style={{borderBottomWidth: 1, borderBottomColor: '#F6F6F6'}}
                />
              </View>
            )}
            {isPantheon === 'review' && (
              <View style={{paddingHorizontal: 16, marginTop: 16}}>
                <ReviewJobDetail
                  job={job}
                  category={category}
                  size={size}
                  year={year}
                />
              </View>
            )}
            {(info?.hasTitle ||
              isPantheon === 'question' ||
              isPantheon === 'free' ||
              isPantheon === 'review') && (
              <>
                <View style={[styles.inputTitle]}>
                  <Text
                    style={{
                      color: '#B9BAC1',
                    }}>
                    제목
                  </Text>
                </View>
                <View style={{height: 50}}>
                  <TextInput
                    placeholder="제목을 입력하세요."
                    placeholderTextColor="#D5DBE1"
                    value={title}
                    onChangeText={value => {
                      setTitle(value);
                      if (value.length === 20)
                        Toast.show(
                          '게시글 제목은 20글자까지만 입력 가능합니다.',
                          Toast.SHORT,
                        );
                    }}
                    maxLength={20}
                    style={[fontMedium, styles.title]}
                  />
                  <View
                    style={{borderBottomWidth: 1, borderBottomColor: '#F6F6F6'}}
                  />
                </View>
              </>
            )}
            {(!isType3 ||
              isPantheon === 'question' ||
              isPantheon === 'free') && (
              <>
                <View style={[styles.inputTitle]}>
                  <Text
                    style={{
                      color: '#B9BAC1',
                    }}>
                    본문
                  </Text>
                </View>
                <TextInput
                  autoFocus={false}
                  placeholder={`본문 내용을 입력해주세요. \n\n즐거운 수정광산 환경을 만들어 나가는 데에 동참해주세요! 이용 규정을 위반하거나, 일정 수 이상의 신고를 받을 경우 수정광산 이용이 제한될 수 있습니다.`}
                  placeholderTextColor="#D5DBE1"
                  value={content}
                  multiline={true}
                  onChangeText={value => {
                    setContent(value);
                    if (value.length === 5000)
                      Toast.show(
                        '게시글 내용은 5000글자까지만 입력 가능합니다.',
                        Toast.SHORT,
                      );
                  }}
                  maxLength={5000}
                  style={[
                    fontRegular,
                    styles.input,
                    {
                      maxHeight: isFocused
                        ? Platform.OS == 'ios'
                          ? info?.hasTitle
                            ? Dimensions.get('window').height -
                              keyboardHeight -
                              500
                            : Dimensions.get('window').height -
                              keyboardHeight -
                              250
                          : 100000
                        : 400,
                    },
                  ]}
                  autoCorrect={false}
                  onFocus={(e: any) => {
                    onInputFocus();
                  }}
                  onBlur={(e: any) => {
                    onInputFocusOut();
                  }}
                />
              </>
            )}
            <View style={{marginVertical: 10}}>
              {images.length > 0 && (
                <View style={{paddingHorizontal: 12}}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {renderImages()}
                  </ScrollView>
                </View>
              )}
            </View>
            <View
              style={{
                marginTop: 'auto',
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => navigation.navigate('DirectionAgreeScreen')}
                style={{
                  borderRadius: 25,
                  backgroundColor: '#F6F6F6',
                  alignSelf: 'center',
                  width: 'auto',
                  paddingTop: 6,
                  paddingRight: 12,
                  paddingBottom: 6,
                  paddingLeft: 12,
                  marginBottom: 80,
                }}>
                <Text
                  style={{
                    fontWeight: '400',
                    color: '#9DA4AB',
                    textAlign: 'center',
                    paddingHorizontal: 4,
                    paddingVertical: 4,
                  }}>
                  수정광산 이용 방향 전문 보기
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      <SafeAreaView style={styles.bottomBar}>
        {/* <Text style={styles.bottomBarText}>Bottom Fixed Bar</Text> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {(!isType1 ||
              isPantheon === 'question' ||
              isPantheon === 'free') && (
              <TouchableOpacity onPress={onSelectImage}>
                <ImageIcon style={{marginLeft: 20}} />
              </TouchableOpacity>
            )}
            {/* <PostVoteIcon style={{marginHorizontal: 20}} /> */}
          </View>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 20,
            }}
            onPress={() => {
              setIsAnonymous(current => !current);
            }}>
            <Text style={{fontSize: 14, fontWeight: '500', marginRight: 4}}>
              익명
            </Text>
            {isAnonymous ? <RectangleUnchecked /> : <RectangleChecked />}
          </Pressable>
        </View>
      </SafeAreaView>
      <ModalBottom
        modalVisible={goBackWarning}
        setModalVisible={setGoBackWarning}
        content={`작성한 게시글이 삭제됩니다.\n 뒤로 가시겠습니까?`}
        isContentCenter={false}
        purpleButtonText="확인"
        purpleButtonFunc={() => {
          setGoBackWarning(!goBackWarning);
          navigation.goBack();
        }}
        whiteButtonText="취소"
        whiteButtonFunc={() => {
          setGoBackWarning(!goBackWarning);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  submit: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  inputTitle: {
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  container: {
    flex: 1,
    //backgroundColor: 'blue',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 15,
    paddingHorizontal: 24,
    color: '#3A424E',
  },
  input: {
    // minHeight: Dimensions.get('window').height - 400,
    minHeight: 100,
    // maxHeight: Platform.OS === 'ios' ? 300 : 5000,
    fontSize: 14,
    paddingTop: 14,
    fontWeight: '400',
    paddingHorizontal: 24,
    textAlignVertical: 'top',
    color: '#3A424E',
    //backgroundColor: 'skyblue',
  },
  image: {
    marginTop: 19,
    marginLeft: 3,
    marginBottom: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageText: {fontSize: 14, color: '#444444', marginLeft: 8},
  imageBox: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  imageSelectBox: {
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: 8,
    color: '#d1d1d1',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 52,
    borderTopWidth: 1,
    borderTopColor: '#EFEFF3',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomBarText: {
    color: 'white',
    fontSize: 18,
  },
});

export default PostWriteScreen;
