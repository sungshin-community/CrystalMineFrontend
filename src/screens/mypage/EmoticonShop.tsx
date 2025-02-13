import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import EmojiPicker from '../../components/EmojiPicker';
import {getEmoticons, buyEmoticons} from '../../common/boardApi';
import Toast from 'react-native-simple-toast';
import EmojiSound from '../../../resources/icon/EmojiSound';

interface Props {
  navigation: any;
}

interface EmoticonSet {
  author: string;
  emoticons: Array<{id: number; imageUrl: string}>;
  id: number;
  purchased: boolean;
  title: string;
}

const EmoticonShop = ({navigation}: Props) => {
  const [visible, setVisible] = useState(false);
  const [isPayed, setIsPayed] = useState(false);
  const [emoticonSets, setEmoticonSets] = useState<EmoticonSet[]>([]);

  React.useEffect(() => {
    fetchEmoticons();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchEmoticons();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchEmoticons = async () => {
    try {
      const response = await getEmoticons();
      if (response?.data?.content) {
        setEmoticonSets(response.data.content);
      }
    } catch (error) {
      console.error('이모티콘 조회 실패:', error);
    }
  };

  const handleSetPress = (emoticonId: number) => {
    navigation.navigate('EmoticonDetailShop', {emoticonId});
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.topSection}>
          <View style={styles.titleContainer}>
            <EmojiSound style={styles.titleIcon} />
            <Text style={styles.title}>
              수정이가 제작한, 수정 이모티콘을 만나보세요!
            </Text>
          </View>
          <Text style={styles.subtitle}>
            수정광산 이모티콘은 계속해서 업데이트됩니다!
          </Text>
        </View>

        {emoticonSets.map(set => (
          <View key={set.id} style={styles.emoticonSet}>
            <View style={styles.setHeader}>
              <TouchableOpacity
                style={styles.setLeft}
                onPress={() => handleSetPress(set.id)}
                activeOpacity={0.7}>
                <Text style={styles.setTitle}>{set.title}</Text>
                <Text style={styles.author}>{set.author}</Text>
                <Text style={styles.rightArrow}>{'>'}</Text>
              </TouchableOpacity>
              {set.purchased ? (
                <View style={styles.completedButton}>
                  <Text style={styles.completedButtonText}>구매완료</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.purchaseButton}
                  onPress={() => handleSetPress(set.id)}>
                  <Text style={styles.purchaseButtonText}>구매하기</Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={styles.emoticonContent}
              onPress={() => handleSetPress(set.id)}
              activeOpacity={0.7}>
              <View style={styles.emoticonGrid}>
                {set.emoticons.slice(0, 4).map(emoji => (
                  <View key={emoji.id} style={styles.emojiContainer}>
                    <Image
                      source={{uri: emoji.imageUrl}}
                      style={styles.emoji}
                    />
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <EmojiPicker
        visible={visible}
        onClose={() => setVisible(false)}
        onEmojiSelect={() => {}}
        isPayed={isPayed}
        setIsPayed={setIsPayed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
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
  topSection: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  titleIcon: {
    marginRight: 4,
    transform: [{translateY: 2}],
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  emoticonSet: {
    marginBottom: 24,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  setHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
  },
  setLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  setTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  rightArrow: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  purchaseButton: {
    backgroundColor: '#A055FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  completedButton: {
    backgroundColor: '#F8F3FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  completedButtonText: {
    color: '#A055FF',
    fontSize: 14,
    fontWeight: '500',
  },
  emoticonContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 0,
  },
  emoticonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emojiContainer: {
    width: '25%',
    aspectRatio: 1,
    padding: 4,
  },
  emoji: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default EmoticonShop;
