import React, { useEffect, useState } from "react";

import { useSettings } from "../../../../contexts/SettingsContext";
import { TEST_STATES, useTypeTest } from "../../../../contexts/TypeTestContext";
import { calcKeyStrokes, calcLiveWPM, calcWPM } from "../../../../utils/TypeTestUtils";

import Languages from "../../../../data/Languages.json";

const WordsUpperBar = ({ openTestSettings }) => {
    const { testLang, setTestLang, liveWPM, duration } = useSettings();
    const { endTime, timeLeft, testState, wordList, writtenWords } = useTypeTest();

    const [lWPM, setLWPM] = useState(0);

    useEffect(() => {
        if (liveWPM) {
            const keyStrokes = calcKeyStrokes(wordList, writtenWords);
            const correctKeys = keyStrokes[0];

            const WPM = calcLiveWPM(correctKeys, duration, endTime);

            setLWPM(WPM);
        }
    }, [writtenWords, testState, timeLeft]);

    return (
        <div className="col-lg-9 col-12 d-flex justify-content-start align-items-center position-relative mt-3">
            <div className="d-flex justify-content-start align-items-center ">
                <div className="dropdown me-2">
                    <button className="btn btn-black dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {Languages[testLang].flag}
                    </button>
                    <ul className="dropdown-menu border border-black rounded-3 black-color">
                        {Object.keys(Languages).map(lang => (
                            <li key={lang}>
                                <button className="dropdown-item dropdown-item-black" onClick={() => setTestLang(lang)}>
                                    {lang.flag}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={"btn btn-black" + (testState !== TEST_STATES.NOT_STARTED ? " disabled" : "")} onClick={openTestSettings}>
                    Ajustes
                </div>
            </div>

            <span className="ms-2 btn btn-black no-pointer" style={{ display: liveWPM ? "inline" : "none" }}>
                {Math.round(lWPM)} PPM
            </span>
        </div>
    );
}

export default WordsUpperBar;