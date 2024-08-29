import React from 'react';

import ResultSummary from './components/ResultSummary';
import WordsDisplay from './components/WordsDisplay';

import { useIsLarge } from '../../hooks/useIsLarge';

const TypeTestPage = () => {
    const isLarge = useIsLarge();

    return (
        <div className="container d-flex flex-column align-items-center mt-5">
            <h1 className="text-center fw-bold" style={{ fontSize: isLarge ? "4rem" : "2rem", lineHeight: "1" }}>
                QT Typing
            </h1>
            <h2 className="text-center mt-3" style={{ fontSize: isLarge ? "2rem" : "1.5rem", lineHeight: "1" }}>
                Prueba de mecanografía
            </h2>

            <WordsDisplay />

            <ResultSummary />
        </div >
    );
}

export default TypeTestPage;
