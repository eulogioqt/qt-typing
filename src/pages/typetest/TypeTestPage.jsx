import React, { useState } from 'react';

import ResultSummary from './components/ResultSummary';
import WordsDisplay from './components/WordsDisplay';

import { useIsLarge } from '../../hooks/useIsLarge';
import TestSettingsMenu from './menus/TestSettingsMenu';
import ScreenKeyboard from './components/ScreenKeyboard';

const TypeTestPage = () => {
    const isLarge = useIsLarge();

    const [openTestSettings, setOpenTestSettings] = useState(false);

    return (
        <>
            <TestSettingsMenu isOpen={openTestSettings} closeTestSettings={() => setOpenTestSettings(false)} />

            <div className="container d-flex flex-column align-items-center pt-5">
                <h1 className="text-center fw-bold text-white"
                    style={{ fontSize: isLarge ? "4rem" : "2.5rem", lineHeight: "1", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
                    QT Typing
                </h1>
                <h2 className="text-center mt-3 text-white"
                    style={{ fontSize: isLarge ? "2rem" : "1.5rem", lineHeight: "1", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
                    Prueba de mecanografía
                </h2>

                <WordsDisplay openTestSettings={() => setOpenTestSettings(true)} />

                <ScreenKeyboard />
                <ResultSummary />
            </div >
        </>
    );
}

export default TypeTestPage;
