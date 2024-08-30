import React, { useEffect, useState } from "react";

import WordItem from './WordItem';
import CountdownTimer from "./CountdownTimer";
import ReloadButton from "./ReloadButton";
import WordInput from "./WordInput";

import { TEST_STATES, useTypeTest } from "../../../contexts/TypeTestContext";
import { useIsLarge } from "../../../hooks/useIsLarge";
import { useSettings } from "../../../contexts/SettingsContext";

import "../css/wordsDisplay.css";

const WordsDisplay = ({ openTestSettings }) => {
    const { duration, testLang, setTestLang, liveWPM } = useSettings();
    const { endTime, testState, wordList, writtenWords, calcKeyStrokes } = useTypeTest();
    const isLarge = useIsLarge();

    const [lWPM, setLWPM] = useState(0);

    useEffect(() => {
        if (liveWPM) {
            const keyStrokes = calcKeyStrokes();
            const correctKeys = keyStrokes[0];

            const calc = Math.round((correctKeys / 5) * (60 / (duration - (endTime - Date.now()) / 1000)));
            setLWPM(calc);
        }
    }, [writtenWords, testState]);

    return (
        <>
            <div className="col-lg-9 col-12 d-flex justify-content-between align-items-center position-relative mt-5">
                <div className="d-flex justify-content-start align-items-center ">
                    <div className="dropdown me-2">
                        <button className="btn btn-black dropdown-toggle" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            {testLang === "es" ? "🇪🇸" : "🇺🇸"}
                        </button>
                        <ul className="dropdown-menu border border-black rounded-3 black-color">
                            <li><button className="dropdown-item dropdown-item-black" onClick={() => setTestLang("es")}>🇪🇸</button></li>
                            <li><button className="dropdown-item dropdown-item-black" onClick={() => setTestLang("en")}>🇺🇸</button></li>
                        </ul>
                    </div>

                    <div className={"btn btn-black" + (testState !== TEST_STATES.NOT_STARTED ? " disabled" : "")} onClick={openTestSettings}>
                        Ajustes
                    </div>
                </div>

                <span className="btn btn-black no-pointer" style={{
                    display: liveWPM ? "inline" : "none"
                }}>PPM: {lWPM}</span>
            </div>

            <div className="d-flex justify-content-center align-items-center position-relative mt-2">
                <div className="p-2 col-lg-9 col-12 test-container rounded-3">
                    {wordList.map((word, index) => (
                        <WordItem key={index} index={index} word={word} />
                    ))}
                </div>

                <div className="col-lg-9 col-12 test-overlay rounded-3 no-select"
                    style={{ fontSize: isLarge ? "2rem" : "1.5rem", display: testState === TEST_STATES.FINISHED ? "flex" : "none" }}>
                    <span>¡Test terminado!</span>
                </div>
            </div>

            <div className="d-flex col-lg-9 col-12 border border-dark rounded-3 mt-2 p-2"
                style={{ backgroundColor: "rgba(1,1,1,0.25)", alignItems: "center", justifyContent: "center" }}>
                <WordInput />
                <CountdownTimer />
                <ReloadButton />
            </div>
        </>
    );
}

export default WordsDisplay;
