import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import BoardScreen from '../board/BoardScreen';

const BoardFragment = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      {/* <View style={{alignItems: 'center'}}>
        <Text>board page</Text>
      </View> */}
      <BoardScreen />
    </SafeAreaView>
    
  );
};

export default BoardFragment;
