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
import analytics from '@react-native-firebase/analytics';
import remoteConfig from '@react-native-firebase/remote-config';

type RootStackParamList = {
  PostScreen: {postId: number};
  PostWriteScreen: {boardId: number; contentType: string};
  UpdateBoard: {boardId: number};
  BoardSearch: {boardName: string; boardId: number};
  PostSearch: {boardId: number; boardName: string};
  PostListScreen: {boardId: number; contentType: string};
  WikiTab: {boardId: number};
  DirectionAgreeScreen: undefined;
};
import {PostWriteInfoDto} from '../classes/PostDto';
import {getWritePostInfo, postWritePost} from '../common/boardApi';
import BPostSend from '../../resources/icon/BPostSend';

type Props = NativeStackScreenProps<RootStackParamList> & {
  contentType: 'TYPE1' | 'TYPE2' | 'TYPE3' | 'TYPE4';
  hasTitle: boolean;
  onPress: () => void;
};

const PostWriteBCase = ({
  navigation,
  route,
  contentType,
  hasTitle,
  onPress,
}: Props) => {
  console.log('PostWriteBCase rendered');
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

  // TYPE1: 제목 + 본문, TYPE2: 제목 + 본문+ 사진, TYPE3: 제목 + 사진, TYPE4: 기존 게시글용
  const showImageIcon = contentType !== 'TYPE1';
  const showContent = contentType !== 'TYPE3';
  const showTitle =
    contentType !== 'TYPE4' || (contentType === 'TYPE4' && hasTitle);

  useEffect(() => {
    const fetchData = async () => {
      if (route.params.boardId) {
        setBoardId(route.params.boardId);
        const result = await getWritePostInfo(route.params.boardId);
        if (result) {
          setInfo(result);
        }
      }

      if (!isInited) {
        setIsLoading(true);
      }

      const userDto = await getUser();
      if (userDto.status === 401) {
        setTimeout(() => {
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
    };

    fetchData();
  }, [navigation, route.params.boardId]);

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
      setTimeout(() => {
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
        navigation.navigate('PostListScreen', {
          boardId: boardId,
          contentType: contentType,
        });
      }
      setTimeout(() => {
        Toast.show('게시글이 등록되었습니다.', Toast.SHORT);
      }, 100);
    } else {
      setTimeout(() => {
        Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
      }, 100);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isSubmitState) {
      onSubmitPress();
    }
  }, [isAnonymous, isSubmitState, images]);

  const toPostWriteScreen = async () => {
    try {
      await analytics().logEvent('writing_box_expand', {
        boardId: route.params.boardId.toString(),
        contentType: contentType,
      });
      console.log('writing_box_expand 이벤트 클릭');
    } catch (error) {
      console.error('Error logging writing_box_expand:', error);
    }
    navigation.navigate('PostWriteScreen', {
      boardId: route.params.boardId,
      contentType: contentType,
      initialTitle: titleInput,
      initialContent: contentInput,
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
          setTimeout(() => {
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
            width: 40,
            height: 40,
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
    <TouchableOpacity
      onPress={async () => {
        console.log('Writing box clicked inside PostWriteBCase');
        if (onPress) {
          onPress();
        } else {
          console.log('onPress is not defined');
          try {
            await analytics().logEvent('custom_click', {
              component: 'writing_box',
              boardId: route.params.boardId.toString(),
            });
            console.log('Event logged to Firebase');
          } catch (error) {
            console.error('Error logging event:', error);
          }
        }
      }}>
      <View style={styles.container}>
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
          </TouchableOpacity>
        </View>
        <View style={[styles.textContainer]}>
          <View style={{marginTop: 10}}>
            {showTitle && (
              <>
                <TextInput
                  style={styles.titleInput}
                  placeholder="제목을 작성해 주세요!"
                  value={titleInput}
                  onChangeText={setTitleInput}
                />
                <View
                  style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: '#EFEFF3',
                    marginVertical: 8,
                  }}
                />
              </>
            )}
            {showContent && (
              <TextInput
                style={styles.contentInput}
                placeholder="게시글을 작성해 주세요!"
                value={contentInput}
                onChangeText={setContentInput}
                multiline
              />
            )}
          </View>
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
                {showImageIcon && (
                  <TouchableOpacity onPress={onSelectImage}>
                    <ImageIcon />
                  </TouchableOpacity>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Pressable
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 10,
                  }}
                  onPress={() => {
                    setIsAnonymous(current => !current);
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      marginRight: 6,
                      color: '#3A424E',
                    }}>
                    익명
                  </Text>
                  {isAnonymous ? <RectangleUnchecked /> : <RectangleChecked />}
                </Pressable>
                <Pressable
                  onPress={async () => {
                    try {
                      await analytics().logEvent('writing_box_done', {
                        boardId: route.params.boardId.toString(),
                        contentType: contentType,
                        hasTitle: info?.hasTitle || false,
                        isContentFilled: !!contentInput,
                        isTitleFilled: !!titleInput,
                      });
                      console.log('writing_box_done 클릭');
                    } catch (error) {
                      console.error(
                        'Error logging writing_box_done event:',
                        error,
                      );
                    }
                    if (info?.hasTitle) {
                      if (titleInput && contentInput) setIsSubmitState(true);
                      else setIsSubmitState(false);
                    } else if (contentInput) setIsSubmitState(true);
                    else setIsSubmitState(false);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: 67,
                      height: 37,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 4,
                      backgroundColor: info?.hasTitle
                        ? titleInput && contentInput
                          ? '#A055FF'
                          : '#E2E4E8'
                        : contentInput
                        ? '#A055FF'
                        : '#E2E4E8',
                    }}>
                    <Text
                      style={[
                        styles.submit,

                        {
                          color: info?.hasTitle
                            ? titleInput && contentInput
                              ? '#fff'
                              : '#fff'
                            : contentInput
                            ? '#fff'
                            : '#fff',
                          fontSize: 14,
                        },
                      ]}>
                      완료
                    </Text>
                    <BPostSend />
                  </View>
                </Pressable>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </TouchableOpacity>
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
  titleInput: {
    fontSize: 14,
    fontWeight: '600',
  },
  contentInput: {
    fontSize: 14,
    fontWeight: '400',
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
    paddingHorizontal: 16,
    paddingTop: 16,
    borderBottomColor: '#F6F6F6',
    borderStyle: 'solid',
    borderBottomWidth: 4,
    height: 'auto',
    //backgroundColor: 'red',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    paddingLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#3A424E',
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 16,
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
    padding: 0,
  },
  content: {
    padding: 0,

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
    width: '100%',
    height: 52,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submit: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
});

export default PostWriteBCase;
