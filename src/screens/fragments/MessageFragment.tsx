import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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
const dummy = [
  {
    id: 0,
    nickname: '수정',
    boardType: '장터게시판',
    content: '안녕하세요 직거래로하시나요 택배로 거래하시나요? 답변주세요!!!',
    time: '방금',
    messageCount: 3,
    profileImage: '',
    isChecked: true,
  },
  {
    id: 1,
    nickname: '펭귄',
    boardType: '질문게시판',
    content: '나눔 받고싶어요',
    time: '방금',
    messageCount: '999+',
    profileImage: '',
    isChecked: false,
  },
  {
    id: 2,
    nickname: '초록초록',
    boardType: '자수정',
    content: '집에 나온 거미 잡아줄 사람?? 제발',
    time: '방금',
    messageCount: 0,
    profileImage: '',
    isChecked: false,
  },
];

const TextEncodingPolyfill = require('text-encoding');
const BigInt = require('big-integer');

Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
  BigInt: BigInt,
});

const MessageFragment = () => {
  const messageClient = useRef<any>({});
  const [message, setMessage] = useState<String>('');
  const [messageList, setMessageList] = useState<String[]>([]); //나중에 type 바꿀 것

  const [setting, setSetting] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [sort, setSort] = useState<boolean>(false);
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  const navigation = useNavigation();
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [readModalVisible, setReadModalVisible] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('createdAt');

  const [isSubmitState, setIsSubmitState] = useState<boolean>(false);

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
    connect();

    return () => messageClient.current.deactivate();
  });

  useEffect(() => {
    if (isSubmitState) {
      publish(message);
      setMessage('');
      setIsSubmitState(false);
    }
  }, [message, isSubmitState]);

  const connect = () => {
    console.log('in connect');
    messageClient.current = new StompJs.Client({
      brokerURL: 'ws://34.64.137.61:8787/ws',
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
      forceBinaryWSFrames: true,
      appendMissingNULLonIncoming: true,
    });

    messageClient.current.activate();
  };

  const subscribe = () => {
    console.log('/sub/chat/'); //채널구독, api 주소 바뀔예정
    try {
      messageClient.current.subscribe('/sub/chat', (body: any) => {
        console.log('here');
        console.log('message >>>>>>>>> ', JSON.parse(body.body));
        // console.log('console: ', body); //return messageList
      });
    } catch (error) {
      console.log('erererer');
      console.error(error);
    }
  };

  const publish = (chat: String) => {
    console.log('/pub/chat/'); //메세지발행, api 주소 바뀔예정
    if (!messageClient.current.connected) return;
    try {
      messageClient.current.publish({
        destination: '/pub/chat',
        body: JSON.stringify({
          chat: chat,
        }),
      });
    } catch (error) {
      console.error(error);
    }
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

  return (
    <>
      <WaterMark />
      <SafeAreaView style={{flex: 1}}>
        {edit && (
          <View
            style={{backgroundColor: '#FFFFFF', height: 45, paddingTop: 15}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={() => {
                  setIsCheckedAll(!isCheckedAll);
                }}
                style={styles.check}>
                {isCheckedAll ? <RectangleChecked /> : <RectangleUnchecked />}
              </TouchableOpacity>
              <View style={{flexDirection: 'row', paddingRight: 24}}>
                <TouchableOpacity
                  onPress={() => {
                    setReadModalVisible(true);
                  }}
                  style={{marginRight: 18}}>
                  <Text>읽음</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setDeleteModalVisible(true);
                  }}>
                  <Text>삭제</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        {sort && (
          <View
            style={{backgroundColor: '#FFFFFF', height: 45, paddingTop: 15}}>
            <TouchableOpacity
              style={styles.sortBox}
              onPress={() => {
                sortBy === 'createdAt'
                  ? setSortBy('notReat')
                  : setSortBy('createdAt');
              }}>
              <Text
                style={{
                  color: '#6E7882',
                  fontSize: 13,
                  marginRight: 8,
                }}>
                {sortBy === 'createdAt' ? '최신순' : '안읽은 순'}
              </Text>
              <DownTriangle style={{paddingTop: 15}} />
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dummy}
          renderItem={({item}) => <MessageItem message={item} edit={edit} />}
          ItemSeparatorComponent={() => (
            <View style={{height: 1, backgroundColor: '#F6F6F6'}}></View>
          )}
        />
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
              console.log('READ OK');
            }}
            whiteButtonFunc={() => {
              setReadModalVisible(false);
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
    height: 84,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    right: 2,
    top: 2,
  },
  setItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  setText: {
    paddingLeft: 8,
    fontSize: 16,
    fontWeight: '400',
  },
  check: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 27,
  },
  hr: {
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
    marginHorizontal: 8,
  },
  sortBox: {
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    height: 20,
    width: 82,
    paddingTop: 2,
    borderRadius: 12,
    justifyContent: 'center',
    marginLeft: 24,
  },
});
export default MessageFragment;

// const styles = StyleSheet.create({
//   inputBox: {
//     backgroundColor: '#F2F2F2',
//     width: Dimensions.get('window').width - 90,
//     borderRadius: 25,
//     paddingLeft: 14,
//     paddingRight: 5,
//   },
//   input: {
//     fontSize: 13,
//     width: Dimensions.get('window').width - 150,
//     paddingVertical: 5,
//     paddingTop: Platform.OS == 'ios' ? 13 : 0,
//     minHeight: 44,
//     maxHeight: 230,
//     color: '#222222',
//   },
// });
