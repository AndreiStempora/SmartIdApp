import { useEffect, useRef } from 'react';
//@ts-ignore
const useDebounce = (callback, delay) => {
    const timeoutRef = useRef(null);

    useEffect(() => {
        // Cleanup the previous timeout on re-render
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
//@ts-ignore
    const debouncedCallback = (...args) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
//@ts-ignore
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };

    return debouncedCallback;
};

export default useDebounce;
