import React from "react";

import { MENUS, useMenus } from "../../../contexts/MenusContext";
import { useIsLarge } from "../../../hooks/useIsLarge";

const Header = () => {
    const isLarge = useIsLarge();
    const { getOpenMenu } = useMenus();

    const openMenu = getOpenMenu();

    return (
        <>
            <h1 className="text-center fw-bold white-shadow-text mt-3" style={{ fontSize: isLarge ? "4rem" : "2.5rem" }}>
                QT Typing
            </h1>
            <h2 className="text-center mt-3 white-shadow-text" style={{ fontSize: isLarge ? "2rem" : "1.5rem" }}>
                {openMenu === MENUS.TEST_RESULTS ? "Resultados" : "Prueba de mecanografía"}
            </h2>
        </>
    );
}

export default Header;