import React from "react";
import { StatusBar } from "react-native";
import styled, { ThemeProvider } from 'styled-components';
import { theme } from "./theme";
import { FocusInput, ErrorInput, InactiveInput } from "./components/Input";
StatusBar.setBackgroundColor("white");
  // StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    align-items: center;
`;

const Title = styled.Text`
    font-size: 24px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
    align-self: flex-start;
    margin: 0px 20px;
`;

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <FocusInput placeholder="플레이스홀더" />
                <ErrorInput placeholder="플레이스홀더" />
                <InactiveInput placeholder="플레이스홀더" />
            </Container>
        </ThemeProvider>
    )
}