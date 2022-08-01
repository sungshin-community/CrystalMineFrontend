import React, {useState, useEffect} from 'react';
import {
  ScrollView,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import { AgreementAll, DirectionAgreement } from '../../classes/Agreement';
import { getAllAgreements } from '../../common/authApi';

export const DirectionAgreeScreen = () => {
  const [data, setData] = useState<AgreementAll>();
  useEffect(() => {
    async function init() {
      const result = await getAllAgreements();
      setData(result);
    }
    init();
  }, [])

  return (
    <ScrollView style={{ backgroundColor: '#fff',paddingHorizontal: 24, paddingVertical: 16 }}>
      <Markdown>
        {data?.direction[0].content ? data?.direction[0].content : ""}
      </Markdown>
    </ScrollView>
    );
}