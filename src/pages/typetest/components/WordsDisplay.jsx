import React from "react";

import WordItem from './WordItem';
import CountdownTimer from "./CountdownTimer";
import ReloadButton from "./ReloadButton";
import WordInput from "./WordInput";

import { useTypeTest } from "../../../contexts/TypeTestContext";

const WordsDisplay = () => {
    const { wordList } = useTypeTest();

    return (
        <>
            <div className="p-2 col-lg-9 col-12 border border-dark rounded-1 bg-white mb-2 mt-5"
                style={{ fontSize: "1.5rem", height: "5.5rem", overflowY: "hidden" }}>
                {wordList.map((word, index) => <WordItem key={index} index={index} word={word} />)}
            </div>

            <div className="d-flex px-1 col-lg-9 col-12 border border-dark rounded-1 py-1"
                style={{ backgroundColor: "rgba(1,1,1,0.25)", alignItems: "center", justifyContent: "center" }}>
                <WordInput />
                <CountdownTimer />
                <ReloadButton />
            </div>
        </>
    );
}

export default WordsDisplay;
