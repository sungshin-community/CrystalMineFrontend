import React, { useState } from "react";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ImageViewer from "react-native-image-zoom-viewer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

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
        loadingRender={() => (
        <View style={{position: 'absolute', alignItems: 'center', justifyContent: 'center', left: 0, right: 0, top: 0, bottom: 0}}>
          <ActivityIndicator size='large' color={'#A055FF'} animating={true} style={{zIndex: 100}} />
        </View>)}
        enableSwipeDown={true}
        enablePreload={true}
        onSwipeDown={() => navigation.goBack()}
      />
    </>
  )
}

export default ImageViewerScreen;