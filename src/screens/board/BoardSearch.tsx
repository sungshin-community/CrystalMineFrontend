import React from 'react';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function BoardSearch() {
  return (
    <KeyboardAvoidingView>
      <SafeAreaView>
        <Text>search</Text>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default BoardSearch;
