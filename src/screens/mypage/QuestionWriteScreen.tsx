import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommonActions} from '@react-navigation/native';
import BackButton from '../../components/BackButton';
import {fontMedium, fontRegular} from '../../common/font';
import ImageIcon from '../../../resources/icon/ImageIcon';
import PhotoIcon from '../../../resources/icon/PhotoIcon';
import {writeQuestion} from '../../common/myPageApi';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {ModalBottom} from '../../components/ModalBottom';
import Toast from 'react-native-simple-toast';
import {ImageDelete} from '../../components/ImageDelete';

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

function RequestWriteScreen({navigation}: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageResponse, setImageResponse] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onSubmitPress = async () => {
    console.log('title', title, 'content: ', content, 'images', imageResponse);
    const result = await writeQuestion(title, content, imageResponse);
    if (result) {
      navigation.navigate('QuestionList');
      Toast.show('문의하신 내용이 정상적으로 접수되었습니다.', Toast.SHORT);
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
            제출
          </Text>
        </Pressable>
      ),
    });
  }, [navigation, title, content]);

   const onSelectImage = () => {
    console.log('image press');
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 10000,
        maxHeight: 10000,
        selectionLimit: 10,
      },
      res => {
        if (res.didCancel) {
          return;
        }
        let tempImages: Asset[] = [...imageResponse, ...res.assets];
        if (tempImages.length > 10) {
          Toast.show('이미지는 최대 10개까지 첨부 가능합니다.', Toast.SHORT);
          setImageResponse(tempImages?.slice(0, 10));
        } else {
          setImageResponse(tempImages);
        }
      },
    );
  };

  const deleteImage = (imageUri: string) => {
    setImageResponse(imageResponse.filter(item => item.uri !== imageUri));
    console.log('>>>', imageResponse);
  };

  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TextInput
              placeholder="제목을 입력하세요."
              placeholderTextColor="#D5DBE1"
              value={title}
              onChangeText={value => {
                setTitle(value);
                if (value.length === 23)
                  Toast.show(
                    '문의 제목은 23글자까지만 입력 가능합니다.',
                    Toast.SHORT,
                  );
              }}
              maxLength={23}
              style={[fontMedium, styles.title]}
            />
          </View>
          <View>
            <TextInput
              placeholder="내용을 입력하세요."
              placeholderTextColor="#D5DBE1"
              value={content}
              multiline={true}
              onChangeText={value => {
                setContent(value);
                if (value.length === 500)
                  Toast.show(
                    '문의 내용은 500글자까지만 입력 가능합니다.',
                    Toast.SHORT,
                  );
              }}
              maxLength={500}
              onBlur={() => {
                Keyboard.dismiss();
                console.log('키보드다른데클릭');
              }}
              style={[fontRegular, styles.input]}
            />
          </View>
          <View style={{paddingHorizontal: 24}}>
            <View style={styles.image}>
              <ImageIcon />
              <Text style={[fontMedium, styles.imageText]}>이미지</Text>
            </View>
           <ScrollView horizontal={true}>
                <View style={{flexDirection: 'row'}}>
                  {imageResponse?.length !== 0 &&
                    imageResponse?.map((asset, index) => (
                      <ImageDelete
                        key={index}
                        imageUri={asset.uri}
                        deleteImage={deleteImage}
                      />
                    ))}
                  <View
                    style={[
                      styles.imageSelectBox,
                      styles.imageBox,
                      {marginTop: 5},
                    ]}>
                    <Pressable onPress={onSelectImage} hitSlop={25}>
                      <PhotoIcon />
                      <Text style={[fontMedium, styles.count]}>
                        {imageResponse?.length}/10
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </ScrollView>
          </View>
        </View>
      </ScrollView>
      {modalVisible && (
        <ModalBottom
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          content={`작성하신 문의글은 답변 대기 상태가 되며,\n답변이 달린 후로는 문의글을\n삭제할 수 없음을 알려드립니다.`}
          purpleButtonText="확인"
          purpleButtonFunc={() => {
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 27,
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 15,
    color: '#222222',
    flex: 1,
  },
  input: {
    backgroundColor: '#FBFBFB',
    minHeight: 194,
    fontSize: 15,
    paddingTop: 14,
    paddingBottom: 14,
    lineHeight: 21,
    paddingHorizontal: 24,
    textAlignVertical: 'top',
    color: '#222222',
  },
  image: {
    marginTop: 19,
    marginLeft: 3,
    marginBottom: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageText: {fontSize: 14, color: '#444444', marginLeft: 8},
  imageBox: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  imageSelectBox: {
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: 8,
    color: '#d1d1d1',
  },
});

export default RequestWriteScreen;
