import React from "react";

import { useTypeTest } from "../../../contexts/TypeTestContext";

const ReloadButton = () => {
    const { onReload } = useTypeTest();

    return (
        <button className="ms-2 btn rounded-3 text-white border border-black" onClick={onReload}
            style={{ fontSize: "1.5rem", height: "2.25em", backgroundColor: "#444444" }}>
            ⟳
        </button>
    );
}

export default ReloadButton;