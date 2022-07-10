import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommonActions} from '@react-navigation/native';
import BackButton from '../../../components/BackButton';
import {fontBold, fontMedium, fontRegular} from '../../../common/font';
import ImageIcon from '../../../../resources/icon/ImageIcon';
import PhotoIcon from '../../../../resources/icon/PhotoIcon';
import {launchImageLibrary} from 'react-native-image-picker';
import {ModalBottom} from '../../../components/ModalBottom';
import Toast from 'react-native-simple-toast';
import {createBoard} from '../../../common/boardApi';
import {
  Checked,
  RectangleChecked,
  RectangleUnchecked,
} from '../../../../resources/icon/CheckBox';

type RootStackParamList = {
  PostListScreen: {boardId: number};
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

function CreateBoard({navigation}: Props) {
  const [boardName, setBoardName] = useState<string>('');
  const [boardIntroduction, setBoardIntroduction] = useState<string>('');
  const [hotable, setHotable] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onSubmitPress = async () => {
    const result = await createBoard(boardName, boardIntroduction, hotable);
    if (result) {
      Toast.show('게시판을 성공적으로 생성했습니다.', Toast.LONG);
      navigation.navigate('PostListScreen', {boardId: result.id});
    }
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: (): React.ReactNode => (
        <Pressable
          onPress={() => {
            if (boardName && boardIntroduction) setModalVisible(true);
          }}>
          <Text
            style={[
              styles.submit,
              fontRegular,
              {color: boardName && boardIntroduction ? '#A055FF' : '#87919B'},
            ]}>
            완료
          </Text>
        </Pressable>
      ),
    });
  }, [navigation, boardName, boardIntroduction]);

  return (
    <>
      <View style={styles.container}>
        <View style={{marginHorizontal: 24, paddingTop: 20}}>
          <Text style={[fontMedium, {fontSize: 15}]}>게시판 이름</Text>
          <TextInput
            placeholder="게시판 이름을 입력해주세요."
            value={boardName}
            onChangeText={value => {
              setBoardName(value);
            }}
            style={{fontSize: 13, paddingVertical: 22}}
            maxLength={15}
          />
          <View
            style={{
              borderBottomColor: '#F6F6F6',
              borderBottomWidth: 1,
              marginBottom: 15,
            }}
          />
          <Text style={[fontMedium, { fontSize: 15 }]}>게시판 설명</Text>
          <View style={{height: 149}}>
          <TextInput
            textAlignVertical="top"       
            placeholder="게시판 설명을 입력해주세요."
            value={boardIntroduction}
            onChangeText={value => {
              setBoardIntroduction(value);
            }}
            onBlur={() => {
              Keyboard.dismiss();
            }}
            style={[styles.input]}
            maxLength={22}
            />
            </View>
        </View>
        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={() => {
              setHotable(!hotable);
            }}>
            {hotable ? <RectangleChecked /> : <RectangleUnchecked />}
          </Pressable>
          <Text style={[{marginLeft: 5}]}>핫게시판 전송 허용</Text>
        </View>
      </View>
      {modalVisible && (
        <ModalBottom
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalText="게시판 삭제 공지"
          modalBody={`게시판 삭제 기능은 아직 개발 중이므로 게시판 삭제는 불가능합니다.
        `}
          modalButtonText="확인"
          modalButton
          modalButtonFunc={() => {
            onSubmitPress();
            setModalVisible(false);
          }}></ModalBottom>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  submit: {fontSize: 17, marginRight: 8},
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  input: {
    paddingTop: 14,
    paddingBottom: 14,
    textAlignVertical: 'top',
    fontSize: 13,
  },
  option: {
    marginTop: 19,
    marginLeft: 3,
    marginBottom: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CreateBoard;
