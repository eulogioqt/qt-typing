import React from "react";

import ResultItem from "./ResultItem";

import { TEST_STATES, useTypeTest } from "../../../../../../contexts/TypeTestContext";
import { useSettings } from "../../../../../../contexts/SettingsContext";

const ResultSummary = () => {
    const { duration } = useSettings();
    const { testState, accuracy, calcKeyStrokes } = useTypeTest();
    const [correctKeys, incorrectKeys, correctWords, incorrectWords] = calcKeyStrokes();

    const wpmCalc = Math.round((correctKeys / 5) * 60 / duration);
    const accuracyCalc = Math.round(accuracy.correct / (accuracy.correct + accuracy.wrong) * 10000) / 100;

    const keystrokesRender = <>
        <span className='text-success'>{correctKeys}</span>&nbsp;+&nbsp;
        <span className='text-danger'>{incorrectKeys}</span>&nbsp;=&nbsp;
        <span>{correctKeys + incorrectKeys}</span>
    </>;

    const resultItems = [
        { className: "", resultName: "Pulsaciones:", content: keystrokesRender },
        { className: "fw-bold", resultName: "Precisión:", content: accuracyCalc + "%" },
        { className: "text-success fw-bold", resultName: "Palabras correctas:", content: correctWords },
        { className: "text-danger fw-bold", resultName: "Palabras falladas:", content: incorrectWords },
    ];

    if (testState !== TEST_STATES.FINISHED)
        return null;

    return (
        <div className='d-flex flex-column mt-4 pt-3 pb-1 rounded-3 border border-dark' style={{ backgroundColor: "#dddddd" }}>
            <div className="d-flex flex-column">
                <span className='text-center fw-bold' style={{ fontSize: "2.5rem" }}>
                    {wpmCalc} PPM
                </span>
                <small className='text-center mb-3' style={{ marginTop: "-8px" }}>
                    (Palabras por minuto)
                </small>
            </div>

            {resultItems.map((result, index) => (
                <ResultItem key={index} resultName={result.resultName} bgColor={index % 2 === 0 ? "#eeeeee" : ""}
                    display={
                        <div className={result.className}>{result.content}</div>
                    } />
            ))}
        </div>
    );
}

export default ResultSummary;