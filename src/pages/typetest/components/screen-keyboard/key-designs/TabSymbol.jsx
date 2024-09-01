import { useKeyboard } from "../context/KeyboardContext";

const TabSymbol = () => {
    const { keyCapSize } = useKeyboard();

    return (
        <span className="position-absolute d-flex flex-column"
            style={{
                right: (keyCapSize / 6) + "px",
                bottom: "0px"
            }}>

            <span className="position-absolute d-flex flex-column"
                style={{
                    right: "0px",
                    bottom: (keyCapSize / 6) + "px"
                }}>⇤</span>

            <span className="position-absolute d-flex flex-column"
                style={{
                    right: "0px",
                    bottom: "-2px"
                }}>⇥</span>
        </span>
    );
}

export default TabSymbol;