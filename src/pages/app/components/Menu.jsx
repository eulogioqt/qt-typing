import React, { useEffect } from "react";

const Menu = ({ orderInLayer, bgColor = "", closeMenu, children }) => {

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <div className={'d-flex align-items-start justify-content-center position-fixed w-100 h-100 ' + bgColor}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: orderInLayer * 100, overflowY: 'auto', overflowX: "hidden" }}
            onClick={closeMenu}>
            {children}
        </div>
    );
}

export default Menu;
