// EmoticonDetailScreen.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {getEmoticonDetail, buyEmoticons} from '../../common/boardApi';
import {getPointRecords, getPoint} from '../../common/pointApi';
import PurchaseModal from '../../components/PurhcaseModal';
interface EmoticonDetailProps {
  route: {
    params: {
      emoticonId: number;
    };
  };
  navigation: any;
}

interface EmoticonSet {
  author: string;
  emoticons: Array<{id: number; imageUrl: string}>;
  id: number;
  purchased: boolean;
  title: string;
}

const EmoticonDetailScreen = ({route, navigation}: EmoticonDetailProps) => {
  const {emoticonId} = route.params;
  const [loading, setLoading] = useState(true);
  const [emoticonSet, setEmoticonSet] = useState<EmoticonSet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPurchaseModalVisible, setIsPurchaseModalVisible] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(0);

  useEffect(() => {
    fetchEmoticonDetail();
    fetchPoints();
  }, [emoticonId]);

  const fetchPoints = async () => {
    try {
      const point = await getPoint();
      setCurrentPoints(point);
    } catch (error) {
      console.error('포인트 조회 실패:', error);
    }
  };

  const fetchEmoticonDetail = async () => {
    try {
      setLoading(true);
      const response = await getEmoticonDetail(emoticonId);
      if (response?.data?.data) {
        setEmoticonSet(response.data.data);
        setError(null);
      }
    } catch (error) {
      console.error('이모티콘 상세 조회 실패:', error);
      setError('이모티콘을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!emoticonSet) return;

    try {
      const result = await buyEmoticons(emoticonSet.id);
      if (result?.status === 200) {
        Toast.show('이모티콘 구매 성공', Toast.SHORT);
        fetchEmoticonDetail();
        fetchPoints(); // 구매 후 포인트 갱신
      } else if (result?.status === 403) {
        Toast.show('포인트가 부족합니다.', Toast.SHORT);
      } else if (result?.status === 409) {
        Toast.show('이미 구매한 이모티콘입니다.', Toast.SHORT);
      } else {
        Toast.show('오류가 발생했습니다. 다시 시도해주세요.', Toast.SHORT);
      }
    } catch (error) {
      console.error('구매 실패:', error);
      Toast.show('구매 중 오류가 발생했습니다.', Toast.SHORT);
    }
  };

  const handlePurchaseClick = () => {
    setIsPurchaseModalVisible(true);
  };

  const handlePurchaseConfirm = async () => {
    setIsPurchaseModalVisible(false);
    await handlePurchase();
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#A055FF" />
      </View>
    );
  }

  if (error || !emoticonSet) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          {error || '이모티콘 정보를 찾을 수 없습니다.'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      <ScrollView style={styles.content}>
        <View style={styles.infoSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.setTitle}>{emoticonSet.title}</Text>
            {emoticonSet.purchased ? (
              <View style={styles.purchasedButton}>
                <Text style={styles.purchasedButtonText}>구매완료</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.purchaseButton}
                onPress={handlePurchaseClick}>
                <Text style={styles.purchaseButtonText}>20,000P 구매하기</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.author}>{emoticonSet.author}</Text>
        </View>

        <View style={styles.emoticonGrid}>
          {emoticonSet.emoticons.map(emoji => (
            <View key={emoji.id} style={styles.emojiContainer}>
              <Image
                source={{uri: emoji.imageUrl}}
                style={styles.emoji}
                resizeMode="contain"
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <PurchaseModal
        visible={isPurchaseModalVisible}
        onClose={() => setIsPurchaseModalVisible(false)}
        onConfirm={handlePurchaseConfirm}
        title={emoticonSet.title}
        author={emoticonSet.author}
        price={20000}
        currentPoints={currentPoints}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    color: '#666',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 19,
    fontFamily: 'SpoqaHanSansNeo-Medium',
    marginLeft: 8,
  },
  backButton: {
    padding: 4,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  content: {
    flex: 1,
  },
  infoSection: {
    padding: 16,
    backgroundColor: '#fff',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  setTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
  purchaseButton: {
    backgroundColor: '#A055FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  purchasedButton: {
    backgroundColor: '#F8F3FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  purchasedButtonText: {
    color: '#A055FF',
    fontSize: 14,
    fontWeight: '500',
  },
  emoticonGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emojiContainer: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 8,
  },
  emoji: {
    width: '100%',
    height: '100%',
  },
});

export default EmoticonDetailScreen;
