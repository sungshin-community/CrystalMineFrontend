/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableHighlight,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fontMedium, fontRegular} from '../../common/font';
import ImageIcon from '../../../resources/icon/ImageIcon';
import PhotoIcon from '../../../resources/icon/PhotoIcon';
import {
  RectangleChecked,
  RectangleUnchecked,
  Checked,
} from '../../../resources/icon/CheckBox';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import {
  getWritePostInfo,
  postWritePost,
  uploadPostImages,
} from '../../common/boardApi';
import ProfileImage from '../../../resources/icon/ProfileImage';
import {PostWriteInfoDto} from '../../classes/PostDto';
import {OrangeFlag} from '../../../resources/icon/OrangeFlag';
import BackButtonIcon from '../../../resources/icon/BackButtonIcon';
import {ModalBottom} from '../../components/ModalBottom';

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

interface Direction {
  content: string[];
  id: number;
  title: string;
}

function PostWriteScreen({navigation, route}: Props) {
  const formData = new FormData();
  const [boardId, setBoardId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [images, setImages] = useState<any>([]);
  const [info, setInfo] = useState<PostWriteInfoDto>();
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [goBackWarning, setGoBackWarning] = useState<boolean>(false);

  useEffect(() => {
    const userInfo = async () => {
      if (route.params.boardId) {
        setBoardId(route.params.boardId);
        let result = await getWritePostInfo(route.params.boardId);
        if (result) {
          setInfo(result);
        }
      }
    };
    userInfo();
  }, [route.params.boardId]);

  const onSubmitPress = async () => {
    console.log(boardId, images);
    const result = await postWritePost(
      boardId,
      title,
      content,
      isAnonymous,
      images,
    );
    if (result) {
      navigation.navigate('PostListScreen', {boardId});
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
                  info && info?.hasTitle
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
      headerLeft: () => (
        <TouchableHighlight
          underlayColor="#EEEEEE"
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setGoBackWarning(true);
            console.log('click')
          }}>
          <BackButtonIcon />
        </TouchableHighlight>
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
        setImages(res.assets);
      },
    );
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{width: 24, height: 24, borderRadius: 12}}
                source={{
                  uri: isAnonymous
                    ? 'https://crystalmine.s3.ap-northeast-2.amazonaws.com/profileImages/default.png'
                    : info?.profileImage,
                }}
              />
              <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 16,
                    paddingLeft: 8,
                    paddingRight: 6,
                    fontWeight: '500',
                  }}>
                  {isAnonymous ? '수정' : info?.nickname}
                </Text>
                {info?.isOwner && !isAnonymous && <OrangeFlag />}
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{marginRight: 4}}>익명</Text>
              <Pressable onPress={() => setIsAnonymous(!isAnonymous)}>
                {isAnonymous ? <RectangleChecked /> : <RectangleUnchecked />}
              </Pressable>
            </View>
          </View>
          {info?.hasTitle && (
            <>
              <TextInput
                placeholder="제목을 입력하세요."
                value={title}
                onChangeText={value => {
                  setTitle(value);
                }}
                style={[fontMedium, styles.title]}
              />
              <View
                style={{borderBottomWidth: 1, borderBottomColor: '#F6F6F6'}}
              />
            </>
          )}
        </View>

        <View>
          <TextInput
            placeholder={info?.direction.content}
            value={content}
            multiline={true}
            onChangeText={value => {
              setContent(value);
            }}
            onBlur={() => {
              Keyboard.dismiss();
            }}
            style={[fontRegular, styles.input]}
            autoCorrect={false}
          />
        </View>
        <View style={{paddingHorizontal: 24}}>
          <View style={styles.image}>
            <ImageIcon />
            <Text style={[fontMedium, styles.imageText]}>이미지</Text>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {images?.length !== 0 &&
              images?.map((asset, index) => (
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
                  {images?.length}/10
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
       {
    goBackWarning && (
      <ModalBottom
        modalVisible={goBackWarning}
        setModalVisible={setGoBackWarning}
        content={`작성한 게시글이 삭제됩니다.\n뒤로 가시겠습니까?`}
        isContentCenter={true}
        purpleButtonText="확인"
        purpleButtonFunc={() => {
          setGoBackWarning(!goBackWarning);
          navigation.goBack();
        }}
        whiteButtonText="취소"
        whiteButtonFunc={() => {
          setGoBackWarning(!goBackWarning);
        }}
      />
    )
  }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  submit: {fontSize: 17, marginRight: 8},
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
    paddingTop: 15,
    paddingBottom: 15,
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

export default PostWriteScreen;
