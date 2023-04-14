import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  Pressable,
  Keyboard,
  Platform,
} from 'react-native';
import * as StompJs from '@stomp/stompjs';
import Toast from 'react-native-simple-toast';
import WaterMark from '../../components/WaterMark';
import CommentSendIcon from '../../../resources/icon/CommentSendIcon';
import {fontRegular} from '../../common/font';

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

  const commentInputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSubmitState, setIsSubmitState] = useState<boolean>(false);

  useEffect(() => {
    connect();

    return () => messageClient.current.deactivate();
  }, []);

  useEffect(() => {
    // console.log('isSubmitState', isSubmitState);
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

  const onInputFocus = () => {
    setIsFocused(true);
  };
  const onInputFocusOut = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };
  return (
    <>
      <WaterMark />
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 150,
              height: 150,
            }}
            source={require('../../../resources/images/NoComment.png')}
          />
          <Text
            style={{
              color: '#6E7882',
              fontSize: 15,
              fontFamily: 'SpoqaHanSansNeo-Regular',
              textAlign: 'center',
              lineHeight: 22.5,
              marginTop: 20,
            }}>
            현재 개발 중인 기능입니다!!.{'\n'}
            추후 기능 개발 후 사용하실 수 있습니다.
          </Text>
        </View>
        <View
          style={[
            styles.inputBox,
            {flexDirection: 'row', justifyContent: 'space-between'},
          ]}>
          <TextInput
            ref={commentInputRef}
            placeholder="댓글을 입력해 주세요."
            placeholderTextColor="#87919B"
            multiline={true}
            onChangeText={value => {
              setMessage(value);
              if (value.length === 500)
                Toast.show(
                  '메세지 내용은 500글자까지만 입력 가능합니다.',
                  Toast.SHORT,
                );
            }}
            value={message}
            autoCorrect={false}
            style={[fontRegular, styles.input]}
            maxLength={500}
            onFocus={(e: any) => {
              onInputFocus();
            }}
            onBlur={(e: any) => {
              onInputFocusOut();
            }}
          />
          <View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
            <Text>
              {message &&
                (isSubmitState ? (
                  <></>
                ) : (
                  <Pressable
                    style={{
                      paddingBottom: Platform.OS === 'ios' ? 3 : 5,
                      bottom: 0,
                    }}
                    onPress={() => {
                      setIsSubmitState(true);
                    }}>
                    <CommentSendIcon />
                  </Pressable>
                ))}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default MessageFragment;

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: '#F2F2F2',
    width: Dimensions.get('window').width - 90,
    borderRadius: 25,
    paddingLeft: 14,
    paddingRight: 5,
  },
  input: {
    fontSize: 13,
    width: Dimensions.get('window').width - 150,
    paddingVertical: 5,
    paddingTop: Platform.OS == 'ios' ? 13 : 0,
    minHeight: 44,
    maxHeight: 230,
    color: '#222222',
  },
});
