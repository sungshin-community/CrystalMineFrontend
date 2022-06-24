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
import {writeQuestion} from '../../../common/myPageApi';
import {launchImageLibrary} from 'react-native-image-picker';
import {ModalBottom} from '../../../components/ModalBottom';
import Toast from 'react-native-simple-toast';
import {
  Checked,
  RectangleChecked,
  RectangleUnchecked,
} from '../../../../resources/icon/CheckBox';

type RootStackParamList = {
  QuestionList: undefined;
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
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  //임시
  const [images, setImages] = useState<string[]>([]);

  const [imageResponse, setImageResponse] = useState<ImageResponse[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onSubmitPress = async () => {
    console.log('title', title, 'content: ', content, 'images', images);
    const result = await writeQuestion({
      title: title,
      content: content,
      images: ['', ''],
    });
    if (result) {
      navigation.navigate('QuestionList');
      Toast.show('문의하신 내용이 정상적으로 접수되었습니다.', Toast.LONG);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: (): React.ReactNode => (
        <Pressable
          onPress={() => {
            if (title && content) setModalVisible(true);
          }}>
          <Text
            style={[
              styles.submit,
              fontRegular,
              {color: title && content ? '#A055FF' : '#87919B'},
            ]}>
            완료
          </Text>
        </Pressable>
      ),
    });
  }, [navigation, title, content]);

  return (
    <>
      <View style={styles.container}>
        <View style={{marginHorizontal: 24}}>
          <Text style={[fontMedium, {fontSize: 15}]}>게시판 이름</Text>
          <TextInput
            placeholder="게시판 이름을 입력해주세요."
            value={title}
            onChangeText={value => {
              setTitle(value);
            }}
          />
          <Text style={[fontMedium, {fontSize: 15}]}>게시판 설명</Text>
          <TextInput
            placeholder="게시판 설명을 입력해주세요."
            value={content}
            multiline={true}
            onChangeText={value => {
              setContent(value);
            }}
            onBlur={() => {
              Keyboard.dismiss();
              console.log('키보드다른데클릭');
            }}
            style={[styles.input]}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <RectangleUnchecked />
          <Text style={[fontMedium, {marginLeft: 5}]}>핫게시판 전송 허용</Text>
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
    minHeight: 194,
    paddingTop: 14,
    paddingBottom: 14,
    textAlignVertical: 'top',
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
