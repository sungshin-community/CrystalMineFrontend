import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StompJs from '@stomp/stompjs';
import Toast from 'react-native-simple-toast';
import WaterMark from '../../components/WaterMark';
import {
  RectangleChecked,
  RectangleUnchecked,
} from '../../../resources/icon/CheckBox';
import SettingIcon from '../../../resources/icon/SettingIcon';
import MessageItem from '../../components/MessageItem';
import {ModalBottom} from '../../components/ModalBottom';
import CheckEdit from '../../../resources/icon/CheckEdit';
import Hamburger from '../../../resources/icon/Hamburger';
import DownTriangle from '../../../resources/icon/Triangle';
import {
  getChatRoom,
  getMessageContent,
  getSocketToken,
} from '../../common/messageApi';
import {MessageRoom, MessageRoomSubscribe} from '../../classes/MessageDto';
import {getAuthentication} from '../../common/homeApi';
import {getHundredsDigit} from '../../common/util/statusUtil';
import {logout} from '../../common/authApi';
import {fontBold, fontMedium} from '../../common/font';

import TextEncodingPolyfill from 'text-encoding';
import BigInt from 'big-integer';
import {fontRegular} from '../../common/font';

Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
  BigInt: BigInt,
});

type RootStackParamList = {
  MessageScreen: {roomId: number};
};
type Props = NativeStackScreenProps<RootStackParamList>;

const MessageFragment = ({navigation}: Props) => {
  const isFocused = useIsFocused();
  const messageClient = useRef<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [accountId, setAccountId] = useState<number | null>(null);
  const [messageList, setMessageList] = useState<MessageDto>([]);
  const [messagePage, setMessagePage] = useState<number>(0);

  const [setting, setSetting] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [sort, setSort] = useState<boolean>(true);
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [readModalVisible, setReadModalVisible] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('createdAt');

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontSize: 19,
        fontFamily: 'SpoqaHanSansNeo-Medium',
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setSetting(!setting)}
          style={{padding: 19}}>
          <SettingIcon />
        </TouchableOpacity>
      ),
    });
  });
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
        setAccountId(response.data.data.id);
        let socketToken = await AsyncStorage.getItem('socketToken');

        // if (socketToken === null) {
        const socketResponse = await getSocketToken();
        //매번 해야되나?? 로그인 시 로그인토큰이 바뀜 -> 소켓토큰도 바뀜... 그냥 로그인 했을 때 같이 처리해줘야되나?
        if (socketResponse.status === 'OK') {
          AsyncStorage.setItem('socketToken', socketResponse.data.socketToken);
        } else {
          setTimeout(function () {
            Toast.show('알 수 없는 오류가 발생하였습니다. (32)', Toast.SHORT);
          }, 100);
        }
        // }

        // 소켓 연결
        console.log('in connect');
        let wsUrl = encodeURI(
          'ws://34.64.137.61:8787/ws?roomId=0&accessToken=Bearer ' +
            socketToken,
        );
        messageClient.current = new StompJs.Client({
          brokerURL: wsUrl,
          debug: str => console.log('STOMP: ' + str),
          onConnect: () => {
            console.log('success');
            subscribe();
          },
          onStompError: (frame: any) => {
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
          },
          onChangeState: () => {
            console.log('processing...', messageClient.current.connected);
          },
          onDisconnect: () => {
            console.log('disconnected!');
          },
          forceBinaryWSFrames: true,
          appendMissingNULLonIncoming: true,
        });

        // messageClient.current.activate();

        //채팅방 데이터 받아오기
        const messageData = await getChatRoom(messagePage);

        if (messageData.status === 'OK') {
          setMessageList(messageData.data.content);
        } else {
          setTimeout(function () {
            Toast.show(
              '메세지 목록을 불러오는 중 오류가 발생했습니다.',
              Toast.SHORT,
            );
          }, 100);
        }
        setLoading(false);
      }
    }
    console.log('init');
    if (isFocused) {
      init();
    }

    return () => {
      messageClient.current.deactivate();
      setEdit(false);
      setSort(false);
      setSetting(false);
      setSortBy('createdAt');
    };
  }, [isFocused]);

  const subscribe = () => {
    try {
      messageClient.current.subscribe(`/sub/list/${accountId}`, (body: any) => {
        console.log(JSON.parse(body.body));
        updateList(JSON.parse(body.body));
      });
    } catch (error) {
      console.log('erererer');
      console.error(error);
    }
  };

  const updateList = (data: MessageRoom) => {
    let tempList = messageList;
    const isExistIndex = messageList.findIndex(
      (m: MessageRoom) => m.roomId === data.roomId,
    );
    //기존 목록에 있는 쪽지방에 쪽지가 올 경우 splice로 수정만 하고
    //새로운 쪽지방이면 배열에 추가
    if (isExistIndex !== -1) {
      tempList.splice(isExistIndex, 1, data);
    } else {
      tempList = [...messageList, data];
    }

    setMessageList(tempList);
  };

  const clickEdit = () => {
    setEdit(true);
    setSort(false);
    setSetting(false);
  };
  const clickSort = () => {
    setEdit(false);
    setSort(true);
    setSetting(false);
  };

  // 최신순 정렬
  const recentSort = (a: MessageRoom, b: MessageRoom) => {
    let atime = a.lastChatTime;
    let btime = b.lastChatTime;
    if (atime.includes('방금') && btime.includes('방금')) {
      return 0;
    } else if (atime.includes('방금') || btime.includes('방금')) {
      if (atime.includes('방금')) {
        return -1;
      } else {
        return 1;
      }
    } else if (atime.includes('분') && btime.includes('분')) {
      return (
        parseInt(atime.slice(0, -3), 10) - parseInt(btime.slice(0, -3), 10)
      );
    } else if (atime.includes('분') || btime.includes('분')) {
      if (atime.includes('분')) {
        return -1;
      } else {
        return 1;
      }
    } else if (atime.includes(':') && btime.includes(':')) {
      return (
        parseInt(atime.slice(0, 2) + atime.slice(3, 2), 10) -
        parseInt(btime.slice(0, 2) + btime.slice(3, 2), 10)
      );
    } else if (atime.includes(':') || btime.includes(':')) {
      if (atime.includes(':')) {
        return -1;
      } else {
        return 1;
      }
    } else if (atime.includes('.') && btime.includes('.')) {
      return (
        parseInt(atime.slice(0, 2) + atime.slice(3, 2), 10) -
        parseInt(btime.slice(0, 2) + btime.slice(3, 2), 10)
      );
    }
    return 0;
  };

  //안읽은 순 정렬
  const unreadSort = (a: MessageRoom, b: MessageRoom) => {
    let aread = a.unreadCount;
    let bread = b.unreadCount;

    if (aread > 0 && bread > 0) {
      return recentSort(a, b);
    } else if (aread > 0 || bread > 0) {
      if (aread > 0) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return recentSort(a, b);
    }
  };

  const moveToList = (message: MessageRoom) => {
    const tempList = messageList.map((m: MessageRoom) =>
      m.roomId === message.roomId ? {...m, isChecked: !m.isChecked} : m,
    );
    const isAllChecked = tempList.filter(c => !c.isChecked).length === 0;
    setIsCheckedAll(isAllChecked);
    setMessageList(tempList);
  };

  const initList = (isChecked: boolean) => {
    const tempList = messageList.map((m: MessageRoom) => ({
      ...m,
      isChecked: isChecked,
    }));
    setMessageList(tempList);
    setIsCheckedAll(isChecked);
  };

  // 쪽지방 읽음처리
  const readMsgRoom = () => {
    const tempList = messageList.map((m: MessageRoom) => {
      if (m.isChecked && m.unreadCount > 0) {
        getMessageContent(m.roomId, 0);
        return {...m, unreadCount: 0, isChecked: false};
      } else {
        return {...m, isChecked: false};
      }
    });
    setMessageList(tempList);
    setReadModalVisible(false);
    setEdit(false);
  };

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
          animating={loading}
          style={{zIndex: 100}}
        />
      </View>
      <WaterMark />
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        {edit && (
          <View
            style={{
              backgroundColor: '#FFFFFF',
              height: 45,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                initList(!isCheckedAll);
              }}
              style={styles.check}>
              {isCheckedAll ? <RectangleChecked /> : <RectangleUnchecked />}
            </TouchableOpacity>
            <Text style={[{fontSize: 14, color: '#333D4B'}, fontMedium]}>
              {`${messageList.filter(c => c.isChecked).length}/${
                messageList.length
              }`}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingRight: 24,
                marginLeft: 'auto',
                color: 'red',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setReadModalVisible(true);
                }}
                style={{marginRight: 18}}>
                <Text style={[styles.readDelete, fontBold]}>읽음</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDeleteModalVisible(true);
                }}>
                <Text style={[styles.readDelete, fontBold]}>삭제</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {sort && (
          <View style={{backgroundColor: '#FFFFFF', height: 36}}>
            <TouchableOpacity
              style={styles.sortBox}
              onPress={() => {
                sortBy === 'createdAt'
                  ? setSortBy('notread')
                  : setSortBy('createdAt');
              }}>
              <Text
                style={{
                  color: '#6E7882',
                  fontSize: 13,
                  marginRight: 4,
                }}>
                {sortBy === 'createdAt' ? '최신순' : '안 읽은 순'}
              </Text>
              <DownTriangle style={{paddingTop: 15}} />
            </TouchableOpacity>
          </View>
        )}
        {messageList.length !== 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={
              sortBy === 'createdAt'
                ? [...messageList].sort(recentSort)
                : [...messageList].sort(unreadSort)
            }
            renderItem={({item}) => (
              <MessageItem
                message={item}
                edit={edit}
                navigation={navigation}
                isCheckedAll={isCheckedAll}
                onPressCheck={(message: MessageRoom) => {
                  moveToList(message);
                }}
              />
            )}
            ItemSeparatorComponent={() => (
              <View style={{height: 1, backgroundColor: '#F6F6F6'}} />
            )}
          />
        ) : (
          <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  fontRegular,
                  {
                    color: '#6E7882',
                    fontSize: 15,
                    textAlign: 'center',
                    lineHeight: 22.5,
                    marginTop: 20,
                  },
                ]}>
                아직 쪽지 내역이 없습니다. {'\n'}수정이와 쪽지를 주고받아
                보세요.
              </Text>
            </View>
          </SafeAreaView>
        )}

        {setting && (
          <View style={styles.setting}>
            <TouchableOpacity
              style={styles.setItem}
              onPress={() => clickEdit()}>
              <CheckEdit />
              <Text style={styles.setText}>편집하기</Text>
            </TouchableOpacity>
            <View style={styles.hr} />
            <TouchableOpacity
              style={styles.setItem}
              onPress={() => clickSort()}>
              <Hamburger />
              <Text style={styles.setText}>정렬하기</Text>
            </TouchableOpacity>
          </View>
        )}
        {deleteModalVisible && (
          <ModalBottom
            modalVisible={deleteModalVisible}
            setModalVisible={setDeleteModalVisible}
            content="선택하신 쪽지를 삭제하시겠습니까?"
            purpleButtonText="삭제"
            whiteButtonText="취소"
            purpleButtonFunc={() => {
              console.log('DELETE OK');
            }}
            whiteButtonFunc={() => {
              setDeleteModalVisible(false);
            }}
          />
        )}
        {readModalVisible && (
          <ModalBottom
            modalVisible={readModalVisible}
            setModalVisible={setReadModalVisible}
            content="선택하신 쪽지를 읽음 처리 하시겠습니까?"
            purpleButtonText="읽음"
            whiteButtonText="취소"
            purpleButtonFunc={() => {
              readMsgRoom();
            }}
            whiteButtonFunc={() => {
              setReadModalVisible(false);
              setEdit(false);
              initList(false);
            }}
          />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  setting: {
    width: 137,
    height: 85,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    right: 2,
    top: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  setItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  setText: {
    ...fontRegular,
    paddingLeft: 8,
    fontSize: 16,
    fontWeight: '400',
  },
  check: {
    justifyContent: 'flex-start',
    paddingLeft: 27,
    paddingRight: 10,
  },
  readDelete: {
    fontSize: 14,
    color: '#222222',
  },
  hr: {
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
    marginHorizontal: 8,
  },
  sortBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    height: 20,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    marginTop: 6,
    borderRadius: 12,
    marginLeft: 24,
  },
});
export default MessageFragment;

let data = {
  content: [
    {
      lastChat: 'ooooo',
      lastChatTime: '6분 전',
      lastPhoto: null,
      partnerNickname: '수정',
      partnerProfile:
        'https://crystalmine-s3.s3.ap-northeast-2.amazonaws.com/profileImages/default.png',
      postBoard: '교육학과',
      roomId: 21,
      unreadCount: 3,
    },
    {
      lastChat: 'chat',
      lastChatTime: '20:18',
      lastPhoto: null,
      partnerNickname: '수정',
      partnerProfile:
        'https://crystalmine-s3.s3.ap-northeast-2.amazonaws.com/profileImages/default.png',
      postBoard: '교육학과',
      roomId: 19,
      unreadCount: 7,
    },
  ],
  empty: false,
  first: true,
  last: true,
  number: 0,
  numberOfElements: 2,
  pageable: {
    offset: 0,
    pageNumber: 0,
    pageSize: 20,
    paged: true,
    sort: {empty: false, sorted: true, unsorted: false},
    unpaged: false,
  },
  size: 20,
  sort: {empty: false, sorted: true, unsorted: false},
};
