import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import HeartIcon from '../../resources/icon/HeartIcon';
import ChatIcon from '../../resources/icon/ChatIcon';
import ThumbNone, {ThumbFill} from '../../resources/icon/ThumbIcon';
import SelectBottomSheet from './SelectBottomSheet';
import SpinningThreeDots from './SpinningThreeDots';
import {pantheonComment} from '../classes/Pantheon';
import {BigPostComment} from '../../resources/icon/PostComment';
import {ReportModalBottom} from './ReportModalBottom';
import CustomToast from './CustomToast';
import {BlackMessageIcon} from '../../resources/icon/Message';
import {BlackReport} from '../../resources/icon/Report';

interface SphereReplyItemProps {
  reply: pantheonComment;
  handleLikePress: (isLiked: boolean, ptCommentId: number) => void;
  isQuestion?: boolean;
  isReply?: boolean;
  postIsSelected?: boolean;
  handleReplyClick?: () => void;
  handleReplyReport: any;
  handleAdoptComment: (ptCommentId: number, comment: pantheonComment) => void;
  isOwner?: boolean;
}

export default function SphereItem({
  reply,
  handleLikePress,
  isQuestion = false,
  isReply = false,
  postIsSelected = false,
  handleReplyClick,
  handleReplyReport,
  handleAdoptComment,
  isOwner,
}: SphereReplyItemProps) {
  const [popVisible, setPopVisible] = useState(false);
  const [popComment, setPopComment] = useState<pantheonComment | undefined>(
    undefined,
  );
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [reportModalVisible, setReportModalVisible] = useState(false);

  const handleOpenPop = () => {
    setPopVisible(true);
    setPopComment(reply);
  };

  const handleSelect = () => {
    setPopVisible(false);
    handleAdoptComment(reply.ptCommentId, reply);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const mineComponent = (
    <View
      style={{
        position: 'absolute',
        top: -20,
        right: 0,
        flexDirection: 'column',
        alignItems: 'center',
        width: 150,
        height: 50,
        zIndex: 150,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderColor: '#EFEFF3',
          borderWidth: 1,
          borderRadius: 8,
          //iOS
          shadowColor: '#A6AAAE',
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.4,
          shadowRadius: 18,
          // Android
          elevation: 18,
          width: 130,
          height: '100%',
        }}>
        <TouchableOpacity onPress={handleReplyClick}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              zIndex: 999,
            }}>
            <BigPostComment style={{marginRight: 8}} />
            <Text
              style={{
                paddingVertical: 8,
                fontSize: 14,
                color: '#3A424E',
              }}>
              대댓글 달기
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const notMineComponent = (
    <>
      <ReportModalBottom
        modalVisible={reportModalVisible}
        setModalVisible={setReportModalVisible}
        title="해당 댓글을 신고하시겠어요?"
        purpleButtonText="네, 신고할게요."
        reportId={reply.ptCommentId}
        reportFunc={handleReplyReport}
        whiteButtonText="아니요."
        whiteButtonFunc={() => setReportModalVisible(false)}
        setDim={false}
        modalType="댓글"
      />

      <View
        style={{
          position: 'absolute',
          top: -20,
          right: 0,
          flexDirection: 'column',
          alignItems: 'center',
          width: 150,
          height: !isReply ? 120 : 90,
          zIndex: 150,
        }}>
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: '#FFFFFF',
            borderColor: '#EFEFF3',
            borderWidth: 1,
            borderRadius: 8,
            //iOS
            shadowColor: '#A6AAAE',
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.4,
            shadowRadius: 18,
            // Android
            elevation: 18,
            width: 130,
            height: '100%',
          }}>
          {!isReply && (
            <TouchableOpacity onPress={handleReplyClick}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  zIndex: 999,
                }}>
                <BigPostComment style={{marginRight: 8}} />
                <Text
                  style={{
                    paddingVertical: 8,
                    fontSize: 14,
                    color: '#3A424E',
                  }}>
                  대댓글 달기
                </Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() =>
              showToast('수정광산 팀이 열심히 기능을 개발하는 중이에요!')
            }>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                zIndex: 120,
              }}>
              <BlackMessageIcon style={{marginRight: 8}} />
              <Text style={{paddingVertical: 8, fontSize: 14}}>쪽지하기</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              reply.isReported
                ? () => showToast('이미 신고한 댓글입니다.')
                : () => setReportModalVisible(true)
            }>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                zIndex: 120,
              }}>
              <BlackReport style={{marginRight: 8}} />
              <Text style={{paddingVertical: 8, fontSize: 14}}>신고하기</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <View style={[{flexDirection: 'row'}, {marginLeft: isReply ? 32 : 0}]}>
      {reply.profileImageUrl && (
        <Image
          source={{uri: reply.profileImageUrl}}
          style={[
            {borderRadius: 12, marginRight: 8},
            {width: isReply ? 20 : 24, height: isReply ? 20 : 24},
          ]}
          resizeMode="cover"
        />
      )}
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 2,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  marginRight: 6,
                  fontWeight: '600',
                  color: reply.displayName.includes('글쓴이')
                    ? '#A055FF'
                    : '#3A424E',
                }}>
                {reply.displayName}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#B9BAC1',
                  fontWeight: '500',
                }}>
                {reply.createdAt}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: '#89919A',
              }}>
              {reply.isBlind
                ? '비공개'
                : `${reply.authorDepartment} · ${reply.authorJob} · ${
                    reply.authorYear === 0 ? '신입' : `${reply.authorYear}년`
                  }`}
            </Text>
          </View>
          {isReply && reply.isOfReader ? null : (
            <SpinningThreeDots
              isMine={reply.isOfReader}
              handleOptionModeIsMineComponent={mineComponent}
              handleDefaultModeComponent={<></>}
              handleOptionModeIsNotMineComponent={notMineComponent}
              isGrey
            />
          )}
        </View>

        {reply.emoticonUrl && (
          <Image
            source={{uri: reply.emoticonUrl}}
            style={{
              marginTop: 10,
              width: 100,
              height: 100,
            }}
            resizeMode="cover"
          />
        )}

        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: '#222222',
            marginTop: 8,
            zIndex: -1,
          }}>
          {reply.content}
        </Text>

        <View style={{flexDirection: 'row', marginTop: 8}}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => handleLikePress(reply.isLiked, reply.ptCommentId)}>
            <HeartIcon
              fill={reply.isLiked ? '#FF6376' : 'none'}
              stroke={reply.isLiked ? '#FF6376' : '#9DA4AB'}
            />
            <Text style={styles.footerText}>좋아요 {reply.likeCount}</Text>
          </TouchableOpacity>
          {!isReply && reply.reComments && (
            <TouchableOpacity
              onPress={handleReplyClick}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <ChatIcon />
              <Text style={styles.footerText}>
                대댓글 {reply.reComments.length}
              </Text>
            </TouchableOpacity>
          )}
          {isQuestion && !postIsSelected && !reply.isOfPtPostAuthor && isOwner && (
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={handleOpenPop}>
              <ThumbNone />
              <Text
                style={{
                  marginLeft: 4,
                  fontWeight: '500',
                  fontSize: 13,
                  color: '#A055FF',
                }}>
                채택하기
              </Text>
            </TouchableOpacity>
          )}

          {isQuestion && reply.isSelected && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ThumbFill />
              <Text
                style={{
                  marginLeft: 4,
                  fontWeight: '500',
                  fontSize: 13,
                  color: '#A055FF',
                }}>
                채택된 답변
              </Text>
            </View>
          )}
        </View>
      </View>
      <SelectBottomSheet
        onSelect={handleSelect}
        sheetVisible={popVisible}
        setSheetVisible={setPopVisible}
        reply={popComment as pantheonComment}
      />
      <CustomToast
        visible={toastVisible}
        message={toastMessage}
        onClose={() => setToastVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footerText: {
    marginLeft: 4,
    fontWeight: '500',
    fontSize: 13,
    color: '#9DA4AB',
    marginRight: 12,
  },
});
