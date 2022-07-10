import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import ProfileImage from '../../resources/icon/ProfileImage';
import EmptyComment from '../../resources/icon/EmptyComment';
import EmptyHeart from '../../resources/icon/EmptyHeart';
import ThreeDots from './ThreeDots';
import Dots from '../../resources/icon/Dots';
import PostLike from '../../resources/icon/PostLike';
import PostUnlike from '../../resources/icon/PostUnlike';
import PostComment from '../../resources/icon/PostComment';
import CommentDto, {RecommentDto} from '../classes/CommentDto';
import SpinningThreeDots from './SpinningThreeDots';
import TrashIcon from '../../resources/icon/TrashIcon';
import {ModalBottom} from '../components/ModalBottom';
import {SelectModalBottom} from './SelectModalBottom';
import Toast from 'react-native-simple-toast';
import NoReport, {Report} from '../../resources/icon/Report';

interface Props {
  comment?: any;
  setParentId?: any;
  handleCommentLike?: any;
  isRecomment: boolean;
  setIsRecomment?: any;
  inputRef: any;
  handleCommentDelete: any;
  handleCommentReport?: any;
}
const Comment = ({
  comment,
  setParentId,
  handleCommentLike,
  isRecomment,
  setIsRecomment,
  inputRef,
  handleCommentDelete,
  handleCommentReport,
}: Props) => {
  const [isRecommentState, setIsRecommentState] = useState<boolean>(false);
  const data: CommentDto = comment;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [reportCheckModalVisible, setReportCheckModalVisible] = useState<boolean>(false);
  const [reportModalVisible, setReportModalVisible] = useState<boolean>(false);
  useEffect(() => {
    if (!isRecomment) setIsRecommentState(false);
  }, [isRecomment]);

  const handleCommentDeleteComponent = (
    <>
      {modalVisible && (
        <ModalBottom
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalText={`작성한 댓글을 삭제하시겠습니까?`}
          modalBody=""
          modalButtonText="삭제"
          modalButton
          modalButtonFunc={() => {
            handleCommentDelete(data.id);
            setModalVisible(false);
            Toast.show(
              '작성하신 댓글이 성공적으로 삭제되었습니다.',
              Toast.LONG,
            );
          }}
          isSecondButton={true}
          modalSecondButtonText="취소"
          modalSecondButtonFunc={() => setModalVisible(false)}
        />
      )}
      <Pressable
        onPress={() => {
          setModalVisible(true);
          console.log(modalVisible);
        }}>
        <TrashIcon style={{marginRight: 12}} />
      </Pressable>
    </>
  );
  const handleCommentReportComponent = (
    <>
      {reportCheckModalVisible && (
        <ModalBottom
          modalVisible={reportCheckModalVisible}
          setModalVisible={setReportCheckModalVisible}
          modalText={`댓글 신고`}
          modalBody={`- 신고 후에는 내용을 수정할 수 없습니다.\n - 무분별한 신고를 방지하기 위해 신고 1회당 50포인트가 차감됩니다.`}
          modalButtonText="확인"
          modalButton
          modalButtonFunc={() => {
            setReportCheckModalVisible(false);
            setReportModalVisible(true);
          }}
        />
      )}
      {!reportCheckModalVisible && reportModalVisible && (
        <SelectModalBottom
          modalVisible={reportModalVisible}
          setModalVisible={setReportModalVisible}
          modalText={`댓글 신고`}
          modalButtonText="신고하기"
          modalButton
          modalButtonFunc={() => {
            const result = handleCommentReport(data.id, 1, '');
            console.log('왜 여기를 출력안하지',result)
            if (result === 'CREATE_COMMENT_REPORT_SUCCESS') {
              console.log('댓글 신고 성공')
              Toast.show(
                '신고하신 내용이 정상적으로 접수되었습니다.',
                Toast.LONG,
              );
            }
            else if (result === 'COMMENT_REPORT_FAIL_POINT_NOT_ENOUGH') {
              console.log('보유 포인트 부족')
              Toast.show(
                '보유 포인트가 부족하여 신고가 불가능합니다.',
                Toast.LONG,
              );
            }
            else Toast.show(result.detail, Toast.LONG);
            setReportModalVisible(false);
          }}
          isSecondButton={true}
          modalSecondButtonText="취소"
          modalSecondButtonFunc={() => setReportModalVisible(false)}
        />
      )}
      {data?.isReported ? (
        <Pressable
          onPress={() => {
            Toast.show('이미 신고한 댓글입니다.', Toast.SHORT);
          }}>
          <Report style={{marginRight: 14}} />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            setReportCheckModalVisible(true);
          }}>
          <NoReport style={{marginRight: 14}} />
        </Pressable>
      )}
    </>
  );

  return (
    <>
      <View
        style={{
          paddingHorizontal: 24,
          backgroundColor: isRecommentState
            ? '#FAF5FF'
            : data?.isOfReader
            ? '#F8F8F8'
            : '#FFF',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <ProfileImage></ProfileImage>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  paddingLeft: 8,
                  fontWeight: `500`,
                  color: data?.isOfPostAuthor ? '#A055FF' : '#000',
                }}>
                {data?.displayName}
              </Text>
            </View>
          </View>
          {!data.isDeleted && (
            <SpinningThreeDots
              isMine={data.isOfReader}
              handleDeleteComponent={handleCommentDeleteComponent}
              handleReportComponent={handleCommentReportComponent}
            />
          )}
        </View>
        <Text style={{color: data.isDeleted ? '#6E7882' : '#000'}}>
          {data?.content}
        </Text>
        {!data.isDeleted && (
          <>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 16,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Pressable
                  hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
                  onPress={() => {
                    handleCommentLike(data.id);
                  }}>
                  {data.isLiked ? <PostLike /> : <PostUnlike />}
                </Pressable>
                <Text style={styles.postLike}>{data?.likeCount}</Text>
                <Pressable
                  onPress={() => {
                    setParentId(data.id);
                    setIsRecomment(!isRecomment);
                    setIsRecommentState(!isRecommentState);
                    inputRef.current.focus();
                  }}>
                  <PostComment />
                </Pressable>
              </View>
              <View>
                <Text style={{color: '#949494', fontSize: 13}}>
                  {data?.createdAt}
                </Text>
              </View>
            </View>
          </>
        )}
        <View style={{marginBottom: 16}} />
      </View>
      <View style={{borderWidth: 1, borderColor: '#F4F4F4'}}></View>
    </>
  );
};
export default Comment;
const styles = StyleSheet.create({
  postLike: {
    fontSize: 13,
    marginLeft: 5,
    marginRight: 5,
    width: 35,
  },
  postComment: {
    fontSize: 13,
    marginLeft: 5,
    width: 35,
  },
});

interface RecommentProps {
  recomment?: any;
  handleCommentLike?: any;
  handleCommentDelete: any;
  handleCommentReport?: any;
}

export const Recomment = ({
  recomment,
  handleCommentLike,
  handleCommentDelete,
  handleCommentReport,
}: RecommentProps) => {
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
  const [isLiked, setIsLiked] = useState<boolean>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [reportCheckModalVisible, setReportCheckModalVisible] = useState<
    boolean
  >(false);
  const [reportModalVisible, setReportModalVisible] = useState<boolean>(false);
  const data: RecommentDto = recomment;
  const handleCommentDeleteComponent = (
    <>
      {modalVisible && (
        <ModalBottom
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalText={`작성한 댓글을 삭제하시겠습니까?`}
          modalBody=""
          modalButtonText="삭제"
          modalButton
          modalButtonFunc={() => {
            handleCommentDelete(data.id);
            setModalVisible(false);
            Toast.show(
              '작성하신 댓글이 성공적으로 삭제되었습니다.',
              Toast.LONG,
            );
          }}
          isSecondButton={true}
          modalSecondButtonText="취소"
          modalSecondButtonFunc={() => setModalVisible(false)}
        />
      )}
      <Pressable
        onPress={() => {
          setModalVisible(true);
          console.log(modalVisible);
        }}>
        <TrashIcon style={{marginRight: 12}} />
      </Pressable>
    </>
  );
  const handleCommentReportComponent = (
    <>
      {reportCheckModalVisible && (
        <ModalBottom
          modalVisible={reportCheckModalVisible}
          setModalVisible={setReportCheckModalVisible}
          modalText={`댓글 신고`}
          modalBody={`- 신고 후에는 내용을 수정할 수 없습니다.\n - 무분별한 신고를 방지하기 위해 신고 1회당 50포인트가 차감됩니다.`}
          modalButtonText="확인"
          modalButton
          modalButtonFunc={() => {
            setReportModalVisible(true);
            setReportCheckModalVisible(false);
          }}
        />
      )}
      {reportModalVisible && (
        <SelectModalBottom
          modalVisible={reportModalVisible}
          setModalVisible={setReportModalVisible}
          modalText={`댓글 신고`}
          modalButtonText="신고하기"
          modalButton
          modalButtonFunc={() => {
            const result = handleCommentReport(data.id, 1);
            if (result) {
              setReportModalVisible(false);
              if (result === 'CREATE_COMMENT_REPORT_SUCCESS')
                Toast.show(
                  '신고하신 내용이 정상적으로 접수되었습니다.',
                  Toast.LONG,
                );
              else if (result === 'COMMENT_REPORT_FAIL_POINT_NOT_ENOUGH')
                Toast.show(
                  '보유 포인트가 부족하여 신고가 불가능합니다.',
                  Toast.LONG,
                );
              else Toast.show(result.detail, Toast.LONG);
            }
          }}
          isSecondButton={true}
          modalSecondButtonText="취소"
          modalSecondButtonFunc={() => setReportModalVisible(false)}
        />
      )}
      {data?.isReported ? (
        <Pressable
          onPress={() => {
            Toast.show('이미 신고한 댓글입니다.', Toast.SHORT);
          }}>
          <Report style={{marginRight: 14}} />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            setReportCheckModalVisible(true);
          }}>
          <NoReport style={{marginRight: 14}} />
        </Pressable>
      )}
    </>
  );
  return (
    <>
      <View
        style={{
          paddingHorizontal: 24,
          backgroundColor: data.isOfReader ? '#F8F8F8' : '#FFF',
          paddingBottom: 12,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Reply style={{marginRight: 8}} />
            <ProfileImage></ProfileImage>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  paddingLeft: 8,
                  fontWeight: `500`,
                  color: data?.isOfPostAuthor ? '#A055FF' : '#000',
                }}>
                {data.displayName}
              </Text>
            </View>
          </View>
          {!data.isDeleted && (
            <SpinningThreeDots
              isMine={data.isOfReader}
              handleDeleteComponent={handleCommentDeleteComponent}
              handleReportComponent={handleCommentReportComponent}
            />
          )}
        </View>
        <View style={{marginLeft: 20}}>
          <Text style={{color: data.isDeleted ? '#6E7882' : '#000'}}>
            {data?.content}
          </Text>
          {!data.isDeleted && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 16,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Pressable
                    hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
                    onPress={() => handleCommentLike(data.id)}>
                    {data.isLiked ? <PostLike /> : <PostUnlike />}
                  </Pressable>
                  <Text style={styles.postLike}>{data?.likeCount}</Text>
                </View>
                <View>
                  <Text style={{color: '#949494', fontSize: 13}}>
                    {data?.createdAt}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
      <View style={{borderWidth: 1, borderColor: '#F4F4F4'}}></View>
    </>
  );
};

export const Reply = (props: any) => (
  <Svg
    width="11"
    height="13"
    viewBox="0 0 11 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M11 8.41177L6.6 13L5.55867 11.9141L8.19133 9.17647H0V0H1.46667V7.64706H8.19133L5.55867 4.90941L6.6 3.82353L11 8.41177Z"
      fill="#6E7882"
    />
  </Svg>
);
