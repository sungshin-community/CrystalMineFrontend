import React from "react";
import { StatusBar } from "react-native";
import styled, { ThemeProvider } from 'styled-components';
import { theme } from "./theme";
import { 
    MiddleFocusInput, 
    MiddleErrorInput, 
    MiddleInactiveInput, 
    BigFocusInput, 
    BigErrorInput, 
    BigInactiveInput, 
} from "./components/Input";

StatusBar.setBackgroundColor("white");
  // StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
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
                <MiddleFocusInput placeholder="플레이스홀더" title="도움말은 여기에 표시됩니다." />
                <MiddleErrorInput placeholder="플레이스홀더" title="도움말은 여기에 표시됩니다." />
                <MiddleInactiveInput placeholder="플레이스홀더" title="도움말은 여기에 표시됩니다." />
                <BigFocusInput placeholder="플레이스홀더" title="도움말은 여기에 표시됩니다." />
                <BigErrorInput placeholder="플레이스홀더" title="도움말은 여기에 표시됩니다." />
                <BigInactiveInput placeholder="플레이스홀더" title="도움말은 여기에 표시됩니다." />
            </Container>
        </ThemeProvider>
    )
}