import React, {useState} from 'react';
import TrashIcon from '../../resources/icon/TrashIcon';
import {Pressable} from 'react-native';
import QuestionList from '../screens/mypage/QuestionList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  QuestionList: {state: boolean};
};
type Props = NativeStackScreenProps<RootStackParamList>;

export default function QuestionRemove({navigation}: Props) {
  const [removeState, setRemoveState] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => {
          console.log('지우기', removeState);
          navigation.navigate('QuestionList', {state: !removeState});
          setRemoveState(!removeState)
        }}>
        <TrashIcon style={{marginRight: 3}} />
      </Pressable>
    </>
  );
}
