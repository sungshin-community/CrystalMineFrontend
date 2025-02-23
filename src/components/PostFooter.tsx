import {FooterHeart} from '../../resources/icon/HeartIcon';
import {FooterChat} from '../../resources/icon/ChatIcon';
import {FooterScrap} from '../../resources/icon/Scrap';
import {FooterReport} from '../../resources/icon/Report';
import {FooterMessage} from '../../resources/icon/Message';
import BlockIcon from '../../resources/icon/BlockIcon';
import CustomToast from '../components/CustomToast';
import {Text, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import React from 'react';
import {ReportModalBottom} from '../components/ReportModalBottom';
import {ModalBottom} from './ModalBottom';
import {postBlockPantheon} from '../common/pantheonApi';

interface PostFooterProps {
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  isReported: boolean;
  ptPostId: number;
  isScraped: boolean;
  isOwner: boolean;
  handlePostLike: () => void;
  handlePostComment: () => void;
  handlePostScrap: () => void;
  handlePostReport: any;
}

export default function PostFooter({
  isLiked,
  likeCount,
  commentCount,
  ptPostId,
  isScraped,
  isReported,
  handlePostLike,
  handlePostComment,
  handlePostReport,
  handlePostScrap,
  isOwner,
}: PostFooterProps) {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [blockModalVisible, setBlockModalVisible] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const handlePostBlock = async () => {
    setBlockModalVisible(false);
    showToast('글쓴이가 차단되었습니다.');
    try {
      await postBlockPantheon(ptPostId);
      showToast('글쓴이가 차단되었습니다.');
    } catch (error) {
      console.error('차단 실패:', error);
      showToast('차단에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        padding: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row', marginRight: 16, alignItems: 'center'}}
          onPress={handlePostLike}>
          <FooterHeart
            fill={isLiked ? '#FF6376' : 'white'}
            stroke={isLiked ? '#FF6376' : '#9DA4AB'}
          />
          <Text
            style={[
              {
                color: '#9DA4AB',
                fontWeight: '400',
                fontSize: 14,
                marginLeft: 4,
              },
            ]}>
            좋아요 {likeCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={handlePostComment}>
          <FooterChat />
          <Text
            style={{
              color: '#9DA4AB',
              fontWeight: '400',
              fontSize: 14,
              marginLeft: 4,
            }}>
            댓글 {commentCount}
          </Text>
        </TouchableOpacity>
      </View>
      {!isOwner && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{marginRight: 16}}
            onPress={() => {
              setBlockModalVisible(true);
            }}>
            <BlockIcon />
          </TouchableOpacity>
          <ModalBottom
            modalVisible={blockModalVisible}
            setModalVisible={setBlockModalVisible}
            title="해당 게시글의 글쓴이를 차단하시겠어요?"
            content={` •  차단 이후, 해당 글쓴이의 게시글은 더이상 목록에서\n     노출되지 않습니다.`}
            purpleButtonText="차단할게요."
            setDim={false}
            isBlock
            purpleButtonFunc={handlePostBlock}
          />
          {isReported ? (
            <TouchableOpacity
              style={{marginRight: 16}}
              onPress={() => showToast('이미 신고한 게시글입니다.')}>
              <FooterReport fill="#9DA4AB" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{marginRight: 16}}
              onPress={() => {
                isOwner
                  ? showToast('자신의 게시물은 신고가 불가능합니다.')
                  : setReportModalVisible(true);
              }}>
              <FooterReport />
            </TouchableOpacity>
          )}
          <ReportModalBottom
            modalVisible={reportModalVisible}
            setModalVisible={setReportModalVisible}
            title="해당 게시글을 신고하시겠어요?"
            purpleButtonText="네, 신고할게요."
            reportId={ptPostId}
            reportFunc={handlePostReport}
            whiteButtonText="아니요."
            whiteButtonFunc={() => setReportModalVisible(false)}
            setDim={false}
            modalType="게시글"
          />
          <TouchableOpacity
            onPress={() => {
              isOwner
                ? showToast('자신에게는 쪽지를 보낼 수 없습니다.')
                : showToast('수정광산 팀이 열심히 기능을 개발하는 중이에요!');
            }}>
            <FooterMessage style={{marginRight: 16}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePostScrap}>
            <FooterScrap
              fill={isScraped ? '#A055FF' : 'white'}
              stroke={isScraped ? '#A055FF' : '#9DA4AB'}
            />
          </TouchableOpacity>
        </View>
      )}
      <CustomToast
        visible={toastVisible}
        message={toastMessage}
        onClose={() => setToastVisible(false)}
      />
    </View>
  );
}
