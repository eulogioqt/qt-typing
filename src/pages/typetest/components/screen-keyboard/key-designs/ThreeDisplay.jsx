import React from 'react';

import { useKeyboard } from '../context/KeyboardContext';

const ThreeDisplay = ({ topLeft = "", bottomLeft = "", bottomRight = "" }) => {
    const { keyCapSize } = useKeyboard();

    return (
        <div className="d-flex flex-column w-100 h-100 position-relative">
            <span className="position-absolute"
                style={{
                    left: `${keyCapSize / 6}px`,
                    top: "1px"
                }}>
                {topLeft}
            </span>
            <span className="position-absolute"
                style={{
                    left: `${keyCapSize / 6}px`,
                    bottom: "1px"
                }}>
                {bottomLeft}
            </span>
            <span className="position-absolute"
                style={{
                    right: `${keyCapSize / 6}px`,
                    bottom: "1px"
                }}>
                {bottomRight}
            </span>
        </div>
    );
}

export default ThreeDisplay;
