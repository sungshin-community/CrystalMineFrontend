import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import { AgreementAll, DirectionAgreement } from '../../classes/Agreement';
import { getAllAgreements } from '../../common/authApi';
import { getContractGuide } from '../../common/contractApi';

export const DirectionAgreeScreen = () => {
  const [data, setData] = useState<AgreementAll>();
  useEffect(() => {
    async function init() {
      const result = await getContractGuide();
      setData(result);
    }
    init();
  }, [])

  return (
    <ScrollView style={{ backgroundColor: '#fff',paddingHorizontal: 24, paddingTop: 20}}>
      <Markdown>
        {data?.direction.content ? data?.direction.content : ""}
      </Markdown>
      <View style={{paddingVertical: 30}}/>
    </ScrollView>
    );
}