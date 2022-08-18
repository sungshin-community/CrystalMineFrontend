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
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fontMedium, fontRegular} from '../../common/font';
import ImageIcon from '../../../resources/icon/ImageIcon';
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
import {ImageDeleteButton} from '../../components/ImageDeleteButton';
const {StatusBarManager} = NativeModules;

type RootStackParamList = {
  PostListScreen: {boardId: number};
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

function PostWriteScreen({navigation, route}: Props) {
  const formData = new FormData();
  const [boardId, setBoardId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [images, setImages] = useState<Asset[]>([]);
  const [info, setInfo] = useState<PostWriteInfoDto>();
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [goBackWarning, setGoBackWarning] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  let anonymous: boolean = true;

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
    userInfo();
  }, [route.params.boardId]);

  const onFocus = () => {
    setIsFocus(true);
  };

  const onFocusOut = () => {
    setIsFocus(false);
    Keyboard.dismiss();
  };
  const onSubmitPress = async () => {
    setIsLoading(true);
    console.log(
      'api 함수 호출 전: ',
      boardId,
      title,
      content,
      isAnonymous,
      images,
    );
    const result = await postWritePost(
      boardId,
      title,
      content,
      anonymous,
      images,
    );
    if (result) {
      setIsLoading(false);
      if (boardId >= 5 && boardId < 10) {
        navigation.pop();
        navigation.pop();
        navigation.navigate('WikiTab', {boardId: boardId});
      } else {
        navigation.pop();
        navigation.pop();
        navigation.navigate('PostListScreen', {boardId: boardId});
      }
      Toast.show('게시글이 등록되었습니다.', Toast.SHORT);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: (): React.ReactNode => (
        <Pressable onPress={onSubmitPress}>
          <Text
            style={[
              styles.submit,
              fontRegular,
              {
                color:
                  info && info?.hasTitle
                    ? title && content
                      ? '#A055FF'
                      : '#d8b9ff'
                    : content
                    ? '#A055FF'
                    : '#d8b9ff',
              },
            ]}>
            완료
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
            setGoBackWarning(true);
            console.log('click');
          }}>
          <BackButtonIcon />
        </TouchableHighlight>
      ),
    });
  }, [navigation, title, content]);

  const onSelectImage = () => {
    console.log('image press');
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 10000,
        maxHeight: 10000,
        selectionLimit: 10,
      },
      res => {
        if (res.didCancel) {
          return;
        }
        let tempImages: Asset[] = [...images, ...res.assets];
        if (tempImages.length > 10) {
          Toast.show('이미지는 최대 10개까지 첨부 가능합니다.', Toast.SHORT);
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

  useEffect(() => {
    Platform.OS == 'ios'
      ? StatusBarManager.getHeight((statusBarFrameData: any) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

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
      <KeyboardAvoidingView
        keyboardVerticalOffset={60}
        behavior={Platform.select({ios: 'height'})}
        style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Pressable
            onPress={() => Keyboard.dismiss()}
            style={{
              paddingHorizontal: 24,
              paddingVertical: 12,
              flex: 1,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{width: 24, height: 24, borderRadius: 12}}
                source={{
                  uri: isAnonymous
                    ? info?.defaultProfileImage
                    : info?.profileImage,
                }}
              />
              <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 16,
                    paddingLeft: 8,
                    paddingRight: 6,
                    fontWeight: '500',
                  }}>
                  {isAnonymous ? '수정' : info?.nickname}
                </Text>
                {info?.isOwner && !isAnonymous && <OrangeFlag />}
              </View>
            </View>
          </Pressable>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 30,
            }}
            onPress={() => {
              setIsAnonymous(current => !current);
              anonymous = !anonymous;
            }}>
            <Text style={{marginRight: 4}}>익명</Text>
            {isAnonymous ? <RectangleChecked /> : <RectangleUnchecked />}
          </Pressable>
        </View>
        <ScrollView style={styles.container}>
          <View
            style={{
              flex: 1,
            }}>
            {info?.hasTitle && (
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
                  maxLength={23}
                  style={[fontMedium, styles.title]}
                />
                <View
                  style={{borderBottomWidth: 1, borderBottomColor: '#F6F6F6'}}
                />
              </View>
            )}

            {info?.direction.content && (
              <TextInput
                autoFocus={false}
                placeholder={info?.direction.content}
                placeholderTextColor="#D5DBE1"
                value={content}
                multiline={true}
                onChangeText={value => {
                  setContent(value);
                  if (value.length === 1000)
                    Toast.show(
                      '게시글 내용은 1000글자까지만 입력 가능합니다.',
                      Toast.SHORT,
                    );
                }}
                maxLength={1000}
                onBlur={() => {
                  Keyboard.dismiss();
                }}
                style={[fontRegular, styles.input]}
                autoCorrect={false}
              />
            )}

            <Pressable
              onPress={() => navigation.navigate('DirectionAgreeScreen')}
              style={{
                borderRadius: 50,
                borderColor: '#D6D6D6',
                borderWidth: 1,
                alignSelf: 'center',
                width: 'auto',
              }}>
              <Text
                style={{
                  color: '#6E7882',
                  textAlign: 'center',
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                }}>
                수정광산 이용 방향 전문 보기
              </Text>
            </Pressable>
            <View
              style={{
                paddingHorizontal: 24,
                paddingVertical: 20,
              }}>
              <View style={styles.image}>
                <ImageIcon />
                <Text style={[fontMedium, styles.imageText]}>이미지</Text>
              </View>
              <ScrollView horizontal={true}>
                <View style={{flexDirection: 'row'}}>
                  {images?.length !== 0 &&
                    images?.map((asset, index) => (
                      <ImageDeleteButton
                        key={index}
                        imageUri={asset.uri}
                        deleteImage={deleteImage}
                      />
                    ))}
                  <View
                    style={[
                      styles.imageSelectBox,
                      styles.imageBox,
                      {marginTop: 5},
                    ]}>
                    <Pressable onPress={onSelectImage} hitSlop={25}>
                      <PhotoIcon />
                      <Text style={[fontMedium, styles.count]}>
                        {images?.length}/10
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {goBackWarning && (
        <ModalBottom
          modalVisible={goBackWarning}
          setModalVisible={setGoBackWarning}
          content={`작성한 게시글이 삭제됩니다.\n뒤로 가시겠습니까?`}
          isContentCenter={true}
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
      )}
    </>
  );
}

const styles = StyleSheet.create({
  submit: {fontSize: 17, marginRight: 8},
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 15,
    paddingVertical: 15,
    paddingHorizontal: 24,
    color: '#222222',
  },
  input: {
    minHeight: 400,
    maxHeight: Platform.OS === 'ios' ? 300 : 5000,
    fontSize: 15,
    paddingTop: 14,
    paddingHorizontal: 24,
    textAlignVertical: 'top',
    color: '#222222',
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
});

export default PostWriteScreen;
