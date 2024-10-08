import React from "react";

import { TypeTestProvider } from "../../contexts/TypeTestContext";
import { SettingsProvider } from "../../contexts/SettingsContext";
import { MenusProvider } from "../../contexts/MenusContext";

import TypeTestPage from "../typetest/TypeTestPage";

import "./css/app.css";

const App = () => {
    return (
        <SettingsProvider>
            <MenusProvider>
                <TypeTestProvider>
                    <TypeTestPage />
                </TypeTestProvider>
            </MenusProvider>
        </SettingsProvider>
    );
}

export default App;