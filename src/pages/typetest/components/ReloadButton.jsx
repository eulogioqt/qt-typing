import React from "react";

import { useTypeTest } from "../../../contexts/TypeTestContext";

const ReloadButton = () => {
    const { onReload } = useTypeTest();

    return (
        <button className="ms-2 btn btn-primary" onClick={onReload} style={{ fontSize: "1.5rem" }}>
            ⟳
        </button>
    );
}

export default ReloadButton;