import React from 'react';

import WordsDisplay from './components/words-display/WordsDisplay';
import ScreenKeyboard from './components/screen-keyboard/ScreenKeyboard';

import TestSettingsMenu from './menus/test-settings/TestSettingsMenu';
import TestResultsMenu from './menus/test-results/TestResultsMenu';
import Header from '../app/components/Header';

import { KeyboardProvider } from './components/screen-keyboard/context/KeyboardContext';

const TypeTestPage = () => {
    return (
        <>
            <TestSettingsMenu />
            <TestResultsMenu />

            <div className="container d-flex flex-column align-items-center">
                <Header />

                <WordsDisplay />

                <KeyboardProvider>
                    <ScreenKeyboard />
                </KeyboardProvider>
            </div >
        </>
    );
}

export default TypeTestPage;
