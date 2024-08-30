import React, { useEffect, useState } from 'react';

import ResultSummary from './components/ResultSummary';
import WordsDisplay from './components/WordsDisplay';

import { useIsLarge } from '../../hooks/useIsLarge';
import { useTypeTest } from '../../contexts/TypeTestContext';
import { useSettings } from '../../contexts/SettingsContext';

const TypeTestPage = () => {
    const { testLang } = useSettings();
    const { onReload } = useTypeTest();
    const isLarge = useIsLarge();

    const [firstRender, setFirstRender] = useState(true);

    useEffect(() => {
        if (firstRender) setFirstRender(false);
        else onReload();

        const reloadF5 = (event) => {
            if (event.key === 'F5') {
                event.preventDefault();
                onReload();
            }
        }

        window.addEventListener('keydown', reloadF5);
        return () => window.removeEventListener('keydown', reloadF5);
    }, [testLang]);

    return (
        <div className="container d-flex flex-column align-items-center mt-5">
            <h1 className="text-center fw-bold text-white"
                style={{ fontSize: isLarge ? "4rem" : "2.5rem", lineHeight: "1", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
                QT Typing
            </h1>
            <h2 className="text-center mt-3 text-white"
                style={{ fontSize: isLarge ? "2rem" : "1.5rem", lineHeight: "1", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
                Prueba de mecanografía
            </h2>

            <WordsDisplay />

            <ResultSummary />
        </div >
    );
}

export default TypeTestPage;
