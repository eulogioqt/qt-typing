import React from "react";

import Menu from "./Menu";

import { useIsLarge } from "../../../hooks/useIsLarge";

const WhiteScrollMenu = ({ title, closeMenu, orderInLayer, children }) => {
    const isLarge = useIsLarge();

    return (
        <Menu orderInLayer={orderInLayer}>
            <div className="bg-white rounded-3 py-4 d-flex flex-column" style={{ width: "80%", maxWidth: "600px", maxHeight: "90%" }}>
                <h2 className="text-center mb-4" style={{ fontSize: isLarge ? "2.5rem" : "2rem" }}>{title}</h2>

                <div className="bg-white scroll" style={{ width: "100%", overflowY: "auto", overflowX: "hidden" }}>
                    <div className="viewport px-4">
                        {children}
                    </div>
                </div>

                <div className="text-end mt-4 px-4">
                    <button className="btn btn-black" onClick={closeMenu}>
                        Cerrar
                    </button>
                </div>
            </div>
        </Menu>
    );
}

export default WhiteScrollMenu;
