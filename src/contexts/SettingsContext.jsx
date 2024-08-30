import React, { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [testLang, setTestLang] = useState("es");

    const [liveWPM, setLiveWPM] = useState(false);
    const [duration, setDuration] = useState(60);
    const [hideTime, setHideTime] = useState(false);

    return (
        <SettingsContext.Provider
            value={{
                testLang,
                setTestLang,

                liveWPM,
                setLiveWPM,
                duration,
                setDuration,
                hideTime,
                setHideTime
            }}
        >
            {children}
        </SettingsContext.Provider>
    )
}

export const useSettings = () => useContext(SettingsContext);