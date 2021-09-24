import React, { useState } from 'react';
import styled from 'styled-components';
import { Text, StatusBar, View, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../../theme';
import { NormalOneLineText, Description } from '../../components/Top';
import { MiddleInactiveInput } from '../../components/Input';
import { DisabledPurpleRoundButton, PurpleFullButton, DisabledPurpleFullButton, PurpleRoundButton } from '../../components/Button';

StatusBar.setBackgroundColor('white');
// StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const TextContainer = styled.View`
  margin: 130px 24px;
`;

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 52,
        fontSize: 21,
        borderBottomWidth: 2,
        borderColor: '#D7DCE6',
        flexDirection: 'row',
        alignItems: 'center',
        // textAlign: 'right'
    },
    suffix: {
        fontSize: 15,
        paddingLeft: 10,
        fontWeight: 'bold',
        color: '#87919B',
        textAlign: 'right',
        // justifyContent: 'flex-end'
    }
})

export default function SignUpID() {

    const [studentId, setStudentId] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const onInputFocus = () => {
        setIsFocused(true);
        console.log("onFocus 함수 호출됨");
    }

    const onInputFocusOut = () => {
        setIsFocused(false);
        Keyboard.dismiss();
        console.log("focusOut 호출됨");
        console.log("isFocused는", isFocused);
    }

    return (
        <ThemeProvider theme={theme}>
            <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled" style={{backgroundColor: '#fff'}}>
            
            <Container>
                <TextContainer>

                    <NormalOneLineText>아이디를 입력해주세요</NormalOneLineText>
                    <Description>학교에서 제공하는 성신 G-mail 계정을 사용합니다</Description>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style = {{ width : '60%', borderColor: '#ff0000' }}
                            onFocus={(e: any) => {onInputFocus();}}
                            onBlur={(e: any) => {onInputFocusOut();}}
                            onChangeText={(value: string) => { setStudentId(value) }}
                            maxLength={8}
                            placeholder="아이디"
                            keyboardType="number-pad"
                        />

                        <Text style={styles.suffix}>@sungshin.ac.kr</Text>
                    </View>

                </TextContainer>
            </Container>

            
        </ScrollView>
            <View style={{ bottom: isFocused ? 0 : 21, borderBottomColor: isFocused ? '#A055FF' : '#D7DCE6', justifyContent: 'center', alignItems: 'center' }}>
                {studentId.length === 8 && isFocused &&
                <PurpleFullButton text="다음" /> }

                {studentId.length === 8 && !isFocused &&
                <PurpleRoundButton text="다음" /> }

                {studentId.length < 8 && isFocused &&
                <DisabledPurpleFullButton text="다음" /> }

                {studentId.length < 8 && !isFocused &&
                <DisabledPurpleRoundButton text="다음" /> }
            </View>
        </ThemeProvider>
    );
}

// import SignUpID from "./src/screens/SignUpID";
// export default SignUpID;
