import React from "react";

import { TEST_STATES, useTypeTest } from "../../../contexts/TypeTestContext";

const ResultSummary = () => {
    const { duration, testState, accuracy, keyStrokes } = useTypeTest();
    const [correctKeys, incorrectKeys, correctWords, incorrectWords] = keyStrokes;

    if (testState !== TEST_STATES.FINISHED)
        return null;

    return (
        <div className='d-flex flex-column mt-4 px-5 py-3 bg-white rounded-3 border border-dark'>
            <span className='text-center fw-bold' style={{ fontSize: "2.5rem" }}>
                {Math.round((correctKeys / 5) * 60 / duration)} PPM
            </span>
            <small className='text-center mb-3' style={{ marginTop: "-8px" }}>
                (Palabras por minuto)
            </small>
            <div className='d-md-flex d-sm-block justify-content-between mb-sm-0 mb-2'>
                <span className='fw-bold me-sm-5'>Pulsaciones:</span>
                <div>
                    <span className='text-success'>{correctKeys}</span>&nbsp;+&nbsp;
                    <span className='text-danger'>{incorrectKeys}</span>&nbsp;=&nbsp;
                    <span>{correctKeys + incorrectKeys}</span>
                </div>
            </div>
            <div className='d-md-flex d-sm-block justify-content-between mb-sm-0 mb-2'>
                <span className='fw-bold me-sm-5'>Precisión:</span>
                <div className='fw-bold'>
                    {Math.round(accuracy.correct / (accuracy.correct + accuracy.wrong) * 10000) / 100}%
                </div>
            </div>
            <div className='d-md-flex d-sm-block justify-content-between mb-sm-0 mb-2'>
                <span className='fw-bold me-sm-5'>Palabras correctas:</span>
                <div className='text-success fw-bold'>
                    {correctWords}
                </div>
            </div>
            <div className='d-md-flex d-sm-block justify-content-between'>
                <span className='fw-bold me-sm-5'>Palabras falladas:</span>
                <div className='text-danger fw-bold'>
                    {incorrectWords}
                </div>
            </div>
        </div>
    );
}

export default ResultSummary;