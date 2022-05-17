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
import BackButton from '../../components/BackButton';
import {fontMedium, fontRegular} from '../../common/font';
import ImageIcon from '../../../resources/icon/ImageIcon';
import PhotoIcon from '../../../resources/icon/PhotoIcon';
import {writeQuestion} from '../../common/myPageApi';
import {launchImageLibrary} from 'react-native-image-picker';

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
  //임시
  const [images, setImages] = useState<string[]>([])

  const [imageResponse, setImageResponse] = useState<ImageResponse[]>([]);

  const onSubmitPress = async () => {
     console.log('title', title, 'content: ', content, 'images', images)
      const result = await writeQuestion({
        title: title,
        content: content,
        images: ['', ''],
      });
     if (result)
      navigation.navigate('QuestionList')
   };
  
  useEffect(() => {
    navigation.setOptions({
      headerRight: (): React.ReactNode => (
        <Pressable onPress={(onSubmitPress)}>
          <Text style={[styles.submit, fontRegular]}>제출</Text>
        </Pressable>
      ),
    });
  }, [navigation, title, content]);

  const onSelectImage = () => {
    console.log('image press');

    launchImageLibrary(
      {mediaType: 'photo', maxWidth: 512, maxHeight: 512, selectionLimit: 10},
      res => {
        if (res.didCancel) {
          return;
        }
        console.log('image', res);
        setImageResponse(res.assets);
      },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput placeholder="제목을 입력하세요." value={title} onChangeText={value => { setTitle(value);}} style={[fontMedium, styles.title]}></TextInput>
      </View>
      <View>
        <TextInput
          placeholder="내용을 입력하세요."
          value={content}
          autoCorrect={false}
          multiline={true}
          onChangeText={value => { setContent(value); }}
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
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {imageResponse.length !== 0 &&
            imageResponse.map((asset, index) => (
              <Image
                key={index}
                style={styles.imageBox}
                source={{uri: asset.uri}}
              />
            ))}
          <View style={[styles.imageSelectBox, styles.imageBox]}>
            <Pressable onPress={onSelectImage} hitSlop={25}>
              <PhotoIcon />
              <Text style={[fontMedium, styles.count]}>
                {imageResponse.length}/10
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  submit: {color: '#A055FF', fontSize: 17, marginRight: 8},
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
