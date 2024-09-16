import React from 'react';

import WordsDisplay from './components/words-display/WordsDisplay';
import ScreenKeyboard from './components/screen-keyboard/ScreenKeyboard';

import TestSettingsMenu from './menus/TestSettingsMenu';
import ResultsMenu from './menus/ResultsMenu';

import { useIsLarge } from '../../hooks/useIsLarge';
import { KeyboardProvider } from './components/screen-keyboard/context/KeyboardContext';

const TypeTestPage = () => {
    const isLarge = useIsLarge();

    return (
        <>
            <TestSettingsMenu />
            <ResultsMenu />

            <div className="container d-flex flex-column align-items-center pt-3">
                <h1 className="text-center fw-bold white-shadow-text" style={{ fontSize: isLarge ? "4rem" : "2.5rem" }}>
                    QT Typing
                </h1>
                <h2 className="text-center mt-3 white-shadow-text" style={{ fontSize: isLarge ? "2rem" : "1.5rem" }}>
                    Prueba de mecanografía
                </h2>

                <WordsDisplay />

                <KeyboardProvider>
                    <ScreenKeyboard />
                </KeyboardProvider>
            </div >
        </>
    );
}

export default TypeTestPage;
