const ResultSummary = ({ timer, correctKeys, incorrectKeys, accuracy, correctWords, incorrectWords }) => {
    return (
        <div className='flex-column mt-4 px-5 py-3 bg-white rounded-3 border border-dark'
            style={{ display: timer === -2 ? "flex" : "none" }}>
            <span className='text-center fw-bold'
                style={{ fontSize: "2.5rem" }}>{Math.round(correctKeys / 5)} PPM</span>
            <small className='text-center mb-3' style={{ marginTop: "-8px" }}>
                (Palabras por minuto)
            </small>
            <div className='d-md-flex d-sm-block justify-content-between mb-sm-0 mb-2'>
                <span className='fw-bold me-sm-5'>Pulsaciones:</span>
                <div>
                    <span className='text-success'>{correctKeys}</span>
                    &nbsp;+&nbsp;
                    <span className='text-danger'>{incorrectKeys}</span>
                    &nbsp;=&nbsp;
                    <span>{correctKeys + incorrectKeys}</span>
                </div>
            </div>
            <div className='d-md-flex d-sm-block justify-content-between mb-sm-0 mb-2'>
                <span className='fw-bold me-sm-5'>Precisión:</span>
                <div className='fw-bold'> {/* asi no se mide, hay que sumar las pulsaciones completas las que se borran y todo*/}
                    {Math.round(accuracy.correct / (accuracy.correct + accuracy.wrong) * 10000) / 100}%
                </div>
            </div>
            <div className='d-md-flex d-sm-block justify-content-between mb-sm-0 mb-2'>
                <span className='fw-bold me-sm-5'>Palabras correctas:</span>
                <div className='text-success fw-bold'>
                    {correctWords}
                </div>
            </div>
            <div className='d-md-flex d-sm-block justify-content-between'>
                <span className='fw-bold me-sm-5'>Palabras falladas:</span>
                <div className='text-danger fw-bold'>
                    {incorrectWords}
                </div>
            </div>
        </div>
    );
}

export default ResultSummary;