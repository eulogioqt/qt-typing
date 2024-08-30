import React from "react";

import { useTypeTest } from "../../../contexts/TypeTestContext";
import { useIsLarge } from "../../../hooks/useIsLarge";

import reload from "/src/assets/images/reload.png";

const ReloadButton = () => {
    const { onReload } = useTypeTest();
    const isLarge = useIsLarge();

    return (
        <button className="d-flex align-items-center ms-2 btn btn-black" onClick={onReload}
            style={{ fontSize: isLarge ? "1.5em" : "1.25rem", height: "2.25em" }}>
            <img src={reload} style={{ height: isLarge ? "1.5rem" : "1.4rem" }} />
        </button>
    );
}

export default ReloadButton;