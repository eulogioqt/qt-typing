import React from "react";

const DataDisplay = ({ name, data, big = false }) => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center my-2 w-100">
            <span className="text-center fw-bold w-100"
                style={{ fontSize: big ? "1.75rem" : "1.25rem", color: "#444444", lineHeight: "1", textWrap: "nowrap" }}>{name}</span>

            <span className="text-center white-shadow-text fw-bold w-100"
                style={{ fontSize: big ? "3rem" : "1.75rem", lineHeight: big ? "1" : "1.25", textWrap: "nowrap" }}>{data}</span>
        </div>
    );
}

export default DataDisplay;