import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    Text,
    View,
    ActivityIndicator,
    FlatList,
    RefreshControl,
} from 'react-native';

import {Alert} from '../../classes/AlertDto';
import TestAlertItem from '../../components/TestAlertItem';
import WaterMark from '../../components/WaterMark';

import Toast from 'react-native-simple-toast';

const TestAlertFragment = () => {    
const [alerts, setAlerts] = useState<Alert[]>();
const [blindModalVisible, setBlindModalVisible] = useState<boolean>(false);
const [noticeModalVisible, setNoticeModalVisible] = useState<boolean>(false);

const handlePressNotification = (message: string) => {
    Toast.show(message + '입니다.');
};

    return (
        <>
            <WaterMark />
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                <TestAlertItem onPressNotification={handlePressNotification}/>
            </SafeAreaView>
        </>
    );
};

export default TestAlertFragment;