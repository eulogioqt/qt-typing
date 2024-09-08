import React from "react";

const SettingDisplay = ({ settingName, input }) => {
    return (
        <div className="row d-flex justify-content-center align-items-center mb-3">
            <div className="d-flex col-sm-9 justify-content-start">
                <div className="d-flex align-items-center">
                    <h5 className="mb-0 me-3">{settingName}</h5>
                </div>
            </div>
            <div className="d-flex col-sm justify-content-sm-end justify-content-center mt-1">
                {input}
            </div>
        </div>
    );
}

export default SettingDisplay;