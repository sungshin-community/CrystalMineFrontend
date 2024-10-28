import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import DropDown from '../../resources/icon/DropDown';

const SelectInput = ({label, placeholder, options}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handlePress = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = option => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        {label} <Text style={styles.required}>*</Text>
      </Text>
      <TouchableOpacity style={styles.selectBox} onPress={handlePress}>
        <Text style={styles.placeholder}>{selected || placeholder}</Text>
        <DropDown />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          <ScrollView style={styles.scrollView} nestedScrollEnabled>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect(option)}>
                <Text style={styles.option}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const ReviewPostWriteSelect = () => {
  const jobOptions = [
    '개발',
    '경영/비즈니스',
    '디자인',
    '마케팅/광고',
    '영업',
    '고객 서비스/리테일',
    '미디어',
    '교육',
    '엔지니어링/설계',
    '게임',
    '제조/생산',
    '의료/제약',
    '물류/무역',
    '법률',
    '식/음료',
    '건설/시설',
    '공공/복지',
    '금융',
    'HR',
  ];

  const categoryOptions = [
    '취업 후기',
    '대내외 활동',
    '인턴 후기',
    '이직 후기',
  ];
  const sizeOptions = ['대기업', '중견기업', '중소기업', '기타'];
  const yearOptions = ['신입', '경력'];

  return (
    <View style={styles.container}>
      <SelectInput
        label="직무 정보"
        placeholder="직무를 선택해주세요."
        options={jobOptions}
      />
      <SelectInput
        label="카테고리"
        placeholder="카테고리를 선택해주세요."
        options={categoryOptions}
      />
      <SelectInput
        label="규모"
        placeholder="활동 규모를 선택해주세요."
        options={sizeOptions}
      />
      <SelectInput
        label="경력"
        placeholder="경력을 선택해주세요."
        options={yearOptions}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    color: '#B9BAC1',
    marginBottom: 10,
  },
  required: {
    color: '#A055FF',
  },
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E4E8',
    borderRadius: 6,
    backgroundColor: '#FFF',
  },
  placeholder: {
    color: '#6E7882',
    fontSize: 14,
  },
  dropdown: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E4E8',
    borderRadius: 6,
    marginTop: 4,
    paddingHorizontal: 16,
  },
  option: {
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  scrollView: {
    maxHeight: 300,
  },
});

export default ReviewPostWriteSelect;
