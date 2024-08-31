import { useWindowsSize } from "./useWindowsSize";

export const useIsLarge = () => {
    const { width } = useWindowsSize();

    return width > 768;
}