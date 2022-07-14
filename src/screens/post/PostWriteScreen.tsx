/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { fontMedium, fontRegular } from '../../common/font';
import ImageIcon from '../../../resources/icon/ImageIcon';
import PhotoIcon from '../../../resources/icon/PhotoIcon';
import { RectangleChecked, RectangleUnchecked, Checked } from '../../../resources/icon/CheckBox';
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import { getWritePostInfo, postWritePost } from '../../common/boardApi';
import ProfileImage from '../../../resources/icon/ProfileImage';
import { PostWriteInfoDto } from '../../classes/PostDto';

type RootStackParamList = {
  PostListScreen: undefined;
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

interface Direction {
  content: string[];
  id: number;
  title: string;
}

function PostWriteScreen({ navigation, route }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [imageResponse, setImageResponse] = useState<ImageResponse[]>([]);
  const [direction, setDirection] = useState<string>('');
  const [isInfo, setIsInfo] = useState<PostWriteInfoDto>({});
  const [isShow, setIsShow] = useState<boolean>(true);

  useEffect(() => {
    const userInfo = async () => {
      if (route.params.boardId) {
        let result = await getWritePostInfo(route.params.boardId);
        if (result) {
          console.log('사용자 정보 조회', result);
          setIsInfo(result);
          const placeholder = result.directions
            .map((item: Direction) => {
              return `이용방향 ${item.id}.
        ${item.title}
        
        ${item.content.map((_item, _index) => {
                return `${item.id}-${_index + 1} ${_item}
`;
              })}
`;
            })
            .reduce((acc, cur) => acc + cur);
          setDirection(placeholder);
        }
      }
    };
    userInfo();
  }, [route.params.boardId]);

  const onSubmitPress = async () => {
    const result = await postWritePost({
      boardId: route.params.boardId,
      title: title,
      content: content,
      images: images,
      isAnonymous: false,
    });
    if (result) {
      navigation.navigate('PostListScreen');
      Toast.show('게시글이 등록되었스빈다.', Toast.LONG);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: (): React.ReactNode => (
        <Pressable onPress={onSubmitPress}>
          <Text
            style={[
              styles.submit,
              fontRegular,
              { color: title && content ? '#A055FF' : '#d8b9ff' },
            ]}>
            완료
          </Text>
        </Pressable>
      ),
    });
  }, [navigation, title, content]);

  const onSelectImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', maxWidth: 512, maxHeight: 512, selectionLimit: 10 },
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <ProfileImage />
            <View style={{ justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, paddingLeft: 8, fontWeight: '500' }}>
                {isShow ? '익명' : isInfo.nickname}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{marginRight: 4}}>익명</Text>
            <Pressable onPress={() => setIsShow(!isShow)}>
              {isShow ? <RectangleChecked /> : <RectangleUnchecked />}
            </Pressable>
          </View>
        </View>
        {isInfo && isInfo.hasTitle && (
          <TextInput
            placeholder="제목을 입력하세요."
            value={title}
            onChangeText={value => {
              setTitle(value);
            }}
            style={[fontMedium, styles.title]}
          />
        )}
      </View>
      <View>
        <TextInput
          placeholder={direction}
          value={content}
          multiline={true}
          onChangeText={value => {
            setContent(value);
          }}
          onBlur={() => {
            Keyboard.dismiss();
          }}
          style={[fontRegular, styles.input]}
        />
      </View>
      <View style={{ paddingHorizontal: 24 }}>
        <View style={styles.image}>
          <ImageIcon />
          <Text style={[fontMedium, styles.imageText]}>이미지</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {imageResponse.length !== 0 &&
            imageResponse.map((asset, index) => (
              <Image
                key={index}
                style={styles.imageBox}
                source={{ uri: asset.uri }}
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
  submit: { fontSize: 17, marginRight: 8 },
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  header: {
    justifyContent: 'space-between',
    marginTop: 27,
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 15,
  },
  input: {
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
  imageText: { fontSize: 14, color: '#444444', marginLeft: 8 },
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

export default PostWriteScreen;
