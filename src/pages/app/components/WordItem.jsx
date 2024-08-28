import React from "react";

const WordItem = ({ word, index, writtenWords, wordList, inputText }) => {
    const textColor = (writtenWords[index] ? "text-success" : (writtenWords[index] === false ? "text-danger" : "text-dark"));
    const bgColor = (writtenWords.length === index ? (wordList[index].startsWith(inputText) ? "bg-secondary-subtle" : "bg-danger") : "");

    return (
        <span
            id={"word-" + index}
            className={`no-select px-1 ${textColor} ${bgColor}`}
            style={{ display: 'inline-block' }}
        >
            {word}
        </span>
    );
}

export default WordItem;