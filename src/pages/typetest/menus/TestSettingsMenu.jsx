import React from "react";

import WhiteScrollMenu from "../../app/components/WhiteScrollMenu";
import SettingDisplay from "../components/SettingDisplay";
import { useSettings } from "../../../contexts/SettingsContext";

const TestSettingsMenu = ({ isOpen, closeMenu }) => {
    const { liveWPM, setLiveWPM, duration, setDuration, hideTime, setHideTime, showKeyboard, setShowKeyboard } = useSettings();

    if (!isOpen) return null;

    const handleDurationInputChange = (e) => {
        const value = e.target.value;

        if (value.length <= 2)
            setDuration(value);
    };

    const handleDurationInputBlur = () => {
        let actualValue = parseInt(duration, 10);

        if (isNaN(actualValue) || actualValue < 5) actualValue = 5;
        else if (actualValue > 60) actualValue = 60;

        setDuration(actualValue);
    };

    return (
        <WhiteScrollMenu title={"Ajustes"} closeMenu={closeMenu}>

            <SettingDisplay
                settingName={"Tiempo de test"}
                input={
                    <div className="form-check form-switch ps-0">
                        <input
                            className="form-control"
                            type="number"
                            value={duration}
                            onChange={handleDurationInputChange}
                            onBlur={handleDurationInputBlur}
                            min="1"
                            max="1000"
                            style={{ width: "80px" }}
                        />
                    </div>
                }
            />

            <SettingDisplay
                settingName={"PPM en tiempo real"}
                input={<div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={liveWPM}
                        onChange={() => setLiveWPM(value => !value)}
                        style={{ width: "40px", height: "25px" }}
                    />
                </div>}
            />

            <SettingDisplay
                settingName={"Ocultar el tiempo"}
                input={<div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={hideTime}
                        onChange={() => setHideTime(value => !value)}
                        style={{ width: "40px", height: "25px" }}
                    />
                </div>}
            />

            <div className="d-md-block d-none"> {/*Ocultar opción si el teclado no cabe (se oculta en md)*/}
                <SettingDisplay
                    settingName={"Teclado en pantalla"}
                    input={<div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={showKeyboard}
                            onChange={() => setShowKeyboard(value => !value)}
                            style={{ width: "40px", height: "25px" }}
                        />
                    </div>}
                />
            </div>
        </WhiteScrollMenu>
    );
}

export default TestSettingsMenu;
