import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Hamburger from '../../resources/icon/Hamburger';
import EmojiShop from '../../resources/icon/EmojiShop';
import {buyEmoticons, getMyEmoticons} from '../common/boardApi';
import Toast from 'react-native-simple-toast';

interface EmojiPickerProps {
  visible: boolean;
  onClose: () => void;
  onEmojiSelect: (emoji: {imageUrl: string; id: number}) => void;
  isPayed: boolean;
  setIsPayed: (isPayed: boolean) => void;
}

interface Emoticon {
  id: number;
  imageUrl: string;
}

interface EmoticonSet {
  author: string;
  emoticons: Emoticon[];
  id: number;
  purchased: boolean;
  title: string;
}

interface EmoticonResponse {
  code: string;
  data: EmoticonSet[];
  detail: string;
  status: string;
  timestamp: string;
}

const EmojiPicker = ({
  visible,
  onClose,
  onEmojiSelect,
  isPayed,
  setIsPayed,
}: EmojiPickerProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const [emoticons, setEmoticons] = useState<EmoticonSet[]>([]);
  const [isEmoticonListEmpty, setIsEmoticonListEmpty] = useState(false);
  const [activeEmoticonSet, setActiveEmoticonSet] = useState<number | null>(
    null,
  );

  const fetchEmoticons = async () => {
    try {
      const response: EmoticonResponse = await getMyEmoticons();
      if (response?.data?.length === 0) {
        setIsEmoticonListEmpty(true);
        setEmoticons([]);
      } else {
        setIsEmoticonListEmpty(false);
        setEmoticons(response.data);

        if (response.data.some(set => set.purchased)) {
          setIsPayed(true);
        }
      }
    } catch (e) {
      console.log('이모티콘 조회 실패', e);
      setIsEmoticonListEmpty(true);
      setEmoticons([]);
    }
  };
  useEffect(() => {
    fetchEmoticons();
  }, []);
  const handleEmojiSelect = useCallback(
    emoji => {
      setSelectedEmoji(emoji);
      onEmojiSelect({imageUrl: emoji.imageUrl, id: emoji.id});
      onClose();
    },
    [onEmojiSelect],
  );

  const handleRadioSelect = tab => {
    setActiveTab(tab);
    setHamburgerClicked(false);
  };

  useEffect(() => {
    if (selectedEmoji) {
      console.log('selectedEmoji', selectedEmoji);
    }
  }, [selectedEmoji]);

  useEffect(() => {
    const checkEmoticons = async () => {
      const response = await getMyEmoticons();
      if (response?.data?.length > 0) {
        setIsPayed(true);
      }
    };
    checkEmoticons();
  }, []);

  useEffect(() => {
    if (emoticons.length > 0) {
      setActiveEmoticonSet(emoticons[0].id);
    }
  }, [emoticons]);

  const handleEmoticonSetSelect = (emoticonSetId: number) => {
    setActiveEmoticonSet(emoticonSetId);
    setHamburgerClicked(false);
  };

  const renderPurchaseButton = () => (
    <View style={styles.overlay}>
      <View style={styles.purchaseContainer}>
        <TouchableOpacity
          style={styles.purchaseButton}
          onPress={async () => {
            const emoticonId = 2; // 이모티콘 없는 사람은 수정광산 기본 이모티콘을 사게 한다.
            const result = await buyEmoticons(emoticonId);
            console.log('result', result);
            if (result?.status === 200) {
              setIsPayed(true);
              console.log('이모티콘 구매 성공:', result);
              Toast.show('이모티콘 구매 성공', Toast.SHORT);
            } else if (result?.status === 403) {
              Toast.show('포인트가 부족합니다.', Toast.SHORT);
            } else if (result?.status === 409) {
              Toast.show('이미 구매한 이모티콘입니다.', Toast.SHORT);
              setIsPayed(true);
            } else {
              Toast.show(
                '오류가 발생했습니다. 다시 시도해주세요.',
                Toast.SHORT,
              );
            }
          }}>
          <Text style={{color: '#fff', fontWeight: '700', fontSize: 14}}>
            이모티콘 구매하기
          </Text>
          <Text style={{color: '#fff', fontWeight: '500', fontSize: 12}}>
            20,000P (2,000₩)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // renderEmojis 함수 수정
  const renderEmojis = () => {
    return (
      <ScrollView
        contentContainerStyle={{paddingHorizontal: 12, paddingVertical: 6}}>
        {hamburgerClicked ? (
          <>
            {emoticons.map((emoticonSet, index) => (
              <View
                key={index}
                style={{marginHorizontal: 12, marginBottom: 12}}>
                <TouchableOpacity
                  onPress={() => handleEmoticonSetSelect(emoticonSet.id)}
                  style={styles.radioContainer}>
                  <View
                    style={[
                      styles.radio,
                      {
                        borderColor:
                          activeEmoticonSet === emoticonSet.id
                            ? '#A055FF'
                            : '#CECFD6',
                      },
                    ]}>
                    {activeEmoticonSet === emoticonSet.id && (
                      <View style={styles.radioSelected} />
                    )}
                  </View>
                  <Text style={styles.radioText}>{emoticonSet.title}</Text>
                  <Text style={styles.headerWriter}>{emoticonSet.author}</Text>
                </TouchableOpacity>
                <View style={[styles.emojiContainer, {marginLeft: 24}]}>
                  {emoticonSet.emoticons
                    .slice(0, 4)
                    .map((emoji, emojiIndex) => (
                      <TouchableOpacity
                        key={emojiIndex}
                        style={[
                          styles.emoji,
                          {width: 72, height: 72, marginRight: 8},
                        ]}>
                        <Image
                          source={{uri: emoji.imageUrl}}
                          style={[styles.emojiImage, {width: 72, height: 72}]}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    ))}
                </View>
              </View>
            ))}
          </>
        ) : (
          <View style={[styles.emojiContainer, {paddingHorizontal: 6}]}>
            {emoticons
              .find(set => set.id === activeEmoticonSet)
              ?.emoticons.map((emoji, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleEmojiSelect(emoji)}
                  style={[styles.emoji, {marginHorizontal: 6}]}>
                  <Image
                    source={{uri: emoji.imageUrl}}
                    style={styles.emojiImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ))}
          </View>
        )}
      </ScrollView>
    );
  };

  return visible ? (
    <View style={styles.container}>
      {isPayed ? (
        <>
          <View style={styles.headerContainer}>
            <View style={styles.headerLeft}>
              <TouchableOpacity
                onPress={() => setHamburgerClicked(!hamburgerClicked)}>
                <Hamburger />
              </TouchableOpacity>
              {hamburgerClicked ? (
                <>
                  <Text style={styles.headerTitle}>이모티콘 목록</Text>
                </>
              ) : (
                <>
                  <Text style={styles.headerTitle}>
                    {emoticons.find(set => set.id === activeEmoticonSet)
                      ?.title || '이모티콘'}
                  </Text>
                  <Text style={styles.headerWriter}>
                    {emoticons.find(set => set.id === activeEmoticonSet)
                      ?.author || '작가'}
                  </Text>
                </>
              )}
            </View>
            <View>
              <EmojiShop />
            </View>
          </View>
          {renderEmojis()}
        </>
      ) : (
        <>
          <View style={styles.headerContainer}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerTitle}>
                {emoticons[0]?.title || '수정광산 이모티콘'}
              </Text>
              <Text style={styles.headerWriter}>
                {emoticons[0]?.author || '작가'}
              </Text>
            </View>
          </View>
          {renderEmojis()}
          {!isEmoticonListEmpty && renderPurchaseButton()}
        </>
      )}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    height: 291,
    width: '100%',
    backgroundColor: '#fff',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(239, 239, 243, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFF3',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '400',
    fontSize: 14,
    color: '#3A424E',
    marginLeft: 12,
  },
  headerWriter: {
    fontWeight: '400',
    fontSize: 12,
    color: '#9DA4AB',
    marginLeft: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 8,
    backgroundColor: '#A055FF',
  },
  radioText: {
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
    color: '#3A424E',
  },
  emojiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 10,
    marginBottom: 10,
  },
  emoji: {
    width: 80,
    aspectRatio: 1,
    marginVertical: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 2,
  },
  emojiImage: {
    width: 80,
    height: 80,
  },
  selectedEmoji: {
    width: 80,
    height: 80,
  },
  purchaseContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  purchaseButton: {
    alignItems: 'center',
    backgroundColor: '#A055FF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    flexDirection: 'column',
  },
});

export default EmojiPicker;
