import TabSymbol from "./key-designs/TabSymbol";
import CapsLockLight from "./key-designs/CapsLockLight";
import ThreeDisplay from "./key-designs/ThreeDisplay";
import SingleDisplay from "./key-designs/SingleDisplay";

import { useKeyboard } from "./context/KeyboardContext";

const LETTER_DISPLAY = {
    "BACKQUOTE": <ThreeDisplay topLeft="ª" bottomLeft="º" bottomRight="\" />,
    "DIGIT1": <ThreeDisplay topLeft="!" bottomLeft="1" bottomRight="|" />,
    "DIGIT2": <ThreeDisplay topLeft="&quot;" bottomLeft="2" bottomRight="@" />,
    "DIGIT3": <ThreeDisplay topLeft="·" bottomLeft="3" bottomRight="#" />,
    "DIGIT4": <ThreeDisplay topLeft="$" bottomLeft="4" bottomRight="~" />,
    "DIGIT5": <ThreeDisplay topLeft="%" bottomLeft="5" bottomRight="" />,
    "DIGIT6": <ThreeDisplay topLeft="&" bottomLeft="6" bottomRight="¬" />,
    "DIGIT7": <ThreeDisplay topLeft="/" bottomLeft="7" bottomRight="" />,
    "DIGIT8": <ThreeDisplay topLeft="(" bottomLeft="8" bottomRight="" />,
    "DIGIT9": <ThreeDisplay topLeft=")" bottomLeft="9" bottomRight="" />,
    "DIGIT0": <ThreeDisplay topLeft="=" bottomLeft="0" bottomRight="" />,
    "MINUS": <ThreeDisplay topLeft="?" bottomLeft="," bottomRight="" />,
    "EQUAL": <ThreeDisplay topLeft="¿" bottomLeft="¡" bottomRight="" />,
    "BACKSPACE": <SingleDisplay element="←" className="text-end px-2" />,

    "TAB": <SingleDisplay element="Tab" className="text-start px-2" add={<TabSymbol />} />,
    "E": <ThreeDisplay topLeft="E" bottomLeft="" bottomRight="€" />,
    "BRACKETLEFT": <ThreeDisplay topLeft="^" bottomLeft="`" bottomRight="[" />,
    "BRACKETRIGHT": <ThreeDisplay topLeft="*" bottomLeft="+" bottomRight="]" />,
    "ENTERTOP": "",

    "CAPSLOCK": <SingleDisplay element="Bloq Mayus" className="text-start px-2" add={<CapsLockLight />} />,
    "SEMICOLON": <ThreeDisplay topLeft="Ñ" bottomLeft="" bottomRight="" />,
    "QUOTE": <ThreeDisplay topLeft="¨" bottomLeft="´" bottomRight="{" />,
    "BACKSLASH": <ThreeDisplay topLeft="ç" bottomLeft="}" bottomRight="" />,
    "ENTERBOT": <SingleDisplay element="↵ Intro" className="text-end px-2" />,

    "SHIFTLEFT": <SingleDisplay element="⇧" className="text-start px-2" />,
    "INTLBACKSLASH": <ThreeDisplay topLeft="<" bottomLeft=">" bottomRight="" />,
    "COMMA": <ThreeDisplay topLeft=";" bottomLeft="," bottomRight="" />,
    "PERIOD": <ThreeDisplay topLeft=":" bottomLeft="." bottomRight="" />,
    "SLASH": <ThreeDisplay topLeft="_" bottomLeft="-" bottomRight="" />,
    "SHIFTRIGHT": <SingleDisplay element="⇧" className="text-end px-2" />,

    "CONTROLLEFT": <SingleDisplay element="Ctrl" className="text-center" />,
    "METALEFT": <SingleDisplay element="Win" className="text-center" />,
    "ALTLEFT": <SingleDisplay element="Alt" className="text-center" />,
    "SPACE": <SingleDisplay element="" className="text-center" />,
    "ALTRIGHT": <SingleDisplay element="Alt Gr" className="text-center" />,
    "FN": <SingleDisplay element="Fn" className="text-center" />,
    "CONTEXTMENU": <SingleDisplay element="☰" className="text-center" />,
    "CONTROLRIGHT": <SingleDisplay element="Ctrl" className="text-center" />,
};

const KeyCap = ({ isPressed, letter }) => {
    const { getKeyCapStyle } = useKeyboard();

    return (
        <div style={getKeyCapStyle(isPressed, letter)}>
            {LETTER_DISPLAY[letter] ?? <ThreeDisplay topLeft={letter} />}
        </div>
    );
}

export default KeyCap;