import React, { createContext, useContext, useState, useEffect } from "react";

import WordES from "../data/WordsES.json";
import { useWords } from "../hooks/useWords";
import { getWordLength } from "../utils/Utils.js";

export const TEST_STATES = {
    NOT_STARTED: 0,
    RUNNING: 1,
    FINISHED: 2
}

const TypeTestContext = createContext();
export const TypeTestProvider = ({ children }) => {
    const { generateRandomWord, generateWords } = useWords(WordES);

    const [duration, setDuration] = useState(5);

    const [timeLeft, setTimeLeft] = useState(undefined); // Necesario para los renderizados
    const [endTime, setEndTime] = useState(undefined);

    const [wordList, setWordList] = useState(generateWords());
    const [writtenWords, setWrittenWords] = useState([]);
    const [accuracy, setAccuracy] = useState({ correct: 0, wrong: 0 });
    const [testState, setTestState] = useState(TEST_STATES.NOT_STARTED);

    const [inputText, setInputText] = useState("");

    useEffect(() => {
        if (writtenWords.length > 0) {
            const selectedWordY = document.getElementById("word-" + writtenWords.length).getBoundingClientRect().y;
            for (let i = 0; i < writtenWords.length; i++) {
                const word = document.getElementById("word-" + i);
                if (word.getBoundingClientRect().y < selectedWordY)
                    word.style.display = "none";
            }
        }

        // cuando se completa una palabra se genera otra
        setWordList(wordList => {
            const newWordList = [...wordList];
            newWordList.push(generateRandomWord());
            return newWordList;
        });
    }, [writtenWords]);

    const onReload = () => {
        for (let i = 0; i < writtenWords.length; i++)
            document.getElementById("word-" + i).style.display = "inline-block";

        setWordList(generateWords());
        setWrittenWords([]);
        setAccuracy({ correct: 0, wrong: 0 });
        setTestState(TEST_STATES.NOT_STARTED);

        setInputText("");
    }

    const onFinish = () => {
        setTestState(TEST_STATES.FINISHED);

        setInputText("");
        setWrittenWords(writtenList => {
            console.log("Promedio de caracteres por palabra: " + wordList
                .map((word, index) => writtenList[index] !== undefined ? getWordLength(word) + 1 : 0)
                .reduce((acc, cur) => acc + cur) / writtenList.length);

            return writtenList;
        })
    };

    const onStart = () => {
        setTestState(TEST_STATES.RUNNING);

        setTimeLeft(duration);
        setEndTime(Date.now() + duration * 1000);
    }

    const keyStrokes = wordList.reduce(
        ([ck, ik, cw, iw], word, index) => {
            const isCorrect = writtenWords[index];
            const wordLength = getWordLength(word) + 1;

            return [
                ck + (isCorrect ? wordLength : 0),
                ik + (!isCorrect && isCorrect !== undefined ? wordLength : 0),
                cw + (isCorrect ? 1 : 0),
                iw + (!isCorrect && isCorrect !== undefined ? 1 : 0)
            ];
        }, [0, 0, 0, 0]
    );

    /*const [wpm, setWpm] = useState(0); CON ESTO SE PUEDE HACER UN GRAFICO DE WPM ETC, GUARDAR MARCA Y TIEMPO
    useEffect(() => {
        setWpm((keyStrokes[0] / 5) * (60 / (duration - (endTime - Date.now()) / 1000)));
    }, [writtenWords]);*/

    return (
        <TypeTestContext.Provider
            value={{
                duration,
                setDuration,
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
                keyStrokes,

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