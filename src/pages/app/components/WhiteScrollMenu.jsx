import React from "react";

import Menu from "./Menu";

import { useIsLarge } from "../../../hooks/useIsLarge";

const WhiteScrollMenu = ({ title, closeMenu, orderInLayer, children }) => {
    const isLarge = useIsLarge();

    return (
        <Menu orderInLayer={orderInLayer} closeMenu={closeMenu}>
            <div className="bg-white rounded-3 my-5 p-4 d-flex flex-column"
                onClick={(e) => e.stopPropagation()} style={{ width: "80%", maxWidth: "600px", cursor: "default" }}>
                <h2 className="text-center mb-4" style={{ fontSize: isLarge ? "2.5rem" : "2rem" }}>{title}</h2>

                {children}

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
