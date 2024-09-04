import React from "react";

import ResultItem from "../components/ResultItem";

import { useIsLarge } from "../../../hooks/useIsLarge";
import { useSettings } from "../../../contexts/SettingsContext";
import { useTypeTest } from "../../../contexts/TypeTestContext";

const ResultsMenu = ({ isOpen, closeMenu }) => {
    const isLarge = useIsLarge();

    const { duration } = useSettings();
    const { accuracy, calcKeyStrokes } = useTypeTest();
    const [correctKeys, incorrectKeys, correctWords, incorrectWords] = calcKeyStrokes();

    if (!isOpen) return null;

    const wpmCalc = Math.round((correctKeys / 5) * 60 / duration);
    const accuracyCalc = Math.round(accuracy.correct / (accuracy.correct + accuracy.wrong) * 10000) / 100;

    const keystrokesRender = <>
        <span className='text-success'>{correctKeys}</span>&nbsp;+&nbsp;
        <span className='text-danger'>{incorrectKeys}</span>&nbsp;=&nbsp;
        <span>{correctKeys + incorrectKeys}</span>
    </>;

    const resultItems = [
        { className: "", resultName: "Pulsaciones:", content: keystrokesRender },
        { className: "fw-bold", resultName: "Precisión:", content: accuracyCalc + "%" },
        { className: "text-success fw-bold", resultName: "Palabras correctas:", content: correctWords },
        { className: "text-danger fw-bold", resultName: "Palabras falladas:", content: incorrectWords },
    ];

    return isOpen ? (
        <div className='d-flex align-items-center justify-content-center position-fixed w-100 h-100'
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 100 }}>
            <div className="bg-white rounded-3 py-4 d-flex flex-column" style={{ width: "80%", maxWidth: "600px", maxHeight: "90%" }}>
                <h2 className="text-center mb-4" style={{ fontSize: isLarge ? "2.5rem" : "2rem" }}>Resultados</h2>

                <div className="bg-white scroll" style={{ width: "100%", overflowY: "auto", overflowX: "hidden" }}>
                    <div className="viewport px-0">
                        <div className="d-flex flex-column">
                            <span className='text-center fw-bold' style={{ fontSize: "2.5rem" }}>
                                {wpmCalc} PPM
                            </span>
                            <small className='text-center mb-3' style={{ marginTop: "-8px" }}>
                                (Palabras por minuto)
                            </small>
                        </div>

                        {resultItems.map((result, index) => (
                            <ResultItem key={index} resultName={result.resultName} bgColor={index % 2 === 0 ? "#eeeeee" : ""}
                                display={
                                    <div className={result.className}>{result.content}</div>
                                } />
                        ))}
                    </div>
                </div>

                <div className="text-end mt-4 px-4">
                    <button className="btn btn-black" onClick={closeMenu}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    ) : null;
}

export default ResultsMenu;
