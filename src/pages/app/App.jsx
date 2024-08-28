import React, { useEffect, useState } from 'react';
import WordsES from "../../data/WordsES.json";

import ResultSummary from './components/ResultSummary';
import WordsDisplay from './components/WordsDisplay';

import { useWords } from '../../hooks/useWords';
import { getWordLength } from '../../utils/Utils';
import { useIsLarge } from '../../hooks/useIsLarge';

import "../../css/app.css";

const DURATION = 5; // seconds

const App = () => {
    const { generateRandomWord, generateWords } = useWords(WordsES);
    const isLarge = useIsLarge();

    const [tick, setTick] = useState(0);

    const [wordList, setWordList] = useState(generateWords());
    const [writtenWords, setWrittenWords] = useState([]);
    const [accuracy, setAccuracy] = useState({ correct: 0, wrong: 0 });
    const [timer, setTimer] = useState(-1); // -1 not started, -2 finished, otherwise running

    const [inputText, setInputText] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setTick(tick => tick + 1);
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (timer >= 0 && timer - Date.now() <= 0) {
            setTimer(-2);
            setInputText("");

            console.log("Promedio de caracteres por palabra: " + wordList
                .map((word, index) => writtenWords[index] !== undefined ? getWordLength(word) + 1 : 0)
                .reduce((acc, cur) => acc + cur) / writtenWords.length);
        }
    }, [tick]);

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

    const reload = () => {
        for (let i = 0; i < writtenWords.length; i++)
            document.getElementById("word-" + i).style.display = "inline-block";

        setWordList(generateWords());
        setWrittenWords([]);
        setAccuracy({ correct: 0, wrong: 0 });
        setTimer(-1);

        setInputText("");
    }

    const onInputChange = (e) => {
        const newValue = e.target.value;

        if (newValue.trim().length === 0) { // Si lo nuevo esta vacio, simplemente lo dejamos vacio pero no procesamos
            setInputText("");
            return;
        }

        if (timer === -1) // Iniciar timer
            setTimer(Date.now() + DURATION * 1000);

        if (timer !== -2) { // Si no ha terminado
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

    const getTimerDisplay = () => {
        const diff = 0.999999 + (timer - Date.now()) / 1000;
        const minutes = Math.floor(diff / 60);
        const seconds = Math.floor((diff) % 60);

        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    const correctKeys = wordList
        .map((word, index) => writtenWords[index] ? getWordLength(word) + 1 : 0)
        .reduce((acc, cur) => acc + cur);
    const incorrectKeys = wordList
        .map((word, index) => writtenWords[index] === false ? getWordLength(word) + 1 : 0)
        .reduce((acc, cur) => acc + cur);

    const correctWords = wordList
        .map((_, index) => writtenWords[index] ? 1 : 0)
        .reduce((acc, cur) => acc + cur);
    const incorrectWords = wordList
        .map((_, index) => writtenWords[index] === false ? 1 : 0)
        .reduce((acc, cur) => acc + cur);

    return (
        <div className="container d-flex flex-column align-items-center mt-5">
            <h1 className="text-center"
                style={{ fontSize: isLarge ? "4rem" : "2rem", fontWeight: "900", lineHeight: "1" }}>
                QT Typing
            </h1>
            <h2 className="text-center mt-3"
                style={{ fontSize: isLarge ? "2rem" : "1.5rem", fontWeight: "500", lineHeight: "1" }}>
                Prueba de mecanografía
            </h2>

            <WordsDisplay
                writtenWords={writtenWords}
                wordList={wordList}
                inputText={inputText}
                onInputChange={onInputChange}
                reload={reload}
                getTimerDisplay={getTimerDisplay}
                timer={timer}
            />

            <ResultSummary
                timer={timer}
                correctKeys={correctKeys}
                incorrectKeys={incorrectKeys}
                accuracy={accuracy}
                correctWords={correctWords}
                incorrectWords={incorrectWords}
            />
        </div >
    );
}

export default App;
