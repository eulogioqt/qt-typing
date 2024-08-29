import React from "react";

const ResultItem = ({ resultName, bgColor, display }) => {
    return (
        <div className='d-md-flex d-sm-block border-top border-secondary-subtle mb-sm-0 pb-2 px-5 py-1'
            style={{ justifyContent: "space-between", backgroundColor: bgColor }}>
            <span className='fw-bold me-sm-5'>{resultName}</span>
            {display}
        </div>
    );
}

export default ResultItem;