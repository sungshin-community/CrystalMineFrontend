/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  Pressable,
  ScrollView,
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
import { getWritePostInfo, postWritePost, uploadPostImages } from '../../common/boardApi';
import ProfileImage from '../../../resources/icon/ProfileImage';
import { PostWriteInfoDto } from '../../classes/PostDto';
import { OrangeFlag } from '../../../resources/icon/OrangeFlag'

type RootStackParamList = {
  PostListScreen: { boardId: number };
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
  const [boardId, setBoardId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [images, setImages] = useState<string[]>([]); // 글 등록할 때 보낼 이미지 url 배열
  const [direction, setDirection] = useState<string>('');
  const [isInfo, setIsInfo] = useState<PostWriteInfoDto>({});
  const [isShow, setIsShow] = useState<boolean>(true);

  useEffect(() => {
    const userInfo = async () => {
      if (route.params.boardId) {
        setBoardId(route.params.boardId);
        let result = await getWritePostInfo(route.params.boardId);

        if (result) {
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
      boardId: boardId,
      title: title,
      content: content,
      images: images,
      isAnonymous: isShow,
    });
    if (result) {
      navigation.navigate('PostListScreen', { boardId });
      Toast.show('게시글이 등록되었습니다.', Toast.LONG);
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
              {
                color:
                  isInfo && isInfo.hasTitle
                    ? title && content
                      ? '#A055FF'
                      : '#d8b9ff'
                    : content
                      ? '#A055FF'
                      : '#d8b9ff',
              },
            ]}>
            완료
          </Text>
        </Pressable>
      ),
    });
  }, [navigation, title, content]);

  const onSelectImage = () => {
    if (images.length < 10) {
      setImages(item => [...item, {}])
      launchImageLibrary(
        { mediaType: 'photo', maxWidth: 512, maxHeight: 512, selectionLimit: 10 },
        async res => {
          if (res.didCancel) {
            return;
          }
          let response = await uploadPostImages(res.assets[0]);
          if (response.code === 'UPLOAD_POST_IMAGES_SUCCESS') {
            setImages([...images, response.data.urls[0]]);
          }
        },
      );
    }
  };

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {isShow || (isInfo && !isInfo.profileImage) ? (
                <ProfileImage />
              ) : (
                <View style={styles.profileImage}>
                  <Image source={{ uri: isInfo.profileImage }} />
                </View>
              )}
              <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, paddingLeft: 8, paddingRight: 6, fontWeight: '500' }}>
                  {isShow ? '수정' : isInfo.nickname}
                </Text>
                {isInfo && isInfo.isOwner && !isShow && <OrangeFlag />}
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginRight: 4 }}>익명</Text>
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
            {images.map((item, index) => (
              <Image
                key={index}
                style={styles.imageBox}
                source={{ uri: item }} />
            ))}
            <View style={[styles.imageSelectBox, styles.imageBox]}>
              <Pressable onPress={onSelectImage} hitSlop={25}>
                <PhotoIcon />
                <Text style={[fontMedium, styles.count]}>
                  {images.length}/10
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  submit: { fontSize: 17, marginRight: 8 },
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingBottom: 40,
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
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 50,
    backgroundColor: '#675',
  }
});

export default PostWriteScreen;
