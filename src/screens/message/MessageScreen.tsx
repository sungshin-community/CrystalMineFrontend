import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {View} from 'react-native-animatable';
import CameraIcon from '../../../resources/icon/CameraIcon';
import CommentSendIcon from '../../../resources/icon/CommentSendIcon';
import ImageIcon from '../../../resources/icon/ImageIcon';
import {fontRegular} from '../../common/font';
import {LeftArrow} from '../../../resources/icon/Arrow';
import Dots from '../../../resources/icon/Dots';
import {ModalBottom} from '../../components/ModalBottom';

const MyChat = () => {
  return (
    <View style={{alignItems: 'flex-end', marginRight: 24, marginBottom: 6}}>
      <View style={styles.line}>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.read}>안읽음</Text>
          <Text style={styles.chatTime}>오후 11:25</Text>
        </View>
        <View style={[styles.chat, {backgroundColor: '#E5D2FC'}]}>
          <Text>
            수정아 고양이 사진 20장 안 채워서 올리면 어쩌구저쩌구법에 의해서
            고소당할 수 있어.... 조심해....
          </Text>
        </View>
      </View>
    </View>
  );
};

const OtherChat = () => {
  return (
    <View style={{alignItems: 'flex-start', marginLeft: 24, marginBottom: 6}}>
      <View style={styles.line}>
        <View style={[styles.chat, {backgroundColor: '#EFEFF3'}]}>
          <Text>수정이한테만 더 주는거다?</Text>
        </View>
        <Text style={styles.chatTime}>오후 11:41</Text>
      </View>
    </View>
  );
};
const MessageScreen = ({navigation}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [menu, setMenu] = useState<boolean>(false);
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
  const HeaderTitle = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={[{fontSize: 20}]} numberOfLines={1}>
          내고영최고
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
  return (
    <View style={styles.container}>
      <View style={styles.post}>
        <Text style={styles.postTitle}>일상게시판</Text>
        <Text
          ellipsizeMode={'tail'}
          numberOfLines={1}
          style={styles.postContent}>
          수정이들 빨리 들어와봐 대박이야 안 보면어쩌고저쩌고
        </Text>
        <LeftArrow style={{marginTop: 2}}/>
      </View>
      {/* FlatList가 들어갈 곳 */}
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center', marginBottom: 14, marginTop: 20}}>
          <Text style={{fontSize: 12, fontWeight: '500', color: '#3A424E'}}>2022년 4월 18일</Text>
        </View>
        <View>
          <MyChat />
          <OtherChat />
        </View>
      </View>
      <View
        style={{
          paddingLeft: 24,
          backgroundColor: '#fff',
          paddingBottom: 20,
          // paddingBottom: isFocused
          //   ? Platform.OS == 'ios'
          //     ? keyboardHeight
          //     : 10
          //   : Platform.OS === 'ios'
          //   ? 20
          //   : 0,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 5,
          }}>
          <View style={styles.Icon}>
            <Pressable
              style={{marginRight: 17}}
              hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}>
              <ImageIcon width={24} height={24} />
            </Pressable>
            <Pressable
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
            <View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
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
          purpleButtonText2="채팅방 나가기"
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
});
