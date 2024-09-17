import React, { useState, useEffect } from "react";

import { useSettings } from "../../../../contexts/SettingsContext";
import { useMenus } from "../../../../contexts/MenusContext";

import KeyCap from "./KeyCap";

const letters = [
    ["BACKQUOTE", "DIGIT1", "DIGIT2", "DIGIT3", "DIGIT4", "DIGIT5", "DIGIT6", "DIGIT7", "DIGIT8", "DIGIT9", "DIGIT0", "MINUS", "EQUAL", "BACKSPACE"],
    ["TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "BRACKETLEFT", "BRACKETRIGHT", "ENTERTOP"],
    ["CAPSLOCK", "A", "S", "D", "F", "G", "H", "J", "K", "L", "SEMICOLON", "QUOTE", "BACKSLASH", "ENTERBOT"],
    ["SHIFTLEFT", "INTLBACKSLASH", "Z", "X", "C", "V", "B", "N", "M", "COMMA", "PERIOD", "SLASH", "SHIFTRIGHT"],
    ["CONTROLLEFT", "METALEFT", "ALTLEFT", "SPACE", "ALTRIGHT", "FN", "CONTEXTMENU", "CONTROLRIGHT"]
];

const ScreenKeyboard = () => {
    const { showKeyboard } = useSettings();
    const { isMenuOpen } = useMenus();

    const [pressedKeys, setPressedKeys] = useState({});

    const handleKeyDown = (event) => {
        const key = (event.code.startsWith("Key") ? event.code.substring(3) : event.code).toUpperCase();
        if (event.key.toUpperCase() === "ENTER") {
            setPressedKeys(prevState => ({
                ...prevState,
                ["ENTERTOP"]: true,
                ["ENTERBOT"]: true
            }));
        } else if (letters.some(row => row.some(registeredKey => registeredKey === key))) {
            setPressedKeys(prevState => ({
                ...prevState,
                [key]: true
            }));
        }
    };

    const handleKeyUp = (event) => {
        const key = (event.code.startsWith("Key") ? event.code.substring(3) : event.code).toUpperCase();
        if (event.key.toUpperCase() === "ENTER") {
            setPressedKeys(prevState => ({
                ...prevState,
                ["ENTERTOP"]: false,
                ["ENTERBOT"]: false
            }));
        } else if (event.key.toUpperCase() === "SHIFT") {
            setPressedKeys(prevState => ({
                ...prevState,
                ["SHIFTLEFT"]: false,
                ["SHIFTRIGHT"]: false
            }));
        } else if (letters.some(row => row.some(registeredKey => registeredKey === key))) {
            setPressedKeys(prevState => ({
                ...prevState,
                [key]: false
            }));
        }
    };

    useEffect(() => {
        setPressedKeys({}); // Para reiniciar las teclas y no se queden pilladas al abrir menu

        if (!isMenuOpen()) {
            window.addEventListener("keydown", handleKeyDown);
            window.addEventListener("keyup", handleKeyUp);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [isMenuOpen()]);

    if (!showKeyboard) return null;

    return (
        <div className="d-md-inline no-select d-none mt-5 border-black border px-3 py-1 rounded-3"
            style={{ backgroundColor: "#333333", boxShadow: "0px 8px 0px #222222" }}>
            {letters.map((row, index) => (
                <div className="row d-flex justify-content-between" key={index}>
                    {row.map(letter => <KeyCap key={letter} isPressed={pressedKeys[letter]} letter={letter} />)}
                </div>
            ))}
        </div>
    );
}

export default ScreenKeyboard;
