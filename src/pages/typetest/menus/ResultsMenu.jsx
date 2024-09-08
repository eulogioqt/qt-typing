import React from "react";

import reload from "/src/assets/images/reload.png";
import Menu from "../../app/components/Menu";
import WPMChart from "../components/WPMChart";

import { useIsLarge } from "../../../hooks/useIsLarge";
import { useSettings } from "../../../contexts/SettingsContext";
import { useTypeTest } from "../../../contexts/TypeTestContext";
import { consistency } from "../../../utils/TypeTestUtils";

import Languages from "../../../data/Languages.json";

const ResultsMenu = ({ isOpen, closeMenu }) => {
    const isLarge = useIsLarge();
    const { duration, testLang } = useSettings();
    const { accuracy, timeStamps, calcKeyStrokes, onReload } = useTypeTest();
    const [correctKeys, incorrectKeys, correctWords, incorrectWords] = calcKeyStrokes();

    if (!isOpen) return null;

    const wpmCalc = Math.round((correctKeys / 5) * 60 / duration);
    const rawCalc = Math.round(((correctKeys + incorrectKeys) / 5) * 60 / duration);
    const accuracyCalc = Math.round(accuracy.correct / (accuracy.correct + accuracy.wrong) * 10000) / 100;
    const consistencyCalc = Math.round(consistency(Object.values(timeStamps).map(stamp => stamp.wpm)) * 100) / 100;

    const onNewTest = () => {
        onReload();
        closeMenu();
    }

    const DataDisplay = ({ name, data, big = false }) => {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center my-2 w-100">
                <span className="text-center fw-bold w-100"
                    style={{
                        fontSize: big ? "1.75rem" : "1.25rem", color: "#444444",
                        lineHeight: "1"
                    }}>{name}</span>
                <span className="text-center fw-bold w-100"
                    style={{
                        fontSize: big ? "3rem" : "1.75rem", color: "white",
                        lineHeight: big ? "1" : "1.25", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
                    }}>{data}</span>
            </div>
        );
    }

    return (
        <Menu orderInLayer={1} bgColor="bg-main">
            <div className="d-flex flex-column w-100 h-100">
                <div className="container">
                    <h1 className="text-center fw-bold text-white mt-3"
                        style={{ fontSize: isLarge ? "4rem" : "2.5rem", lineHeight: "1", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
                        QT Typing
                    </h1>
                    <h2 className="text-center mt-3 text-white"
                        style={{ fontSize: isLarge ? "2rem" : "1.5rem", lineHeight: "1", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
                        Resultados
                    </h2>

                    <div className="row">
                        <div className="col-md-3 col-lg-2 d-flex flex-column flex-sm-row flex-md-column justify-content-center align-items-center my-3">
                            <DataDisplay name={"PPM"} data={wpmCalc} big={true} />
                            <DataDisplay name={"Precisión"} data={accuracyCalc + "%"} big={true} />
                        </div>

                        <div className="col-md-9 col-lg-10 my-3" style={{ height: "300px" }}>
                            <WPMChart data={timeStamps} />
                        </div>
                    </div>

                    <div className="row d-flex align-items-center justify-content-between">
                        <div className="col-md-2 col-sm-4 col-6">
                            <DataDisplay name={"Idioma"} data={Languages[testLang].long} />
                        </div>

                        <div className="col-md-2 col-sm-4 col-6">
                            <DataDisplay name={"Tiempo"} data={duration + "s"} />
                        </div>

                        <div className="col-md-2 col-sm-4 col-6">
                            <DataDisplay name={"Test"} data={accuracyCalc > 80 ? "Valido" : "Invalido"} />
                        </div>

                        <div className="col-md-2 col-sm-4 col-6">
                            <DataDisplay name={"PPM con fallos"} data={rawCalc} />
                        </div>

                        <div className="col-md-2 col-sm-4 col-6">
                            <DataDisplay name={"Consistencia"} data={consistencyCalc + "%"} />
                        </div>

                        <div className="col-md-2 col-sm-4 col-6">
                            <DataDisplay name={"Palabras"} data={correctWords + "/" + incorrectWords} />
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
