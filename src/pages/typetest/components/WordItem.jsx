import React from "react";

import { useTypeTest } from "../../../contexts/TypeTestContext";

const WordItem = ({ word, index }) => {
    const { writtenWords, inputText } = useTypeTest();

    const text = () => {
        if (writtenWords[index] === undefined) return "text-dark";
        return writtenWords[index] ? "text-success" : "text-danger";
    };

    const bg = () => {
        if (writtenWords.length !== index) return "";
        if (inputText.length === 0) return "bg-gray";
        return word.startsWith(inputText) ? "bg-green" : "bg-red";
    };

    const isMatchedWord = writtenWords.length === index && word.startsWith(inputText);
    const render = isMatchedWord ? <>
        <span className="text-success">{inputText}</span>{word.substring(inputText.length)}
    </> : word;

    return (
        <span nword={index} className={`no-select px-1 ${text()} ${bg()}`}
            style={{ display: 'inline-block', fontWeight: "500" }}>
            {render}
        </span>
    );
}

export default WordItem;
