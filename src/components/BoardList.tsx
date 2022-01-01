import React, { useState } from 'react';

import {
    ScrollView,
    FlatList,
    View,
    Text
} from 'react-native';
import { GrayPin, OrangePin, PurplePin } from '../../resources/icon/Pin';
import Board from '../classes/Board'

interface Props {
    items: Board[];
}

export default function BoardList({items}: Props) {
    return (
            <FlatList
                data={items}
                renderItem={({item})=><View style={{flexDirection: 'row', paddingVertical: 16, alignItems: 'center', backgroundColor: '#F6F6F6'}}>
                    {!item.isPinned ? <GrayPin style={{marginLeft: 25}} /> : item.isOfficial ? <OrangePin style={{marginLeft: 25}} /> : <PurplePin style={{marginLeft: 25}} />}
                    <Text style={{fontSize: 14, color: '#000000', marginLeft: 15}}>{item.name}</Text>
                    </View>}
            />
    )
}