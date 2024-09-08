import React, { createContext, useContext, useState, useEffect, useRef } from "react";

import { useWords } from "../hooks/useWords";
import { useSettings } from "./SettingsContext.jsx";
import { calcKeyStrokes, calcLiveRaw, calcLiveWPM } from "../utils/TypeTestUtils.js";

export const TEST_STATES = {
    NOT_STARTED: 0,
    RUNNING: 1,
    FINISHED: 2
}

const TypeTestContext = createContext();

export const TypeTestProvider = ({ children }) => {
    const { testLang, duration } = useSettings();
    const { generateRandomWord, generateWords } = useWords(testLang);

    const [firstRender, setFirstRender] = useState(true);

    // timer
    const [timeLeft, setTimeLeft] = useState(undefined); // Necesario para los renderizados
    const [startTime, setStartTime] = useState(undefined);
    const [endTime, setEndTime] = useState(undefined);

    // data
    const [wordList, setWordList] = useState(generateWords());
    const [writtenWords, setWrittenWords] = useState([]);
    const [timeStamps, setTimeStamps] = useState({});
    const [accuracy, setAccuracy] = useState({ correct: 0, wrong: 0 });
    const [testState, setTestState] = useState(TEST_STATES.NOT_STARTED);
    const [inputText, setInputText] = useState("");

    const inputRef = useRef(null);

    useEffect(() => {
        const stamp = duration - timeLeft;
        if (stamp > 0) {
            const [correctKeys, incorrectKeys, _] = calcKeyStrokes(wordList, writtenWords);

            const liveWpmCalc = calcLiveWPM(correctKeys, duration, endTime);
            const liveRawCalc = calcLiveRaw(correctKeys, incorrectKeys, duration, endTime);

            setTimeStamps(oldStamps => ({
                ...oldStamps,
                [stamp]: {
                    wpm: Math.round(liveWpmCalc),
                    raw: Math.round(liveRawCalc),
                    //errors: accuracy.wrong
                }
            }))
        }
    }, [timeLeft]);

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

    useEffect(() => {
        if (inputRef.current) {
            if (testState === TEST_STATES.FINISHED) inputRef.current.blur(); // deseleccionar al terminar
            else if (testState === TEST_STATES.NOT_STARTED) inputRef.current.focus(); // seleccionar al reiniciar
        }
    }, [testState]);

    const onReload = () => {
        [...document.querySelectorAll('[nword]')].map(word => word.style.display = "inline-block")

        setWordList(generateWords());
        setWrittenWords([]);
        setTimeStamps({});
        setAccuracy({ correct: 0, wrong: 0 });
        setTestState(TEST_STATES.NOT_STARTED);

        setInputText("");

        if (inputRef.current) inputRef.current.focus();
    }

    const onFinish = () => {
        setTestState(TEST_STATES.FINISHED);

        setInputText("");
    };

    const onStart = () => {
        setTestState(TEST_STATES.RUNNING);

        setTimeLeft(duration);
        setEndTime(Date.now() + duration * 1000);
    }

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
                timeStamps,
                setTimeStamps,
                accuracy,
                setAccuracy,
                testState,
                setTestState,
                inputText,
                setInputText,
                inputRef,

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