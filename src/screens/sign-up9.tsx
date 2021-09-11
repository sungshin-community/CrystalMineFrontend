import React from "react";
import styled from "styled-components";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../theme";
import { BigOneLineText } from "../components/top";

StatusBar.setBackgroundColor("white");
  // StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;

const styles = StyleSheet.create({
    text: {
        marginTop: 130,
        marginLeft: 24,
    },
})

export default function SignUp9() {
    return (
        <ThemeProvider theme={theme}>
            <Container>
            <SafeAreaView>
                <BigOneLineText style={styles.text}>회원가입이{"\n"}완료되었습니다</BigOneLineText>
            </SafeAreaView>
            </Container>
        </ThemeProvider>
    )
}