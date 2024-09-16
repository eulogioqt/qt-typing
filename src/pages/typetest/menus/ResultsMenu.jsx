import React from "react";

import reload from "/src/assets/images/reload.png";
import Menu from "../../app/components/Menu";
import WPMChart from "../components/WPMChart";
import DataDisplay from "../components/DataDisplay";

import { useIsLarge } from "../../../hooks/useIsLarge";
import { useSettings } from "../../../contexts/SettingsContext";
import { useTypeTest } from "../../../contexts/TypeTestContext";
import { calcKeyStrokes, calcRaw, calcWPM, calcConsistency, calcAccuracy } from "../../../utils/TypeTestMetrics";

import Languages from "../../../data/Languages.json";

const ResultsMenu = ({ isOpen, closeMenu }) => {
    const isLarge = useIsLarge();
    const { duration, testLang } = useSettings();
    const { accuracy, timeStamps, endTime, onReload, wordList, writtenWords } = useTypeTest();
    const [correctKeys, incorrectKeys, correctWords, incorrectWords] = calcKeyStrokes(wordList, writtenWords);

    if (!isOpen) return null;

    const wpmCalc = calcWPM(correctKeys, duration);
    const rawCalc = calcRaw(correctKeys, incorrectKeys, duration);
    const accuracyCalc = calcAccuracy(accuracy);
    const consistencyCalc = calcConsistency(Object.values(timeStamps).map(stamp => stamp.wpm));

    const onNewTest = () => {
        onReload();
        closeMenu();
    }

    return (
        <Menu orderInLayer={1} bgColor="bg-main">
            <div className="d-flex flex-column w-100 h-100">
                <div className="container">
                    <h1 className="text-center fw-bold white-shadow-text mt-3" style={{ fontSize: isLarge ? "4rem" : "2.5rem" }}>
                        QT Typing
                    </h1>
                    <h2 className="text-center mt-3 white-shadow-text" style={{ fontSize: isLarge ? "2rem" : "1.5rem" }}>
                        Resultados
                    </h2>

                    <div className="row">
                        <div className="col-md-3 col-lg-2 d-flex flex-column flex-sm-row flex-md-column justify-content-center align-items-center my-3">
                            <DataDisplay
                                name={"PPM"}
                                data={Math.round(wpmCalc)}
                                tooltip={wpmCalc.toFixed(2) + " PPM"}
                                big={true} />

                            <DataDisplay
                                name={"Precisión"}
                                data={Math.round(accuracyCalc) + "%"}
                                tooltip={accuracyCalc.toFixed(2) + "%"}
                                big={true} />
                        </div>

                        <div className="col-md-9 col-lg-10 my-3" style={{ height: "300px" }}>
                            <WPMChart data={timeStamps} />
                        </div>
                    </div>

                    <div className="row d-flex align-items-center justify-content-between">
                        <div className="col-md-2 col-sm-4 col-6">
                            <DataDisplay
                                name={"Idioma"}
                                data={Languages[testLang].long} />
                        </div>

                        <div className="col-md-2 col-sm-4 col-6">
                            <DataDisplay
                                name={"Tiempo"}
                                data={duration + "s"} />
                        </div>

                        <div className="col-md-2 col-sm-4 col-6">
                            <DataDisplay
                                name={"Test"}
                                data={accuracyCalc > 80 ? "Valido" : "Invalido"}
                                tooltip={accuracyCalc > 80 ? "Más de 80% de precisión" : "Menos de 80% de precisión"}
                            />
                        </div>

                        <div className="col-md-2 col-sm-4 col-6">
                            <DataDisplay
                                name={"PPM con fallos"}
                                data={Math.round(rawCalc)}
                                tooltip={rawCalc.toFixed(2) + " PPM"}
                            />
                        </div>

                        <div className="col-md-2 col-sm-4 col-6">
                            <DataDisplay
                                name={"Consistencia"}
                                data={Math.round(consistencyCalc) + "%"}
                                tooltip={consistencyCalc.toFixed(2) + "%"} />
                        </div>

                        <div className="col-md-2 col-sm-4 col-6">
                            <DataDisplay
                                name={"Palabras"}
                                data={correctWords + " / " + incorrectWords}
                                tooltip={"correctas / incorrectas"} />
                        </div>
                    </div>


                    <div className="d-flex align-items-center justify-content-center my-4">
                        <button className="d-flex align-items-center justify-content-center btn btn-black" onClick={onNewTest}>
                            <span className="me-2">Nuevo test</span>
                            <img src={reload} style={{ height: isLarge ? "1.5rem" : "1.4rem" }} />
                        </button>
                    </div>
                </div>
            </div>
        </Menu>
    );
}

export default ResultsMenu;
