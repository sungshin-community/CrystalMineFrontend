import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, Pressable, View, Image, ScrollView, Modal} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fontBold, fontMedium, fontRegular} from '../../../common/font';
import {NoticeDto} from '../../../classes/mypage/NoticeDto';
import {getNotice} from '../../../common/myPageApi';
import PostItem from '../../../components/PostItem';
import ImageViewer from 'react-native-image-zoom-viewer';

type RootStackParamList = {
  Notice: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

function Notice({navigation, route}: Props) {
  const [data, setData] = useState<NoticeDto>();
  const [isPhotoVisible, setIsPhotoVisible] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      const data = await getNotice(route.params.noticeId);
      setData(data);
      console.log(data);
    }
    getData();
  }, []);
    const closePhotoModal = () => {
    if (isPhotoVisible) {
      setIsPhotoVisible(false);
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: '#E5E5E5'}}>
      <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={[fontMedium, styles.title]}>{data?.title}</Text>
            {data?.isNew && (
              <View style={styles.newIcon}>
                <Text style={[fontBold, {color: '#FF6060', fontSize: 13}]}>
                  N
                </Text>
              </View>
            )}
          </View>
          <Text>{data?.content}</Text>
          <Text
            style={[
              fontRegular,
              {color: '#ADB3BC', fontSize: 12, marginTop: 12},
            ]}>
            {data?.createdAt}
        </Text>
        {data?.images.length !== 0 &&
            <View style={{ flexDirection: 'row', marginTop: 16 }}>
                <ScrollView horizontal={true}>
                  {data?.images.map((url, index) => (
                    <Pressable key={index} onPress={() => setIsPhotoVisible(true)}>
                      <Image
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: 10,
                          marginRight: 16,
                        }}
                        source={{ uri: url.url }}
                      />
                    </Pressable>
                  ))}
                  <Modal
                    visible={isPhotoVisible}
                    transparent={true}
                    onRequestClose={closePhotoModal}>
                    {data && <ImageViewer
                      imageUrls={data.images}
                      onCancel={() => closePhotoModal()}
                      enableSwipeDown
                    />}
                  </Modal>
                </ScrollView>
        </View>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 16,
  },
  newIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  title: {
    fontSize: 15,
    color: '#222222',
  },
});

export default Notice;