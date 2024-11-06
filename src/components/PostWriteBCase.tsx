import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import {fontMedium, fontRegular, fontBold} from '../common/font';
import ImageIcon from '../../resources/icon/ImageIcon';
import PostVoteIcon from '../../resources/icon/PostVoteIcon';
import {
  RectangleChecked,
  RectangleUnchecked,
} from '../../resources/icon/CheckBox';
import ExpandIcon from '../../resources/icon/ExpandIcon';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getUser} from '../common/myPageApi';
import Toast from 'react-native-simple-toast';
import {logout} from '../common/authApi';
import {getHundredsDigit} from '../common/util/statusUtil';
import User from '../classes/User';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import DeleteImageIcon from './ImageDelete';
type RootStackParamList = {
  PostScreen: {postId: number};
  PostWriteScreen: {boardId: number};
  UpdateBoard: {boardId: number};
  BoardSearch: {boardName: string; boardId: number};
  PostSearch: {boardId: number; boardName: string};
  PostListScreen: {boardId: number};
  WikiTab: {boardId: number};
  DirectionAgreeScreen: undefined;
};
import {PostWriteInfoDto} from '../classes/PostDto';
import {getWritePostInfo, postWritePost} from '../common/boardApi';

type Props = NativeStackScreenProps<RootStackParamList>;

const PostWriteBCase = ({navigation, route}: Props) => {
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [titleInput, setTitleInput] = useState('');
  const [contentInput, setContentInput] = useState('');
  const [isInited, setIsInited] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [errorStatus, setErrorStatus] = useState<number>();
  const [isError, setIsError] = useState<boolean>(false);
  const [images, setImages] = useState<Asset[]>([]);
  const [isSubmitState, setIsSubmitState] = useState<boolean>(false);
  const [info, setInfo] = useState<PostWriteInfoDto>();
  const [boardId, setBoardId] = useState<number>(0);

  const onSubmitPress = async () => {
    setIsLoading(true);
    const response = await postWritePost(
      boardId,
      titleInput,
      contentInput,
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
  }, []);

  useEffect(() => {
    async function getUserInfo() {
      if (!isInited) {
        setIsLoading(true);
      }
      const userDto = await getUser();
      console.log(userDto.data);
      if (userDto.status === 401) {
        setTimeout(function () {
          Toast.show(
            '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
            Toast.SHORT,
          );
        }, 100);
        logout();
        navigation.reset({routes: [{name: 'SplashHome'}]});
      } else if (getHundredsDigit(userDto.status) === 2) {
        setUser(userDto.data.data);
      } else {
        setErrorStatus(userDto.status);
        setIsError(true);
      }

      if (!isInited) {
        setIsLoading(false);
        setIsInited(true);
      }
    }
    getUserInfo();
  }, [navigation]);

  useEffect(() => {
    if (isSubmitState) {
      onSubmitPress();
    }
  }, [isAnonymous, isSubmitState, images]);

  const toPostWriteScreen = () => {
    navigation.navigate('PostWriteScreen', {
      boardId: route.params.boardId,
    });
  };
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

  const deleteImage = (imageUri: string) => {
    setImages(images.filter(item => item.uri !== imageUri));
    console.log('>>>', images);
  };

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 10, paddingVertical: 17}}>
        <View style={styles.nameContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={{width: 24, height: 24, borderRadius: 12}}
              source={{uri: user?.profileImage}}
            />
            <Text style={styles.name}>{user?.nickname}</Text>
          </View>
          <TouchableOpacity onPress={toPostWriteScreen}>
            <ExpandIcon />
            <Pressable
              onPress={() => {
                if (info?.hasTitle) {
                  if (titleInput && contentInput) setIsSubmitState(true);
                  else setIsSubmitState(false);
                } else if (contentInput) setIsSubmitState(true);
                else setIsSubmitState(false);
              }}>
              <Text
                style={[
                  styles.submit,
                  fontRegular,
                  {
                    color: info?.hasTitle
                      ? titleInput && contentInput
                        ? '#A055FF'
                        : '#d8b9ff'
                      : contentInput
                      ? '#A055FF'
                      : '#d8b9ff',
                  },
                ]}>
                완료
              </Text>
            </Pressable>
          </TouchableOpacity>
        </View>
        <View style={[styles.textContainer]}>
          <TextInput
            style={[styles.title]}
            placeholder="제목을 작성해 주세요!"
            placeholderTextColor="#9DA4AB"
            multiline={true}
            numberOfLines={2}
            ellipsizeMode="tail"
            onChangeText={setTitleInput}
            value={titleInput}
          />
          <TextInput
            style={[styles.content, fontRegular]}
            placeholder="게시글을 작성해 주세요!"
            placeholderTextColor="#9DA4AB"
            multiline={true}
            numberOfLines={2}
            ellipsizeMode="tail"
            onChangeText={setContentInput}
            value={contentInput}
          />
          <View style={{marginVertical: 10}}>
            {images.length > 0 && (
              <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {renderImages()}
                </ScrollView>
              </View>
            )}
          </View>
          <SafeAreaView style={styles.bottomBar}>
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
                <TouchableOpacity onPress={onSelectImage}>
                  <ImageIcon />
                </TouchableOpacity>
                {/* <PostVoteIcon style={{marginHorizontal: 20}} /> */}
              </View>
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setIsAnonymous(current => !current);
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    marginRight: 4,
                  }}>
                  익명
                </Text>
                {isAnonymous ? <RectangleChecked /> : <RectangleUnchecked />}
              </Pressable>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  grayButtonStyle: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  grayButtonText: {
    color: '#6E7882',
    fontSize: 12,
    lineHeight: 15,
    paddingLeft: 10,
  },
  popularButtonText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#A055FF',
    paddingLeft: 10,
    lineHeight: 15,
  },
  purpleButtonStyle: {
    backgroundColor: '#F6F2FF',
    borderRadius: 4,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  container: {
    position: 'relative',
    paddingHorizontal: 14,
    borderBottomColor: '#F6F6F6',
    borderStyle: 'solid',
    borderBottomWidth: 4,
    height: 'auto',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    paddingTop: 2,
    paddingLeft: 8,
    fontFamily: 'SpoqaHanSansNeo-Medium',
    fontSize: 14,
    fontWeight: '500',
    color: '#3A424E',
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 14,
    color: '#222222',
  },
  textSmall: {
    color: '#9DA4AB',
    fontSize: 13,
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  timeStamp: {
    fontSize: 12,
    paddingLeft: 10,
    paddingTop: 2,
    color: '#B9BAC1',
  },
  title: {
    fontSize: 14,
    lineHeight: 19.6,
    fontWeight: '600',
    color: '#222222',
    borderBottomColor: '#EFEFF3',
    borderBottomWidth: 1,
  },
  content: {
    fontSize: 14,
    //marginBottom: 30,
    lineHeight: 19.6,
    fontWeight: '400',
    color: '#222222',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCount: {
    marginLeft: 5,
    marginRight: 12,
    color: '#9DA4AB',
  },
  bottomBar: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: 10,
    //height: 52,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submit: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default PostWriteBCase;
