import React, { useState, useEffect } from "react";
import { useSettings } from "../../../contexts/SettingsContext";
import { useWindowsSize } from "../../../hooks/useWindowsSize";
import { TEST_STATES, useTypeTest } from "../../../contexts/TypeTestContext";

const ScreenKeyboard = () => {
    const { showKeyboard } = useSettings();
    const { testState } = useTypeTest();
    const { width, height } = useWindowsSize();

    const [capsLock, setCapsLock] = useState(false);
    const [pressedKeys, setPressedKeys] = useState({});
    const keyCapSize = Math.min(width / 24, height / 20); // px

    const TabSymbol = <span className="position-absolute d-flex flex-column" style={{ right: (keyCapSize / 6) + "px", bottom: "0px" }}>
        <span className="position-absolute d-flex flex-column" style={{ right: "0px", bottom: (keyCapSize / 6) + "px" }}>⇤</span>
        <span className="position-absolute d-flex flex-column" style={{ right: "0px", bottom: "0px" }}>⇥</span>
    </span>

    const CapsLockSymbol = <span className="position-absolute d-flex flex-column" style={{ right: (keyCapSize / 6) + "px", top: "0px" }}>
        <span className="position-absolute d-flex flex-column" style={{
            right: "-" + keyCapSize / 6 + "px", top: "-" + keyCapSize / 3 + "px", color: capsLock ? "white" : "gray", fontSize: keyCapSize / 1.5
        }}>·</span>
    </span>

    const SingleDisplayEnd = (bottomRight) => (
        <div className="d-flex flex-column w-100 h-100 position-relative">
            <span className="position-absolute text-end w-100 px-2"
                style={{ fontSize: (keyCapSize / 3.5) + "px", bottom: (keyCapSize / 12) + "px", lineHeight: "1" }}>{bottomRight}</span>
        </div>
    )

    const SingleDisplayCenter = (bottomCenter) => (
        <div className="d-flex flex-column w-100 h-100 position-relative">
            <span className="position-absolute text-center w-100"
                style={{ fontSize: (keyCapSize / 3.5) + "px", bottom: (keyCapSize / 12) + "px", lineHeight: "1" }}>{bottomCenter}</span>
        </div>
    )

    const SingleDisplayStart = (bottomLeft, add) => (
        <div className="d-flex flex-column w-100 h-100 position-relative">
            <span className="position-absolute text-start w-100 px-2"
                style={{ fontSize: (keyCapSize / 3.5) + "px", bottom: (keyCapSize / 12) + "px", lineHeight: "1" }}>{bottomLeft}</span>
            {add}
        </div>
    )

    const ThreeDisplay = (topLeft, bottomLeft, bottomRight) => (
        <div className="d-flex flex-column w-100 h-100 position-relative">
            <span className="position-absolute" style={{ left: keyCapSize / 6 + "px", top: "1px" }}>{topLeft}</span>
            <span className="position-absolute" style={{ left: keyCapSize / 6 + "px", bottom: "1px" }}>{bottomLeft}</span>
            <span className="position-absolute" style={{ right: keyCapSize / 6 + "px", bottom: "1px" }}>{bottomRight}</span>
        </div>
    )

    const baseStyle = (letter) => ({
        fontFamily: "monospace",
        backgroundColor: pressedKeys[letter] ? "#222222" : "#444444",
        color: pressedKeys[letter] ? "gray" : "white",
        fontSize: keyCapSize / 3 + "px",
        border: "1px solid black",
        boxShadow: pressedKeys[letter] ? "" : "0px 2px 0px #222222",
        margin: pressedKeys[letter] ? "4px 2px -2px 2px" : "2px",
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

    const ENTERTOP = () => ({
        ...baseStyle("ENTERTOP"),
        margin: pressedKeys["ENTERTOP"] ? "4px 2px -2px 2px" : "2px 2px 2px 2px",
        borderBottomLeftRadius: keyCapSize / 6 + "px",
        borderTopLeftRadius: keyCapSize / 6 + "px",
        borderTopRightRadius: keyCapSize / 6 + "px",
        borderBottomRightRadius: "0px",
        borderBottom: "0px",
    });

    const ENTERBOT = () => ({
        ...baseStyle("ENTERBOT"),
        margin: pressedKeys["ENTERBOT"] ? "0px 2px 0px 2px" : "-2px 2px 2px 2px",
        height: 4 + keyCapSize + "px",
        borderBottomLeftRadius: keyCapSize / 6 + "px",
        borderBottomRightRadius: keyCapSize / 6 + "px",
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        borderTop: "0px",
    });

    const generateStyle = (letter) => {
        if (letter === "ENTERTOP") return ENTERTOP();
        if (letter === "ENTERBOT") return ENTERBOT();
        return baseStyle(letter);
    };


    const handleKeyDown = (event) => {
        const key = (event.code.startsWith("Key") ? event.code.substring(3) : event.code).toUpperCase();
        setCapsLock(event.getModifierState("CapsLock"));

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
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);


    const letters = [
        ["BACKQUOTE", "DIGIT1", "DIGIT2", "DIGIT3", "DIGIT4", "DIGIT5", "DIGIT6", "DIGIT7", "DIGIT8", "DIGIT9", "DIGIT0", "MINUS", "EQUAL", "BACKSPACE"],
        ["TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "BRACKETLEFT", "BRACKETRIGHT", "ENTERTOP"],
        ["CAPSLOCK", "A", "S", "D", "F", "G", "H", "J", "K", "L", "SEMICOLON", "QUOTE", "BACKSLASH", "ENTERBOT"],
        ["SHIFTLEFT", "INTLBACKSLASH", "Z", "X", "C", "V", "B", "N", "M", "COMMA", "PERIOD", "SLASH", "SHIFTRIGHT"],
        ["CONTROLLEFT", "METALEFT", "ALTLEFT", "SPACE", "ALTRIGHT", "FN", "CONTEXTMENU", "CONTROLRIGHT"]
    ];

    const LETTER_DISPLAY = {
        "BACKQUOTE": ThreeDisplay("ª", "º", '\\'),
        "DIGIT1": ThreeDisplay("!", "1", "|"),
        "DIGIT2": ThreeDisplay("\"", "2", "@"),
        "DIGIT3": ThreeDisplay("·", "3", "#"),
        "DIGIT4": ThreeDisplay("$", "4", "~"),
        "DIGIT5": ThreeDisplay("%", "5", ""),
        "DIGIT6": ThreeDisplay("&", "6", "¬"),
        "DIGIT7": ThreeDisplay("/", "7", ""),
        "DIGIT8": ThreeDisplay("(", "8", ""),
        "DIGIT9": ThreeDisplay(")", "9", ""),
        "DIGIT0": ThreeDisplay("=", "0", ""),
        "MINUS": ThreeDisplay("?", ",", ""),
        "EQUAL": ThreeDisplay("¿", "¡", ""),
        "BACKSPACE": SingleDisplayEnd("←"),

        "TAB": SingleDisplayStart("Tab", TabSymbol),
        "E": ThreeDisplay("E", "", "€"),
        "BRACKETLEFT": ThreeDisplay("^", "`", "["),
        "BRACKETRIGHT": ThreeDisplay("*", "+", "]"),
        "ENTERTOP": "",

        "CAPSLOCK": SingleDisplayStart("Bloq Mayus", CapsLockSymbol),
        "SEMICOLON": ThreeDisplay("Ñ", "", ""),
        "QUOTE": ThreeDisplay("¨", "´", "{"),
        "BACKSLASH": ThreeDisplay("ç", "}", ""),
        "ENTERBOT": SingleDisplayEnd("↵ Intro"),

        "SHIFTLEFT": SingleDisplayStart("⇧"),
        "INTLBACKSLASH": ThreeDisplay("<", ">", ""),
        "COMMA": ThreeDisplay(";", ",", ""),
        "PERIOD": ThreeDisplay(":", ".", ""),
        "SLASH": ThreeDisplay("_", "-", ""),
        "SHIFTRIGHT": SingleDisplayEnd("⇧"),

        "CONTROLLEFT": SingleDisplayCenter("Ctrl"),
        "METALEFT": SingleDisplayCenter("Win"),
        "ALTLEFT": SingleDisplayCenter("Alt"),
        "SPACE": "",
        "ALTRIGHT": SingleDisplayCenter("Alt Gr"),
        "FN": SingleDisplayCenter("Fn"),
        "CONTEXTMENU": SingleDisplayCenter("☰"),
        "CONTROLRIGHT": SingleDisplayCenter("Ctrl")
    }


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
    }

    if (!showKeyboard || testState === TEST_STATES.FINISHED) return null;

    return (
        <div className="d-md-inline no-select d-none mt-5 border-black border px-3 py-1 rounded-3" style={{
            backgroundColor: "#333333", boxShadow: "0px 8px 0px #222222"
        }}>
            {letters.map((row, index) => (
                <div className="row d-flex justify-content-between" key={index}>
                    {row.map(letter => (
                        <div
                            key={letter}
                            style={generateStyle(letter)}
                        >
                            {LETTER_DISPLAY[letter] ?? ThreeDisplay(letter, "", "")}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default ScreenKeyboard;
