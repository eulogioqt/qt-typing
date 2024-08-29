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
        return word.startsWith(inputText) ? "bg-secondary-subtle" : "bg-danger";
    };

    return (
        <span id={`word-${index}`} className={`no-select px-1 ${text()} ${bg()}`} style={{ display: 'inline-block' }}>
            {word}
        </span>
    );
}

export default WordItem;
