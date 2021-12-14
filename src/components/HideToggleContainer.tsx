import React, {useState} from 'react';
import {
    TouchableOpacity,
    Text,
    GestureResponderEvent,
    Button,
    StyleSheet,
    Dimensions,
    View,
    TouchableWithoutFeedbackBase,
    TouchableWithoutFeedback,
  } from 'react-native';
import { BigFoldButton, BigSpreadButton, FoldButton } from '../../resources/icon/Button';

  interface Props {
    boardCategory: string;
    component: JSX.Element;
  }
  
export function BoardListContainer({boardCategory, component}: Props) {
    const [isSpread, setIsSpread] = useState<boolean>(true);
    return (
        <>
            <TouchableOpacity
                style={{flexDirection: 'row', paddingLeft: 25, paddingVertical: 16, height: 54, alignItems: 'center', backgroundColor: '#FFFFFF', marginTop: 10}}
                onPress={() => setIsSpread(!isSpread)}
            >
                <Text style={{fontSize: 16, fontWeight: '500', lineHeight: 20, flex: 1}}>{boardCategory}</Text>
                {isSpread ? <BigFoldButton style={{marginRight: 30}} /> : <BigSpreadButton style={{marginRight: 30}} />}
            </TouchableOpacity>
            {isSpread && <View style={{flexBasis: 'auto'}}>{component}</View>}
        </>
    )
}