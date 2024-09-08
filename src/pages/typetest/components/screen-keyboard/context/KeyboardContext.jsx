import React, { createContext, useContext, useEffect, useState } from "react";

import { useWindowsSize } from "../../../../../hooks/useWindowsSize";

const WIDTH_KEY_MULTIPLIER = {
    "BACKSPACE": 2,
    "TAB": 1.5,
    "ENTERTOP": 1.5,
    "CAPSLOCK": 1.75,
    "ENTERBOT": 1.25,
    "SHIFTLEFT": 1.25,
    "SHIFTRIGHT": 2.775,
    "CONTROLLEFT": 1.3,
    "METALEFT": 1.3,
    "ALTLEFT": 1.3,
    "SPACE": 6.4,
    "ALTRIGHT": 1.3,
    "FN": 1.3,
    "CONTEXTMENU": 1.3,
    "CONTROLRIGHT": 1.3
};

const KeyboardContext = createContext();

export const KeyboardProvider = ({ children }) => {
    const { width, height } = useWindowsSize();

    const size = Math.min(width / 24, height / 20);
    const keyCapSize = size > 64 ? 64 : size;

    const [capsLock, setCapsLock] = useState(false);

    const baseStyle = (isPressed, letter) => ({
        fontFamily: "monospace",
        backgroundColor: isPressed ? "#222222" : "#444444",
        color: isPressed ? "gray" : "white",
        fontSize: keyCapSize / 3 + "px",
        border: "1px solid black",
        boxShadow: isPressed ? "" : "0px 2px 0px #222222",
        margin: isPressed ? "4px 2px -2px 2px" : "2px",
        width: (keyCapSize * (WIDTH_KEY_MULTIPLIER[letter] ?? 1)) + "px",
        height: keyCapSize + "px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0px",
        borderBottomLeftRadius: keyCapSize / 6 + "px",
        borderTopLeftRadius: keyCapSize / 6 + "px",
        borderTopRightRadius: keyCapSize / 6 + "px",
        borderBottomRightRadius: keyCapSize / 6 + "px",
    });

    const enterTopStyle = (isPressed) => ({
        ...baseStyle(isPressed, "ENTERTOP"),
        margin: isPressed ? "4px 2px -2px 2px" : "2px 2px 2px 2px",
        borderBottomLeftRadius: keyCapSize / 6 + "px",
        borderTopLeftRadius: keyCapSize / 6 + "px",
        borderTopRightRadius: keyCapSize / 6 + "px",
        borderBottomRightRadius: "0px",
        borderBottom: "0px",
    });

    const enterBotStyle = (isPressed) => ({
        ...baseStyle(isPressed, "ENTERBOT"),
        margin: isPressed ? "0px 2px 0px 2px" : "-2px 2px 2px 2px",
        height: 4 + keyCapSize + "px",
        borderBottomLeftRadius: keyCapSize / 6 + "px",
        borderBottomRightRadius: keyCapSize / 6 + "px",
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        borderTop: "0px",
    });

    const getKeyCapStyle = (isPressed, letter) => {
        if (letter === "ENTERTOP") return enterTopStyle(isPressed);
        if (letter === "ENTERBOT") return enterBotStyle(isPressed);
        return baseStyle(isPressed, letter);
    };

    useEffect(() => {
        const handleKeyDown = (event) => setCapsLock(event.getModifierState("CapsLock"))
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <KeyboardContext.Provider
            value={{
                keyCapSize,
                capsLock,
                getKeyCapStyle
            }}
        >
            {children}
        </KeyboardContext.Provider>
    )
}

export const useKeyboard = () => useContext(KeyboardContext);