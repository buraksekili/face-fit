import { useRef, useEffect } from "react";

/**
 * A custom hook that checks if component renders component or not.
 */
export const useIsMount = () => {
    const isMountRef = useRef(true);
    useEffect(() => {
        isMountRef.current = false;
    }, []);
    return isMountRef.current;
};
