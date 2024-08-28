import React from "react";

import WordItem from './WordItem';

const WordsDisplay = ({ writtenWords, wordList, inputText, onInputChange, reload, getTimerDisplay, timer }) => {
    return (
        <>
            <div className="p-2 col-lg-9 col-12 border border-dark rounded-1 bg-white mb-2 mt-5"
                style={{ fontSize: "1.5rem", height: "5.5rem", overflowY: "hidden" }}>
                {wordList.map((word, index) =>
                    <WordItem
                        key={index}
                        word={word}
                        index={index}
                        writtenWords={writtenWords}
                        wordList={wordList}
                        inputText={inputText}
                    />
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
        </>
    );
}

export default WordsDisplay;