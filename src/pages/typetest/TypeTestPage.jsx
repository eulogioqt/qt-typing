import React, { useEffect, useState } from 'react';

import WordsDisplay from './components/WordsDisplay';
import ScreenKeyboard from './components/screen-keyboard/ScreenKeyboard';

import TestSettingsMenu from './menus/TestSettingsMenu';
import ResultsMenu from './menus/ResultsMenu';

import { useIsLarge } from '../../hooks/useIsLarge';
import { KeyboardProvider } from './components/screen-keyboard/context/KeyboardContext';
import { TEST_STATES, useTypeTest } from '../../contexts/TypeTestContext';

const TypeTestPage = () => {
    const isLarge = useIsLarge();
    const { testState } = useTypeTest();

    const [openTestSettings, setOpenTestSettings] = useState(false);
    const [openResults, setOpenResults] = useState(false);

    // Temporal, hay que hacer settings menu context
    useEffect(() => {
        setOpenResults(testState === TEST_STATES.FINISHED);
    }, [testState]);

    return (
        <>
            <TestSettingsMenu isOpen={openTestSettings} closeMenu={() => setOpenTestSettings(false)} />
            <ResultsMenu isOpen={openResults} closeMenu={() => setOpenResults(false)} />

            <div className="container d-flex flex-column align-items-center pt-3">
                <h1 className="text-center fw-bold text-white"
                    style={{ fontSize: isLarge ? "4rem" : "2.5rem", lineHeight: "1", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
                    QT Typing
                </h1>
                <h2 className="text-center mt-3 text-white"
                    style={{ fontSize: isLarge ? "2rem" : "1.5rem", lineHeight: "1", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
                    Prueba de mecanografía
                </h2>

                <WordsDisplay openTestSettings={() => setOpenTestSettings(true)} />

                <KeyboardProvider>
                    <ScreenKeyboard />
                </KeyboardProvider>
            </div >
        </>
    );
}

export default TypeTestPage;
