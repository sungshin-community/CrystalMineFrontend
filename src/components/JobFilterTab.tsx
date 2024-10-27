import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Filter from '../../resources/icon/Filter';
import PinkN from '../../resources/icon/PinkN';
import JobFilterModal from './JobFilterModal';
import CheckBox from '@react-native-community/checkbox';

interface JobFilterTabProps {
  isQuestion?: boolean;
}

const data = [
  {
    icon: <Filter />,
  },
  {
    title: '전체',
  },
  {
    title: '인기글',
    icon: <PinkN />,
  },
  {
    title: '개발',
  },
  {
    title: '경영/비즈니스',
  },
  {
    title: '디자인',
  },
  {
    title: '마케팅/광고',
  },
  {
    title: '영업',
  },
  {
    title: '고객 서비스/리테일',
  },
  {
    title: '미디어',
  },
  {
    title: '교육',
  },
  {
    title: '엔지니어링/설계',
  },
  {
    title: '게임',
  },
  {
    title: '제조/생산',
  },
  {
    title: '의료/제약',
  },
  {
    title: '물류/무역',
  },
  {
    title: '법률',
  },
  {
    title: '식음료',
  },
  {
    title: '건설',
  },
  {
    title: '공공/복지',
  },
  {
    title: '금융',
  },
];

export default function JobFilterTab({isQuestion = false}: JobFilterTabProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const modalSelected = selected
    .map(index => {
      if (index === 2) {
        return undefined;
      } else if (index === 1) {
        return 0;
      } else {
        return index - 2;
      }
    })
    .filter(index => index !== undefined);

  const handleChipPress = (index: number) => {
    if (index === 0) {
      setModalVisible(true);
      return;
    }
    if (index === 1 || index === 2) {
      setSelected(prevSelected => {
        if (prevSelected.includes(index)) {
          return [];
        } else {
          return [index];
        }
      });
    } else {
      setSelected(prevSelected => {
        const newSelected = prevSelected.includes(index)
          ? prevSelected.filter(i => i !== index)
          : [...prevSelected, index];

        return newSelected.includes(1) || newSelected.includes(2)
          ? newSelected.filter(i => i !== 1 && i !== 2)
          : newSelected;
      });
    }
  };

  const handleCheckboxChange = (value: boolean) => {
    setCheckboxChecked(value);
  };

  return (
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        {data.map((job, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.chip,
              selected.includes(index) && styles.selectedChip,
            ]}
            onPress={() => handleChipPress(index)}>
            {job.title && (
              <Text
                style={[
                  styles.text,
                  selected.includes(index) && styles.selectedText,
                ]}>
                {job.title}
              </Text>
            )}
            {job.icon && React.cloneElement(job.icon)}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {isQuestion && (
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={checkboxChecked}
            onValueChange={handleCheckboxChange}
            tintColors={{false: '#CECFD6', true: '#CECFD6'}}
          />
          <Text style={{fontWeight: '400', fontSize: 12, color: '#3A424E'}}>
            내 직무 게시글만 보기
          </Text>
        </View>
      )}

      <JobFilterModal
        visible={modalVisible}
        setVisible={() => setModalVisible(false)}
        selectedFilters={modalSelected}
        onApplyFilters={(selected: number[]) => {
          const adjustedSelected = selected.map(index =>
            index === 0 ? index + 1 : index + 2,
          );
          setSelected(adjustedSelected);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // 배경 색깔 수정
  container: {
    backgroundColor: '#fff',
    paddingVertical: 12,
  },
  contentContainer: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#E2E4E8',
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginRight: 8,
  },
  selectedChip: {
    backgroundColor: '#A055FF',
    borderColor: '#A055FF',
  },
  text: {
    fontSize: 12,
    color: '#3A424E',
    fontWeight: '400',
  },
  selectedText: {
    color: '#fff',
    fontWeight: '600',
  },
  // 배경 색깔 수정
  checkboxContainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    paddingVertical: 12,
    paddingHorizontal: 16,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

// 아무것도 클릭 안되었을 때 전체 클릭되게 하기
// SphereItem 이랑 엮는 작업
// CheckBox 스타일링 + 클릭 후 작업 구현
