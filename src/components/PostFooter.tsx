import PostLike from '../../resources/icon/PostLike';
import PostUnlike from '../../resources/icon/PostUnlike';
import {FooterChat} from '../../resources/icon/ChatIcon';
import {FooterScrap} from '../../resources/icon/Scrap';
import {ReportModalBottom} from '../components/ReportModalBottom';
import {FooterReport} from '../../resources/icon/Report';
import {FooterMessage} from '../../resources/icon/Message';
import CustomToast from '../components/CustomToast';
import {Text, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import React from 'react';

interface PostFooterProps {
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  isReported: boolean;
  postId: number;
  isScraped: boolean;
  handlePostLike: (postId: number) => void;
  handlePostComment: (postId: number) => void;
  handlePostReport: any;
  handlePostScrap: (postId: number) => void;
}

export default function PostFooter({
  isLiked,
  likeCount,
  commentCount,
  postId,
  isScraped,
  isReported,
  handlePostLike,
  handlePostComment,
  handlePostReport,
  handlePostScrap,
}: PostFooterProps) {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [reportModalVisible, setReportModalVisible] = useState<boolean>(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
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
          onPress={() => handlePostLike(postId)}>
          {isLiked ? <PostLike /> : <PostUnlike />}
          <Text
            style={[
              {
                color: '#9DA4AB',
                fontWeight: '500',
                fontSize: 14,
                marginLeft: 4,
              },
            ]}>
            좋아요 {likeCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => handlePostComment(postId)}>
          <FooterChat />
          <Text
            style={{
              color: '#9DA4AB',
              fontWeight: '500',
              fontSize: 14,
              marginLeft: 4,
            }}>
            댓글 {commentCount}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {isReported ? (
          <TouchableOpacity
            onPress={() => showToast('이미 신고한 게시글입니다.')}>
            <FooterReport style={{marginRight: 16}} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setReportModalVisible(true);
            }}>
            <FooterReport style={{marginRight: 16}} />
          </TouchableOpacity>
        )}
        <ReportModalBottom
          modalVisible={reportModalVisible}
          setModalVisible={setReportModalVisible}
          title="해당 게시글을 신고하시겠어요?"
          purpleButtonText="네, 신고할게요."
          reportId={postId}
          reportFunc={handlePostReport}
          whiteButtonText="아니요."
          whiteButtonFunc={() => setReportModalVisible(false)}
          setDim={false}
          modalType="게시글"
        />
        <TouchableOpacity
          onPress={() =>
            showToast('수정광산 팀이 열심히 기능을 개발하는 중이에요!')
          }>
          <FooterMessage style={{marginRight: 16}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePostScrap(postId)}>
          <FooterScrap
            fill={isScraped ? '#FF6376' : 'white'}
            stroke={isScraped ? '#FF6376' : '#9DA4AB'}
          />
        </TouchableOpacity>
      </View>
      <CustomToast
        visible={toastVisible}
        message={toastMessage}
        onClose={() => setToastVisible(false)}
      />
    </View>
  );
}
