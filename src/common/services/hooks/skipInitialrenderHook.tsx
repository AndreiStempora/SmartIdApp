import { useEffect, useRef } from 'react';

const useSkipInitialRender = (func: any, trigger: any) => {
    const isMountingRef = useRef(false);

    useEffect(() => {
        isMountingRef.current = true;
    }, []);

    useEffect(() => {
        if (!isMountingRef.current) {
            return func();
        } else {
            isMountingRef.current = false;
        }
    }, [trigger]);
};

export default useSkipInitialRender;
