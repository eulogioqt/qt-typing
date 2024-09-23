import React from "react";

import WordItem from './components/WordItem';
import CountdownTimer from "./components/CountdownTimer";
import ReloadButton from "./components/ReloadButton";
import WordInput from "./components/WordInput";
import WordsUpperBar from "./components/WordsUpperBar";

import { TEST_STATES, useTypeTest } from "../../../../contexts/TypeTestContext";
import { useIsLarge } from "../../../../hooks/useIsLarge";

import "./css/wordsDisplay.css";

const WordsDisplay = () => {
    const { testState, wordList } = useTypeTest();
    const isLarge = useIsLarge();

    return (
        <>
            <WordsUpperBar />

            <div className="d-flex justify-content-center align-items-center position-relative mt-2">
                <div className="p-2 col-lg-9 col-12 test-container rounded-3">
                    {wordList.map((word, index) => (<WordItem key={index} index={index} word={word} />))}
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
