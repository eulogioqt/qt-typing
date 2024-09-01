import { useKeyboard } from "../context/KeyboardContext";

const CapsLockLight = () => {
    const { keyCapSize, capsLock } = useKeyboard();

    return (
        <span className="position-absolute d-flex flex-column"
            style={{
                right: (keyCapSize / 6) + "px",
                top: "0px"
            }}>

            <span className="position-absolute d-flex flex-column"
                style={{
                    right: "-" + keyCapSize / 6 + "px",
                    top: "-" + keyCapSize / 3 + "px",
                    color: capsLock ? "white" : "gray",
                    fontSize: keyCapSize / 1.5
                }}>·</span>
        </span>
    );
}

export default CapsLockLight;