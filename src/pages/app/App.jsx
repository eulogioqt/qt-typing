import React, { useEffect, useState } from 'react';
import WordsES from "../../data/WordsES.json";
import "../../css/app.css";

const generateWords = () => {
    const list = [];
    for (let i = 0; i < 100; i++) {
        list.push(WordsES[Math.floor(Math.random() * WordsES.length)]);
    }
    return list;
}

const DURATION = 5; // seconds

const App = () => {
    const [tick, setTick] = useState(0);

    const [wordList, setWordList] = useState(generateWords());
    const [writtenWords, setWrittenWords] = useState([]);
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
            console.log(writtenWords);
        }
    }, [tick]);

    const reload = () => {
        setWordList(generateWords());
        setWrittenWords([]);
        setTimer(-1);

        setInputText("");
    }

    const onInputChange = (e) => {
        if (timer === -1) {
            setTimer(Date.now() + DURATION * 1000);
            setInputText(e.target.value);
        } else if (timer !== -2) {
            if (e.target.value.substring(inputText.length) === " ") {
                setWrittenWords(writtenlist => {
                    const newWrittenList = [...writtenlist];
                    newWrittenList.push(wordList[writtenlist.length] === inputText)
                    return newWrittenList;
                });

                setInputText("");
            } else setInputText(e.target.value);
        }


    }

    const getTimerDisplay = () => {
        const diff = 0.999999 + (timer - Date.now()) / 1000;
        const minutes = Math.floor(diff / 60);
        const seconds = Math.floor((diff) % 60);

        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    return (
        <div className="container d-flex flex-column align-items-center mt-5">
            <h1 className="text-center" style={{ fontSize: "4rem", fontWeight: "900", lineHeight: "1" }}>
                QT Typing
            </h1>
            <h2 className="text-center mt-3" style={{ fontSize: "2rem", fontWeight: "500", lineHeight: "1" }}>
                Prueba de mecanografía
            </h2>

            <div className="px-2 col-lg-9 col-12 border border-dark rounded-1 bg-white mb-2 mt-5"
                style={{ fontSize: "1.5rem", height: "7rem", overflowY: "hidden" }}>
                {wordList.map((word, index) =>
                    <span className={(writtenWords.length === index ? "px-1 bg-secondary-subtle " : "px-1 ") +
                        (writtenWords[index] ? "text-success" :
                            (writtenWords[index] === false
                                ? "text-danger" : "text-dark"))} style={{ display: 'inline-block' }}>{word}</span>
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
                <span className="ms-2 bg-dark text-white p-2 rounded-2"
                    style={{ fontSize: "1.5rem" }}>
                    {timer === -1 ? "1:00" : (timer === -2 ? "0:00" : getTimerDisplay())}
                </span>
                <button className="ms-2 btn btn-primary" onClick={reload}
                    style={{ fontSize: "1.5rem" }}>
                    ⟳
                </button>
            </div>
        </div>
    );
}

export default App;
