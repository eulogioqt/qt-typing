import React from "react";

import { useIsLarge } from "../../../hooks/useIsLarge";

const WhiteScrollMenu = ({ title, closeMenu, children }) => {
    const isLarge = useIsLarge();

    return (
        <div className='d-flex align-items-center justify-content-center position-fixed w-100 h-100'
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 100 }}>
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
        </div>
    );
}

export default WhiteScrollMenu;
