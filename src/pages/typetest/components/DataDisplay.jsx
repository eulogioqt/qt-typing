import React, { useEffect } from "react";

const DataDisplay = ({ name, tooltip, data, big }) => {

    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltips = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new window.bootstrap.Tooltip(tooltipTriggerEl));

        return () => tooltips.forEach(tooltip => tooltip.dispose());
    }, []);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center my-2 w-100">
            <span
                className="text-center fw-bold w-100"
                style={{ fontSize: big ? "1.75rem" : "1rem", color: "#444444", lineHeight: "1", textWrap: "nowrap" }}
            >
                {name}
            </span>

            <span
                className="text-center white-shadow-text fw-bold w-100"
                style={{ fontSize: big ? "3rem" : "1.5rem", lineHeight: big ? "1" : "1.25", textWrap: "nowrap", cursor: tooltip ? "pointer" : "default" }}
                data-bs-toggle={tooltip ? "tooltip" : ""}
                data-bs-placement={tooltip ? "top" : ""}
                data-bs-title={tooltip ?? ""}
                data-bs-custom-class="results-tooltip"
            >
                {data}
            </span>
        </div>
    );
}

export default DataDisplay;
