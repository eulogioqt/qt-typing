import { useKeyboard } from "../context/KeyboardContext";

const SingleDisplay = ({ element, className, add }) => {
    const { keyCapSize } = useKeyboard();

    return (
        <div className="d-flex flex-column w-100 h-100 position-relative">
            <span className={"position-absolute text-start w-100 " + className}
                style={{
                    fontSize: (keyCapSize / 3.5) + "px", bottom: (keyCapSize / 12) + "px", lineHeight: "1"
                }}>{element}</span>
            {add}
        </div>
    );
}

export default SingleDisplay;
