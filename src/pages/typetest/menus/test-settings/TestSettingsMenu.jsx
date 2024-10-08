import React from "react";

import WhiteScrollMenu from "../../../app/components/WhiteScrollMenu";
import SettingDisplay from "../../../app/components/SettingDisplay";

import { useSettings } from "../../../../contexts/SettingsContext";
import { useMenus } from "../../../../contexts/MenusContext";

const TestSettingsMenu = () => {
    const { liveWPM, setLiveWPM, duration, setDuration, hideTime, setHideTime, showKeyboard, setShowKeyboard } = useSettings();
    const { testSettingsMenu, closeTestSettingsMenu } = useMenus();

    if (!testSettingsMenu) return null;

    return (
        <WhiteScrollMenu title={"Ajustes"} closeMenu={closeTestSettingsMenu} orderInLayer={1}>

            <SettingDisplay
                settingName={"Tiempo de test"}
                input={
                    <div className="dropdown me-2">
                        <select
                            className="form-select"
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                        >
                            {[60, 30, 15].map((time) => (
                                <option key={time} value={time}>
                                    {time}s
                                </option>
                            ))}
                        </select>
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

            <div className="d-md-block d-none">
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
