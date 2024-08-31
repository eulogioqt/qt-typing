import React, { useState, useEffect } from "react";
import { useSettings } from "../../../contexts/SettingsContext";
import { TEST_STATES, useTypeTest } from "../../../contexts/TypeTestContext";

const ScreenKeyboard = () => {
    const { showKeyboard } = useSettings();
    const { testState } = useTypeTest();

    if (!showKeyboard || testState === TEST_STATES.FINISHED) return null;

    const [pressedKeys, setPressedKeys] = useState({});
    const keyCapSize = window.innerHeight / 20; // px

    const letters = [
        ["º", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "?", "¿", "BACK"],
        ["TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "`", "+", "ENTERTOP"],
        ["BMAY", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ", "´", "ç", "ENTERBOT"],
        ["LMAY", "<", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "-", "RMAY"],
        ["LCNTRL", "LWIN", "ALT", "SPACE", "ALTGR", "FN", "RWIN", "RCNTRL"]
    ];

    const WIDTH_KEY_MULTIPLIER = {
        "BACK": 2,
        "TAB": 1.5,
        "ENTERTOP": 1.5,
        "BMAY": 1.75,
        "ENTERBOT": 1.25,
        "LMAY": 1.25,
        "RMAY": 2.775,
        "LCNTRL": 1.25,
        "LWIN": 1.25,
        "ALT": 1.25,
        "SPACE": 6.4,
        "ALTGR": 1.25,
        "FN": 1.25,
        "RWIN": 1.25,
        "RCNTRL": 1.25
    }

    const TabSymbol = <span className="position-absolute d-flex flex-column" style={{ right: (keyCapSize / 6) + "px", bottom: "0px" }}>
        <span className="position-absolute d-flex flex-column" style={{ right: "0px", bottom: (keyCapSize / 6) + "px" }}>⇤</span>
        <span className="position-absolute d-flex flex-column" style={{ right: "0px", bottom: "0px" }}>⇥</span>
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

    const LETTER_DISPLAY = {
        "º": ThreeDisplay("ª", "º", '\\'),
        "1": ThreeDisplay("!", "1", "|"),
        "2": ThreeDisplay("\"", "2", "@"),
        "3": ThreeDisplay("·", "3", "#"),
        "4": ThreeDisplay("$", "4", "~"),
        "5": ThreeDisplay("%", "5", ""),
        "6": ThreeDisplay("&", "6", "¬"),
        "7": ThreeDisplay("/", "7", ""),
        "8": ThreeDisplay("(", "8", ""),
        "9": ThreeDisplay(")", "9", ""),
        "0": ThreeDisplay("=", "0", ""),
        "?": ThreeDisplay("?", ",", ""),
        "¿": ThreeDisplay("¿", "¡", ""),
        "BACK": SingleDisplayEnd("←"),

        "TAB": SingleDisplayStart("Tab", TabSymbol),
        "E": ThreeDisplay("E", "", "€"),
        "`": ThreeDisplay("^", "`", "["),
        "+": ThreeDisplay("*", "+", "]"),
        "ENTERTOP": "",

        "BMAY": SingleDisplayStart("Bloq Mayus"),
        "´": ThreeDisplay("¨", "´", "{"),
        "ç": ThreeDisplay("ç", "}", ""),
        "ENTERBOT": SingleDisplayEnd("↵ Intro"),

        "LMAY": SingleDisplayStart("⇧"),
        "<": ThreeDisplay("<", ">", ""),
        ",": ThreeDisplay(";", ",", ""),
        ".": ThreeDisplay(":", ".", ""),
        "-": ThreeDisplay("_", "-", ""),
        "RMAY": SingleDisplayEnd("⇧"),

        "LCNTRL": SingleDisplayCenter("Ctrl"),
        "LWIN": SingleDisplayCenter("Win"),
        "ALT": SingleDisplayCenter("Alt"),
        "SPACE": "",
        "ALTGR": SingleDisplayCenter("Alt Gr"),
        "FN": SingleDisplayCenter("Fn"),
        "RWIN": SingleDisplayCenter("Win"),
        "RCNTRL": SingleDisplayCenter("Ctrl")
    }

    const generateStyle = (letter) => ({
        fontFamily: "monospace",
        backgroundColor: pressedKeys[letter] ? "white" : "#444444",
        color: pressedKeys[letter] ? "#444444" : "white",
        fontSize: keyCapSize / 3 + "px",
        border: "1px solid black",
        borderRadius: "8px",
        margin: "1px",
        width: (keyCapSize * (WIDTH_KEY_MULTIPLIER[letter] ?? 1)) + "px",
        height: keyCapSize + "px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0px",
    });

    const handleKeyDown = (event) => {
        const key = event.key.toUpperCase();
        if (key.length === 1 && key.match(/[A-ZÑ]/)) {
            setPressedKeys(prevState => ({
                ...prevState,
                [key]: true
            }));
        }
    };

    const handleKeyUp = (event) => {
        const key = event.key.toUpperCase();
        if (key.length === 1 && key.match(/[A-ZÑ]/)) {
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

    return (
        <div className="d-lg-inline no-select d-none mt-5 bg-dark px-3 py-1 rounded-3">
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
