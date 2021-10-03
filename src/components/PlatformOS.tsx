import {KeyboardAvoidingView, View, Platform} from 'react-native';

export const PlatformOS = () => {
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS == 'ios' ? 10 : 0}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
    />
  ) : (
    <View />
  );
};
