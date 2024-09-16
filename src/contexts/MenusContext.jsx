import React, { createContext, useContext, useState, useEffect } from "react";
import { TEST_STATES, useTypeTest } from "./TypeTestContext";

const MenusContext = createContext();

export const MenusProvider = ({ children }) => {
    const { testState } = useTypeTest();

    const [openTestSettings, setOpenTestSettings] = useState(false);
    const [openResults, setOpenResults] = useState(false);

    useEffect(() => {
        setOpenResults(testState === TEST_STATES.FINISHED);
    }, [testState]);

    return (
        <MenusContext.Provider
            value={{
                openTestSettings,
                setOpenTestSettings,
                openResults,
                setOpenResults
            }}
        >
            {children}
        </MenusContext.Provider>
    )
}

export const useMenus = () => useContext(MenusContext);