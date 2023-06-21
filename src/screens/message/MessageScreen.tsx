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
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StompJs from '@stomp/stompjs';
import CameraIcon from '../../../resources/icon/CameraIcon';
import CommentSendIcon from '../../../resources/icon/CommentSendIcon';
import ImageIcon from '../../../resources/icon/ImageIcon';
import {fontRegular} from '../../common/font';
import {LeftArrow} from '../../../resources/icon/Arrow';
import Dots from '../../../resources/icon/Dots';
import {ModalBottom} from '../../components/ModalBottom';
import {Message} from '../../classes/MessageDto';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getMessageContent, postPhotoMessage} from '../../common/messageApi';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import DeleteImageIcon from '../../components/ImageDelete';
import {logout} from '../../common/authApi';
import {getAuthentication} from '../../common/homeApi';
import {getHundredsDigit} from '../../common/util/statusUtil';

import TextEncodingPolyfill from 'text-encoding';
import BigInt from 'big-integer';

Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
  BigInt: BigInt,
});

const imgUrlCoverting = (arr: string[]) => {
  const array = arr.map(url => {
    return {url: url};
  });
  return array;
};
const formatTime = (time: string) => {
  var d = new Date(time);
  var h = d.getHours() < 12 ? 1 : 0;
  return h
    ? '오전 ' + d.getHours() + ':' + d.getMinutes()
    : '오후 ' + (d.getHours() - 12) + ':' + d.getMinutes();
};
const formatDate = (day: string) => {
  var d = new Date(day);
  return (
    d.getFullYear() + '년 ' + (d.getMonth() + 1) + '월 ' + d.getDate() + '일'
  );
};
const DateBox = (time: any) => {
  return (
    <View style={{alignItems: 'center', marginBottom: 14, marginTop: 20}}>
      <Text style={{fontSize: 12, fontWeight: '500', color: '#3A424E'}}>
        {formatDate(time.time)}
      </Text>
    </View>
  );
};
const MyChat = (items: any) => {
  const navigation = useNavigation();
  var data = items.items;
  return (
    <View style={{alignItems: 'flex-end', marginRight: 24, marginBottom: 6}}>
      <View style={styles.line}>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.read}>{data.readAt ? '' : '안읽음'}</Text>
          <Text style={styles.chatTime}>{formatTime(data.createdAt)}</Text>
        </View>
        {data.photoUrl ? (
          <Pressable
            onPress={() =>
              navigation.navigate('ImageViewerScreen', {
                imageUrls: imgUrlCoverting([data.photoUrl]),
              })
            }>
            <Image
              source={{uri: data.photoUrl}}
              style={{width: 140, height: 140, borderRadius: 10}}
            />
          </Pressable>
        ) : (
          <View style={[styles.chat, {backgroundColor: '#E5D2FC'}]}>
            <Text>{data.chat}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
const OtherChat = (items: any) => {
  const navigation = useNavigation();
  var data = items.items;
  return (
    <View style={{alignItems: 'flex-start', marginLeft: 24, marginBottom: 6}}>
      <View style={styles.line}>
        {data.photoUrl ? (
          <Pressable
            onPress={() =>
              navigation.navigate('ImageViewerScreen', {
                imageUrls: imgUrlCoverting([data.photoUrl]),
              })
            }>
            <Image
              source={{uri: data.photoUrl}}
              style={{width: 140, height: 140, borderRadius: 10}}
            />
          </Pressable>
        ) : (
          <View style={[styles.chat, {backgroundColor: '#EFEFF3'}]}>
            <Text>{data.chat}</Text>
          </View>
        )}
        <Text style={styles.chatTime}>{formatTime(data.createdAt)}</Text>
      </View>
    </View>
  );
};

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
  const camera = useRef(null);
  const [text, setText] = useState<string>('');
  // 채팅내역 조회 API 반환 데이터
  const [chatData, setChatData] = useState<Message>();
  // 채팅만 뽑아낸 데이터
  const [chat, setChat] = useState<string[]>();
  const [roomId, setRoomId] = useState<number>(1);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    async function init() {
      const response = await getAuthentication();
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
        let socketToken = await AsyncStorage.getItem('socketToken');

        //채팅방 데이터 받아오기
        let getRoomId = route.params?.roomId;
        const result = await getMessageContent(getRoomId, page);
        if (result.status === 'OK') {
          setRoomId(getRoomId);
          setChatData(result.data);
          setChat(result.data.chats.content.slice().reverse());
        } else {
          setTimeout(function () {
            Toast.show(
              '메세지를 불러오는 중 문제가 발생했습니다.',
              Toast.SHORT,
            );
          }, 100);
        }

        // TODO: 소켓 오류나면 여기를 실행하시오.. 로직은 나중에 같이 고민해봅시다...
        //  const socketResponse = await getSocketToken();
        //  if (socketResponse.status === 'OK') {
        //    AsyncStorage.setItem('socketToken', socketResponse.data.socketToken);
        //  } else {
        //    setTimeout(function () {
        //      Toast.show('알 수 없는 오류가 발생하였습니다. (32)', Toast.SHORT);
        //    }, 100);
        //  }

        // 소켓 연결
        console.log('in connect22');
        let wsUrl = encodeURI(
          'ws://34.64.137.61:8787/ws?roomId=' +
            roomId +
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
            messagesClient.current.unsubscribe();
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
        setChat(_chat => [response, ..._chat]);
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

  // 다음 페이지 채팅 내역 불러오기
  const fetchNextPage = async () => {
    setIsNextPageLoading(true);
    let thisPageMessage: any = await getMessageContent(roomId, page + 1);
    if (thisPageMessage.data.chats.content.length > 0) {
      setPage(page + 1);
      const updatedChat = [...chat, ...thisPageMessage.data.chats.content];
      setChat(updatedChat);
    }
    // console.log(chat);
    setIsNextPageLoading(false);
  };

  // 헤더
  const HeaderTitle = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={[{fontSize: 20}]} numberOfLines={1}>
          {chatData ? chatData.partnerNickname : ''}
        </Text>
      </View>
    );
  };
  // 키보드
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
  // Input Focus
  const onInputFocus = () => {
    setIsFocused(true);
  };
  const onInputFocusOut = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };
  // 이미지 선택
  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 15000,
        maxHeight: 15000,
        selectionLimit: 1,
      },
      res => {
        if (res.didCancel) {
          return;
        }
        let tempImages: Asset[] = [...images, ...res.assets];
        console.log('>>', res);
        setImages(tempImages);
      },
    );
  };
  // 사진 찍기
  const onPressButton = async () => {
    // 카메라 사용을 위한 권한 확인
    const checkPermission = async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      if (cameraPermission === 'not-determined') {
        const newCameraPermission = await Camera.requestCameraPermission();
        if (newCameraPermission === 'denied') {
          Toast.show('카메라 사용 권한이 거부되었습니다.');
        }
      } else {
        console.log('권한 확인 완료');
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
  // 사진 결정
  const onCameraSendButton = () => {
    if (photoPath) {
      setShowCamera(false);
      console.log('사진을 보냈습니다.');
    }
  };
  // 선택한 사진 취소
  const DeleteImage = () => {
    setImages([]);
    setPhotoPath(null);
  };
  // 전송버튼
  const onSubmitPress = async () => {
    setIsLoading(true);
    let response;
    if (images && photoPath) {
      response = await postPhotoMessage(roomId, images, photoPath);
    } else {
      publish(text);
      console.log('텍스트 전송');
    }
    // 오류처리 if문 안으로 옮겨놔야되지 않나? textonly는 소켓만 사용하닊가.. 아님말구..
    // if (response.status === 401) {
    //   setTimeout(function () {
    //     Toast.show(
    //       '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
    //       Toast.SHORT,
    //     );
    //   }, 100);
    //   logout();
    //   navigation.reset({routes: [{name: 'SplashHome'}]});
    // } else {
    //   setTimeout(function () {
    //     Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
    //   }, 100);
    // }
    setIsLoading(false);
  };

  return (
    <>
      {device && showCamera ? (
        // 카메라 화면
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
            onPress={async () => {
              navigation.push('PostScreen', {
                postId: chatData.postId,
              });
            }}
            style={styles.post}>
            <Text style={styles.postTitle}>{chatData.postBoardName}</Text>
            <Text
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={styles.postContent}>
              {chatData.postContent}
            </Text>

            <LeftArrow style={{marginTop: 2}} />
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
          {/* 채팅 내역 */}
          <FlatList
            data={chat}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              let displayDate = true;
              if (index !== 0) {
                const prevChat = chat[index - 1].createdAt;
                if (formatDate(item.createdAt) === formatDate(prevChat)) {
                  displayDate = false;
                }
              }
              return (
                // TODO: 나중에 여기 수정해야될 듯 해요(고정데이터)
                <View key={index}>
                  {displayDate ? <DateBox time={item.createdAt} /> : null}
                  {item.senderId === 15 ? (
                    <MyChat items={item} />
                  ) : (
                    <OtherChat items={item} />
                  )}
                </View>
              );
            }}
            inverted={true}
            //TODO: 여기 (스크롤이 생기지 않을 만큼)메세지가 몇개 없을 때
            //      데이터 패치를 무한으로 해와서 무한로딩 걸려서 주석처리 해놨읍니다.. 수정할 방법 찾아야될듯?
            // onEndReached={() => fetchNextPage()}
          />

          <View
            style={{
              paddingLeft: 24,
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
                <Pressable
                  onPress={onSelectImage}
                  style={{marginRight: 17}}
                  hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}>
                  <ImageIcon width={24} height={24} />
                </Pressable>
                <Pressable
                  onPress={() => setShowCamera(true)}
                  style={{marginRight: 15}}
                  hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}>
                  <CameraIcon />
                </Pressable>
              </View>
              <View
                style={[
                  styles.inputBox,
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                {/* 사진 전송 전 미리보기 */}
                {photoPath || images.length > 0 ? (
                  <View
                    style={{
                      width: 155,
                      height: 150,
                      marginTop: 5,
                      marginBottom: -40,
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
                        right: 47,
                        top: -5,
                      }}
                      hitSlop={20}>
                      <DeleteImageIcon />
                    </Pressable>
                  </View>
                ) : (
                  <TextInput
                    placeholder="메시지를 입력해 주세요."
                    placeholderTextColor="#87919B"
                    multiline={true}
                    maxLength={500}
                    style={[fontRegular, styles.input]}
                    value={text}
                    onChangeText={setText}
                    onFocus={(e: any) => {
                      onInputFocus();
                    }}
                    onBlur={(e: any) => {
                      onInputFocusOut();
                    }}
                  />
                )}

                <View
                  style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
                  <Text>
                    <Pressable
                      onPress={() => onSubmitPress()}
                      style={{
                        paddingBottom: Platform.OS === 'ios' ? 3 : 5,
                        bottom: 0,
                      }}>
                      <CommentSendIcon width={28} />
                    </Pressable>
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {menu && (
            <ModalBottom
              modalVisible={menu}
              setModalVisible={setMenu}
              content="쪽지메뉴"
              purpleButtonText="사용자 차단"
              purpleButtonText2="신고하기"
              purpleButtonText3="채팅방 나가기"
              whiteButtonText="취소"
              purpleButtonFunc={() => {
                console.log('READ OK');
              }}
              whiteButtonFunc={() => {
                setMenu(false);
              }}
            />
          )}
        </View>
      ) : null}
    </>
  );
};

export default MessageScreen;

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
    width: 83,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingBottom: 6,
  },
  inputBox: {
    backgroundColor: '#F2F2F2',
    width: Dimensions.get('window').width - 130,
    borderRadius: 25,
    paddingLeft: 14,
    paddingRight: 5,
  },
  input: {
    fontSize: 13,
    width: Dimensions.get('window').width - 200,
    paddingVertical: 5,
    paddingTop: Platform.OS == 'ios' ? 13 : 0,
    minHeight: 44,
    maxHeight: 230,
    color: '#222222',
  },
  chat: {
    maxWidth: 240,
    color: '#222222',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  chatTime: {
    color: '#6E7882',
    fontSize: 10,
    paddingHorizontal: 8,
  },
  read: {
    marginRight: 8,
    marginBottom: 2,
    color: '#A055FF',
    fontSize: 10,
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
});
