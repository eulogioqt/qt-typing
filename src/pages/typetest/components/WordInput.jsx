import React from "react";

import { TEST_STATES, useTypeTest } from "../../../contexts/TypeTestContext";
import { getWordLength } from "../../../utils/Utils";

const WordInput = () => {
    const { writtenWords, setWrittenWords, inputText, setInputText,
        wordList, testState, onStart, setAccuracy } = useTypeTest();

    const onInputChange = (e) => {
        const newValue = e.target.value;

        // Si se escriben espacios o el resultado es vacío, se deja el input vacío y no se procesa
        if (newValue.trim().length === 0) setInputText("");
        else {
            if (testState === TEST_STATES.NOT_STARTED) // Iniciar test si aún no ha comenzado
                onStart();

            if (testState !== TEST_STATES.FINISHED) {  // Si el test no ha terminado, procesar el input
                const { correct, wrong, updatedInputText } = processInput(newValue);

                setInputText(updatedInputText);
                setAccuracy(oldAccuracy => ({
                    correct: oldAccuracy.correct + correct,
                    wrong: oldAccuracy.wrong + wrong
                }));
            }
        }
    };

    const processInput = (newValue) => {
        let correct = 0, wrong = 0;
        let updatedInputText = newValue;

        let keystrokesValue, condition;
        if (newValue.includes(" ")) {
            const [submittedWord, restText] = newValue.split(" ").map(text => text.trim());

            const diff = submittedWord.substring(inputText.length);
            keystrokesValue = getWordLength(diff) + 1;
            condition = wordList[writtenWords.length] === submittedWord;

            setWrittenWords(writtenList => {
                const updatedWrittenWords = [...writtenList];
                updatedWrittenWords.push(wordList[updatedWrittenWords.length] === submittedWord);
                return updatedWrittenWords;
            });

            updatedInputText = restText;
        } else {
            const diff = newValue.substring(inputText.length);
            keystrokesValue = getWordLength(diff);
            condition = wordList[writtenWords.length].startsWith(newValue);

            updatedInputText = newValue;
        }

        [correct, wrong] = [condition ? keystrokesValue : 0, condition ? 0 : keystrokesValue]

        return { correct, wrong, updatedInputText };
    };


    return (
        <input
            className="p-1 rounded-3 w-100 border border-black"
            style={{ fontSize: "1.5rem", maxWidth: "500px", height: "2.25em" }}
            value={inputText}
            onChange={onInputChange}
            spellCheck={false}
        />
    );
}

export default WordInput;