import React, { useEffect } from "react";

const Menu = ({ orderInLayer, bgColor = "", children }) => {

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <div className={'d-flex align-items-center justify-content-center position-fixed w-100 h-100 ' + bgColor}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: orderInLayer * 100, overflowY: 'auto' }}>
            {children}
        </div>
    );
}

export default Menu;
