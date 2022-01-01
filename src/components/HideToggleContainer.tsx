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
                style={{
                  flexDirection: 'row', 
                  paddingLeft: 25, 
                  paddingVertical: 24, 
                  height: 68, 
                  alignItems: 'center', 
                  backgroundColor: '#F6F6F6', 
                  marginTop: 10,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  borderBottomLeftRadius: !isSpread ? 16 : 0,
                  borderBottomRightRadius: !isSpread ? 16 : 0
                }}
                onPress={() => setIsSpread(!isSpread)}
            >
                <Text style={{fontSize: 16, fontWeight: '500', lineHeight: 20, flex: 1}}>{boardCategory}</Text>
                {isSpread ? <BigFoldButton style={{marginRight: 30}} /> : <BigSpreadButton style={{marginRight: 30}} />}
            </TouchableOpacity>
            {isSpread && <><View style={{flexBasis: 'auto'}}>{component}</View><TouchableOpacity style={{height: 17, backgroundColor: '#F6F6F6', borderBottomRightRadius: 16, borderBottomLeftRadius: 16}} /></>}

        </>
    )
}