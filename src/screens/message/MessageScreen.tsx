import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Platform,
  TextInput,
  KeyboardEvent,
  Keyboard,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {View} from 'react-native-animatable';
import * as StompJs from '@stomp/stompjs';
import CameraIcon from '../../../resources/icon/CameraIcon';
import CommentSendIcon from '../../../resources/icon/CommentSendIcon';
import Plus from '../../../resources/icon/Plus';
import {fontRegular} from '../../common/font';
import {LeftArrow} from '../../../resources/icon/Arrow';
import Dots from '../../../resources/icon/Dots';
import {ModalBottom} from '../../components/ModalBottom';
import {Message} from '../../classes/MessageDto';
import {CommonActions, useIsFocused} from '@react-navigation/native';
import {
  deleteChatRoom,
  getMessageContent,
  patchBlockChatRoom,
  postPhotoMessage,
  getSocketToken,
} from '../../common/messageApi';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Asset,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import DeleteImageIcon from '../../components/ImageDelete';
import {logout} from '../../common/authApi';
import {getAuthentication} from '../../common/homeApi';
import {getHundredsDigit} from '../../common/util/statusUtil';
import {OtherChat, MyChat, DateBox, formatDate} from '../../components/Chat';

import TextEncodingPolyfill from 'text-encoding';
import BigInt from 'big-integer';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
  BigInt: BigInt,
});

type RootStackParamList = {
  PostScreen: {postId: number};
};
type ScreenProps = NativeStackScreenProps<RootStackParamList>;

const MessageScreen = ({navigation, route}: ScreenProps) => {
  const isFocusedPage = useIsFocused();
  const messagesClient = useRef<any>({});
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [photoPath, setPhotoPath] = useState(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const [images, setImages] = useState<Asset[]>([]);
  const [imagePermission, setImagePermission] = useState<boolean>(false);
  const camera = useRef(null);
  const [text, setText] = useState<string>('');
  const [userID, setUserId] = useState<number>(0);
  const [chatData, setChatData] = useState<Message>();
  const [chat, setChat] = useState<Chat[]>();
  const [roomId, setRoomId] = useState<number>(1);
  const [page, setPage] = useState<number>(0);
  const [outModalVisible, setOutModalVisible] = useState<boolean>(false);
  const [blockModalVisible, setBlockModalVisible] = useState<boolean>(false);

  useEffect(() => {
    async function init() {
      const response = await getAuthentication();
      setUserId(response.data.data.id);
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
        let socketToken;

        let getRoomId = route.params?.roomId;
        const result = await getMessageContent(getRoomId, page);

        if (result.status === 'OK') {
          setRoomId(getRoomId);
          setChatData(result.data);
          setChat(result.data.chats.content);
        } else {
          setTimeout(function () {
            Toast.show(
              '메세지를 불러오는 중 문제가 발생했습니다.',
              Toast.SHORT,
            );
          }, 100);
        }

        const socketResponse = await getSocketToken();
        if (socketResponse.status === 'OK') {
          socketToken = socketResponse.data.socketToken;
        } else {
          setTimeout(function () {
            Toast.show('알 수 없는 오류가 발생하였습니다. (32)', Toast.SHORT);
          }, 100);
        }

        console.log('in connect22');
        let wsUrl = encodeURI(
          'ws://15.165.252.35:8787/ws?roomId=' +
            getRoomId +
            '&accessToken=Bearer ' +
            socketToken,
        );
        messagesClient.current = new StompJs.Client({
          brokerURL: wsUrl,
          debug: str => console.log('STOMP: ' + str),
          onConnect: () => {
            console.log('success22');
            subscribe(getRoomId);
          },
          onStompError: (frame: any) => {
            console.log('Broker reported error: ' + frame.headers['messages!']);
            console.log('Additional details: ' + frame.body);
          },
          onChangeState: () => {
            console.log('processing...22', messagesClient.current.connected);
          },
          onDisconnect: () => {
            console.log('disconnected!22');
          },
          forceBinaryWSFrames: true,
          appendMissingNULLonIncoming: true,
        });

        messagesClient.current.activate();

        setIsLoading(false);
      }
    }
    console.log('init22');

    init();

    return () => messagesClient.current.deactivate();
  }, [isFocusedPage]);

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTintColor: '#000000',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setMenu(!menu)}
          style={{paddingRight: 13}}>
          <Dots />
        </TouchableOpacity>
      ),
      headerTitle: () => <HeaderTitle />,
    });
  }, [chat]);

  const subscribe = (getRoomId: number) => {
    try {
      const room = getRoomId ? getRoomId : roomId;
      messagesClient.current.subscribe(`/sub/chat/${room}`, (body: any) => {
        const response = JSON.parse(body.body);
        console.log('message >>>>>>>>> ', JSON.parse(body.body));
        const createdAt = response.createdAt.replace(' ', 'T') + ':00';
        const updatedResponse = {
          ...response,
          senderId: response.writerId,
          createdAt: createdAt,
        };
        setChat(_chat => [updatedResponse, ..._chat]);
      });
    } catch (error) {
      console.log('erererer');
      console.error(error);
    }
  };

  const publish = (textChat: string) => {
    console.log('/pub/chat');
    if (!messagesClient.current.connected) return;

    messagesClient.current.publish({
      destination: '/pub/chat',
      body: JSON.stringify({
        roomId: roomId,
        chat: textChat,
        photoURL: null,
      }),
    });

    setText('');
  };

  const fetchNextPage = async () => {
    setIsNextPageLoading(true);
    try {
      if (chat.length >= 20) {
        let thisPageMessage: any = await getMessageContent(roomId, page + 1);
        if (thisPageMessage.data.chats.last) {
          setIsNextPageLoading(false);
        } else {
          setPage(page + 1);
          const updatedChat = [...chat, ...thisPageMessage.data.chats.content];
          setChat(updatedChat);
          setIsNextPageLoading(false);
        }
      } else {
        setIsNextPageLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HeaderTitle = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={[{fontSize: 20}]} numberOfLines={1}>
          {chatData ? chatData.partnerNickname : ''}
        </Text>
      </View>
    );
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

  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputFocusOut = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const checkImagePermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
        return handlePermissionResult(result);
      } else {
        const androidVersion = Number(Platform.Version);
        if (androidVersion >= 33) {
          // Android 13 이상
          const result = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
          if (result === RESULTS.DENIED) {
            const newResult = await request(
              PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
            );
            return handlePermissionResult(newResult);
          }
          return handlePermissionResult(result);
        } else {
          // Android 13 미만
          const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
          if (result === RESULTS.DENIED) {
            const newResult = await request(
              PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            );
            return handlePermissionResult(newResult);
          }
          return handlePermissionResult(result);
        }
      }
    } catch (error) {
      console.error('Permission check error:', error);
      Toast.show('권한 확인 중 오류가 발생했습니다.');
      return false;
    }
  };

  const handlePermissionResult = async result => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        Toast.show('이 기기에서는 사진 접근이 불가능합니다.');
        return false;
      case RESULTS.DENIED:
        Toast.show('사진 접근 권한이 필요합니다.');
        return false;
      case RESULTS.LIMITED:
        setImagePermission(true);
        return true;
      case RESULTS.GRANTED:
        setImagePermission(true);
        return true;
      case RESULTS.BLOCKED:
        Toast.show('설정에서 사진 접근 권한을 허용해주세요.');
        return false;
      default:
        Toast.show('알 수 없는 권한 상태입니다.');
        return false;
    }
  };

  const onSelectImage = async () => {
    try {
      // 먼저 토스트 메시지로 함수가 실행되는지 확인
      // Toast.show('이미지 선택 시작');

      // 안드로이드 13(API 33) 이상
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        // Toast.show('권한 상태: ' + result);
        if (result !== 'granted') {
          Toast.show('사진 접근 권한이 필요합니다');
          return;
        }
      }
      // 안드로이드 13 미만
      else if (Platform.OS === 'android') {
        const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        Toast.show('권한 상태: ' + result);
        if (result !== 'granted') {
          Toast.show('사진 접근 권한이 필요합니다');
          return;
        }
      }

      // 이미지 피커 실행
      const options = {
        mediaType: 'photo',
        selectionLimit: 1,
      };

      // Toast.show('이미지 피커 실행');
      const result = await launchImageLibrary(options);

      if (result.assets) {
        setImages([...images, ...result.assets]);
      }
    } catch (error) {
      Toast.show('에러 발생: ' + error.message);
      console.error(error);
    }
  };
  const onPressButton = async () => {
    const checkPermission = async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      if (cameraPermission === 'not-determined') {
        const newCameraPermission = await Camera.requestCameraPermission();
        if (newCameraPermission === 'denied') {
          Toast.show('카메라 사용 권한이 거부되었습니다.');
        }
      } else {
        // console.log('권한 확인 완료');
      }
    };
    checkPermission();

    if (!camera.current) return;
    const photo = await camera.current.takePhoto({
      flash: 'off',
      qualityPrioritization: 'speed',
    });
    setPhotoPath(photo.path);
  };

  const onCameraSendButton = () => {
    if (photoPath) {
      setShowCamera(false);
      console.log('사진을 보냈습니다.');
    }
  };

  const DeleteImage = () => {
    setImages([]);
    setPhotoPath(null);
  };

  const onSubmitPress = async () => {
    setIsLoading(true);
    if (images.length !== 0 || photoPath !== null) {
      console.log('image', images, photoPath);
      let response = await postPhotoMessage(roomId, images, photoPath);
      if (response.status === 401) {
        setTimeout(function () {
          Toast.show(
            '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
            Toast.SHORT,
          );
        }, 100);
        logout();
        navigation.reset({routes: [{name: 'SplashHome'}]});
      } else {
        DeleteImage();
      }
    } else {
      if (text.length !== 0) publish(text);
      console.log('텍스트 전송');
    }

    setIsLoading(false);
  };

  const outHandler = async () => {
    try {
      deleteChatRoom(roomId);
      navigation.dispatch(CommonActions.goBack());
    } catch (error) {
      console.error('Failed to leave chat room:', error);
    }
  };

  const blockHandler = async () => {
    try {
      patchBlockChatRoom(roomId);
      navigation.dispatch(CommonActions.goBack());
    } catch (error) {
      console.error('Failed to leave chat room:', error);
    }
  };

  return (
    <>
      {device && showCamera ? (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            ref={camera}
            photo={true}
          />
          <View style={styles.area}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setShowCamera(false);
              }}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.camButton} onPress={onPressButton}>
              <Text />
            </TouchableOpacity>
          </View>
          {photoPath && (
            <>
              <Image
                source={{uri: `file://${photoPath}`}}
                style={styles.previewImage}
              />
              <TouchableOpacity
                style={[styles.whiteButton, {left: 30}]}
                onPress={() => {
                  setPhotoPath(null);
                }}>
                <Text style={styles.whiteButtonText}>다시 찍기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.whiteButton, {right: 30}]}
                onPress={onCameraSendButton}>
                <Text style={styles.whiteButtonText}>전송</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      ) : chatData ? (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() =>
              navigation.push('PostScreen', {postId: chatData.postId})
            }
            style={styles.postInfo}>
            <View
              style={[
                styles.postInfoContent,
                {flexDirection: 'row', alignItems: 'center'},
              ]}>
              <Text style={[styles.postInfoBoardName, {marginRight: 8}]}>
                {chatData.postBoardName}
              </Text>
              <Text
                style={styles.postInfoTitle}
                numberOfLines={1}
                ellipsizeMode="tail">
                {chatData.postContent}
              </Text>
            </View>
            <View style={styles.arrowContainer}>
              <LeftArrow style={styles.arrow} />
            </View>
          </TouchableOpacity>
          <View style={{backgroundColor: '#FFFFFF'}}>
            {isNextPageLoading && (
              <ActivityIndicator
                size="large"
                color={'#A055FF'}
                animating={isNextPageLoading}
                style={{zIndex: 100}}
              />
            )}
          </View>
          <FlatList
            data={chat}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              let displayDate = true;
              if (index !== chat.length - 1) {
                const currentChat = chat[index].createdAt;
                const nextChat = chat[index + 1].createdAt;

                if (formatDate(currentChat) === formatDate(nextChat)) {
                  displayDate = false;
                }
              }
              return (
                <View key={index}>
                  {displayDate ? <DateBox time={item.createdAt} /> : null}
                  {item.senderId === userID ? (
                    <MyChat items={item} />
                  ) : (
                    <OtherChat items={item} />
                  )}
                </View>
              );
            }}
            inverted={true}
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              fetchNextPage();
            }}
          />

          <View
            style={{
              backgroundColor: '#fff',
              paddingBottom: isFocused
                ? Platform.OS == 'ios'
                  ? keyboardHeight
                  : 10
                : Platform.OS === 'ios'
                ? 20
                : 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 5,
              }}>
              <View style={styles.Icon}>
                <TouchableOpacity
                  onPress={() => {
                    console.log('Plus pressed'); // 이 로그가 보이는지 확인
                    onSelectImage();
                  }}
                  hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                  style={
                    {
                      // marginRight: 17,
                      // marginTop: -40,
                    }
                  }>
                  <Plus />
                </TouchableOpacity>
              </View>

              <View style={styles.inputBox}>
                {photoPath || images.length > 0 ? (
                  <View
                    style={{
                      width: 100,
                      height: 100,
                      marginTop: 10,
                      marginBottom: 10,
                    }}>
                    {photoPath ? (
                      <Image
                        source={{uri: `file://${photoPath}`}}
                        style={styles.imageBox}
                      />
                    ) : (
                      <Image
                        source={{uri: `${images[0].uri}`}}
                        style={styles.imageBox}
                      />
                    )}
                    <Pressable
                      onPress={() => {
                        DeleteImage();
                      }}
                      style={{
                        position: 'absolute',
                        right: 0,
                      }}
                      hitSlop={20}>
                      <DeleteImageIcon />
                    </Pressable>
                  </View>
                ) : (
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder={
                        !chatData.isBlocked
                          ? ''
                          : '쪽지를 보낼 수 없는 상대입니다.'
                      }
                      placeholderTextColor="#87919B"
                      multiline={true}
                      maxLength={500}
                      style={[fontRegular, styles.input]}
                      value={text}
                      editable={chatData.isBlocked ? false : true}
                      onChangeText={setText}
                      onFocus={onInputFocus}
                      onBlur={onInputFocusOut}
                    />
                  </View>
                )}
              </View>
              <View
                style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
                <Pressable
                  onPress={() => onSubmitPress()}
                  style={{
                    paddingBottom: Platform.OS === 'ios' ? 3 : 0,
                    bottom: 0,
                  }}>
                  {isLoading ? (
                    <ActivityIndicator
                      size="large"
                      color={'#A055FF'}
                      animating={isLoading}
                      style={{zIndex: 100}}
                    />
                  ) : (
                    <CommentSendIcon
                      width={32}
                      fill={chatData.isBlocked ? '#D1d1d1' : '#A055FF'}
                      style={{
                        position: 'relative',
                        top: 0,
                        right: 0,
                        marginLeft: 9,
                        marginRight: 16,
                        marginBottom: 6,
                      }}
                    />
                  )}
                </Pressable>
              </View>
            </View>
          </View>

          {menu && (
            <ModalBottom
              modalVisible={menu}
              setModalVisible={setMenu}
              content="쪽지메뉴"
              purpleButtonText={chatData.isBlocked ? 'none' : '차단하기'}
              purpleButtonText2="채팅방 나가기"
              whiteButtonText={chatData.isBlocked ? 'none' : '취소'}
              purpleButtonFunc={() => {
                setMenu(false);
                setTimeout(() => {
                  setBlockModalVisible(true);
                }, 10);
              }}
              purpleButtonFunc2={() => {
                setMenu(false);
                setTimeout(() => {
                  setOutModalVisible(true);
                }, 10);
              }}
              whiteButtonFunc={() => {
                setMenu(false);
              }}
            />
          )}
          {outModalVisible && (
            <ModalBottom
              modalVisible={outModalVisible}
              setModalVisible={setOutModalVisible}
              content="퇴장 시 쪽지 목록과 내용이 모두 삭제되며 복구할 수 없습니다. 정말로 나가시겠습니까?"
              purpleButtonText="나가기"
              whiteButtonText="취소"
              purpleButtonFunc={() => {
                outHandler();
              }}
              whiteButtonFunc={() => {
                setOutModalVisible(false);
              }}
            />
          )}
          {blockModalVisible && (
            <ModalBottom
              modalVisible={blockModalVisible}
              setModalVisible={setBlockModalVisible}
              content="차단 시 상대방과 더 이상 쪽지를 주고받을 수 없으며,
             차단 해제가 불가능합니다.
             정말로 차단하시겠습니까?"
              purpleButtonText="차단하기"
              whiteButtonText="취소"
              purpleButtonFunc={() => {
                blockHandler();
              }}
              whiteButtonFunc={() => {
                setBlockModalVisible(false);
              }}
            />
          )}
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  post: {
    paddingHorizontal: 12,
    paddingVertical: 13,
    borderColor: '#CECFD6',
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  postTitle: {
    color: '#3A424E',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  postContent: {
    width: Dimensions.get('window').width - 170,
    color: '#6E7882',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  Icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    // backgroundColor: 'red',
    marginRight: 9,
    marginLeft: 12,
    paddingBottom: 8,
  },
  inputBox: {
    backgroundColor: '#F2F2F2',
    width: Dimensions.get('window').width - 110,
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    // width: Dimensions.get('window').width - 200,
    // width: '100%',
    // paddingBottom: 10,
    // paddingTop: Platform.OS == 'ios' ? 13 : 10,
    minHeight: 38,
    maxHeight: 92,
    color: '#222222',
  },
  area: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  camButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: '#A055FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  whiteButtonText: {
    color: '#A055FF',
    fontWeight: 'bold',
  },
  whiteButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    zIndex: 1,
  },
  cancelButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imageBox: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  postInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    backgroundColor: '#F7F5FC',
  },
  postInfoContent: {
    flex: 1,
  },
  postInfoBoardName: {
    fontSize: 12,
    color: '#666666',
    // marginBottom: 4,
  },
  postInfoTitle: {
    fontSize: 14,
    color: '#3A424E',
    fontWeight: '500',
    flex: 1,
  },
  arrowContainer: {
    marginLeft: 8,
  },
});

export default MessageScreen;
