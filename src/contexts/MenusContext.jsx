import React, { createContext, useContext, useState } from "react";

const MenusContext = createContext();

export const MENUS = {
    TEST_SETTINGS: "TEST_SETTINGS_MENU",
    TEST_RESULTS: "TEST_RESULTS_MENU"
}

export const MenusProvider = ({ children }) => {
    const [testSettingsMenu, setTestSettingsMenu] = useState(false);
    const openTestSettingsMenu = () => setTestSettingsMenu(true);
    const closeTestSettingsMenu = () => setTestSettingsMenu(false);

    const [testResultsMenu, setTestResultsMenu] = useState(false);
    const openTestResultsMenu = () => setTestResultsMenu(true);
    const closeTestResultsMenu = () => setTestResultsMenu(false);

    const isMenuOpen = () => testSettingsMenu || testResultsMenu;
    const getOpenMenu = () => testSettingsMenu ? MENUS.TEST_SETTINGS : (testResultsMenu ? MENUS.TEST_RESULTS : undefined);
    const closeAllMenus = () => {
        closeTestSettingsMenu();
        closeTestResultsMenu();
    }

    return (
        <MenusContext.Provider
            value={{
                testSettingsMenu,
                openTestSettingsMenu,
                closeTestSettingsMenu,
                testResultsMenu,
                openTestResultsMenu,
                closeTestResultsMenu,

                isMenuOpen,
                getOpenMenu,
                closeAllMenus
            }}
        >
            {children}
        </MenusContext.Provider>
    )
}

export const useMenus = () => useContext(MenusContext);