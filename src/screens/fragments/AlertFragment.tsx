import React, {useState} from 'react';
import {View, Text} from 'react-native';
import SphereTabNav from '../../components/SphereTabNav';
import DevelopScreen from '../developScreen/DevelopScreen';
import LookScreen from '../crystalBall/LookScreen';

const AlertFragment = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const renderContent = () => {
    switch (tabIndex) {
      case 0:
        return <LookScreen />;
      case 1:
        return <LookScreen />;
      case 2:
        return <LookScreen isQuestion />;
      case 3:
        return <Text>소희 개발 파트</Text>;
      case 4:
        return <DevelopScreen />;
    }
  };

  return (
    <>
      <SphereTabNav
        onTabPress={index => setTabIndex(index)}
        activeTabIndex={tabIndex}
      />
      <View style={{flex: 1}}>{renderContent()}</View>
    </>
  );
};

export default AlertFragment;

// 스크롤 범위 문의하기
