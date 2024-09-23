import React from "react";

import reload from "/src/assets/images/reload.png";

import Menu from "../../../app/components/Menu";
import WPMChart from "./components/WPMChart";
import DataDisplay from "./components/DataDisplay";

import { useIsLarge } from "../../../../hooks/useIsLarge";
import { useSettings } from "../../../../contexts/SettingsContext";
import { useTypeTest } from "../../../../contexts/TypeTestContext";
import { useMenus } from "../../../../contexts/MenusContext";
import { calcKeyStrokes, calcRaw, calcWPM, calcConsistency, calcAccuracy } from "../../../../utils/TypeTestMetrics";

import Languages from "../../../../data/Languages.json";
import Header from "../../../app/components/Header";

const TestResultsMenu = () => {
    const isLarge = useIsLarge();
    const { testResultsMenu, closeTestResultsMenu } = useMenus();

    const { duration, testLang } = useSettings();
    const { accuracy, timeStamps, onReload, wordList, writtenWords } = useTypeTest();
    const [correctKeys, incorrectKeys, correctWords, incorrectWords] = calcKeyStrokes(wordList, writtenWords);

    if (!testResultsMenu) return null;

    const wpmCalc = calcWPM(correctKeys, duration);
    const rawCalc = calcRaw(correctKeys, incorrectKeys, duration);
    const accuracyCalc = calcAccuracy(accuracy);
    const consistencyCalc = calcConsistency(Object.values(timeStamps).map(stamp => stamp.wpm));

    const onNewTest = () => {
        onReload();
        closeTestResultsMenu();
    }

    return (
        <Menu orderInLayer={1} bgColor="bg-main">
            <div className="d-flex flex-column w-100 h-100">
                <div className="container">
                    <Header />

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
                                name={"Caracteres"}
                                data={correctKeys + " / " + incorrectKeys}
                                tooltip={"correctos / incorrectos"} />
                        </div>
                    </div>


                    <div className="d-flex align-items-center justify-content-center my-4">
                        <button className="d-flex align-items-center justify-content-center btn btn-black me-2" onClick={onNewTest}>
                            <span className="me-2">Nuevo test</span>
                            <img src={reload} style={{ height: isLarge ? "1.5rem" : "1.4rem" }} />
                        </button>

                        {/*<button className="d-flex align-items-center justify-content-center btn btn-black" onClick={() => alert("No implementado")}>
                            Obtener título
                        </button>*/}
                    </div>
                </div>
            </div>
        </Menu>
    );
}

export default TestResultsMenu;
