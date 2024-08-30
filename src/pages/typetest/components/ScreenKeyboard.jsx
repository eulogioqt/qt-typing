import React, { useState, useEffect } from "react";

const ScreenKeyboard = () => {
    const [pressedKeys, setPressedKeys] = useState({});

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
        "LMAY": 1.55,
        "RMAY": 2.5,
        "LCNTRL": 1.3,
        "LWIN": 1.3,
        "ALT": 1.3,
        "SPACE": 6.2,
        "ALTGR": 1.3,
        "FN": 1.3,
        "RWIN": 1.3,
        "RCNTRL": 1.3
    }

    const LETTER_DISPLAY = {
        "BACK": "<-",
        "TAB": <span style={{ fontSize: "1.5rem" }}>TAB</span>,
        "ENTERTOP": "",
        "BMAY": <span style={{ fontSize: "1.5rem" }}>BLOQ</span>,
        "ENTERBOT": <span style={{ fontSize: "1rem" }}>INTRO</span>,
        "LMAY": "^",
        "RMAY": "^",
        "LCNTRL": <span style={{ fontSize: "1rem" }}>CNTRL</span>,
        "LWIN": <span style={{ fontSize: "1.25rem" }}>Win</span>,
        "ALT": <span style={{ fontSize: "1.25rem" }}>Alt</span>,
        "SPACE": "",
        "ALTGR": <span style={{ fontSize: "0.75rem", textWrap: "nowrap" }}>Alt Gr</span>,
        "FN": "Fn",
        "RWIN": <span style={{ fontSize: "1.25rem" }}>Win</span>,
        "RCNTRL": <span style={{ fontSize: "1rem" }}>CNTRL</span>
    }

    const generateStyle = (letter) => ({
        fontFamily: "monospace",
        backgroundColor: pressedKeys[letter] ? "white" : "#444444",
        color: pressedKeys[letter] ? "#444444" : "white",
        fontSize: "2rem",
        border: "1px solid black",
        borderRadius: "0.5rem",
        margin: "1px",
        width: (2.5 * (WIDTH_KEY_MULTIPLIER[letter] ?? 1)) + "rem",
        height: "2.5rem",
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
        <div className="d-md-inline no-select d-none mt-5 bg-dark px-3 py-1 rounded-3">
            {letters.map((row, index) => (
                <div className="row" key={index}>
                    {row.map(letter => (
                        <div
                            key={letter}
                            style={generateStyle(letter)}
                        >
                            {LETTER_DISPLAY[letter] ?? letter}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default ScreenKeyboard;
