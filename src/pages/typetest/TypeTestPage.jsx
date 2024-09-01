import React, { useState } from 'react';

import ResultSummary from './components/ResultSummary';
import WordsDisplay from './components/WordsDisplay';
import TestSettingsMenu from './menus/TestSettingsMenu';
import ScreenKeyboard from './components/screen-keyboard/ScreenKeyboard';

import { useIsLarge } from '../../hooks/useIsLarge';
import { useSettings } from '../../contexts/SettingsContext';
import { TEST_STATES, useTypeTest } from '../../contexts/TypeTestContext';
import { KeyboardProvider } from './components/screen-keyboard/context/KeyboardContext';

const TypeTestPage = () => {
    const isLarge = useIsLarge();
    const { showKeyboard } = useSettings();
    const { testState } = useTypeTest();

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

                {!showKeyboard || testState === TEST_STATES.FINISHED ? null :
                    <>
                        <KeyboardProvider>
                            <ScreenKeyboard />
                        </KeyboardProvider>
                    </>
                }

                <ResultSummary />
            </div >
        </>
    );
}

export default TypeTestPage;
