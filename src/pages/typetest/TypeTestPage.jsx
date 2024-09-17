import React from 'react';

import WordsDisplay from './components/words-display/WordsDisplay';
import ScreenKeyboard from './components/screen-keyboard/ScreenKeyboard';

import TestSettingsMenu from './menus/TestSettingsMenu';
import ResultsMenu from './menus/ResultsMenu';
import Header from '../app/components/Header';

import { KeyboardProvider } from './components/screen-keyboard/context/KeyboardContext';

const TypeTestPage = () => {
    return (
        <>
            <TestSettingsMenu />
            <ResultsMenu />

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
