import React, { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [testLang, setTestLang] = useState("es");

    return (
        <SettingsContext.Provider
            value={{
                testLang,
                setTestLang
            }}
        >
            {children}
        </SettingsContext.Provider>
    )
}

export const useSettings = () => useContext(SettingsContext);