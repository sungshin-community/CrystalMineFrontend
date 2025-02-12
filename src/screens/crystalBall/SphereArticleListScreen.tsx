import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getArticle} from '../../common/CrystalApi';

const SphereArticleListScreen = () => {
  const navigation = useNavigation();
  const [articleData, setArticleData] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticle();
      setArticleData(data);
    };
    fetchArticles();
  }, []);

  return (
    <ScrollView style={styles.box}>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#EFEFF3',
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={articleData}
          keyExtractor={item => item.ptPostId.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[
                styles.articleItem,
                index === 0 ? {marginTop: 0} : {marginTop: 20},
              ]}
              onPress={() => {
                navigation.navigate('SpherePostScreen', {
                  ptPostId: item.ptPostId,
                  isFree: true,
                  isQuestion: false,
                  isReview: false,
                });
              }}>
              <View
                style={[
                  styles.thumbnailContainer,
                  !item.thumbnail && styles.noImage,
                ]}>
                {item.thumbnail ? (
                  <Image
                    source={{uri: item.thumbnail}}
                    style={styles.thumbnail}
                  />
                ) : (
                  <View style={styles.placeholder} />
                )}
                <View style={styles.issuedMonthBox}>
                  <Text style={styles.issuedMonthText}>
                    {item.issuedMonth}월호
                  </Text>
                </View>
              </View>
              <View style={styles.articleInfo}>
                <Text style={styles.nameText}>{item.displayName}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.content} numberOfLines={1}>
                  {item.content}
                </Text>
                <View style={styles.metaInfo}>
                  <Text style={styles.metaText}>
                    ❤️ {item.likeCount} 💬 {item.commentCount}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  articleItem: {
    borderWidth: 1,
    borderColor: '#EFEFF3',
    borderStyle: 'solid',
    marginTop: 20,
    borderRadius: 8,
  },
  thumbnailContainer: {
    width: '100%',
    height: 120,
    overflow: 'hidden',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: 'relative',
  },
  noImage: {
    backgroundColor: '#EFEFF3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: '100%',
    height: '100%',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  articleInfo: {
    flex: 1,
    padding: 16,
  },
  nameText: {
    color: '#9DA4AB',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222222',
  },
  content: {
    fontSize: 14,
    color: '#3A424E',
    marginBottom: 16,
    lineHeight: 20,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#777',
  },
  issuedMonthBox: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 4,
  },
  issuedMonthText: {
    color: '#3A424E',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default SphereArticleListScreen;
