import React, { useState } from "react";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ImageViewer from "react-native-image-zoom-viewer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator, Platform, Text, TouchableOpacity, View } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import RNFetchBlob from "rn-fetch-blob";
import Toast from 'react-native-simple-toast';

interface Props {
  imageUrls: string[];
  index: number;
}

const ImageViewerScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  return (
    <>
      <ImageViewer
        index={route.params.index}
        imageUrls={route.params.imageUrls}
        onCancel={() => {}}
        onSave={(url) => {console.log(url);
          if (Platform.OS === 'android') {
            let newImgUri = url.lastIndexOf('/');
            let imageName = url.substring(newImgUri);

            let dirs = RNFetchBlob.fs.dirs;
            let path = dirs.PictureDir + '/수정광산/' + imageName;

            RNFetchBlob.config({
              fileCache: true,
              appendExt: 'png',
              indicator: true,
              IOSBackgroundTask: true,
              path: path,
              addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: path,
                description: 'Image'
              },
        
            }).fetch("GET", url).then(res => {
              Toast.show('사진이 저장되었습니다.', Toast.SHORT);
            });
          } else {
            CameraRoll.saveToCameraRoll(url);
            Toast.show('사진이 저장되었습니다.', Toast.SHORT);
          }
      }}
        // footerContainerStyle
        loadingRender={() => (
        <View style={{position: 'absolute', alignItems: 'center', justifyContent: 'center', left: 0, right: 0, top: 0, bottom: 0}}>
          <ActivityIndicator size='large' color={'#A055FF'} animating={true} style={{zIndex: 100}} />
        </View>)}
        enableSwipeDown={true}
        onSwipeDown={() => navigation.goBack()}
        // menus={({cancel, saveToLocal}) => <TouchableOpacity onPress={() => {console.log("눌림")}} style={{backgroundColor: '#ff0000', height: 100, width: 100}}></TouchableOpacity>}
        menuContext={{ saveToLocal: '갤러리에 저장', cancel: '취소' }}
      />
    </>
  )
}

export default ImageViewerScreen;