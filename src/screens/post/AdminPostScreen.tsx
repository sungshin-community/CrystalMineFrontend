import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
  KeyboardEvent,
  Keyboard,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AdminPost from '../../components/AdminPost';
import PostDto from '../../classes/PostDto';
import {
  deletePosts,
  getComments,
  getPosts,
  reportPost,
  setPostLike,
  setPostScrap,
  setUserMute,
} from '../../common/boardApi';
import {addComment, addRecomment, reportComment} from '../../common/boardApi';
import CommentDto from '../../classes/CommentDto';
import {useCallback} from 'react';
import {setCommentLike} from '../../common/boardApi';
import {fontMedium, fontRegular} from '../../common/font';
import Toast from 'react-native-simple-toast';
import {
  RectangleChecked,
  RectangleUnchecked,
} from '../../../resources/icon/CheckBox';
import CommentSendIcon from '../../../resources/icon/CommentSendIcon';
import {LogBox} from 'react-native';
import WaterMark from '../../components/WaterMark';
import BackButtonIcon from '../../../resources/icon/BackButtonIcon';
import getCommments from '../../common/CommentApi';
import {ModalBottom} from '../../components/ModalBottom';
import {getHundredsDigit} from '../../common/util/statusUtil';
import {logout} from '../../common/authApi';
import AdMob from '../../components/AdMob';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
type RootStackParamList = {
  MessageScreen: {roomId: number};
};
type Props = NativeStackScreenProps<RootStackParamList>;

const AdminPostScreen = ({navigation, route}: Props) => {
  console.reportErrorsAsExceptions = false;
  const [post, setPost] = useState<PostDto>();
  const [comments, setComments] = useState<CommentDto[]>();
  const [isRecomment, setIsRecomment] = useState<boolean>(false);
  const [parentId, setParentId] = useState<number>();
  const [newComment, setNewComment] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const commentInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const flatListRef = useRef<FlatList>(null);
  const [componentModalVisible, setComponentModalVisible] =
    useState<boolean>(false);
  const [isSubmitState, setIsSubmitState] = useState<boolean>(false);
  const [goBackWarning, setGoBackWarning] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onSubmit = useCallback(() => {
    console.log('익명여부', isAnonymous);
    if (isRecomment)
      addRecommentFunc(route.params.postId, parentId, newComment, isAnonymous);
    else addCommentFunc(route.params.postId, newComment, isAnonymous);
    setIsSubmitState(false);
  }, [newComment]);

  useEffect(() => {
    console.log('isSubmitState', isSubmitState, 'isAnonymous', isAnonymous);
    if (isSubmitState) {
      if (isRecomment)
        addRecommentFunc(
          route.params.postId,
          parentId,
          newComment,
          isAnonymous,
        );
      else {
        addCommentFunc(route.params.postId, newComment, isAnonymous);
      }
      setIsSubmitState(false);
    }
  }, [isAnonymous, isSubmitState, newComment]);

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTintColor: '#000000',
      headerTitle: () => <HeaderTitle />,
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
            if (newComment.length >= 1) setGoBackWarning(true);
            else {
              navigation.goBack();
            }
          }}>
          <BackButtonIcon />
        </TouchableHighlight>
      ),
    });
  }, [navigation, post?.boardName, newComment]);

  const HeaderTitle = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={[fontMedium, {fontSize: 17}]} numberOfLines={1}>
          [
          {post && post?.boardName.length <= 5
            ? post?.boardName
            : post?.boardName.substring(0, 5).concat('...')}
          ]의 게시글
        </Text>
      </View>
    );
  };
  const getPostsFunc = async () => {
    const result = await getPosts(route.params.postId);
    if (result.status === 401) {
      setTimeout(function () {
        Toast.show(
          '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
          Toast.SHORT,
        );
      }, 100);
      logout();
      navigation.reset({routes: [{name: 'SplashHome'}]});
    } else if (getHundredsDigit(result.status) === 2) {
      setPost(result.data.data);
    } else if (result.data.code === 'BOARD_ALREADY_BLIND') {
      setTimeout(function () {
        Toast.show('블라인드된 게시판입니다.', Toast.SHORT);
      }, 100);
      navigation.goBack();
    } else if (result.data.code === 'POST_NOT_FOUND') {
      result.data;
      setTimeout(function () {
        Toast.show('삭제되었거나 블라인드된 게시글입니다.', Toast.SHORT);
      }, 100);
      navigation.goBack();
    } else if (result.data.code === 'BOARD_ALREADY_DELETED') {
      setTimeout(function () {
        Toast.show('삭제된 게시판입니다.', Toast.SHORT);
      }, 100);
      navigation.goBack();
    } else if (result.data.code === 'POST_ALREDY_BLOCK') {
      setTimeout(function () {
        Toast.show('숨김처리된 게시글입니다.', Toast.SHORT);
      }, 100);
      navigation.goBack();
    } else {
      setTimeout(function () {
        Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
      }, 100);
      navigation.goBack();
    }
  };

  // 초기화
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      getPostsFunc();
      const commentData = await getComments(route.params.postId);
      setComments(commentData);
      setIsLoading(false);
    }
    init();
  }, [componentModalVisible]);
  // 게시글 공감
  const handlePostLike = async (postId: number) => {
    const result = await setPostLike(postId);
    getPostsFunc();
  };
  // 게시글 스크랩
  const handlePostScrap = async (postId: number) => {
    const result = await setPostScrap(postId);
    getPostsFunc();
  };
  // 게시글 삭제
  const handlePostDelete = async (postId: number) => {
    const result = await deletePosts(postId);
    if (result) return true;
    else return false;
  };
  // 이용자 차단, 이용자 뮤트
  const handleMuteUser = async (postId: number) => {
    const result = await setUserMute(postId);
    // if (result) return true;
    // else return false;
    return result;
  };
  // 게시글 신고
  const handlePostReport = async (
    postId: number,
    reasonId: number,
    detail?: string,
  ) => {
    const result = await reportPost(postId, reasonId, detail);
    getPostsFunc();
    return result;
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

  return (
    <>
      {componentModalVisible ? (
        <View
          style={{
            position: 'absolute',
            flex: 1,
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 100,
            elevation: 1,
          }}
        />
      ) : null}
      <KeyboardAvoidingView style={{flex: 1}}>
        <WaterMark />
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}>
          <ActivityIndicator
            size="large"
            color={'#A055FF'}
            animating={isLoading}
            style={{zIndex: 100}}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          style={{flex: 1, backgroundColor: '#FFFFFF'}}
          ref={scrollViewRef}>
          <AdminPost
            navigation={navigation}
            post={post}
            handlePostLike={handlePostLike}
            handlePostScrap={handlePostScrap}
            handlePostDelete={handlePostDelete}
            handlePostReport={handlePostReport}
            componentModalVisible={componentModalVisible}
            setComponentModalVisible={setComponentModalVisible}></AdminPost>
          <AdMob />
        </ScrollView>
        <View
          style={{
            backgroundColor: '#fff',
            paddingBottom: isFocused
              ? Platform.OS == 'ios'
                ? keyboardHeight
                : 0
              : Platform.OS === 'ios'
              ? 20
              : 0,
          }}></View>
      </KeyboardAvoidingView>
    </>
  );
};
export default AdminPostScreen;
