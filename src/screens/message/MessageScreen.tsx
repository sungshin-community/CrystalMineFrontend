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
  ScrollView,
} from 'react-native';
import {View} from 'react-native-animatable';
import CameraIcon from '../../../resources/icon/CameraIcon';
import CommentSendIcon from '../../../resources/icon/CommentSendIcon';
import ImageIcon from '../../../resources/icon/ImageIcon';
import {fontRegular} from '../../common/font';
import {LeftArrow} from '../../../resources/icon/Arrow';
import Dots from '../../../resources/icon/Dots';
import {ModalBottom} from '../../components/ModalBottom';
import {Message} from '../../classes/MessageDto';
import {useNavigation} from '@react-navigation/native';
import {getMessageContent} from '../../common/messageApi';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
const dummy = {
  timestamp: '2023-05-15T02:33:51.322431',
  code: 'READ_CHAT_SUCCESS',
  status: 'OK',
  detail: '채팅 조회 성공',
  data: {
    roomId: 1,
    partnerNickname: '수정',
    postId: 27,
    postBoardName: '교내 위키',
    postContent:
      '등록금을 납부했다고 해도, 바로 적용되지 않을수도 있어요.\n보통 다음날, 납부 여부가 업데이트 돼요. (하지만, 다음날이 주말이면 업데이트 안될 수도 있어요!)',
    chats: {
      content: [
        {
          chatId: 76,
          senderId: 15,
          chat: '야호 ㅎㅎ',
          photoUrl: null,
          createdAt: '2023-05-17T22:29:48',
          readAt: '2023-05-15T02:33:51.073796',
        },
        {
          chatId: 75,
          senderId: 15,
          chat: '야호!',
          photoUrl: null,
          createdAt: '2023-05-17T22:28:35',
          readAt: '2023-05-15T02:33:51.073829',
        },
        {
          chatId: 74,
          senderId: 15,
          chat: '채팅을 보내자 채팅을 보내자',
          photoUrl: null,
          createdAt: '2023-05-17T22:20:00',
          readAt: '2023-05-15T02:33:51.073833',
        },
        {
          chatId: 73,
          senderId: 2,
          chat: '이미지도잘들어간닷',
          photoUrl: null,
          createdAt: '2023-05-16T19:04:47',
          readAt: '2023-05-15T02:33:51.073835',
        },
        {
          chatId: 72,
          senderId: 2,
          chat: null,
          photoUrl:
            'https://crystalmine.s3.ap-northeast-2.amazonaws.com/chatPhoto/2023-05-14/6e4a5f7f-1e1a-4027-ad2a-abe5500ff087.jpg',
          createdAt: '2023-05-15T19:04:07',
          readAt: '2023-05-15T02:33:51.073838',
        },
        {
          chatId: 71,
          senderId: 2,
          chat: '채팅이 아주 잘들어갑니다',
          photoUrl: null,
          createdAt: '2023-05-15T18:55:59',
          readAt: '2023-05-15T02:33:51.07384',
        },
        {
          chatId: 70,
          senderId: 2,
          chat: '테스트으',
          photoUrl: null,
          createdAt: '2023-05-14T18:55:40',
          readAt: '2023-05-15T02:33:51.073843',
        },
        {
          chatId: 69,
          senderId: 15,
          chat: '힝..',
          photoUrl: null,
          createdAt: '2023-05-14T04:41:45',
          readAt: '2023-05-15T02:33:51.073845',
        },
        {
          chatId: 68,
          senderId: 1,
          chat: '흠',
          photoUrl: null,
          createdAt: '2023-05-14T04:38:53',
          readAt: '2023-05-15T02:33:51.073848',
        },
        {
          chatId: 67,
          senderId: 15,
          chat: '안녕 이제 나도 바로 볼게',
          photoUrl: null,
          createdAt: '2023-05-14T04:29:29',
          readAt: '2023-05-15T02:33:51.07385',
        },
        {
          chatId: 66,
          senderId: 1,
          chat: '보내~깅',
          photoUrl: null,
          createdAt: '2023-05-14T04:29:11',
          readAt: '2023-05-15T02:33:51.073853',
        },
        {
          chatId: 63,
          senderId: 1,
          chat: null,
          photoUrl:
            'https://crystalmine.s3.ap-northeast-2.amazonaws.com/chatPhoto/2023-05-14/abc31f93-9663-45c1-bc70-e70017bdcb0e.png',
          createdAt: '2023-05-14T01:53:49',
          readAt: '2023-05-15T02:33:51.073855',
        },
        {
          chatId: 62,
          senderId: 1,
          chat: 'rast chat',
          photoUrl: null,
          createdAt: '2023-05-14T01:53:35',
          readAt: '2023-05-15T02:33:51.073858',
        },
        {
          chatId: 61,
          senderId: 15,
          chat: null,
          photoUrl:
            'https://crystalmine.s3.ap-northeast-2.amazonaws.com/chatPhoto/2023-05-14/dedfee39-34d2-412b-8b5e-cebf36de2261.png',
          createdAt: '2023-05-14T01:52:46',
          readAt: '2023-05-15T02:33:51.073867',
        },
        {
          chatId: 60,
          senderId: 15,
          chat: null,
          photoUrl:
            'https://crystalmine.s3.ap-northeast-2.amazonaws.com/chatPhoto/2023-05-14/60fb5718-cd13-47ad-a8c2-c064bfcec908.png',
          createdAt: '2023-05-14T01:49:29',
          readAt: '2023-05-15T02:33:51.07387',
        },
        {
          chatId: 59,
          senderId: 15,
          chat: '다행이당',
          photoUrl: null,
          createdAt: '2023-05-14T01:48:15',
          readAt: '2023-05-15T02:33:51.073873',
        },
        {
          chatId: 58,
          senderId: 15,
          chat: '이제 잘 되네',
          photoUrl: null,
          createdAt: '2023-05-14T01:48:14',
          readAt: '2023-05-15T02:33:51.073876',
        },
        {
          chatId: 57,
          senderId: 15,
          chat: '신기하다~',
          photoUrl: null,
          createdAt: '2023-05-14T01:48:12',
          readAt: '2023-05-15T02:33:51.073879',
        },
        {
          chatId: 56,
          senderId: 1,
          chat: '와하 굿굿',
          photoUrl: null,
          createdAt: '2023-05-14T01:48:03',
          readAt: '2023-05-15T02:33:51.073882',
        },
        {
          chatId: 55,
          senderId: 1,
          chat: '다시다시',
          photoUrl: null,
          createdAt: '2023-05-14T01:47:59',
          readAt: '2023-05-15T02:33:51.073884',
        },
      ],
      pageable: {
        sort: {
          unsorted: true,
          sorted: false,
          empty: true,
        },
        pageNumber: 0,
        pageSize: 20,
        offset: 0,
        paged: true,
        unpaged: false,
      },
      numberOfElements: 20,
      number: 0,
      sort: {
        unsorted: true,
        sorted: false,
        empty: true,
      },
      first: true,
      last: false,
      size: 20,
      empty: false,
    },
  },
};
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
type Props = NativeStackScreenProps<RootStackParamList>;

const MessageScreen = ({navigation}: Props) => {
  // const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [menu, setMenu] = useState<boolean>(false);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [photoPath, setPhotoPath] = useState(null);
  const [images, setImages] = useState<Asset[]>([]);
  const scrollViewRef = useRef(null);
  const camera = useRef(null);
  const chat = dummy.data.chats.content;

  chat.reverse();
  // console.log(chat);

  const devices = useCameraDevices();
  const device = devices.back;
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
  }, [navigation]);
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
  useEffect(() => {
    // 카메라 사용을 위한 권한 확인
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
  }, []);
  // useEffect(() => {
  //   async function getMessage() {
  //     const roomId = 1;
  //     const result = await getMessageContent(roomId);
  //     console.log('Message', result);
  //   }
  //   getMessage();
  // }, []);

  const HeaderTitle = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={[{fontSize: 20}]} numberOfLines={1}>
          {dummy.data.partnerNickname}
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
  // useEffect(() => {
  //   scrollToBottom();
  // }, []);

  // const scrollToBottom = () => {
  //   scrollViewRef.current.scrollToEnd({animated: true});
  // };

  // const handleLayout = () => {
  //   scrollToBottom();
  // };

  // 사진 찍기
  const onPressButton = async () => {
    // console.log('x', camera);
    if (!camera.current) return;
    const photo = await camera.current.takePhoto({
      flash: 'off',
      qualityPrioritization: 'speed',
    });
    setPhotoPath(photo.path);
  };
  // 사진 결정
  const onSendButtonPress = () => {
    if (photoPath) {
      // 사진을 보내는 로직
      console.log('사진을 보냈습니다.');
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
                onPress={onSendButtonPress}>
                <Text style={styles.whiteButtonText}>전송</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={async () => {
              navigation.navigate('PostScreen', {
                postId: dummy.data.postId,
              });
            }}
            style={styles.post}>
            <Text style={styles.postTitle}>{dummy.data.postBoardName}</Text>
            <Text
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={styles.postContent}>
              {dummy.data.postContent}
            </Text>

            <LeftArrow style={{marginTop: 2}} />
          </TouchableOpacity>
          <ScrollView
            ref={scrollViewRef}
            onLayout={() => {
            scrollViewRef.current.scrollToEnd({animated: true});
            }}>
            {chat &&
              chat.map((item: any, index) => {
                let displayDate = true;
                if (index !== 0) {
                  const prevChat = chat[index - 1].createdAt;
                  if (formatDate(item.createdAt) === formatDate(prevChat)) {
                    displayDate = false;
                  }
                }
                return (
                  <View key={index}>
                    {displayDate ? <DateBox time={item.createdAt} /> : null}
                    {item.senderId === 15 ? (
                      <MyChat items={item} />
                    ) : (
                      <OtherChat items={item} />
                    )}
                  </View>
                );
              })}
          </ScrollView>
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
                <TextInput
                  placeholder="메시지를 입력해 주세요."
                  placeholderTextColor="#87919B"
                  multiline={true}
                  maxLength={500}
                  style={[fontRegular, styles.input]}
                  onFocus={(e: any) => {
                    onInputFocus();
                  }}
                  onBlur={(e: any) => {
                    onInputFocusOut();
                  }}
                />
                <View
                  style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
                  <Text>
                    <Pressable
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
      )}
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
    bottom: 50,
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
});
