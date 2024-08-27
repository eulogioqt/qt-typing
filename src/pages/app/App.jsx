import React from 'react';
import logo from '/logo.png';

const App = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <img src={logo} className="img-fluid" style={{ maxWidth: "50%", maxHeight: "50%" }} alt="Logo" />
            <span className="mt-3 fs-1">
                QT Typing
            </span>
        </div>
    );
}

export default App;
