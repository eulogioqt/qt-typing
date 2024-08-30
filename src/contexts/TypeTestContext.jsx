import React, { createContext, useContext, useState, useEffect } from "react";

import { useWords } from "../hooks/useWords";
import { getWordLength } from "../utils/Utils.js";
import { useSettings } from "./SettingsContext.jsx";

export const TEST_STATES = {
    NOT_STARTED: 0,
    RUNNING: 1,
    FINISHED: 2
}

const TypeTestContext = createContext();
export const TypeTestProvider = ({ children }) => {
    const { testLang, duration } = useSettings();
    const { generateRandomWord, generateWords } = useWords(testLang);

    // timer
    const [timeLeft, setTimeLeft] = useState(undefined); // Necesario para los renderizados
    const [endTime, setEndTime] = useState(undefined);

    // data
    const [wordList, setWordList] = useState(generateWords());
    const [writtenWords, setWrittenWords] = useState([]);
    const [accuracy, setAccuracy] = useState({ correct: 0, wrong: 0 });
    const [testState, setTestState] = useState(TEST_STATES.NOT_STARTED);
    const [inputText, setInputText] = useState("");

    const calcKeyStrokes = () => wordList.reduce(
        ([ck, ik, cw, iw], word, index) => {
            const isCorrect = writtenWords[index];
            const wordLength = getWordLength(word) + 1;

            return [
                ck + (isCorrect ? wordLength : 0),
                ik + (isCorrect === false ? wordLength : 0),
                cw + (isCorrect ? 1 : 0),
                iw + (isCorrect === false ? 1 : 0)
            ];
        }, [0, 0, 0, 0]
    );

    useEffect(() => {
        if (writtenWords.length > 0) {
            const selectedWordY = document.querySelector(`[nword="${writtenWords.length}"]`).getBoundingClientRect().y;

            writtenWords.forEach((_, i) => {
                const wordElement = document.querySelector(`[nword="${i}"]`);
                if (wordElement && wordElement.getBoundingClientRect().y < selectedWordY)
                    wordElement.style.display = "none";
            });
        }

        setWordList(wordList => [...wordList, generateRandomWord()]);
    }, [writtenWords]);

    const [firstRender, setFirstRender] = useState(true);
    useEffect(() => {
        if (firstRender) setFirstRender(false);
        else onReload();

        const reloadF5 = (event) => {
            if (event.key === 'F5') {
                event.preventDefault();
                onReload();
            }
        }

        window.addEventListener('keydown', reloadF5);
        return () => window.removeEventListener('keydown', reloadF5);
    }, [testLang]);

    const onReload = () => {
        [...document.querySelectorAll('[nword]')].map(word => word.style.display = "inline-block")

        setWordList(generateWords());
        setWrittenWords([]);
        setAccuracy({ correct: 0, wrong: 0 });
        setTestState(TEST_STATES.NOT_STARTED);

        setInputText("");
    }

    const onFinish = () => {
        setTestState(TEST_STATES.FINISHED);

        setInputText("");
        console.log("Promedio de caracteres por palabra: " + wordList
            .map((word, index) => writtenWords[index] !== undefined ? getWordLength(word) + 1 : 0)
            .reduce((acc, cur) => acc + cur) / writtenWords.length);
    };

    const onStart = () => {
        setTestState(TEST_STATES.RUNNING);

        setTimeLeft(duration);
        setEndTime(Date.now() + duration * 1000);
    }

    /*const [wpm, setWpm] = useState(0); CON ESTO SE PUEDE HACER UN GRAFICO DE WPM ETC, GUARDAR MARCA Y TIEMPO
    useEffect(() => {
        setWpm((keyStrokes[0] / 5) * (60 / (duration - (endTime - Date.now()) / 1000)));
    }, [writtenWords]);*/

    return (
        <TypeTestContext.Provider
            value={{
                timeLeft,
                setTimeLeft,
                endTime,
                setEndTime,
                wordList,
                setWordList,
                writtenWords,
                setWrittenWords,
                accuracy,
                setAccuracy,
                testState,
                setTestState,
                inputText,
                setInputText,
                calcKeyStrokes,

                onFinish,
                onStart,
                onReload,
            }}
        >
            {children}
        </TypeTestContext.Provider>
    )
}

export const useTypeTest = () => useContext(TypeTestContext);