import React from "react";

import { TypeTestProvider } from "../../contexts/TypeTestContext";
import TypeTestPage from "../typetest/TypeTestPage";

import "./css/app.css";

const App = () => {
    return (
        <TypeTestProvider>
            <TypeTestPage />
        </TypeTestProvider>
    );
}

export default App;