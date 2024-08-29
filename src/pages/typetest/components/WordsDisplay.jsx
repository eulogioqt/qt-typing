import React from "react";

import WordItem from './WordItem';
import CountdownTimer from "./CountdownTimer";

import { TEST_STATES, useTypeTest } from "../../../contexts/TypeTestContext";
import { getWordLength } from "../../../utils/Utils";

const WordsDisplay = () => {
    const { onStart, writtenWords, wordList, setInputText, inputText, onReload, testState, setTestState, setAccuracy, setWrittenWords } = useTypeTest();

    const onInputChange = (e) => {
        const newValue = e.target.value;

        if (newValue.trim().length === 0) { // Si lo nuevo esta vacio, simplemente lo dejamos vacio pero no procesamos
            setInputText("");
            return;
        }

        if (testState === TEST_STATES.NOT_STARTED) { // Iniciar 
            onStart();

            setTestState(TEST_STATES.RUNNING);
        }

        if (testState !== TEST_STATES.FINISHED) { // Si no ha terminado
            let correct = 0, wrong = 0;

            if (newValue.includes(" ")) {
                const split = newValue.split(" ");
                const submittedWord = split[0].trim();
                const restText = split[1].trim(); // En moviles el corrector escribe varias a la vez

                const diff = submittedWord.substring(inputText.length);
                if (wordList[writtenWords.length] === submittedWord)
                    correct = getWordLength(diff) + 1;
                else
                    wrong = getWordLength(diff) + 1;

                setWrittenWords(writtenlist => {
                    const newWrittenList = [...writtenlist];
                    newWrittenList.push(wordList[writtenlist.length] === submittedWord);
                    return newWrittenList;
                });

                setInputText(restText);
            } else {
                const diff = newValue.substring(inputText.length);
                if (wordList[writtenWords.length].startsWith(newValue))
                    correct = getWordLength(diff);
                else
                    wrong = getWordLength(diff);

                setInputText(newValue);
            }

            setAccuracy(oldAccuracy => ({
                correct: oldAccuracy.correct + correct,
                wrong: oldAccuracy.wrong + wrong
            }));
        }
    }

    return (
        <>
            <div className="p-2 col-lg-9 col-12 border border-dark rounded-1 bg-white mb-2 mt-5"
                style={{ fontSize: "1.5rem", height: "5.5rem", overflowY: "hidden" }}>
                {wordList.map((word, index) =>
                    <WordItem key={index} index={index} word={word} />
                )}
            </div>

            <div className="d-flex px-1 col-lg-9 col-12 border border-dark rounded-1 align-items-center justify-content-center py-1"
                style={{ backgroundColor: "rgba(1,1,1,0.25)" }}>
                <input
                    className="p-1 rounded-2 w-100"
                    style={{ fontSize: "1.5rem", maxWidth: "500px" }}
                    value={inputText}
                    onChange={onInputChange}
                    spellCheck={false}
                />

                <CountdownTimer />

                <button className="ms-2 btn btn-primary" onClick={onReload}
                    style={{ fontSize: "1.5rem" }}>
                    ⟳
                </button>
            </div>
        </>
    );
}

export default WordsDisplay;